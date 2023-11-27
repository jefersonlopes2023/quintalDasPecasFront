<template>
    <div class="container">                
        <div class="row">
            <form class="row justify-content-lg-center g-4 ">
                <div class="col-lg-8 col-md-8 col-sm-8 col-8">                    
                    <div class="panel">
                        <Message severity="error" v-if="errorMessage.message" v-for="(value, key) in errorMessage.message" :key="key">{{ value[0] }}</Message>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <label for="name" class="form-label label-lg">
                                Nome
                            </label>
                            <InputText id="name" type="hidden" v-model="formData.id"></InputText>
                            <InputText maxlength="150" v-model="formData.name"  autocomplete="off" size="large"  type="text" class="form-control" name="name" />
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <label for="email" class="form-label label-lg">
                                E-mail
                            </label>
                            <InputText maxlength="150" v-model="formData.email" autocomplete="off" size="large"  type="text" class="form-control" name="email" />
                        </div>
                        <div v-if="!data" class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <label for="password" class="form-label label-lg">Senha</label>
                            <Password v-model="formData.password" size="large" id="password" toggleMask :feedback="false" :maxlength="16" />
                        </div>
                        <div v-if="!data" class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <label for="password_confirmation" class="form-label label-lg">Repetir senha</label>
                            <Password v-model="formData.password_confirmation" size="large" id="password_confirmation" toggleMask :feedback="false" :maxlength="16" />
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
        data:{
            type: Object,
            default: {},
            required: true
        },
        errorMessage:{
            type: Object,
            default: {},
            required: false
        },
    },
    data(){
        return {
            resultCredentials: [],
            isForm: false,
            confirmDiaog: false, 
            msgDialogConfirm: '',
            formData: this.data
        }
    },
    methods:{
        async handleCreate( isForm ){  
            this.errorMessage.message = '';         
            this.$emit('handleCreate', isForm);
        },    
        async handleSubmit(){
            this.formData.entityId = localStorage.getItem('entityId');
            this.errorMessage.message = '';
            this.$emit('handleSubmit', this.formData);
            this.formData = {};
        }
    }
}
</script>