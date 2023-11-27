<template> 
    <div class="home">
        <section data-testid="recommendations" class="recommendations" type="recommendations">
            <div class="container">
                <div class="row g-8  justify-content-lg-center">
                    <div class="col-lg-10">
                        <div class="panel">                            
                            <form>
                                <Message severity="success" v-if="successMessage">{{ successMessage }}</Message>
                                <Message severity="error" v-if="errorMessage.message" v-for="(value, key) in errorMessage.message" :key="key">{{ value[0] }}</Message>                            
                                <PartialsLegalEntityData :formData="formData" :errorMessage="errorMessage" @setFormDataEntity="handleformDataEntity" v-if="typeRegister === 1" ></PartialsLegalEntityData>                                               
                                <PartialsIndividualData :formData="formData" :errorMessage="errorMessage" @setFormDataIndividual="handleformDataIndividual" v-if="typeRegister === 2"></PartialsIndividualData>
                                <div class="row g-2 box-button justify-content-lg-center">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <NuxtLink class="btn btn-primary btn-lg btn-width-defult">
                                            <i class="pi pi-check"></i> Voltar
                                        </NuxtLink>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <NuxtLink @click="handleSubmit()" class="btn btn-primary btn-lg btn-width-defult">
                                            <i class="pi pi-check"></i> Confirmar
                                        </NuxtLink>
                                    </div>   
                                </div>                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import Entity from '@/src/services/EntityService';

    export default {
        data() {
            return {
                successMessage: '',
                errorMessage: { name: '', cpf_cnpj: '', message: []},
                typeRegister: 1,
                pj: true,
                pf: false,
                formData: { name: '', cpf_cnpj: '' }
            }
        },
        methods: {
            handleTypeRegister( type ) {
                this.typeRegister = type;
                this.activedTermRegister = false;
            },
            handleformDataEntity( value ){
                this.formData.name = value.name;
                this.formData.cpf_cnpj = value.cpf_cnpj;
            },
            handleformDataIndividual( value){
                this.formData.name = value.name;
                this.formData.cpf_cnpj = value.cpf_cnpj;
            },
            async handleOnLoad(){
                const userId = localStorage.getItem('userId');
                const entityId = localStorage.getItem('entityId'); 

                if( !entityId ){
                    return false;
                }

                const entity = new Entity();
                const responseData = await entity.single(entityId);
                const status = responseData.data._value?.status;

                if( status === 200 ){
                    this.formData.name = responseData.data._rawValue.data.name;
                    this.formData.cpf_cnpj = responseData.data._rawValue.data.cpfcnpj;
                    this.typeRegister = responseData.data._rawValue.data.document_type == 'CNPJ' ? 1 : 2;
                }
            },
            async handleSubmit(){
                this.successMessage = '';
                this.errorMessage.message = '';

                this.formData.cpf_cnpj =  this.formData.cpf_cnpj.replace('.', '').replace('.', '').replace('-', '').replace('/', '');
                const entityId = localStorage.getItem('entityId'); 
                const formEntity = new FormData();
                formEntity.append('name', this.formData.name);
                formEntity.append('cpf_cnpj', this.formData.cpf_cnpj);
                const entity = new Entity();
                
                const { data: responseData, error: responseError } =  await entity.updatePersonalData(entityId, formEntity);
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);
              
                if ( status === 201){
                    this.successMessage = "Dados pessoais atualizado com sucesso!";
                }
                if( status == 400 ){
                    this.errorMessage.message = responseError.value.data.data[0];
                }
            }
        },
        mounted(){
            this.handleOnLoad();
        }
    }

</script>