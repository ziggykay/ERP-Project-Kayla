import { createStore } from 'vuex'

export default createStore({
  state: {
    // data
    diary: JSON.parse(localStorage.getItem("diary" || "[]")), // 保存填寫好的日誌
  },
  getters: {
  },
  mutations: {
    //
  },
  actions: {
    //處理非同步的地方
  },
  modules: {

  }
})
