<template>    
    <div class="home">
        <section data-testid="recommendations" class="recommendations" type="recommendations">
            <div class="container">
                <div class="row g-8  justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-col-center">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div class="panel">
                            <Message severity="error" v-for="(value, key) in errors" :key="key">{{ value[0] }}</Message>
                            <form method="POST" class="row">
                                <div class="row g-2 justify-content-center">
                                    <div class="col-lg-10 col-md-10 col-sm-10 col-10">
                                        <label for="inputEmail" class="form-label label-lg">E-mail</label>                                        
                                        <InputText v-model="email" size="large" class="form-control" maxlength="50" />
                                    </div>
                                </div>
                                <div class="row g-2 justify-content-center">
                                    <div class="col-lg-10 col-md-10 col-sm-10 col-10">
                                        <label for="inputPassword" class="form-label label-lg">Senha</label>
                                        <Password v-model="password" size="large" id="password" toggleMask :feedback="false" :maxlength="16" />
                                    </div>
                                </div>
                                <div class="row g-2 justify-content-center">
                                    <div class="col-lg-5 col-md-5 col-sm-5 col-5">
                                        <NuxtLink to="/" class="btn btn-primary btn-lg btn-width-defult">
                                            <i class="pi pi-arrow-left"></i> Voltar
                                        </NuxtLink>
                                    </div>
                                    <div class="col-lg-5 col-md-5 col-sm-5 col-5">
                                        <NuxtLink @click="onSubmit" class="btn btn-primary btn-lg btn-width-defult">
                                            <i class="pi pi-check"></i> Confirmar
                                        </NuxtLink>
                                    </div>
                                </div>
                                <div class="row g-2  justify-content-center">
                                    <div class="col-lg-10 col-md-10 col-sm-10 col-10">
                                        <NuxtLink to="/forgotpassword" class="btn btn-primary btn-lg btn-recover-password">Recuperar Senha</NuxtLink>
                                    </div>
                                </div>
                                <div class="row g-2  justify-content-center">
                                    <div class="col-lg-10 col-md-10 col-sm-10 col-10">
                                        <NuxtLink to="/register/users" style="width: 100%;" class="btn btn-primary btn-lg btn-register-user">Criar conta</NuxtLink>
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
import Auth from '@/src/services/AuthService';

export default {
    data(){
        return {
            email: '',
            password: '',
            errors: []
        };
    },
    methods: {
        async onSubmit(){
            this.errors = [];
            const formAuth = new FormData();
            formAuth.append('email', this.email);
            formAuth.append('password', this.password);
            formAuth.append('remember', 'false');
        
            const { data: responseData, error: responseError } = await (new Auth().auth(formAuth));
            let status = responseData.value ? responseData._rawValue.status : null;
            status = status ?? (responseError.value ? responseError.value.statusCode : null);

            if(status === 200){
                localStorage.setItem('logged', 'true');
                localStorage.setItem('users', responseData._rawValue.data[0].original.data.name);
                localStorage.setItem('userId', responseData._rawValue.data[0].original.data.userId);
                localStorage.setItem('entityId', responseData._rawValue.data[0].original.data.entityId);
                navigateTo('/',{ external : true });
            }

            if( responseError.value?.data.data[0] ){
                this.errors = responseError.value?.data.data[0];
            }
        }
    }
}
</script>

