import { createStore } from 'vuex'
import authModule from "./auth.js"
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
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
        tempResponse: [],
        replieds: [],
    },
    getters: {
        // unreplieds
        unrepliedsid: (state) => {
            return state.unreplieds.filter(u => u.id)
        },
    },
    mutations: {
        addTempResponse(state, responseText) {
            state.tempResponse.push(responseText)
        },
        addResponse(state, responseText) {
            state.response.push(responseText)
        },
        // removeFromTemp(state, payload) {
        //     let indexToDelete = state.tempResponse.indexOf(Number(payload));
        //     state.tempResponse.splice(indexToDelete, 1)
        // },
        removeFromTemp(state, payload) {
            for (let i = 0; i < state.unreplieds.length; i++) {
                if (state.unreplieds[i] === payload) {
                    state.unreplieds.splice(i, 1)
                }
            }
        },
        CreatedProject(state, status) {
            state.diary.push(status);
        },
        editProject(state, status) {
        	for(let i = 0; i < state.diary.length; i++){
        		if(state.diary[i].id === status.id){
        			// console.log(status)
        			state.diary[i] = status
        		}
        	}
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
        // 日誌
        updateDiary({ commit }, status) {
            commit("CreatedProject", status);
        },
        editDiary({ commit }, status) {
            commit("editProject", status);
        },        
        deleteDiary({ commit }, status) {
            commit("removeProject", status);
        },
        // 系統提問
        //更新到結案區
        toggleDel({ commit }, payload) {
            commit("removeFromTemp", payload);
        },
        //查看
        toggleHasRes({ commit }, payload) {
            commit("checkHasResponse", payload);
        },
    },
    modules: {
        auth: authModule
    },
    plugins: [createPersistedState()]
})