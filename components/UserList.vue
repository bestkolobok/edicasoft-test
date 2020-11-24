<template>
  <v-row class="user-list">
    <v-col class="user-list__col">
      <div class="user-list__virtual-scroll-wrapper">
        <v-virtual-scroll
          class="user-list__virtual-scroll"
          :bench="benched"
          :items="itemsList"
          item-height="100"
        >
          <template v-slot:default="{ item, index }">
            <v-list-item :key="index" class="user-list__item">
              <v-list-item-content>
                <v-list-item-title>
                  USER NAME:
                  {{ item.username }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  FULL NAME:
                  {{ item.name }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  E-mail:
                  <a class="user-list__item-email" :href="'mailto:' + item.email">{{ item.email }}</a>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  Adress:
                  {{ item.address.zipcode }}, {{ item.address.city }},
                  street: {{ item.address.street }},
                  {{ item.address.suite }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row>
                  <v-btn
                    class="user-list__item-icon"
                    icon
                    @click="onEdit(item)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    class="user-list__item-icon"
                    icon
                    @click="onDelete(item)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "UserList",
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      benched: 5
    }
  },
  methods: {
    onEdit(id) {
      this.$emit('edit', id);
    },
    onDelete(id) {
      this.$emit('delete', id);
    }
  },
  computed: {
    itemsList() {
      return [...this.items].reverse()
    }
  }
}
</script>

<style scoped lang="scss">
  .user-list{
    &__virtual-scroll-wrapper{
      border-top: 1px solid white;
      border-bottom: 1px solid white;
      overflow: hidden;
    }
    &__virtual-scroll{
      margin: -1px 0;
      height: calc(100vh - 290px);
    }
    &__item{
      background-color: $c--primary;
      border: 1px solid white!important;
    }
    &__item-email{
      color: $c--active-link;
    }
    &__item-icon{
      margin-left: 6px;
      color: white!important;
    }
  }
  @media all and (max-width: 600px) {
    .user-list{
      &__virtual-scroll{
        height: calc(100vh - 242px);
      }
    }
  }
</style>
