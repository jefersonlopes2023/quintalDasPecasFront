<template>
   <div class="row g-4">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <form class="panel">
                <Message severity="success" v-if="successMessage">{{ successMessage }}</Message>
                <Message severity="error" v-if="errorMessage.message" v-for="(value, key) in errorMessage.message" :key="key">{{ value[0] }}</Message>
                <div class="row g-2 justify-content-center">
                    <div class="col-lg-8 col-md-8 col-sm-8 col-8">
                        <label for="inputBusinessName" class="form-label label-lg">Nome</label>
                        <InputText v-model="formData.name" type="text" class="form-control" size="large" id="inputBusinessName" name="name" maxlength="150" />
                        <small class="p-error" id="text-error" ></small>
                    </div> 
                    <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                        <label for="inputCNPJ" class="form-label label-lg">CNPJ</label>
                        <InputMask v-model="formData.cnpj" id="inputCNPJ" mask="99.999.999/9999-99" class="form-control p-inputmask p-inputmask-lg" autocomplete="off" name="cpf_cnpj" />
                        <small class="p-error" id="text-error" ></small>
                    </div>                    
                </div>
                <div class="row g-2 justify-content-center">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                        <label for="InputText Name" class="form-label label-lg">Nome Fantasia</label>
                        <InputText v-model="formData.fantasy_name" autocomplete="off" size="large"  type="text" class="form-control" id="InputText Name" maxlength="150" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                        <label for="InputText Email" class="form-label label-lg">E-mail</label>
                        <InputText v-model="formData.email" autocomplete="off" size="large"  type="text" class="form-control" id="InputText Name" maxlength="150" />
                    </div>
                </div>
                <div class="row g-2 justify-content-center">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                        <label for="cep" class="form-label label-lg">CEP</label>
                        <InputMask @blur="handleFetchCepData(formData.zipcode)" v-model="formData.zipcode" id="cep" mask="99.999-999" class="form-control  p-inputmask p-inputmask-lg" />
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-8 col-8">
                        <label for="InputText Address" class="form-label label-lg">Endereço</label>
                        <InputText v-model="formData.address"  autocomplete="off" size="large"  type="text" class="form-control" id="InputText Address" name="address" maxlength="100" />
                    </div>                    
                </div>                
                <div class="row g-2 justify-content-center">
                    <div class="col-lg-10 col-md-10 col-sm-10 col-10">
                        <label for="InputText Complement" class="form-label label-lg">Complemento</label>
                        <InputText v-model="formData.comment" autocomplete="off" size="large"  type="text" class="form-control" id="InputText Complement" maxlength="50" />
                    </div> 
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        <label for="InputText Number" class="form-label label-lg">Número</label>
                        <InputText v-model="formData.number" autocomplete="off" size="large"  type="text" class="form-control" id="InputText Number" name="number" maxlength="5" />
                    </div>                                                      
                </div>
                <div class="row g-2 justify-content-center">
                    <div class="col-lg-5 col-md-5 col-sm-5 col-5">
                        <label for="InputText Neighborhood" class="form-label label-lg">Bairro</label>
                        <InputText v-model="formData.neighborhood" autocomplete="off" size="large"  type="text" class="form-control" id="InputText Neighborhood" name="neighborhood" maxlength="50" />
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5 col-5">
                        <label for="InputText City" class="form-label label-lg">Cidade</label>
                        <InputText v-model="formData.city"  autocomplete="off" size="large"  type="text" class="form-control" id="InputText City" name="city" maxlength="50" />
                    </div>
                    <div class="col-lg-2 col-2 col-sm-2 col-2">
                        <label for="InputText State" class="form-label label-lg">Estado</label>
                        <InputText v-model="formData.state"  autocomplete="off" size="large" type="text" class="form-control" maxlength="2" />
                    </div>
                </div>   
                <div class="row g-2 justify-content-end">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                        <NuxtLink @click="handleOnSubmit(formData.id)" class="btn btn-primary btn-lg btn-width-defult">
                            <i class="pi pi-check"></i> Salvar
                        </NuxtLink>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import Portal from '@/src/services/PortalService';
    import Cep from '@/src/services/CepService';
    export default{
        data(){
            return{
                successMessage: '',
                errorMessage: { name: '', cpf_cnpj: '', message: []},
                formData:{
                    id:0
                }
            }
        },
        methods:{
            async handleOnSubmit(id){
       
                const portal = new Portal();
                const form = new FormData();
                form.append('name', this.formData.name);
                form.append('fantasy_name', this.formData.fantasy_name);
                form.append('email', this.formData.email);
                form.append('zipcode', this.formData.zipcode.replace('.', '').replace('.', '').replace('-', ''));
                form.append('cnpj', this.formData.cnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', ''));
                form.append('address', this.formData.address);
                form.append('number', this.formData.number);
                form.append('comment', this.formData.comment);
                form.append('neighborhood', this.formData.neighborhood);
                form.append('country', this.formData.country);
                form.append('state', this.formData.state);
                form.append('city', this.formData.city);

                this.successMessage = '';
                this.errorMessage.message = '';
                var status = '';
                               
                if (id){                   
                    const { data: responseData, error: responseError } = await portal.update(id, form);
                    status = responseData.value ? responseData._rawValue.status : null;
                    status = status ?? (responseError.value ? responseError.value.statusCode : null); 
                    
                    if ( status === 201){
                    this.successMessage = "Dados pessoais atualizado com sucesso!";
                    }
                    
                    if( status == 400 ){
                        this.errorMessage.message = responseError.value.data.data.errors;
                    }
                }

                if (!id){
                    const { data: responseData, error: responseError } = await portal.store(form);     
                    status = responseData.value ? responseData._rawValue.status : null;
                    status = status ?? (responseError.value ? responseError.value.statusCode : null);

                    if ( status === 201){
                    this.successMessage = "Dados pessoais atualizado com sucesso!";
                    }
                    
                    if( status == 400 ){
                        this.errorMessage.message = responseError.value.data.data.errors;
                    }
                }               
                
            },
            async handleGetPortal(){
                const portal = new Portal();
                const { data: responseData, error: responseError } = await portal.all();
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);

                if (status == 200) {
                    this.formData = responseData._rawValue.data[0];
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
            this.handleGetPortal();
        }
    }
</script>
