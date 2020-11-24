import types from '~/store/mutation-types';
// const apiUrl = "https://jsonplaceholder.typicode.com/users";
const apiUrl = "https://5fbc8b303f8f90001638c03f.mockapi.io/api/v2/users";

export default {
  namespaced: true,
  state() {
    return {
      users: []
    }
  },
  mutations: {
    [types.SET_USERS](state, users) {
      state.users = users; 
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const data = await this.$axios.$get(apiUrl);
        commit(types.SET_USERS, data);
      } catch (err) {
        console.error(err)
      }
    },
    async addUser({ dispatch }, user) {
      try {
        await this.$axios.$post(apiUrl, user);
        await dispatch('fetchUsers');
      } catch (err) {
        console.error(err)
      }
    },
    async editUser({ dispatch }, user) {
      try {
        await this.$axios.$put(`${apiUrl}/${user.id}`, user);
        await dispatch('fetchUsers');
      } catch (err) {
        console.error(err)
      }
    },
    async deleteUser({ dispatch }, user) {
      try {
        await this.$axios.delete(`${apiUrl}/${user.id}`);
        await dispatch('fetchUsers');
      } catch (err) {
        console.error(err)
      }
    }
  },
  getters: {
    getUsers: ({ users }) => users
  }
}
