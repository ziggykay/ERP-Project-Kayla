import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        diary: [],
        token:'',
        userInfo:[],
		isLogin: '',
        unreplied: [
            {
                id: 1,
                LeavingTime: '',
                Name: 'Jay',
                Title: '電腦螢幕打不開',
                question:
                {
                    content: '電腦螢幕打不開，請問能幫忙維修嗎',
                    responseBox: ""
                },
            },
            {
                id: 2,
                LeavingTime: '',
                Name: 'Jay',
                Title: '教室冷氣故障',
                question:
                {
                    content: '教室冷氣故障，請問能幫忙維修嗎',
                    responseBox: ""
                },
            },
        ],
        replieds: [
            {
                id: 3,
                LeavingTime: '',
                Name: 'May',
                Title: '電腦螢幕有殘影',
                question:
                {
                    content: '電腦螢幕有殘影，請問能幫忙維修嗎',
                    responseBox: "我們會盡快找人去修理，請您耐心等候。"
                },
            },
            {
                id: 4,
                LeavingTime: '',
                Name: 'Penny',
                Title: '教室冷氣故障',
                question:
                {
                    content: '教室冷氣故障，請問能幫忙維修嗎',
                    responseBox: "我們收到您的問題了，這周我們會找人去修理。"
                },
            },
        ],
        tempResponse: [],
        tempResponseItem: [],
        response: []
    },
    getters: {
        unrepliedsDate: state => {
            return state.unreplieds.filter(u => u.LeavingTime)
        },
        unrepliedsDateCount: (state, getters) => {
            return getters.unrepliedsDate.length
        },
        repliedsDate: state => {
            return state.replieds.filter(r => r.LeavingTime)
        },
        tempResponseItem: (state) => {
            return state.tempResponse.map(
                itemId => state.unreplieds.find(
                    unreplied => unreplied.id === itemId
                )
            )
        }
    },
    mutations: {
        clearData(state){
            state.token = ''
            state.userInfo = []
        },
        addTempResponse(state, responseText) {
            state.tempResponse.push(responseText)
        },
        addResponse(state, responseText) {
            state.response.push(responseText)
        },
        removeFromTemp(state, payload) {
            let indexToDelete = state.tempResponse.indexOf(Number(payload));
            state.tempResponse.splice(indexToDelete, 1)
        },
        CreatedProject(state, status) {
            state.diary.push(status);
        },
        removeProject(state, status) {
            for (let i = 0; i < state.diary.length; i++) {
                if (state.diary[i].id === status.id) {
                    state.diary.splice(i, 1);
                }
            }
        },
    },
    actions: {
        updateDiary({ commit }, status) {
            commit("CreatedProject", status);
        },
        deleteDiary({ commit }, status) {
            commit("removeProject", status);
        },
        storeToken(state, token){
            state.token = token
        },
        storeUserInfo(state, info){
			state.userInfo.push(info)
            console.log('store info success')
        },
        updateDiary(context, status) {
            context.commit("CreatedProject", status);
        },
        storeToken(context, status){
            context.commit("storeToken", status);
        },
        storeUserInfo(context, status){
			context.commit("storeUserInfo", status);
            console.log('ready to store info')
        },
        clearData(context){
            context.commit("clearData")            
        },
    },
    plugins: [createPersistedState()]
})
