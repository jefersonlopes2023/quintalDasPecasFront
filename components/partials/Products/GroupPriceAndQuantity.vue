<template>
    <Card>
        <template #title>
            <div class="row">
                <div class="col-lg-10 col-md-10 col-sm-10 col-10">
                    {{ label }}                    
                    <i v-Tooltip.top="tooltip" v-if="tooltip" class="pi pi-question-circle icon-tooltip text-primary"></i>
                </div>
            </div>
        </template>
        <template #subtitle>{{ hint }}</template>
        <template #content>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                    <label for="inputInmetro" class="form-label label-lg">
                        Preço <i v-Tooltip.top="'Preenchimento obrigatório.'" v-if="required" class="bi bi-asterisk icon-required"></i>
                    </label>                 
                    <InputText v-model="formData[1]"  size="large" class="input-text-main-features" :class="{ 'p-invalid': invalid }" :maxlength="'255'" :readonly="compReadOlny[1]" :id="'PRICE'"/>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                    <label for="inputQuantity" class="form-label label-lg">
                        Quantidade <i v-Tooltip.top="'Preenchimento obrigatório.'" v-if="required" class="bi bi-asterisk icon-required"></i>
                    </label>                    
                    <InputText v-model="formData[2]"  size="large" class="input-text-main-features" :class="{ 'p-invalid': invalid }" :maxlength="'255'" :readonly="compReadOlny[2]" :id="'AVAILABLE_QUANTITY'"/>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                    <label for="stockLocation" class="form-label label-lg">
                        Localização no estoque <i v-Tooltip.top="'Preenchimento obrigatório.'" v-if="required" class="bi bi-asterisk icon-required"></i>
                    </label>                    
                    <InputText v-model="formData[3]"  size="large" class="input-text-main-features" :class="{ 'p-invalid': invalid }" :maxlength="'255'" :readonly="compReadOlny[3]" :id="'STOCK_LOCATION'"/>
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
        componentKey: {
            type: Number,
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
            if(!this.formData[1]){
                this.invalid = true;
                return false;
            }
            if(!this.formData[2]){
                this.invalid = true;
                return false;
            }   
            this.$emit('handleConfirm', { name: 'PRICE', value: this.formData[1], label: 'Preço', type:'number', position: this.componentKey});
            this.$emit('handleConfirm', { name: 'QUANTITY', value: this.formData[2], label: 'Qunatidade', type:'number', position: this.componentKey});
            this.$emit('handleConfirm', { name: 'STOCK_LOCATION', value: this.formData[3], label: 'Localização', type:'string', position: this.componentKey});
        },       
        async handleNaoAplica( position ){           
            if(this.compReadOlny[position]){
                this.compReadOlny[position] = false;
                this.btnDisabled = false;
                this.formData[position] = '';
            }else{
                this.compReadOlny[position] = true;
                this.btnDisabled = true;
                this.formData[position] = 'N/A';
            }           
        }
    },   
    emits: ['handleConfirm']
};
</script>
