import httpService from './HttpProvider'

export default {
    async getById(id, baseUrl) {
        return await httpService.fetch(`${baseUrl}${id}`);
    },
    async update(instance, baseUrl) {
        return await httpService.put(`${baseUrl}`, instance);
    },
    async deleteById(id, baseUrl) {
        return await httpService.delete(`${baseUrl}${id}`);
    },
    async save(instance, baseUrl) {
        return await httpService.post(`${baseUrl}`, instance);
    },
    async getListByCondition(condition = {}, page = 0, pageSize = 5, baseUrl) {
        return await httpService.fetch(`${baseUrl}`, {...condition, page, pageSize});
    },
    async getList(baseUrl) {
        return await httpService.fetch(`${baseUrl}`);
    }
}
