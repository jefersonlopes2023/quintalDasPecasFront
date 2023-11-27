<template>    
    <div class="row g-2 justify-content-center">
        <div class="col-lg-4 col-md-4 col-sm-4 col-4">
            <label for="cep" class="form-label label-lg">CEP</label>
            <InputMask v-model="formData.zipcode" id="cep" mask="99.999-999" @blur="handleFetchCepData(formData.zipcode)" @keyup.enter="handleFetchCepData(formData.zipcode)" class="form-control  p-inputmask p-inputmask-lg" />
        </div>
        <div class="col-lg-8 col-md-8 col-sm-8 col-8"></div>
    </div>
    <div class="row g-2 justify-content-center">
        <div class="col-lg-8 col-md-8 col-sm-8 col-8">
            <label for="InputText Address" class="form-label label-lg">Endereço</label>
            <InputText v-model="formData.address" :disabled="isDisabled"  autocomplete="off" size="large"  type="text" class="form-control" id="InputText Address" name="address" />
        </div>
        <div class="col-lg-4 col-md-4 col-sm-4 col-4">
            <label for="InputText Number" class="form-label label-lg">Número</label>
            <InputText v-model="formData.number" :disabled="isDisabled" autocomplete="off" size="large"  type="text" class="form-control" id="InputText Number" name="number" />
        </div>
    </div>
    <div class="row g-2 justify-content-center">                                   
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <label for="InputText Complement" class="form-label label-lg">Complemento</label>
            <InputText v-model="formData.comment" :disabled="isDisabled" autocomplete="off" size="large"  type="text" class="form-control" id="InputText Complement" />
        </div>                                   
    </div>
    <div class="row g-2 justify-content-center">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <label for="InputText Neighborhood" class="form-label label-lg">Bairro</label>
            <InputText v-model="formData.neighborhood" :disabled="isDisabled" autocomplete="off" size="large"  type="text" class="form-control" id="InputText Neighborhood" name="neighborhood" />
        </div>
    </div>    
    <div class="row g-2 justify-content-center">    
        <div class="col-lg-8 col-md-8 col-sm-8 col-8">
            <label for="InputText City" class="form-label label-lg">Cidade</label>
            <InputText v-model="formData.city" :disabled="isDisabled" autocomplete="off" size="large"  type="text" class="form-control" id="InputText City" name="city" />
        </div>
        <div class="col-lg-4 col-4 col-sm-4 col-4">
            <label for="InputText Uf" class="form-label label-lg">Estado</label>
            <InputText v-model="formData.state" :disabled="isDisabled" autocomplete="off" size="large" type="text" class="form-control" />
        </div>
    </div> 
    <div class="row g-2 box-button justify-content-center">
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <NuxtLink class="btn btn-primary btn-lg btn-width-defult">
                <i class="pi pi-arrow-left"></i> Voltar
            </NuxtLink>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-6">
            <NuxtLink @click="handleOnSubmit(true)" class="btn btn-primary btn-lg btn-width-defult">
                <i class="pi pi-check"></i> Confirmar
            </NuxtLink>
        </div>
    </div>
</template>
<script>
    export default{
        props: {
            formData: {
                type: Object,
                required: true
            },
            isDisabled: {
                type: Boolean,
                default: true
            },            
        },
        methods: {
            async handleFetchCepData( value ) {
                this.$emit('handleFetchCepData', value);   
            },
            async handleOnSubmit( value ){
                this.$emit('handleOnSubmit', value); 
            }
        },
        emits: ['handleFetchCepData','handleOnSubmit']
    }
</script>