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
                responseBox: ""

            },
            {
                id: 2,
                LeavingTime: '2022-06-09',
                Name: 'Jay',
                Title: '教室冷氣故障',
                content: '教室冷氣故障，請問能幫忙維修嗎',
                responseBox: ""

            },
            {
                id: 3,
                LeavingTime: '2022-06-15',
                Name: 'Jay',
                Title: '投影幕故障',
                content: '投影幕故障，請問能幫忙維修嗎',
                responseBox: ""

            },
        ],
        tempResponse: [],
        replieds: [],
        tempResponseItem: [],



    },
    getters: {
        // unreplieds
        unrepliedsid: (state) => {
            return state.unreplieds.filter(u => u.id)
        },
        unrepliedsidLen: (state, getters) => {
            return getters.unrepliedsDate.length
        },
        unrepliedsDate: state => {
            return state.unreplieds.filter(u => u.LeavingTime)
        },
        unrepliedsDateCount: (state, getters) => {
            return getters.unrepliedsDate.length
        },
        //暫存區
        tempResponse: state => {
            return state.tempResponse
        },
        unrepliedsres: state => {
            return state.unreplieds.filter(u => u.responseBox)
        },
        //replieds
        replieds: state => {
            return state.replieds
        },
        repliedsDate: state => {
            return state.replieds.filter(r => r.LeavingTime)
        },
        tempItem: (state) => {
            return state.unreplieds.map(u => u.id)
        }
    },
    mutations: {
        //抓取unreplieds裡的值
        updateRes(state, endAns) {
            // let target = state.unreplieds.filter(u => u.id)
            // console.log(target)
            // state.replieds.push(data)
            state.replieds.push(endAns)
        },
        addTempResponse(state, temp) {
            state.tempResponse.push(temp)
        },
        removeFromTemp(state) {
            // for (let i = 0; i < unrepliedsid.length; i++) {
            //     if (this.unreplieds[i] === data) {
            //         this.unreplieds.splice(i, 1)
            //     }
            // }
            // state.unreplieds.forEach(function (data, i) {
            //     data == state.activeData && state.unreplieds.splice(i, 1)
            // })
            // let indexToDelete = state.unreplieds.indexOf(state.unreplieds);
            // state.unreplieds.splice(indexToDelete, 1)
            // state.payload = state.unreplieds[0] || {}
            // for (let i in state.unreplieds) {
            //     if (state.unreplieds[i] === state.activeUnreplied) {
            //         state.unreplieds.splice(i, 1)
            //     }
            // }
        },
    },
    actions: {
        //更新到結案區
        toggleRes({ commit }, payload) {
            commit("updateRes", payload);
        },
        //加到暫存
        toggleTempRes({ commit }, payload) {
            commit("addTempResponse", payload);
        },
        // toggleremove({ commit }, payload) {
        //     commit('removeFromTemp', payload)
        // },
        toggleDel({ commit }, payload) {
            commit("removeFromTemp", payload);
        },
    }
})






