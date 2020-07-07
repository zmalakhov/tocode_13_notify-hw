import loadMore from '../assets/js/loadMore'
import axios from "axios";

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
        },
        loadDataLazy({commit, dispatch}){
            commit('setLoading', true)
            setTimeout(() =>{
                dispatch('loadData')
            }, 500)
        },
        async loadData({commit}){
            axios
                .get('https://tocode.ru/static/c/vue-pro/notifyApi.php')
                .then(response => {
                    let res = response.data.notify,
                        messages = [],
                        messagesMain = []

                    // filter
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].main) messagesMain.push(res[i])
                        else messages.push(res[i])
                    }

                    commit('setMessage', messages)
                    commit('setMessageMain', messagesMain)
                    // console.log(res);
                })
                .catch(error => {
                    // console.log(error);
                    commit('setError', 'Error: network error')
                })
                .finally(() => {
                    commit('setLoading', false)
                })
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
