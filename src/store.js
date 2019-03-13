import Vue from 'vue'
import Vuex from 'vuex'
import httpService from "./providers/CommonProvider";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userToken: null,
        user: null,
        categoryMenu: null,
        adminMenu: null,
        userMenu: null,
        menu: null
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
        },
        getCategoryMenu(state) {
            return state.categoryMenu;
        },
        getAdminMenu(state) {
            return state.adminMenu;
        },
        getUserMenu(state) {
            return state.userMenu;
        },
        getAllMenu(state) {
            return state.menu;
        }
    }
    ,
    mutations: {
        setUserToken(state, userToken) {
            state.userToken = userToken;
        },
        clearSignInInformation(state) {
            state.userToken = null;
            state.user = null;
        },
        setUser(state, user) {
            state.user = user;
        },
        setCategoryMenu(state, menu) {
            state.categoryMenu = menu;
        },
        setAdminMenu(state, menu) {
            state.adminMenu = menu;
        },
        setUserMenu(state, menu) {
            state.userMenu = menu;
        },
        setMenu(state, menu) {
            state.menu = menu;
        }
    },
    actions: {
        setUserTokenAsync(context, userToken) {
            context.commit('setUserToken', userToken)
        },
        async setCategoryMenuAsync(context) {
            if (!context.state.categoryMenu) {
                const response = await httpService.getListByCondition({}, 0, 100, "/api/category");
                if (response.success) {
                    const categoryMenu = {id: 1, title: "By Category", items: response.data.categories};
                    context.commit('setCategoryMenu', categoryMenu);
                }
            }
        },
        setAdminMenu(context, adminMenu) {
            context.commit('setAdminMenu', adminMenu)
        },
        async setAdminMenuAsync(context) {
            const response = await httpService.getList("/api/table?type=2");
            if (response.success) {
                const menu = response.data.tables;
                context.commit('setAdminMenu', menu);
            }
        },
        setUserMenu(context, menu) {
            context.commit('setUserMenu', menu)
        },
        async setUserMenuAsync(context) {
            const response = await httpService.getList("/api/table?type=1");
            if (response.success) {
                const menu = response.data.tables;
                context.commit('setUserMenu', menu);
            }
        },
        setMenu(context, menu) {
            context.commit('setUserMenu', menu)
        },
        async setMenuAsync(context) {
            const response = await httpService.getList("/api/table?type=3");
            if (response.success) {
                const menu = response.data.tables;
                context.commit('setMenu', menu);
            }
        }
    }
})
