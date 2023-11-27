<template>
    <Message severity="error" v-if="isValid"  :closable="false">{{ message }}</Message>
    <Card>
        <template #title>Indique o produto, marca, modelo e pricipais características  </template>
        <template #subtitle>Você também pode inserir o códico universal que o identifica. <span>Como posso encontrá-lo?</span> </template>
        <template #content>
            <div class="row box-image">
                <div class="col-lg-10 col-md-10 col-sm-10 col-10">
                    <span class="p-inputgroup " style="width: 100%;">
                        <span class="p-inputgroup-addon no-border no-border-right">
                            <i class="pi pi-search" />
                        </span>
                        <InputText @keydown.enter="handleSubmitPredict(true)" v-model="formData.name" placeholder="Ex.: Lanterna traseira lado direito" :name="'predict'" size="large" class="input-text-main-features" />
                        <span class="p-inputgroup-addon no-border no-border-left">
                            <NuxtLink @click="handleClean()"><i class="pi pi-times" /></NuxtLink>
                        </span>
                    </span>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-2 d-grid gap-2 d-md-flex justify-content-start">
                    <Button label="Buscar" size="large" class="btn-search-custom" text  outlined @click="handleSearchProducts(formData.name)" />                   
                </div>                 
            </div>
        </template> 
        <template #footer>
        </template>
    </Card>
</template>
<script>
export default {
    data(){
        return {
            formData: {
                name: ''
            },
            message: '',
            isValid: false
        };
    },
    methods: {
        async handleSubmitPredict( value ){
            if( !this.formData.name ){
                this.message = 'Informe um termo para realizar a pesquisa.';
                this.isValid = true;
                setTimeout(() => {
                    this.isValid = false;
                }, 5000);
                return false;
            }
            this.$emit('handleSubmitPredict', this.formData.name);
        }
    },
    emits: ['handleSubmitPredict']
}
</script>