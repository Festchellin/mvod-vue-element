<template>
    <div>
        <mvod-file-upload
                @onUploadSuccess="onSuccess"
                :url="'/api/upload/video'"
                :accept="'video/*'"/>
    </div>
</template>
<script>
    import MvodFileUpload from "../components/MvodFileUpload";
    export default {
        components: {MvodFileUpload},
        methods:{
            onSuccess(value){
                // window.location.href = value;
                console.log(value)
            }
        }
    }
</script>
