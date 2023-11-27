<template>
    <div class="home">
        <section data-testid="recommendations" class="recommendations" type="recommendations">
            <div class="container">
                <div class="row g-8  justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-col-center">
                    <div class="col-lg-10 col-md-10 col-sm-10 col10">
                        <div class="panel">
                            <form>
                                <Message severity="success" v-if="successMessage">{{ successMessage }}</Message>
                                <Message severity="error" v-if="errorMessage.message" v-for="(value, key) in errorMessage.message" :key="key">{{ value[0] }}</Message>  
                                <div class="row g-2 justify-content-center">                                    
                                    <div>
                                        <label for="inputCelular" class="form-label label-lg">Celular</label>
                                        <InputMask v-model="formData.phone" mask="(99) 99999-9999" class="form-control p-inputmask p-inputmask-lg" />
                                         
                                    </div>
                                </div>
                                <div class="row g-2 justify-content-center">
                                    <div>
                                        <label for="inputFacebook" class="form-label label-lg">Facebook</label>
                                        <InputText v-model="formData.facebook" autocomplete="off" size="large" type="text" class="form-control" id="inputFacebook" name="facebook" maxlength="30" />

                                    </div>
                                </div>
                                <div class="row g-2 box-button justify-content-lg-center">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <NuxtLink class="btn btn-primary btn-lg btn-width-defult">
                                            <i class="pi pi-check"></i> Voltar
                                        </NuxtLink>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <NuxtLink @click="handleOnSubmit()" class="btn btn-primary btn-lg btn-width-defult">
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

    export default{
        data() {
            return{
                successMessage: '',
                errorMessage: { phone: '', facebook: '', message: []},
                formData: {
                    phone: '',
                    facebook: '',
                }
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
                this.formData.phone = responseData.data._rawValue.data.phone;
                this.formData.facebook = responseData.data._rawValue.data.facebook;
                }
            },
            async handleOnSubmit(){
                this.successMessage = '';
                this.errorMessage.message = '';
                
                const entityId = localStorage.getItem('entityId'); 
                const formEntity = new FormData();

                this.formData.phone =  this.formData.phone.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
                formEntity.append('phone', this.formData.phone);
                formEntity.append('facebook', this.formData.facebook);
                const entity = new Entity();
                
                const { data: responseData, error: responseError } =  await entity.updateContact(entityId, formEntity);
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