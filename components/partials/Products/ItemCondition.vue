<template>
    <Card>
        <template #title>
            <div class="row">
                <div class="col-lg-10 col-md-10 col-sm-10 col-10">
                    {{ label }}  <i v-Tooltip.top="'Preenchimento obrigatório.'" v-if="required" class="bi bi-asterisk icon-required"></i>
                    <i v-Tooltip.top="tooltip" v-if="tooltip" class="pi pi-question-circle icon-tooltip text-primary"></i>
                </div>
            </div>
        </template>
        <template #subtitle>{{ hint }}</template>
        <template #content>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <Dropdown optionLabel="name" editable showClear v-model="formData" class="w-full" :options="options" id="ITEM_CONDITION" />
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
            required: false,
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
        },componentKey: {
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
            toopTipNaoAplica: 'Não aplica.',
            selected:''
        };
    },
    methods: {
        async handleConfirm(){           
            this.$emit('handleConfirm', { name: 'ITEM_CONDITION', value: this.formData, label: 'Condição do item', type:'list', position:this.componentKey});
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
