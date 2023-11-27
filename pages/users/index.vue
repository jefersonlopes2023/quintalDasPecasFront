<template>
    <div class="home" v-if="!isForm">
        <div class="container">       
            <div class="row">
                <form class="row justify-content-lg-center g-4">
                    <div class="row justify-content-lg-center">
                        <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                            <NuxtLink to="/" class="btn btn-outline-primary btn-lg btn-width-defult">
                                Página Principal
                            </NuxtLink>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-8 col-8"></div>
                        <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                            <NuxtLink @click="handleCreate(true)" class="btn btn-outline-primary btn-lg btn-width-defult">
                               Cadastrar
                            </NuxtLink>
                        </div> 
                    </div> 
                    <div class="row g-8  justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-col-center">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="row g-2 justify-content-center">                                
                                <PartialsUsersGrid 
                                    :items="userServiceData" 
                                    @handleSendEmail="handleSendEmail" 
                                    @handleDisableItem="handleDisableItem" 
                                    @handleEnableItem="handleEnableItem"
                                    @handleForgotPassword="handleForgotPassword"
                                    @handleEdit="handleEdit"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <PartialsUsersForm 
        v-if="isForm" 
        @handleCreate="handleCreate"
        @handleSubmit="handleSubmit"
        :errorMessage="errorMessage"
        :data="formData"
    />
    <Toast />
</template>
<script>
    import UserService from '@/src/services/UserService';
    import ForgotPasswordService from '@/src/services/ForgotPasswordService';
    export default {        
        data(){
            return{
                userServiceData:[],
                successMessage: '',
                errorMessage: { name: '', cpf_cnpj: '', email: '', password: '', recoverpassword: '', message: []},
                visible: false,
                isForm: false,
                formData:{}
            }
        },
        methods:{
            async handleEnableItem(id){           
                const form = new FormData();
                const userService = new UserService();
                const responseData = await userService.enable(id,form);
                const status = responseData.data._rawValue ? responseData.data._rawValue.status : [];

                if (status === 200) {
                    this.handleGetAll();
                } 
            },
            async handleDisableItem(id){ 
                const form = new FormData();
                const userService = new UserService();
                const responseData = await userService.destroy(id,form);
                const status = responseData.data._rawValue ? responseData.data._rawValue.status : [];

                if (status === 200) {
                    this.handleGetAll();
                }    
            },
            async handleGetAll(){
                const entityId = localStorage.getItem('entityId');
                const userService = new UserService();
                let status = '';

                if(entityId){
                    const responseData = await userService.getAllActive(entityId);
                    status = responseData.data._rawValue ? responseData.data._rawValue.status : [];
                    if (status === 200) {
                        this.userServiceData = responseData.data._rawValue.data; 
                    } 
                }
                
                if(!entityId){
                    const responseData = await userService.getAll();
                    status = responseData.data._rawValue ? responseData.data._rawValue.status : [];
                    if (status === 200) {
                        this.userServiceData = responseData.data._rawValue.data; 
                    } 
                }                
            },           
            async handleSendEmail(id){               
                const userService = new UserService();
                const responseData = await userService.sendMail(id);
                const status = responseData.data._rawValue ? responseData.data._rawValue.status : [];

                if (status === 200) {
                    this.showToast('success','Sucesso','E-mail enviado com sucesso.');
                    this.handleGetAll();                    
                }   
            },
            async showToast(severity, summary, detail) {
                this.$toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
            }, 
            async handleForgotPassword(email){
                const userService = new UserService();
                const forgotPasswordService = new ForgotPasswordService();
                const form = new FormData();
                form.append('email', email);
                const {data: responseData, error: responseError } = await forgotPasswordService.ForgotPassword(form);
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);

                if (status === 200) {
                    this.showToast('success','Sucesso','E-mail enviado com sucesso.');
                    this.handleGetAll();                    
                }
                
                if (status >= 400) {
                    this.showToast('error','Erro','Erro ao enviar e-mail.');
                } 
            },
            handleCreate(isForm){
                this.isForm = isForm;
                this.formData = '';
            },
            async handleSubmit(formData){
                if(formData.id){
                    const userService = new UserService();
                    const form = new FormData();
                    form.append('name', formData.name);
                    form.append('email', formData.email);
                    form.append('id', formData.id);
                    const {data: responseData, error: responseError } = await userService.update(formData.id,form);
                    let status = responseData.value ? responseData._rawValue.status : null;
                    status = status ?? (responseError.value ? responseError.value.statusCode : null);

                }
                if(!formData.id){
                    const form = new FormData();
                    form.append('name', formData.name);
                    form.append('email', formData.email);
                    form.append('password', formData.password);
                    form.append('password_confirmation', formData.password_confirmation);
                    form.append('entity_id', formData.entityId);

                    const userService = new UserService();
                    const {data: responseData, error: responseError } = await userService.store(form);
                    let status = responseData.value ? responseData._rawValue.status : null;
                    status = status ?? (responseError.value ? responseError.value.statusCode : null);
                }
                

                if (status === 201) {
                    this.formData = '';
                    this.showToast('success','Sucesso','Registro salvo com sucesso.');
                    this.handleGetAll();
                } 
                
                if (status >= 400) {
                    this.errorMessage.message = responseError.value.data.data.errors;
                }   
            },
            async handleEdit(data){
                this.formData = data;
                this.isForm = true;               
            }
        },
        mounted(){
            this.handleGetAll();           
        }
    };
</script>