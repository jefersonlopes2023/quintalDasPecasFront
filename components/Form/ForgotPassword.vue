<template>   
    <div class="home">
        <section data-testid="recommendations" class="recommendations" type="recommendations">
            <div class="container-recoverpassword">
                <div class="row  g-2 justify-content-center">  
                    <div class="col-lg-6 col-md-6 col-sm-6 col-4"> 
                        <div class="panel">    
                            <Message severity="error" v-if="errorMessage">{{ errorMessage }}</Message> 
                            <Message severity="success" v-if="successMessage">{{ successMessage }}</Message>   
                            <form class="row">
                                <div class="row g-2 justify-content-center">
                                    <div class="col-lg-10 col-md-10 col-sm-10 col-10">
                                        <label for="inputNome" class="form-label label-lg">E-mail</label>
                                        <br>
                                        <InputText v-model="email" size="large" name="email" class="form-control" maxlength="100" autocomplete="off"/>
                                    </div>
                                </div>  
                                <div class="row g-2 justify-content-center ButtonBottom">
                                    <div class="col-lg-5 col-md-5 col-sm-5 col-10">
                                        <NuxtLink to="/login" class="btn btn-primary btn-lg btn-width-defult">
                                            <i class="pi pi-arrow-left"></i> Voltar
                                        </NuxtLink>
                                    </div>
                                    <div class="col-lg-5 col-md-5 col-sm-5 col-10">
                                        <NuxtLink @click="doSubmit" class="btn btn-primary btn-lg btn-width-defult">
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
<script setup>
import Service from '@/src/services/ForgotPasswordService';
import { useForm } from 'vee-validate';

const email = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const { resetForm } = useForm();
const formData = new FormData();

async function doSubmit(){
    errorMessage.value = '';
    successMessage.value = '';
    formData.append('email', email.value);
    const { data: responseData, error : responseError} = await (new Service().ForgotPassword(formData));

    let status = responseData.value ? responseData._rawValue.status : null;
    status = status ?? (responseError.value ? responseError.value.statusCode : null);
    
    if(status === 200){
        email.value = '';
        successMessage.value = responseData._rawValue.message;
        resetForm();
    }

    errorMessage.value = responseError.value?.data.data.error[0] ?? '';
}
</script>