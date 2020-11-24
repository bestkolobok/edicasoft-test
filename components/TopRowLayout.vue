<template>
  <v-row class="top-row-layout">
    <v-col class="top-row-layout__text-col">
      <v-text-field
        label="Search user"
        outlined
        color="white"
        :loading="pending && 'warning'"
        v-model="searchData"
      />
    </v-col>
    <v-col>
      <v-btn
        class="top-row-layout__add-btn"
        depressed
        @click="onBtnClick"
      >
        add user
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TopRowLayout",
  props: {
    value: {
      type: String,
      default: ''
    },
    pending: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onBtnClick() {
      this.$emit('open-dialog');
    },
  },
  computed: {
    searchData: {
      get() {
        return this.value
      },
      set(val) {
        console.log(val)
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .top-row-layout{
    &__text-col{
      flex-grow: 10;
    }
    &__add-btn{
      height: 54px!important;
      width: 140px;
      color: $c--primary;
      background-color: white!important;
    }
  }
</style>
