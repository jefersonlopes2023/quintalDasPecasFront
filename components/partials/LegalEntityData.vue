<template>
    <div class="row g-2 justify-content-center">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <label for="inputCNPJ" class="form-label label-lg">CNPJ</label>
            <InputMask @blur="setFormDataEntity(formData)" v-model="formData.cpf_cnpj" id="inputCNPJ" mask="99.999.999/9999-99" class="form-control p-inputmask p-inputmask-lg" autocomplete="off" name="cpf_cnpj" />
            <small class="p-error" id="text-error" v-if="errorMessage.cnpj">{{ errorMessage.cnpj || '&nbsp;' }}</small>
        </div>       
    </div>
    <div class="row g-2 justify-content-center">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <label for="inputBusinessName" class="form-label label-lg">Razão Social</label>
            <InputText @blur="setFormDataEntity(formData)" v-model="formData.name" type="text" class="form-control" size="large" id="inputBusinessName" name="name" />
            <small class="p-error" id="text-error" v-if="errorMessage.name">{{ errorMessage.name || '&nbsp;' }}</small>
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
            setFormDataEntity(value){
                this.$emit('setFormDataEntity', value);
            }
        },
        emits: ['setFormDataEntity'],
    }
</script>