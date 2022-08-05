export default{
  namespaced: true,
  state: {
   token: '',
   userInfo:[],
  },
  getters: {
    getToken: (state) => {
      return state.token
    },
    getUserInfo: (state) => {
      return state.userInfo[0]
    },
    getUserAccess: (state) => {
      return state.userInfo[0].Access
    }
  },
  mutations: {
    clearData (state){
      state.token = ''
      state.userInfo = []
    },
    storeToken(state, token){
      state.token = token
    },
    storeUserInfo(state, info){
      state.userInfo = info
    }
  },
  actions: {
    // 登入資訊
    storeUserInfo(context, status){
      context.commit("storeUserInfo", status);
    },
    storeToken(context, status){
      context.commit("storeToken", status);
    },
    // 登出清空資料
    clearData(context){
      context.commit("clearData")            
    },
    noToken (){
      
    }
  }
}
