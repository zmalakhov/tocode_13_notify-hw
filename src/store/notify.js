import loadMore from '../assets/js/loadMore'

export default {
    state: {
        messages: [],
        messagesMain: [],
    },
    mutations: {
        setMessage(state, payload) {
            state.messages = payload
        },
        setMessageMain(state, payload) {
            state.messagesMain = payload
        },
        loadMessages(state, payload){
            state.messagesMain = [...state.messagesMain, ...payload]
        }
    },
    actions: {
        setMessage({commit}, payload) {
            commit('setMessage', payload)
        },
        setMessageMain({commit}, payload) {
            commit('setMessageMain', payload)
        },
        loadMessages({commit, getters}) {
            let res = getters.getMessagesFilter
            commit('loadMessages', loadMore(res))
        }
    },
    getters: {
        getMessages(state) {
            return state.messages
        },
        getMessagesFilter(state) {
            return state.messages.filter(mes => {
                return mes.main === false
            })
        },
        getMessagesMain(state) {
            return state.messagesMain
        }
    },
}