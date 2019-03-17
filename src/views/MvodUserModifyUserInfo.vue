<template>
    <div>
        <el-form inline ref="user" v-model="this.$store.getters.getUser">
            <el-form-item
                    label="Name">
                <el-input v-model="this.$store.getters.getUser.name"/>
            </el-form-item>
            <el-form-item
                    label="account">
                <el-input v-model="this.$store.getters.getUser.account"/>
            </el-form-item>
            <el-button @click="save('user')">Save</el-button>
        </el-form>
        <el-form :model="userInfo" ref="userInfo">
            <el-form-item
                    :prop="userInfo.avatar"
                    label="Avatar">
                <img :src="userInfo.avatar" class="mvod-avatar" v-if="showPic">
                <mvod-file-upload
                        @onUploadSuccess="handleUploadSuccess"
                        accept="image/jpeg,image/gif,image/png"
                        url="/upload/image"
                ></mvod-file-upload>
            </el-form-item>
            <el-form-item
                    :prop="userInfo.email"
                    label="email">
                <el-input v-model="userInfo.email"/>
            </el-form-item>
            <el-form-item
                    :prop="userInfo.phoneNumber"
                    label="Phone">
                <el-input v-model="userInfo.phoneNumber"/>
            </el-form-item>
            <el-form-item
                    label="Register Date">
                <el-date-picker
                        :value="userInfo.registerDate"
                        placeholder="Choose..."
                        readonly
                        type="datetime">
                </el-date-picker>
            </el-form-item>
            <el-form-item
                    label="Last Modify Time">
                <el-date-picker
                        :value="userInfo.lastModifyTime"
                        placeholder="Choose..."
                        readonly
                        type="datetime">
                </el-date-picker>
            </el-form-item>
            <el-button @click="save('userInfo')" type="primary">Save</el-button>
        </el-form>
    </div>
</template>

<script>
    import commomProvider from "../providers/CommonProvider";
    import MvodFileUpload from "../components/MvodFileUpload";

    export default {
        name: "MvodUserInfo",
        components: {MvodFileUpload},
        data() {
            return {
                userInfo: {
                    id: '',
                    user: null,
                    avatar: "",
                    registerDate: '',
                    lastModifyTime: '',
                    email: "",
                    phoneNumber: ""
                },
            }
        },
        computed: {
            showPic() {
                return !!this.userInfo.avatar;
            }
        },
        methods: {
            handleRemove() {
                this.userInfo.avatar = "";
                this.hidden = true;
            },
            async save(formName) {
                switch (formName) {
                    case 'user': {
                        console.log("user");
                        break;
                    }
                    case 'userInfo': {
                        console.log("info");
                        const user = this.$store.getters.getUser;
                        this.userInfo.user = {...user};
                        const response = await commomProvider.update(this.userInfo, "/userInfo");
                        if (response.success) {
                            await this.getUserInfo();
                            this.$message.success(response.message)
                        } else {
                            this.$message.error(response.message)
                        }
                        break;
                    }
                }
            },
            async getUserInfo() {
                const user = this.$store.getters.getUser;
                const response = await commomProvider.getById(user.id, "/userInfo/");
                if (response.success) {
                    this.userInfo = response.data.info;
                }
            }
            ,
            beforeAvatarUpload(file) {
                const isJPG = file.type.indexOf('image') > -1;
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('only accept image files!');
                }
                if (!isLt2M) {
                    this.$message.error('picture size should less than 2MB');
                }
                return isJPG && isLt2M;
            },
            handleUploadSuccess(res) {
                console.log(res)
                this.userInfo.avatar = res.data.url;
            },
            handleExceed() {
                this.$message.error("only accept one picture please remove and continue")
            }
        },
        async mounted() {
            await this.getUserInfo();
        }
    }
</script>

<style scoped>

</style>
