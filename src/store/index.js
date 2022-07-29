import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        token:'',
        userInfo:'',
        diary: [
            {
                // workinghour: "5",
                Project: "",
                // Imgurl: "888",
                // Content: "9999"
            },
        ],
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
        unrepliedsDateCount: (state, getters) => {
            return getters.repliedsDate.length
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
            state.diary.Project = status;
        },
        storeToken(state, token){
            state.token = token
        },
        storeUserInfo(state, info){
            state.userInfo = info
        }
    },
    actions: {
        updateDiary(context, status) {
            context.commit("CreatedProject", status);
        },
        storeToken(context, status){
            context.commit("storeToken", status);
        },
        storeUserInfo(context, status){
            context.commit("storeUserInfo", status)
        }
    },
    plugins: [createPersistedState()]
})