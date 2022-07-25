import { createStore } from 'vuex'
export default createStore({
    state: {
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
                LeavingTime: '2022-07-09',
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
                LeavingTime: '2022-07-13',
                Name: 'Jay',
                Title: '教室冷氣故障',
                question:
                {
                    content: '教室冷氣故障，請問能幫忙維修嗎',
                    responseBox: ""
                },
            },
        ],
        replied: [
            {
                id: 3,
                LeavingTime: '2022-06-02',
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
                LeavingTime: '2022-06-13',
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
        response: []



    },
    getters: {
        unreplied: (state) => (id) => {
            return state.unreplied.filter(u => u.id === Number(id))[0]
        },
        tempResponse: (state) => {
            return state.tempResponse.map(
                itemId => state.unreplied.find(
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
            let indexToDelete = state.unreplied.indexOf(Number(payload));
            state.unreplied.splice(indexToDelete, 1)
        },
        CreatedProject(state, status) {
            state.diary.Project = status;
        }
    },
    actions: {
        updateDiary(context, status) {
            context.commit("CreatedProject", status);
        }
    },
})