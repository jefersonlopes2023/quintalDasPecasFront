<template>
    <Message :severity="severity">{{ message }}</Message>
</template>
<script>
export default {
    props: {
        message: {
            type: String,
            default: '',
            required: true
        },
        severity: {
            type: String,
            required: true,
            default: 'primary'
        },
        duration: {
            type: Number,
            default: 5000,
        },
    },
    data() {
        return {           
            isVisible: true
        };
    },
    methods: {       
        closeMessage() {
           this.isVisible = false;
        }
    },
    mounted() {
        if (this.duration > 0) {
            setTimeout(() => {
                this.closeMessage();
            }, this.duration);
        }
    }
};
</script>
  