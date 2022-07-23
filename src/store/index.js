import { createStore } from 'vuex'
export default createStore({
    state: {
        questionList: [
            {
                id: 1,
                LeavingTime: '2022-07-09',
                Name: 'Jay',
                Title: '電腦螢幕打不開',
                question:
                {
                    content: '電腦螢幕打不開，請問能幫忙維修嗎',
                    responseBox: ""
                }
            },
            {
                id: 2,
                LeavingTime: '2022-07-13',
                Name: 'Jay',
                Title: '教室冷氣故障',
                question:
                {
                    content: '教室冷氣故障，請問能幫忙維修嗎',
                    responseBox: ""
                }
            },
        ],
        response: [],


    },
    getters: {

    },
    mutations: {
        addResponse(state, responseBox) {
            state.response.push(responseBox)
        }
    },
    actions: {

    }
})