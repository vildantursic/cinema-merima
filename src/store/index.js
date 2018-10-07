import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import createPersistedState from "vuex-persistedstate";

export const store = new Vuex.Store({
    state: {
        user: {},
        movies: [],
        movie: {},
        bill: []
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setMovies(state, payload) {
            state.movies = payload.map(movie => {
                return movie
            })
        },
        setMovie(state, payload) {
            state.movie = payload
        },
        setBill(state, payload) {
            state.bill = payload
        },
        clearUser(state) {
            state.user = {},
            state.movie = {},
            state.movies = []
        }
    },
    getters: {
        token: state => state.user.token
    },
    plugins: [createPersistedState({ storage: window.sessionStorage })]
})