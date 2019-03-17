<template>
    <div>
        <div v-if="files.length > 0">
            <div v-for="file in files" v-bind:key="file.name"
                 class="mvod-margin-top-1">
                <el-card>
                    <el-row>
                        <el-row align="middle">
                            <el-col>
                                {{file.name}}
                                <el-progress :percentage="percentage"></el-progress>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-card>
            </div>
        </div>
        <div class="mvod-margin-top-1">
            <el-card>
                <el-row>
                    <el-row align="middle">
                        <form enctype="multipart/form-data" ref="form" id="form">
                            <el-col :span="12">
                                <el-button type="primary" @click="chooseFile">Choose...</el-button>
                                <input
                                        class="mvod-hidden"
                                        type="file"
                                        ref="file"
                                        @change="fileChange($event.target.files)"
                                        :accept="accept || '*'"
                                />
                            </el-col>
                            <el-col :span="7" :offset="5">
                                <el-button @click="uploadFile" type="submit">Upload</el-button>
                            </el-col>
                        </form>
                    </el-row>
                </el-row>
            </el-card>
        </div>
    </div>
</template>

<script>
    import commonProvider from '../providers/CommonProvider'
    import md5 from 'blueimp-md5'

    export default {
        name: "MvodFileUpload",
        props: ['accept', 'multiple', 'url'],
        data() {
            return {
                current:0,
                percentage: 0,
                files: [],
                file: null,
                result: ""
            }
        },
        methods: {
            fileChange(files) {
                this.files = [];
                this.percentage = 0;
                for (let i = 0; i < files.length; i++) {
                    this.files.push(files[i])
                }
            },
            async uploadFile() {
                const files = this.$refs.file.files;
                for (let i = 0; i < files.length; i++) {
                    // 每个文件切片大小定为1M(1024*1024字节)(需要跟服务器协商好).
                    const BYTES_PER_SLICE = 1 << 20;
                    //文件大小
                    const total = files[i].size;
                    // 已发送的数量
                    let hasSendNum = 0;
                    // 总切片数
                    let totalSlices;
                    let index = 0;
                    let start, end;
                    const fileName = files[i].name;
                    totalSlices = Math.ceil(total / BYTES_PER_SLICE);
                    while (index <= Math.max(1,totalSlices - 1)) {
                        start = index * BYTES_PER_SLICE;
                        end = Math.min(total, start + BYTES_PER_SLICE);
                        const slice = files[i].slice(start, end);
                        const formData = new FormData();
                        formData.append("file", slice);
                        formData.append("filename", fileName);
                        formData.append("md5", md5(fileName));
                        formData.append("currentSlice", index);
                        formData.append("totalSlices", totalSlices - 1);
                        this.percentage = Number.parseFloat((index / (totalSlices - 1) * 100).toFixed(2));
                        const responses = await commonProvider.save(formData, this.url);
                        if (responses.success) {
                            index++;
                            if (responses.data.url !== undefined || null) {
                                console.log(responses)
                                this.result = responses;
                                this.$emit('onUploadSuccess', this.result);
                            }
                        }
                    }
                }
            },
            chooseFile() {
                this.$refs.file.click();
            }
        }
    }
</script>

<style scoped>

</style>
