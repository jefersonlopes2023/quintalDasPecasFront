<template>
    <Card>
        <template #header>                
        </template>
        <template #title> 
            <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-12">
                    Revise a ficha técnica 
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <span class="float-end">
                        <Button @click="handleSearch()" text class="btn-search-custom">
                            Refazer a busca
                        </Button>
                    </span>
                </div>
            </div>
        </template>
        <template #subtitle> 
            Estes são todos os dados que vamos preencher para você.          
        </template>
        <template #content>
            <div class="row" v-if="items.title">
                <div class="col-lg-12 col-md-12 col-sm-12 justify-content-end">
                    <label class="form-label label-lg">{{ items.title }}</label>
                </div>
            </div>
            <div class="row" v-if="items.title">
                <div class="col-lg-12 col-md-12 col-sm-12 justify-content-end">
                    <label class="form-label label-lg">Preço:</label><br />
                    <span v-if="!isEdit" class="fs-4">{{ !formData.price ? items.price : formData.price}}</span>
                    <span v-if="isEdit">
                        <InputNumber 
                            v-model="formData.price" 
                            :class="{ 'p-invalid': !formData.price}" 
                            class="p-valid inputNumber" 
                            inputId="minmaxfraction" 
                            :minFractionDigits="2" 
                            :maxFractionDigits="5" 
                            mode="decimal" 
                        />
                    </span>
                </div>
            </div>
            <div class="row" v-if="items.title">
                <div class="col-lg-12 col-md-12 col-sm-12 justify-content-end">
                    <label class="form-label label-lg">Preço promocional:</label><br />
                    <span v-if="!isEdit" class="fs-4">{{ !formData.base_price ? items.base_price : formData.base_price}}</span>
                    <span v-if="isEdit">
                        <InputNumber 
                            v-model="formData.base_price" 
                            :class="{ 'p-invalid': !formData.base_price}" 
                            class="p-valid inputNumber" 
                            inputId="minmaxfraction" 
                            :minFractionDigits="2" 
                            :maxFractionDigits="5" 
                            mode="decimal" 
                        />
                    </span>
                </div>
            </div>
            <div class="row" v-if="items.title">
                <div class="col-lg-12 col-md-12 col-sm-12 justify-content-end">
                    <label class="form-label label-lg">Quantidade:</label><br />
                    <span v-if="!isEdit" class="fs-4">{{ !formData.avaliable_quantity ?  items.avaliable_quantity : formData.avaliable_quantity}}</span>
                    <span v-if="isEdit">
                        <InputNumber 
                            v-model="formData.avaliable_quantity" 
                            :class="{'p-invalid': !formData.avaliable_quantity}" 
                            class="inputNumber" 
                            inputId="minmaxfraction"
                        />
                    </span>
                </div>
            </div>
            <div class="row" v-if="items.title">
                <div class="col-lg-12 col-md-12 col-sm-12 justify-content-end">
                    <label class="form-label label-lg">Localização no estoque:</label><br />
                    <span v-if="!isEdit" class="fs-4">{{ !formData.stock_location ?  items.stock_location : formData.stock_location}}</span>
                    <span v-if="isEdit">
                        <Dropdown
                            v-model="formData.stock_location"
                            :class="{'p-invalid': !formData.stock_location}"
                            editable
                            showClear
                            :options="[]"                           
                        />
                    </span>
                </div>
            </div>
            <div class="row" v-if="items.title">
                <div class="col-lg-12 col-md-12 col-sm-12 justify-content-end"  v-for="(item, k) in items.attributes">            
                    <label class="form-label label-lg">{{ item.name }}:</label><br />
                    <span v-if="!isEdit" class="fs-4">
                        {{  item.value_name }}
                    </span>
                    <span v-if="isEdit">
                        <Dropdown
                            v-model="formAttributes[item.ml_attribute_id ? item.ml_attribute_id : item.id]"
                            editable
                            showClear
                            :options="item.options"
                            optionLabel="name"
                            @change="handleChange(item.id)"
                        />
                    </span> 
                </div>
            </div>
            <div class="row" v-if="items.title">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <br><span class="fs-6"><b>Imagens:</b></span>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12" v-for="picture in items.pictures">                  
                    <Image :src="picture.url" alt="Image" imageClass="img-size" preview />
                </div>                    
            </div>
            <div  v-if="!items.title">   
                <div class="flex justify-content-center">
                    <ProgressSpinner />
                </div>
            </div>
        </template>
        <template #footer  v-if="items.title">
            <div class="row g-2">              
                <div class="col-lg-6 col-md-6 col-sm-6 justify-content-start">
                    <Button @click="handleEdit()" label="Editar" outlined  size="large" class="float-center" />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 justify-content-end">
                    <Button label="Confirmar" @click="handleImportItem()" outlined  size="large" class="float-end" />
                </div>
            </div>
        </template>
    </Card>
    
</template>
<script>
import RegisterProductsService from '@/src/services/RegisterProductsService';

export default {
    props:{
        items:{
            type: Object,
            required: true,
            default: undefined
        }
    },
    data() {
        return {
            i: 0,
            isEdit: false,
            selected: [],
            images: null,
            position: 'left',
            positionOptions: [
                {
                    label: 'Bottom',
                    value: 'bottom'
                },
                {
                    label: 'Top',
                    value: 'top'
                },
                {
                    label: 'Left',
                    value: 'left'
                },
                {
                    label: 'Right',
                    value: 'right'
                }
            ],
            responsiveOptions: [
                {
                    breakpoint: '991px',
                    numVisible: 4
                },
                {
                    breakpoint: '767px',
                    numVisible: 3
                },
                {
                    breakpoint: '575px',
                    numVisible: 1
                }
            ],
            formData: [],
            formAttributes: [],
            formChange: []
        };
    },   
    methods:{
        async handleSearch(){  
            this.isLoad = true;        
            this.$emit('handleSearch'); 
        },
        async handleEdit(){
            if(this.isEdit){
                this.isEdit = false;
            } else if(!this.isEdit){
                this.isEdit = true;
            }

            const at = this.items.attributes;
            const tt = [];
            at.forEach(function(v, k){
                let id = v.ml_attribute_id ? v.ml_attribute_id : v.id;
                tt[id] = v.value_name == "undefined" ? "" : v.value_name;
            });
            this.formAttributes = tt;
            this.formData.price = this.items.price;
            this.formData.base_price = this.items.base_price;
            this.formData.avaliable_quantity = this.items.avaliable_quantity;
            this.formData.stock_location = this.items.stock_location;

        },
        async handleImportItem(){

            if(!this.formData.avaliable_quantity){
                this.showToast('warn','Atenção','Campo quantidade não pode permanecer em branco.');
                this.handleEdit(this.items);
                return false;
            }

            if(!this.formData.price){
                this.showToast('warn','Atenção','Campo preço não pode permanecer em branco.');
                this.handleEdit(this.items);
                return false;
            }

            const importItem = new RegisterProductsService();
            let form = new FormData();
            let value = this.items.attributes;
            let i = 0;
            const listingTypeFree = 'free';

            form.append('ml_id', this.items.ml_product_id ?? this.items.ml_id );
            form.append('id', this.items.id);
            form.append('entity_id', localStorage.getItem('entityId'));
            form.append('listing_type_id', listingTypeFree);
            form.append('original_price', 0);
            form.append('buying_mode', 0);
            form.append('category_id', this.items.category_id);
            form.append('avaliable_quantity', this.formData.avaliable_quantity);
            form.append('price', this.formData.price);
            form.append('base_price', this.formData.base_price);
            form.append('stock_location', this.formData.stock_location);            

            for(const v in value){
                let attribute = value[v].ml_attribute_id ? value[v].ml_attribute_id : value[v].id;
                if(this.formChange[attribute]){
                    let valueId = value[v].ml_values_id ? value[v].ml_values_id : value[v].values_id;
                    let valueName = value[v].values ? value[v].values : value[v].values_name;
                    let valueAtt = this.formChange[attribute]; 
                    
                    valueName = valueAtt ? valueAtt : valueName;
                    valueId = valueAtt ? -1 : valueId;

                    let field = `attributes[${i}][id]`;
                    form.append(field, attribute);
                    field = `attributes[${i}][value_id]`;
                    form.append(field, valueId);
                    field = `attributes[${i}][value_name]`;
                    form.append(field, valueName);
                    i++;
                }                
            }

            const { data: responseData, error: responseError } = await importItem.importItem(form);
            let status = responseData.value ? responseData._rawValue.status : null;
            status = status ?? (responseError.value ? responseError.value.statusCode : null);
          
            if(status === 201){
                this.showToast('success', 'Sucesso', 'Salvo com sucesso');  
                form = []; 
                this.$emit('handleImportItem', true);           
            }

            if(status === 400){
                this.showToast('error', 'Erro', responseError.value.data.data[0]);                    
            }

        },     
        async showToast(severity, summary, detail) {
            this.$toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
        },
        async handleChange(index){
            this.formChange[index] = this.formAttributes[index];
        }
    },
    emits: ['handleSearch','handleImportItem']
};
</script>