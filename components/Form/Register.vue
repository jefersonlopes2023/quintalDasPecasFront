<template>
    <PartialsValidationEmailNotification v-show="notification" />       
    <div class="home" v-show="activedRegister">
        <section data-testid="recommendations" class="recommendations" type="recommendations">
            <div class="container">   
                <div class="row justify-content-center g-4">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div class="panel">
                          <form>                            
                            <Message severity="success" v-if="successMessage">{{ successMessage }}</Message>
                            <Message severity="error" v-if="errorMessage.message" v-for="(value, key) in errorMessage.message" :key="key">{{ value[0] }}</Message>
                            <PartialsTermConditions @typeRegister="handleTypeRegister" v-if="activedTermRegister" />
                            <PartialsLegalEntityData :formData="formDataEntity" :errorMessage="errorMessage" @setFormDataEntity="handleformDataEntity" v-if="typeRegister === 1" />
                            <PartialsIndividualData :formData="formDataIndividual" :errorMessage="errorMessage" @setFormDataIndividual="handleformDataIndividual" v-if="typeRegister === 2" />
                            <PartialsPassword @formDataPassword="handleformDataPassword" :errorMessage="errorMessage" v-if="typeRegister === 1 || typeRegister === 2"/>
                            <PartialsControlButton @onSubmit="handleOnSubmit" v-if="typeRegister === 1 || typeRegister === 2" :redirectUrl="redirectUrl"/>                           
                          </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import Register from '@/src/services/RegisterService';

export default {
  data() {
    return {
      successMessage: '',
      errorMessage: { name: '', cpf_cnpj: '', email: '', password: '', recoverpassword: '', message: []},
      activedRegister: true,
      typeRegister: 0,
      activedTermRegister: true,
      redirectUrl: '/register/users',
      formDataEntity: { name: '', cpf_cnpj: ''},
      formDataPassword: { email: '', password: '', recoverpassword: ''},
      formDataIndividual: { name: '', cpf_cnpj: ''},
      isValid : true,      
      notification : false
    };
  },
  methods: {
    handleTypeRegister( type ) {
      this.typeRegister = type;
      this.activedTermRegister = false;
    },
    handleformDataPassword( value ){
      this.formDataPassword.email = value.email;
      this.formDataPassword.password = value.password;
      this.formDataPassword.recoverpassword = value.recoverpassword;
    },
    handleformDataEntity( value ){
      this.formDataEntity.name = value.name;
      this.formDataEntity.cpf_cnpj = value.cpf_cnpj;
    },
    handleformDataIndividual( value){
      this.formDataIndividual.name = value.name;
      this.formDataIndividual.cpf_cnpj = value.cpf_cnpj;
    },
    async handleOnSubmit( value ){
      try{
        this.successMessage = '';
        this.errorMessage.message = '';
        if( value === true ){

          this.validateField();
          if ( !this.isValid ){
              return false;
          }
        
          const form = new FormData();          
          const register = new Register();

          let name = this.formDataEntity.name ? this.formDataEntity.name : '';
          name = name ? name : this.formDataIndividual.name;
          let cpf_cnpj = this.formDataEntity.cpf_cnpj;
          cpf_cnpj = cpf_cnpj ? cpf_cnpj : this.formDataIndividual.cpf_cnpj;
          cpf_cnpj = cpf_cnpj.replace(/[./\\-]/g, '');

          form.append('name', name);
          form.append('cpf_cnpj', cpf_cnpj);
          form.append('email', this.formDataPassword.email)
          form.append('password', this.formDataPassword.password);
          form.append('password_confirmation', this.formDataPassword.recoverpassword);
          
          const { data: responseData, error: responseError } = await register.store(form, this.typeRegister);
          let status = responseData.value ? responseData._rawValue.status : null;
          status = status ?? (responseError.value ? responseError.value.statusCode : null);
          
          if( status == 201 ){
            this.successMessage = "Cadastro efetuado!";
            this.typeRegister = 0;
            this.notification = true;
            this.activedRegister = false;
          }

          if( status >= 400 ){
            this.errorMessage.message = responseError.value.data.data.errors;
          }
        } 

      }catch( error ){

        this.errorMessage.message = { errors :  [error.message] };
      
      } 
    },
    validateField(){
        this.errorMessage = {
          cpf_cnpj : '',
          name : '',
          email : '',
          password : '',
          recoverpassword : ''
        };

        this.isValid = true;

        if( this.typeRegister === 1){

          if ( !this.formDataEntity.name ){
            this.errorMessage.name = 'Campo obrigatório';
            this.isValid = false;
          }

          if ( !this.formDataEntity.cpf_cnpj ){
            this.errorMessage.cnpj = 'Campo obrigatório';
            this.isValid = false;
          }
        }

        if( this.typeRegister === 2){

          if ( !this.formDataIndividual.name ){
            this.errorMessage.name = 'Campo obrigatório';
            this.isValid = false;
          }        

          if ( !this.formDataIndividual.cpf_cnpj ){
            this.errorMessage.cpf = 'Campo obrigatório';
            this.isValid = false;
          }

        }        

        if ( !this.formDataPassword.email ){
          this.errorMessage.email = 'Campo obrigatório';
          this.isValid = false;
        }

        if ( !this.formDataPassword.password ){
          this.errorMessage.password = 'Campo obrigatório';
          this.isValid = false;
        }

        if ( !this.formDataPassword.recoverpassword ){
          this.errorMessage.recoverpassword = 'Campo obrigatório';
          this.isValid = false;
        }
    }
  }
};
</script>
