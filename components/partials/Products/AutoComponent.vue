<template>
    <Card>
        <template #title>
            <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-8 col-8">
                    {{ label }}
                    <i v-Tooltip.top="'Preenchimento obrigatório.'" v-if="required" class="bi bi-asterisk icon-required"></i>&nbsp;
                    <i v-Tooltip.top="tooltip" v-if="tooltip" class="pi pi-question-circle icon-tooltip text-primary"></i>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-2"  v-if="attribute_id != 'TITLE'"></div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-2  d-md-flex justify-content-end" v-if="hidden == true || (hidden == false && required == false)">
                    <Button v-if="!compReadOlny[componentKey]" v-Tooltip.top="toopTipNaoAplica" icon="pi pi-eye" severity="primary" rounded outlined  aria-label="Favorite" @click="handleNaoAplica(componentKey)" />
                    <Button v-if="compReadOlny[componentKey]"  v-Tooltip.top="toopTipNaoAplica" icon="pi pi-eye-slash" severity="primary" rounded outlined aria-label="Favorite" @click="handleNaoAplica(componentKey)" />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-4  d-md-flex justify-content-end" v-if="attribute_id == 'TITLE'">
                    <Button @click="handleSearch()" text class="btn-search-custom">Refazer a busca</Button>
                </div> 
            </div>
        </template>
        <template #subtitle>
            {{ hint }}
        </template>
        <template #content>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">                   
                    <Dropdown 
                        v-if="component === 'COMBO' 
                            || component === 'COLOR_INPUT' 
                            || component === 'TEXT_OUTPUT'
                            || component === 'TEXT_INPUT' 
                            || component === 'NUMBER_INPUT' 
                            || component === 'NUMBER_UNIT_INPUT'" 
                        v-model="value" 
                        :options="options.options" 
                        optionLabel="name" 
                        placeholder="" 
                        class="w-full" 
                        :class="{ 'p-invalid': invalid }" 
                        :disabled="compReadOlny[componentKey]" 
                        :id="name + componentKey"
                        editable
                        showClear
                    />          
                    <InputNumber 
                        inputId="locale-user" 
                        prefix="R$ " 
                        :minFractionDigits="2" 
                        v-if="component === 'CURRENCY_INPUT'" 
                        v-model="currency"  
                        size="large" 
                        class="input-text-main-features" 
                        :class="{ 'p-invalid': invalid }" 
                        :maxlength="value_max_length" 
                        :readonly="compReadOlny[componentKey]" 
                        :id="name + componentKey"
                    />  
                </div>
            </div>
           
            <div class="row" v-if="component === 'BOOLEAN_INPUT'">
                <div class="col-lg-3 col-md-3 col-sm-3 col-3" ></div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-3" >
                    <div class="flex align-items-center" >
                        <RadioButton v-model="value" :inputId="'radiobuttonyes' + componentKey" value="Sim" />
                        <label :for="'radiobuttonyes' + componentKey" class="ml-2 form-label"> Sim</label>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-3">    
                    <div class="flex align-items-center">
                        <RadioButton v-model="value" :inputId="'radiobuttonno' + componentKey" value="Não" />
                        <label :for="'radiobuttonno' + componentKey" class="ml-2 form-label"> Não</label>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-3" ></div>
            </div>  
        </template> 
        <template #footer>
            <div class="row g-2">             
                <div class="col-lg-3 col-md-12 col-sm-12 col-12 justify-content-end"></div>
                <div class="col-lg-3 col-md-12 col-sm-12 col-12 justify-content-end"></div> 
                <div class="col-lg-3 col-md-12 col-sm-12 col-12 justify-content-end"></div>
                <div class="col-lg-3 col-md-12 col-sm-12 col-12 justify-content-end">
                    <Button label="Confirmar" outlined  @click="handleConfirm(name, !this.value ? this.currency : this.value, attribute_id, componentKey, true, label, type)" size="large" class="float-end" />
                </div>
            </div>
        </template>
    </Card>
</template>
<script>
import items from "@/src/services/RegisterProductsService";
export default {
    props: {       
        options: {
            type: Object,
            required: false
        },
        component: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        tooltip: {
            type: String,
            required: false
        },
        hint: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        componentKey: {
            type: Number,
            required: true
        },
        attribute_id: {
            type: String,
            required: true
        },
        hidden: {
            type: Boolean,
            required: true
        },
        required: {
            type: Boolean,
            required: true
        },
        value_max_length: {
            type: Number,
            required: true,
            default: 255
        },       
        formGroup: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            value: '',
            selected: '',
            currency: 0.00,
            btnDisabled: false,
            invalid: false,
            compReadOlny: [],
            toopTipNaoAplica: 'Não aplica.'
        };
    },
    methods: {
        async handleConfirm(nameProp, valueProp, attibuteId, position, required, label, type){           
            this.invalid = false;
            if(required && !valueProp){
                this.invalid = true;
                this.showToast('warn','Atenção!','O campo não pode permanecer em branco.');
                return false; 
            }
            this.$emit('handleConfirm', { 
                name: nameProp.toUpperCase(), 
                value: valueProp, 
                label: label, 
                type: type, 
                position: position 
            });
        },        
        async handleNaoAplica( position ){
            if(this.compReadOlny[position]){
                this.compReadOlny[position] = false;
                this.btnDisabled = false;
                this.value = '';
            }else{
                this.compReadOlny[position] = true;
                this.btnDisabled = true;
                this.value = 'N/A';
            } 
        },
        async handleGetReference(data, domain, attributeOrigin, attributeId){
            if (data){
                this.optionModel = [];
                this.formData[2] = [];
                const Items = new items();
                const form = new FormData();
                form.append('domainId', domain);
                form.append('attributeId', attributeId);
                form.append('known_attributes[id]', attributeOrigin);
                form.append('known_attributes[value_id]', data.code);
                const {data: responseData, error: responseError} = await Items.getOptionsAttributes(form);
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);

                if( status == 200 ){               
                    this.optionModel = responseData._rawValue.data;
                }
                this.$emit('handleGetModelByBrand', data, domain, attributeOrigin, attributeId);
            }
        },
        async showToast(severity, summary, detail) {
            this.$toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
        },
        async handleSearch(){
            this.$emit('handleSearch'); 
        },
    },   
    emits: ['handleConfirm','handleSearch']
};
</script>
