<template>
    <div>
        <el-form class="mvod-align-center" v-if="showAddForm">
            <el-form-item label="Name">
                <el-input v-model="video.name"/>
            </el-form-item>
            <el-form-item label="Preview">
                <p v-if="video.show">Video has upload，please wait for transfer</p>
                <!--<video
                        :poster="video.poster"
                        :src="video.url"
                        :width="'100%'"
                        autoplay
                        controls
                        loop
                        muted
                        v-if="video.show"
                >
                    Your Browser do not support video tag
                </video>-->
                <input hidden v-model="video.url"/>
            </el-form-item>
            <el-form-item>
                <mvod-file-upload
                        url="/upload/video"
                        accept="video/*"
                        @onUploadSuccess="handleUploadSuccess"
                />
            </el-form-item>
            <el-form-item label="Description">
                <el-input type="textarea" v-model="video.description"/>
            </el-form-item>
            <el-form-item>
                <el-button @click="saveVideo" type="primary">Save</el-button>
                <el-button @click="hiddenForm">Return</el-button>
            </el-form-item>
        </el-form>

        <div v-else>
            <el-table
                    :data="data"
                    border
                    stripe
            >
                <el-table-column
                        type="expand">
                    <template slot-scope="props">
                        <el-form class="mvod-align-center">
                            <el-form-item label="Name">
                                <el-input v-model="props.row.name"/>
                            </el-form-item>
                            <el-form-item
                                    label="Preview"
                            >
                                <video
                                        :poster="props.row.poster"
                                        :src="props.row.url"
                                        controls
                                        muted
                                        width="100%">
                                    Your browser do not support video tag
                                </video>
                            </el-form-item>
                            <el-form-item label="Description">
                                <el-input type="textarea" v-model="props.row.description"/>
                            </el-form-item>
                            <el-form-item label="Release Time">
                                <el-date-picker type="datetime" v-model="props.row.releaseTime">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="save(props.row)" type="primary">Save</el-button>
                                <el-button @click="deleteRow(props.row)" type="danger">Delete</el-button>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Name"
                        prop="name"
                />
                <el-table-column
                        label="Description"
                        prop="description"
                />
                <el-table-column
                        :formatter="formatterDate"
                        label="Release Time"
                        prop="releaseTime"
                />
                <el-table-column
                        :formatter="formatterUser"
                        label="Author"
                        prop="user"
                />
                <el-table-column>
                    <template slot="header" slot-scope="scope">
                        <el-button @click="showForm()" type="primary">Add</el-button>
                    </template>
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    :current-page.sync="currentPage"
                    :page-size.sync="pageSize"
                    :total="this.videoList.length"
                    @current-change="currentChange"
                    @next-click="next"
                    @prev-click="prev"
                    class="mvod-align-center"
                    layout="prev, pager, next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import commomProvider from "../providers/CommonProvider";
    import MvodFileUpload from "../components/MvodFileUpload";

    export default {
        name: "MvodUserModifyVideo",
        components: {MvodFileUpload},
        data() {
            return {
                videoList: [],
                currentPage: 1,
                pageSize: 5,
                data: [],
                video: {
                    show: false,
                    author: null,
                    url: "",
                    poster: "",
                    description: ""
                },
                showAddForm: false
            }
        },
        computed: {
            total() {
                return this.videoList.length
            }
        },
        methods: {
            async saveVideo() {
                const video = {...this.video}
                video.author = this.$store.getters.getUser;
                const response = await commomProvider.save(video, "/video/");
                this.$message({
                    message: response.message,
                    type: response.success ? "success" : "error"
                })
                await this.getData();
                this.data = this.videoList.slice(0, this.pageSize);
                this.video = {
                    show: false,
                    author: null,
                    url: "",
                    poster: "",
                    description: ""
                }
            },
            async save(video) {
                const response = await commomProvider.update(video, '/video');
                if (response.success) {
                    await this.getData();
                    this.data = this.videoList.slice(0, this.pageSize);
                }
            },
            async deleteRow(video) {
                const response = await commomProvider.deleteById(video.id, '/video/');
                if (response.success) {
                    await this.getData();
                    this.data = this.videoList.slice(0, this.pageSize);
                }
            },
            hiddenForm() {
                this.showAddForm = false;
            },
            showForm() {
                this.showAddForm = true;
            },
            handleUploadSuccess(res) {
                console.log(res)
                if (res.success) {
                    this.video.url = res.data.url;
                    this.video.show = true;
                }
            },
            handleRemove(file) {
                console.log(this.video)
                console.log(file)
                this.video.url = "";
            },
            beforeVideoUpload(file) {
                const isVideo = file.type.indexOf("video/") > -1;
                return isVideo;
            },
            handleExceed() {
                this.$message.error("only can upload one video please remove and continue")
            },
            prev() {
                let videoList = this.videoList.slice(0);
                this.currentPage = this.currentPage - 1 >= 0 ? this.currentPage - 1 : 0;
                const begin = (this.currentPage - 1) * this.pageSize;
                const end = this.currentPage * this.pageSize;
                this.data = videoList.slice(begin, end)

            },
            next() {
                let videoList = this.videoList.slice(0);
                this.currentPage = this.currentPage + 1 <= this.total ? this.currentPage + 1 : this.total;
                const begin = (this.currentPage - 1) * this.pageSize;
                const end = this.currentPage * this.pageSize;

                this.data = videoList.slice(begin, end)
            },
            currentChange(current) {
                let videoList = this.videoList.slice(0);
                const begin = (current - 1) * this.pageSize;
                const end = current * this.pageSize;
                this.data = videoList.slice(begin, end)
            },
            formatterDate(row) {
                return Date(row.releaseTime)
            },
            formatterUser(row) {
                return row.author.name || row.author.account
            },
            async getData() {
                const response = await commomProvider.getById(this.$store.getters.getUser.id, "/video/user/");
                if (response.success) {
                    this.videoList = response.data.list
                }
            }
        },
        async mounted() {
            await this.getData();
            this.data = this.videoList.slice(0, this.pageSize);
        }
    }
</script>

<style scoped>

</style>
