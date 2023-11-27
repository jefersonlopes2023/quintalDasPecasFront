<template>
    <div class="container">                
        <div class="row">
            <form class="row justify-content-lg-center g-4 ">
                <div class="col-lg-8 col-md-8 col-sm-8 col-8">
                    <div class="panel">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <label for="InputText Address" class="form-label label-lg">ID do Aplicativo</label>
                            <InputText type="hidden" v-model="formData.id"></InputText>
                            <InputText maxlength="50" v-model="formData.client_id" autocomplete="off" size="large"  type="text" class="form-control" id="InputText Address" name="address" />
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <label for="InputText Number" class="form-label label-lg">Chave Secreta</label>
                            <InputText maxlength="50" v-model="formData.client_secret" autocomplete="off" size="large"  type="text" class="form-control" id="InputText Number" name="number" />
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <label for="InputText Number" class="form-label label-lg">ID do Vendedor</label>
                            <InputText maxlength="15" v-model="formData.seller_id" autocomplete="off" size="large"  type="text" class="form-control" id="InputText Number" name="number" />
                        </div>                         
                        <div class="row g-2 justify-content-center ButtonBottom">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                <NuxtLink @click="handleCreate(false)" class="btn btn-primary btn-lg btn-width-defult">
                                    <i class="pi pi-arrow-left"></i> Voltar
                                </NuxtLink>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                <NuxtLink @click="handleSubmit()" class="btn btn-primary btn-lg btn-width-defult">
                                    <i class="pi pi-check"></i> Confirmar
                                </NuxtLink>
                            </div>
                        </div>
                    </div>    
                </div>    
            </form>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        formData:{
            type: Object,
            default: {},
            required: true
        }
    },
    data(){
        return {
            resultCredentials: [],
            isForm: false,
            confirmDiaog: false, 
            msgDialogConfirm: ''                  
        }
    },
    methods:{
        async handleCreate( isForm ){
            this.$emit('handleCreate', isForm);
        },    
        async handleSubmit(){
            this.$emit('handleSubmit', this.formData);
        }
    }
}
</script>