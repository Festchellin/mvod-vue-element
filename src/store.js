import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userToken: null,
        user: null
    },
    getters: {
        isSignIn(state) {
            return state.userToken != null && state.user != null;
        },
        getUserToken(state) {
            return state.userToken;
        },
        getUser(state) {
            return state.user;
        }
    },
    mutations: {
        setUserToken(state, userToken) {
            state.userToken = userToken;
        },
        clearSignInInformation(state) {
            state.userToken = null;
            state.user = null;
        },
        setUser(state, user){
            state.user = user;
        }
    },
    actions: {
        setUserTokenAsync(context, userToken) {
            context.commit('setUserToken', userToken)
        }
    }
})
