<template>
    <div class="row g-2 justify-content-center">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <label for="inputNome" class="form-label label-lg">Nome</label>
            <InputText @blur="setFormDataIndividual(formData)" autocomplete="off" size="large" v-model="formData.name" type="text" class="form-control" id="inputNome" name="name" maxlength="150" />
            <small class="p-error" id="text-error" v-if="errorMessage.name">{{ errorMessage.name || '&nbsp;' }}</small>
        </div>
    </div>
    <div class="row g-2 justify-content-center">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <label for="inputCPF" class="form-label label-lg">CPF</label>
            <InputMask @blur="setFormDataIndividual(formData)" id="basic" mask="999.999.999-99" v-model="formData.cpf_cnpj" class="form-control p-inputmask p-inputmask-lg"  />
            <small class="p-error" id="text-error" v-if="errorMessage.cpf">{{ errorMessage.cpf || '&nbsp;' }}</small>
        </div>       
    </div>
</template>
<script>
    export default { 
        props : {
            errorMessage : {
                type : Object
            },
            formData: {
                type: Object,
                required: true
            }
        },
        methods:{
            setFormDataIndividual(value){
                this.$emit('setFormDataIndividual', value);
            }
        },
        emits: ['setFormDataIndividual'],
    }
</script>