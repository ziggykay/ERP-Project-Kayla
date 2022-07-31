import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
    state: {
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
        addTempResponse(state, temp) {
            state.tempResponse.push(temp)
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
        }
    },
    actions: {
        //更新到結案區
        toggleDel({ commit }, payload) {
            commit("removeFromTemp", payload);
        },
        toggleHasRes({ commit }, payload) {
            commit("checkHasResponse", payload);
        },
    }
})






