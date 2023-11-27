<template>
    <div class="home">
        <section data-testid="recommendations" class="recommendations" type="recommendations">
            <div class="container">
                <div class="row g-8  justify-content-center">
                    <div class="col-lg-12 col-md-12 col-sm-12 col12">
                        <div class="panel">
                            <form>
                                <Message severity="success" v-if="successMessage">{{ successMessage }}</Message>
                                <Message severity="error" v-if="errorMessage.message" v-for="(value, key) in errorMessage.message" :key="key">{{ value[0] }}</Message>
                                <div class="row g-2 justify-content-lg-center">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                        <label for="inputPassword" class="form-label label-lg">Senha atual</label>                                        
                                        <Password v-model="formData.password" size="large" id="password" name="password" :feedback="false" toggle-mask autocomplete="off" :maxlength="16" />
                                    </div>
                                </div>
                                <div class="row g-2 justify-content-lg-center">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                        <label for="inputNewPassword" class="form-label label-lg">Nova senha</label>
                                        <Password v-model="formData.newpassword" size="large" id="newpassword2" name="newpassword" :feedback="false" toggle-mask autocomplete="off" :maxlength="16" />
                                    </div>
                                </div>
                                <div class="row g-2 justify-content-lg-center">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                        <label for="inputRecoverPassword" class="form-label label-lg">Repetir nova senha</label>
                                        <Password v-model="formData.recoverpassword" size="large" id="recoverpassword2" name="recoverpassword" :feedback="false" toggle-mask autocomplete="off" :maxlength="16" />
                                    </div>
                                </div>
                                <div class="row box-button justify-content-lg-center">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <NuxtLink to="" class="btn btn-primary btn-lg btn-width-defult">
                                            <i class="pi pi-arrow-left"></i> Voltar
                                        </NuxtLink>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                        <NuxtLink class="btn btn-primary btn-lg btn-width-defult" @click="handleOnSubmit()" >
                                            <i class="pi pi-check"></i> Enviar
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

import Service from '@/src/services/ChangePasswordService';

export default{
    data() {
        return{
            formData : {
                password : '',
                newpassword : '',
                recoverpassword : '',
                token: ''
            },
            successMessage: '',
            errorMessage: {
                message : ''
            },
        }
    },
    methods:{
        async handleOnSubmit(){
            this.successMessage = '';
            this.errorMessage.message = '';

            try{
                const route = useRoute();
                const form = new FormData();
                form.append('current_password', this.formData.password);
                form.append('password', this.formData.newpassword);
                form.append('password_confirmation', this.formData.recoverpassword);
                form.append('token', route.params.slug);

                const service = new Service();
                const userId = localStorage.getItem('userId');
                const { data: responseData, error: responseError }= await service.update(userId, form);

                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);
                
                if ( status === 201){
                    this.successMessage = "Registro atualizado com sucesso!";
                    this.formData.password = '';
                    this.formData.newpassword = '';
                    this.formData.current_password = '';
                    this.formData.recoverpassword = '';
                }
                
                if( status >= 400 ){
                    this.errorMessage.message = responseError.value.data.data[0];
                }
                            
                if (status === 200){
                    this.successMessage = responseData.data._rawValue.message;
                    return true;
                }

            }catch( error ){

                this.errorMessage.message = { errors :  [error.message] };

            }  
        }       
    }
}
</script>