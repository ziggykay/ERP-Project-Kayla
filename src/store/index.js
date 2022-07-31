import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        // 登入
        token: '',
        userInfo: [],
        isLogin: '',

        // 日誌
        diary: [],

        // 系統回覆
        unreplieds: [
            {
                id: 1,
                LeavingTime: '2022-06-06',
                Name: 'Jay',
                Title: '電腦螢幕打不開',
                content: '電腦螢幕打不開，請問能幫忙維修嗎',
                responseBox: "",
                status: 0

            },
            {
                id: 2,
                LeavingTime: '2022-06-09',
                Name: 'Jay',
                Title: '教室冷氣故障',
                content: '教室冷氣故障，請問能幫忙維修嗎',
                responseBox: "",
                status: 0

            },
            {
                id: 3,
                LeavingTime: '2022-06-15',
                Name: 'Jay',
                Title: '投影幕故障',
                content: '投影幕故障，請問能幫忙維修嗎',
                responseBox: "",
                status: 0

            },
        ],
    },
    getters: {
        // unreplieds
        unrepliedsid: (state) => {
            return state.unreplieds.filter(u => u.id)
        },
    },
    mutations: {
        clearData(state) {
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
            for (let i = 0; i < state.unreplieds.length; i++) {
                if (state.unreplieds[i] === payload) {
                    state.unreplieds.splice(i, 1)
                }
            }
        },
        checkHasResponse(state, payload) {
            for (let i = 0; i < state.unreplieds.length; i++) {
                if (state.unreplieds[i].id == payload.id) {
                    state.unreplieds[i].responseBox = payload.responseBox
                    state.unreplieds[i].status = 1
                }
            }
        },
        CreatedProject(state, status) {
            state.diary.push(status);
        },
        storeToken(state, token) {
            state.token = token
        },
        storeUserInfo(state, info) {
            state.userInfo.push(info)
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
        // 登入資訊
        storeUserInfo(context, status) {
            context.commit("storeUserInfo", status);
        },
        storeToken(context, status) {
            context.commit("storeToken", status);
        },
        // 登出清空資料
        clearData(context) {
            context.commit("clearData")
        },

        // 日誌
        updateDiary({ commit }, status) {
            commit("CreatedProject", status);
        },
        deleteDiary({ commit }, status) {
            commit("removeProject", status);
        },


        // 系統提問
        toggleRes({ commit }, payload) {
            commit("updateRes", payload);
        },
        toggleDel({ commit }, payload) {
            commit("removeFromTemp", payload);
        },
        toggleTest({ commit }, payload) {
            commit("test", payload);
        },
    },
    plugins: [createPersistedState()]
})
