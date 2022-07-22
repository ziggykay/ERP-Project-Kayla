import { createStore } from 'vuex'
export default createStore({
    state: {
        questionList: [
            {
                id: 1,
                LeavingTime: '2022-07-09',
                Name: 'Jay',
                Title: '電腦螢幕打不開',
                status: 'notResponsed',
                question:
                {
                    content: '教室冷氣故障，請問能幫忙維修嗎',

                }
            },
            {
                id: 2,
                LeavingTime: '2022-07-13',
                Name: 'Jay',
                Title: '教室冷氣故障',
                status: 'notResponsed',
                question:
                {
                    content: '教室冷氣故障，請問能幫忙維修嗎',
                }
            },
        ],
        isResponse: []

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
})