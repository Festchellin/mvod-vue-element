<template>
    <div>
        <el-form inline v-model="this.$store.getters.getUser" ref="user">
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
        <el-form ref="userInfo" :model="userInfo">
            <el-form-item
                    :prop="userInfo.avatar"
                    label="Avatar">
                <img v-if="showPic" :src="userInfo.avatar" class="mvod-avatar">
                <el-upload
                        action="/api/upload"
                        name="file"
                        list-type="picture-card"
                        :limit="1"
                        accept="image/jpeg,image/gif,image/png"
                        :before-upload="beforeAvatarUpload"
                        :on-exceed="handleExceed"
                        :on-success="handleUploadSuccess"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
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
                        readonly
                        :value="userInfo.registerDate"
                        type="datetime"
                        placeholder="Choose...">
                </el-date-picker>
            </el-form-item>
            <el-form-item
                    label="Last Modify Time">
                <el-date-picker
                        readonly
                        :value="userInfo.lastModifyTime"
                        type="datetime"
                        placeholder="Choose...">
                </el-date-picker>
            </el-form-item>
            <el-button @click="save('userInfo')" type="primary">Save</el-button>
        </el-form>
    </div>
</template>

<script>
    import commomProvider from "../providers/CommonProvider";

    export default {
        name: "MvodUserInfo",
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
        computed:{
          showPic(){
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
                        console.log("info")
                        const user = this.$store.getters.getUser;
                        this.userInfo.user = {...user}
                        const response = await commomProvider.update(this.userInfo, "/api/userInfo");
                        if (response.success){
                           await this.getUserInfo();
                           this.$message.success(response.message)
                        } else {
                            this.$message.error(response.message)
                        }
                        break;
                    }
                }
            },
            async getUserInfo(){
                const user = this.$store.getters.getUser;
                const response = await commomProvider.getById(user.id,"/api/userInfo/")
                if (response.success){
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
                this.userInfo.avatar = res[0].url;
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
