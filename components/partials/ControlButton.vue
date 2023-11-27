<template>
    <div class="row g-2 justify-content-center box-button">
        <div class="col-lg-6 col-md-6 col-sm-6 col-6 d-grid gap-2 d-md-flex justify-content-md-start">
            <NuxtLink @click="redirectTo( redirectUrl )" class="btn btn-primary btn-lg btn-width-defult">
                <i class="pi pi-arrow-left"></i> Voltar
            </NuxtLink>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6 d-grid gap-2 d-md-flex justify-content-md-end">
            <NuxtLink @click="onSubmit( true )" class="btn btn-primary btn-lg btn-width-defult">
                <i class="pi pi-check"></i> Enviar
            </NuxtLink>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        redirectUrl : {
            type : String,
            default : ''
        }  
    },
    methods:{
        redirectTo( redirectUrl ){
            navigateTo(redirectUrl, { external : true });
        },
        onSubmit( value ){
            this.$emit('onSubmit', value)
        }
    },
    emits: ['onSubmit'],
};
</script>