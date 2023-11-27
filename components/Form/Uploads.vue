<template>
    <PartialsUploads :url="url"></PartialsUploads>
</template>
<script>
import Uploads from '~/components/partials/Uploads.vue';

export default {
    components:{
        Uploads
    },
    data(){
        return {
            url: ''
        }
    }
}

</script>