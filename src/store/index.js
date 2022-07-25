import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
    state: {
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
        // GET_REPLIEDS(state, replied) {
        //     state.replied = replied
        // }
    },
    actions: {
        test() {
            console.log(getters.unrepliedId)
        }
        // loadEndMessage() {
        //     axios
        //         .get('http://54.186.56.114:8081/Endmessage')
        //         .then(data => {
        //             console.log(data.data)
        //             let replied = data.data
        //             commit('GET_REPLIEDS', replied)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        // }
    }
})