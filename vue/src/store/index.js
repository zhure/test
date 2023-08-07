import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      username: window.sessionStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.sessionStorage.getItem('user' || '[]')).username
    },
    admin: {
      accountNum: window.sessionStorage.getItem('admin' || '[]') == null ? '' : JSON.parse(window.sessionStorage.getItem('admin' || '[]')).accountNum
    }
  },
  getters: {
    getUsername:(state) => state.user.username,
    getAccountNum:(state) => state.admin.accountNum,
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.sessionStorage.setItem('user', JSON.stringify(user))
    },
    adminLogin (state, admin) {
      state.admin = admin
      window.sessionStorage.setItem('admin', JSON.stringify(admin))
    }

  },
  actions: {
  },
  modules: {
  }
})
