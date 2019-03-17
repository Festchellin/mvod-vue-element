import commonProvider from './CommonProvider'

export default {
    async getTables() {
        const response = await commonProvider.getList("/table");
        if (response.success) {
            return response.data.tables;
        } else {
            return {};
        }
    }
}
