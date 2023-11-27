<template>
    <div class="container" v-if="!isForm">       
        <div class="row">
            <form class="row justify-content-lg-center g-4">
                <div class="row justify-content-lg-center">
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        <NuxtLink to="/" class="btn btn-outline-primary btn-lg btn-width-defult">
                            Página Principal
                        </NuxtLink>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3 col-3"></div>   
                    <div class="col-lg-5 col-md-5 col-sm-5 col-5"></div>                       
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        <NuxtLink  @click="handleCreate(true)" class="btn btn-outline-primary btn-lg btn-width-defult">
                            Cadastrar
                        </NuxtLink>
                    </div> 
                </div>
                <div class="row g-8  justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-col-center">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="row g-2 justify-content-center">
                            <PartialsCredentialsGrid 
                                :items="resultCredentials" 
                                @handleEnable="handleEnable"
                                @handleDestroy="handleDestroy"
                                @handleEdit="handleEdit"
                            />
                        </div>
                    </div>
                </div> 
            </form>
        </div>    
    </div>
      <FormCredentials 
            :formData="formData"
            @handleSubmit="handleSubmit"
            @handleCreate="handleCreate"
            v-if="isForm"
        />
      <Toast />
</template>
<script>
    import MlbCredentials from '@/src/services/MlbCredentialsService';
    export default {
        data(){
            return {
                formData: {},
                resultCredentials: [],
                isForm: false,
                deleteDialog: false,
                selected: null,
                message: ''               
            }
        },
        methods: {
            async handleStore(){
                const credentials = new MlbCredentials();
                const formData = new FormData();
                formData.append('client_id', this.formData.client_id);
                formData.append('client_secret', this.formData.client_secret);
                formData.append('seller_id', this.formData.seller_id);
                formData.append('entity_id', localStorage.getItem('entityId'));
                
                const { data: responseData, error: responseError } = await credentials.store(formData);
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);

                if (status === 201) {
                    this.showToast('success','Sucesso','Registro com sucesso.');
                    this.formData = '';
                }
                
                if (status >= 400) {
                    this.showToast('error','Erro','Erro ao salvar registro.');
                } 
            },
            async handleGetCredentialsMlByEntityId(){
                const credentials = new MlbCredentials();
                const entityId = localStorage.getItem('entityId');

                const { data: responseData, error: responseError } = await credentials.getCredentialsMlByEntityId(entityId);
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);

                if (status === 200){
                    const result = responseData._rawValue.data;
                    this.resultCredentials = result;
                }
            },
            handleCreate(value){ 
                this.isForm = value;
                this.formData = [];
                this.handleGetCredentialsMlByEntityId();
            },           
            async handleDestroy(id){
                const credentials = new MlbCredentials();
                const { data: responseData, error: responseError } = await credentials.destroy(id);
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);

                this.handleGetCredentialsMlByEntityId();
                
            },
            async handleEnable(id){
                const credentials = new MlbCredentials();
                const form = new FormData();
                form.append('deleted_at', null)
                const enable = await credentials.enable(id, form);

                this.handleGetCredentialsMlByEntityId();
                this.deleteDialog = false;
            },
            handleEdit( values ){
                this.isForm = true;
                this.formData = values;
            },
            async handleSubmit( data ){
                this.formData = data;
                if (this.formData.id){
                    this.handleUpdate();
                }
                
                if (!this.formData.id){                  
                    this.handleStore();
                }
            },
            async handleUpdate(){
                const credentials = new MlbCredentials();
                const formData = new FormData();
                formData.append('client_id', this.formData.client_id);
                formData.append('client_secret', this.formData.client_secret);
                formData.append('seller_id', this.formData.seller_id);
                formData.append('entity_id', localStorage.getItem('entityId'));
                
                const { data: responseData, error: responseError } = await credentials.update(this.formData.id, formData);
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);

                if (status === 201) {
                    this.showToast('success','Sucesso','Registro com sucesso.');
                    this.formData = '';                 
                }
                
                if (status >= 400) {
                    this.showToast('error','Erro','Erro ao salvar registro.');
                } 
            },
            async showToast(severity, summary, detail) {
                this.$toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
            },            
        },
        mounted() {           
            this.handleGetCredentialsMlByEntityId();
        }
    }
</script>