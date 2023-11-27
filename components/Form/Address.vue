<template>
    <div class="home">
        <section data-testid="recommendations" class="recommendations" type="recommendations">
            <div class="container">
                <div class="row g-8  justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-col-center">
                    <div class="col-lg-12 col-md-12 col-sm-12 col12">
                        <div class="panel">
                            <form>
                                <Message severity="success" v-if="successMessage">{{ successMessage }}</Message>
                                <Message severity="error" v-if="errorMessage.message" v-for="(value, key) in errorMessage.message" :key="key">{{ value[0] }}</Message>
                                <PartialsAddress @handleOnSubmit="handleOnSubmit" @handleFetchCepData="handleFetchCepData" :formData="formData" :isDisabled="isDisabled" />
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
    import Cep from '@/src/services/CepService';
    import PartialsAddress from '~/components/partials/Address.vue';
    
    export default{
        components:{
            PartialsAddress
        },
        data() {
            return {
                formData : {
                    zipcode : '',
                    address : '',
                    number : '',
                    comment : '',
                    neighborhood : '',
                    city : '',
                    state : '',
                },    
                successMessage:'',
                errorMessage: {message:''},
                isDisabled: false
            }
        },
        methods:{
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
                    this.formData.zipcode = responseData.data._rawValue.data.zipcode;
                    this.formData.address = responseData.data._rawValue.data.address;
                    this.formData.number = responseData.data._rawValue.data.number;
                    this.formData.comment = responseData.data._rawValue.data.comment;
                    this.formData.neighborhood = responseData.data._rawValue.data.neighborhood;
                    this.formData.city = responseData.data._rawValue.data.city;
                    this.formData.state = responseData.data._rawValue.data.state;
                    this.isDisabled = false;
                }
                
            },
            async handleOnSubmit( value ){
                this.successMessage = '';
                this.errorMessage.message = '';

                const entityId = localStorage.getItem('entityId');
                const form = new FormData();// dados
                form.append('zipcode', this.formData.zipcode);
                form.append('address',this.formData.address);
                form.append('number',this.formData.number);
                form.append('comment',this.formData.comment);
                form.append('neighborhood',this.formData.neighborhood);
                form.append('city',this.formData.city);
                form.append('state',this.formData.state);

                const entity = new Entity();
                const { data: responseData, error: responseError } = await entity.updateAddress(entityId, form); 
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);
                if ( status === 201){
                    this.successMessage = "Registro atualizado com sucesso!";
                    this.notification = true;
                }
                if( status == 400 ){
                    this.errorMessage.message = responseError.value.data.data[0];
                }
            },
            async handleFetchCepData( zipcode ){

                if( zipcode ){
                    this.isDisabled = false;
                    
                    const cep = new Cep();
                    const {data: responseData, error: responseError } =  await cep.fetchCepData(zipcode);

                    this.formData.address = '';
                    this.formData.comment = '';
                    this.formData.number = '';
                    this.formData.neighborhood = '';

                    this.formData.address = responseData._rawValue.logradouro;
                    this.formData.neighborhood = responseData._rawValue.bairro;
                    this.formData.city = responseData._rawValue.localidade;
                    this.formData.state = responseData._rawValue.uf;
                    this.isDisabled = false;                
                }                
            }
        },
        mounted(){
            this.isDisabled = true;
            this.handleOnLoad();
        }
    }
</script>