<template>
  <section class="home">
    <top-row-layout
      class="home__top-row"
      :pending="inputPending"
      v-model="textFieldData"
      @open-dialog="onClickAddUser"
    />
    <user-list
      class="home__user-list"
      :items="filteredUsers"
      @edit="editUser"
      @delete="deleteUser"
    />
    <v-dialog
      persistent
      max-width="600px"
      :loading="loading"
      v-model="dialog"
    >
      <user-form
        :value="editedUser"
        :is-open="dialog"
        @close="onCloseDialog"
        @save="onSaveUser"
      />
    </v-dialog>
  </section>
</template>

<script>
import debounce from 'lodash/debounce';
import { mapGetters, mapActions } from 'vuex';
import UserList from "~/components/UserList";
import TopRowLayout from "~/components/TopRowLayout";
import UserForm from "~/components/UserForm";

export default {
  name: 'Home',
  components: { UserForm, TopRowLayout, UserList },
  data() {
    return {
      dialog: false,
      searchText: '',
      filteredText: '',
      inputPending: false,
      editedUser: null,
      isEdit: false,
      loading: false
    }
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions({
      fetchUsers: 'fetchUsers',
      onServerAddUser: 'addUser',
      onServerUpdateUser: 'editUser',
      onServerDeleteUser: 'deleteUser',
      test: 'test'
    }),
    onClickAddUser() {
      this.dialog = true;
    },
    onCloseDialog() {
      this.dialog = false;
      this.editedUser = null;
    },
    onSearch: debounce(function(e) {
      if (e && e.length > 2) {
        this.filteredText = e;
      } else {
        this.filteredText = '';
      }
      this.inputPending = false;
    }, 1000),
    editUser(user) {
      this.dialog = true;
      this.isEdit = true;
      this.$nextTick(() => {
        this.editedUser = user;
      })
    },
    deleteUser(user) {
      this.onServerDeleteUser(user)
    },
    async onSaveUser({ user, resolve }) {
      const newUser = { ...user };
      try {
        this.loading = true;
        if (this.isEdit === true) {
          await this.onServerUpdateUser(newUser)
        } else {
          const lastId = this.users.reduce((acc, item) => {
            return +item.id > acc ? +item.id : acc
          }, 1);
          await this.onServerAddUser({ ...newUser, id: lastId + 1 })
        }
        resolve();
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false;
        this.isEdit = false;
        this.onCloseDialog();
      }
    }
  },
  computed: {
    ...mapGetters({
      users: 'getUsers'
    }),
    textFieldData: {
      get() {
        return this.searchText
      },
      set(val) {
        this.searchText = val;
        this.onSearch(val);
        this.inputPending = true;
      }
    },
    filteredUsers() {
      const text = this.filteredText && this.filteredText.length > 2 && this.filteredText.toLowerCase(); 
      if (text) {
        return this.users.filter(el => el.username && el.username.toLowerCase().includes(text));
      }
      return this.users
    }
  }
}
</script>

<style scoped lang="scss">
  .home{
    &__top-row{
      padding-top: 30px;
    }
  }
  @media all and (max-width: 600px) {
    .home{
      &__top-row{
        padding-top: 8px;
      }
      &__user-list{
        margin-top: -16px;
      }
    }
  }
</style>
