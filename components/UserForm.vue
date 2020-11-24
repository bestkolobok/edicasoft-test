<template>
  <v-card class="user-form">
    <v-card-title>
      <span class="headline">User Profile</span>
    </v-card-title>
    <validation-observer
      ref="observer"
      v-slot="{ invalid }"
    >
      <form @submit.prevent="submit">
        <v-card-text>
          <v-container>
            <v-row
              v-for="(item, i) in config"
              :key="i"
            >
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  :name="item.left.name"
                  :rules="item.left.rules"
                >
                  <v-text-field
                    :label="item.left.name"
                    light dense
                    color="primary"
                    :error-messages="errors"
                    v-model="item.left.data"
                    @input="item.left.dataSet"
                  />
                </validation-provider>
              </v-col>
              <v-col cols="12" sm="6">
                <validation-provider
                  v-slot="{ errors }"
                  :name="item.right.name"
                  :rules="item.right.rules"
                >
                  <v-text-field
                    :label="item.right.name"
                    light dense
                    color="primary"
                    :error-messages="errors"
                    v-model="item.right.data"
                    @input="item.right.dataSet"
                  />
                </validation-provider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            outlined
            @click="onClose"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            type="submit"
            outlined
            :disabled="invalid"
            :loading="loading"
            @click="onSave"
          >
            Save
          </v-btn>
        </v-card-actions>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
import { required, digits, email, max, regex, alpha_dash } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager');

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
});
extend('required', {
  ...required,
  message: '{_field_} can not be empty',
});
extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
});
extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
});
extend('email', {
  ...email,
  message: 'Email must be valid',
});
extend('alpha_dash', {
  ...alpha_dash,
  message: '{_field_} may contain alphabetic characters, numbers, dashes or underscores',
});
export default {
  name: "UserForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userData: { address: {} },
      userDataTemplate: {
        username: '',
        name: '',
        email: '',
        phone: '',
        address: {
          zipcode: '',
          city: '',
          street: '',
          suite: ''
        }
      }
    }
  },
  methods: {
    onClose() {
      this.$emit('close');
      this.clearUserData();
      this.$refs.observer.reset();
    },
    onSave() {
      this.$emit('save', {
        user: this.userData,
        resolve: () => {
          this.$refs.observer.reset();
          this.clearUserData();
        }
      });
    },
    submit () {
      this.$refs.observer.validate()
    },
    clearUserData() {
      this.userData = { ...this.userDataTemplate, address: { ...this.userDataTemplate.address } };
    }
  },
  computed: {
    config() {
      return [
        {
          left: { name: 'User Name*', rules: 'required|alpha_dash|max:30', data: this.userData.username, dataSet: (val) => { this.userData.username = val } },
          right: { name: 'Name', rules: 'max:30', data: this.userData.name, dataSet: (val) => { this.userData.name = val } }
        },
        {
          left: { name: 'E-mail*', rules: 'required|email', data: this.userData.email, dataSet: (val) => { this.userData.email = val } },
          right: { name: 'Phone', rules: 'max:20', data: this.userData.phone, dataSet: (val) => { this.userData.phone = val } }
        },
        {
          left: { name: 'Zipcode', rules: 'max:11', data: this.userData.address.zipcode, dataSet: (val) => { this.userData.address.zipcode = val } },
          right: { name: 'City', rules: 'max:20', data: this.userData.address.city, dataSet: (val) => { this.userData.address.city = val } }
        },
        {
          left: { name: 'Street', rules: 'max:20', data: this.userData.address.street, dataSet: (val) => { this.userData.address.street = val } },
          right: { name: 'Suite', rules: 'max:10', data: this.userData.address.suite, dataSet: (val) => { this.userData.address.suite = val } }
        }
      ]
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.userData = { ...val }
        } else {
          this.clearUserData();
        }
      },
      deep: true
    },
    isOpen(val) {
      if (val) {
        this.$refs.observer.reset();
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .user-form{
    background-color: white;
    color: $c--primary;
  }
</style>
