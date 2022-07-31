import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
    state: {
        diary: [],
        unreplieds: [
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
            state.diary.splice(state.diary.indexOf(Number(status)), 1);
            // for (let i = 0; i < state.diary.length; i++) {
            //     if (state.diary.id[i] === status) {
            //         state.diary.splice(i, 1);
            //     }
            // }
            // const i = state.diary.findIndex((x) => x.id == id);
            // if (i !== -1) {
            //     state.diary.splice(i, 1)
            // }
            // state.diary.filter((diary) => diary.id !== status);
        },
    },
    actions: {
        updateDiary({ commit }, status) {
            commit("CreatedProject", status);
        },
        deleteDiary({ commit }, status) {
            commit("removeProject", status);
        },
    },
});