<template>
    <Card>
        <template #title>
            <div class="row">
                <div class="col-lg-10 col-md-10 col-sm-10 col-10">
                    {{ label }}
                    <i v-Tooltip.top="'Preenchimento obrigatório.'" v-if="required" class="bi bi-asterisk icon-required"></i>
                    <i v-Tooltip.top="tooltip" v-if="tooltip" class="pi pi-question-circle icon-tooltip text-primary"></i>
                </div>
            </div>
        </template>
        <template #subtitle>{{ hint }}</template>
        <template #content>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <label for="inputInmetro" class="form-label label-lg">Número de registro/certificação INMETRO</label>
                    <Button v-if="!compReadOlny[1]" v-Tooltip.top="toopTipNaoAplica" icon="pi pi-eye" severity="primary" text   aria-label="Favorite" @click="handleNaoAplica(1)" class="float-end btn-sm" />
                    <Button v-if="compReadOlny[1]"  v-Tooltip.top="toopTipNaoAplica" icon="pi pi-eye-slash" severity="primary" text  aria-label="Favorite" @click="handleNaoAplica(1)"  class="float-end" />
                    <InputText v-model="formData.inmetro"  size="large" class="input-text-main-features" :class="{ 'p-invalid': invalid }" :maxlength="'255'" :readonly="compReadOlny[1]" :id="'inmetro'"/>
                </div>               
            </div>
        </template> 
        <template #footer>
            <div class="row g-2">             
                <div class="col-lg-3 col-md-12 col-sm-12 col-12 justify-content-end"></div>
                <div class="col-lg-3 col-md-12 col-sm-12 col-12 justify-content-end"></div> 
                <div class="col-lg-3 col-md-12 col-sm-12 col-12 justify-content-end"></div>
                <div class="col-lg-3 col-md-12 col-sm-12 col-12 justify-content-end">
                    <Button label="Confirmar" outlined @click="handleConfirm()" size="large" class="float-end" />
                </div>
            </div>
        </template>
    </Card>
</template>
<script>

export default {
    props: {       
        options: {
            type: Object,
            required: false
        },
        tooltip: {
            type: String,
            required: false,
            default: ''
        },
        hint: {
            type: String,
            required: false
        },
        required: {
            type: Boolean,
            required: false,
            defult: true
        },
        value_max_length: {
            type: Number,
            required: false,
            default: 255
        },
        readonly : {
            type: Boolean,
            required: false,
            default: false
        },
        label: {
            type: String,
            required: true,
            default: ''
        },
        hint: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            formData: [],
            btnDisabled: false,
            invalid: false,
            compReadOlny: [],
            toopTipNaoAplica: 'Não aplica.'
        };
    },
    methods: {
        async handleConfirm(){
            this.invalid = false;
            if(!this.formData){                
                return false;
            }            
            this.$emit('handleConfirm', { name: 'INMETRO', value: this.formData.inmetro, label: 'Número de registro/certificação INMETRO', position: 4});
        },       
        async handleNaoAplica( position ){
            if(this.compReadOlny[position]){
                this.compReadOlny[position] = false;
                this.btnDisabled = false;
                this.formData.inmetro = '';
            }else{
                this.compReadOlny[position] = true;
                this.btnDisabled = true;
                this.formData.inmetro = 'N/A';
            } 
        }
    },   
    emits: ['handleConfirm']
};
</script>
