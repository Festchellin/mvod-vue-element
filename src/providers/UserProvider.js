import httpService from './HttpProvider'

const BASEURL = '/user/';
export default {
    async getUserById(id) {
        return await httpService.fetch(`${BASEURL}${id}`);
    },
    async updateUser(user) {
        return await httpService.put(`${BASEURL}`, user);
    },
    async deleteUserById(id) {
        return await httpService.delete(`${BASEURL}${id}`);
    },
    async saveUser(user) {
        return await httpService.post(`${BASEURL}signUp`, user);
    },
    async getUserListByCondition(condition = {}, page = 0, pageSize = 5) {
        return await httpService.fetch(`${BASEURL}`, {...condition, page, pageSize});
    },
    async signIn(user) {
        return await httpService.post(`${BASEURL}signIn`, user);
    },
    async signInWithToken(userToken) {
        return await httpService.post(`${BASEURL}signInWithToken`, userToken);
    },
    async signUp(user) {
        return await httpService.post(` ${BASEURL}signUp`, user);
    }
    ,
    async userExist(account) {
        try {
            let response = await httpService.fetch(`${BASEURL}exist`, {account});
            if (response.success) {
                return response.data.exist;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e.message);
        }
    }
}
