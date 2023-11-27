<template> 
    <div class="container"  v-if="showpredict">       
        <div class="row">         
            <form  @submit.prevent="handleOnSubmit" class="row justify-content-lg-center g-4">                               
                <div class="row justify-content-lg-center">
                    <div class="col-lg-8 col-md-12 col-sm-12 col-8">
                        <h2>
                            <p>Vamos começar identificando seu produto.</p>
                        </h2>
                    </div>
                </div>    
                <div class="row justify-content-lg-center">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12 g-4">
                        <PartialsProductsAutoComponent
                            :id="1" 
                            :attribute_id="'TITLE'" 
                            :component="'TEXT_INPUT'" 
                            :label="'Preencha o título do anúncio'" 
                            :options="[]" 
                            :hint="'Inclua somente o produto, marca, modelo e características principais. Lembre-se de que, quando receber uma venda, você não poerá editá-lo.'" 
                            :tooltip="''"
                            :name="'TITLE'"
                            :hidden="false"
                            :required="true"
                            :value_max_length="255"
                            :componentKey="0"
                            :readonly="false"
                            @handleConfirm="handleConfirm"
                            disabled
                            :type="'string'"
                            @handleSearch="handleSearch"
                        />
                    </div>
                </div> 
                <div v-if="showcomponent[1]" class="row justify-content-lg-center">
                    <div class="col-lg-8 col-md-8 col-sm-12 col-12 g-4">                      
                        <PartialsProductsGroupBrandAndModel                           
                            :label="'Preencha as informações do seu produto.'"
                            :hint="''"
                            :required="true"
                            @handleConfirm="handleConfirm"
                            @handleGetModelByBrand="handleGetModelByBrand"
                            :hidden="false"
                            :options="listBrand"                           
                            :componentKey="1"
                            :type="'string'"
                        />
                    </div>
                </div>              
                <div v-if="showcomponent[2]" class="row justify-content-lg-center">
                    <div class="col-lg-8 col-md-8 col-sm-12 col-12 g-4" >
                        <PartialsProductsItemCondition                           
                            :label="'Qual é a condição do seu produto?'"
                            :hint="'Se foi usado de alguma forma, selecione usado.'"
                            :required="true"
                            @handleConfirm="handleConfirm"
                            :hidden="false"
                            :options="listCondition"
                            :componentKey="2"                       
                        />
                    </div>
                </div>
                <div v-if="showcomponent[3]" class="row justify-content-lg-center">
                    <div class="col-lg-8 col-md-8 col-sm-12 col-12 g-4"  >
                        <PartialsProductsGroupPriceAndQuantity
                            :label="'Preencha as informações do seu produto.'"
                            :hint="''"
                            :required="true"
                            @handleConfirm="handleConfirm"
                            :hidden="false"
                            :componentKey="3"
                        />
                    </div>
                </div>
                <div v-if="showcomponent[4]" class="row justify-content-lg-center">
                    <div class="col-lg-8 col-md-12 col-sm-12 col-12 g-4">
                        <PartialsProductsRegulatoryInformation                            
                            :label="'Preencha as informações regulatórias'"
                            :hint="'Conforme a legislação vigete do Brasil, estes dados são necessários para que você possa vender seu produto'"
                            @handleConfirm="handleConfirm"
                            :componentKey="4"                          
                        />
                    </div>
                </div> 
                <div v-if="showcomponent[5]" class="row justify-content-lg-center">
                    <div class="col-lg-8 col-md-12 col-sm-12 col-12 g-4">
                        <PartialsProductsUniversalCode
                            v-if="showcomponent[5]" 
                            :label="'Qual é o código universal do seu produto?'"
                            :hint="'É o número que identifica um produto em nível global. Está localizado na embalagem ou etiqueta, próximo ao código de barras'"
                            @handleConfirm="handleConfirm" 
                            :componentKey="5"                         
                        />
                    </div>
                </div>               
                <div v-if="showcomponent[6]" class="row justify-content-lg-center">
                    <div class="col-lg-8 col-md-12 col-sm-12 col-12 g-4">
                        <PartialsProductsUploads                        
                        :componentKey="6"
                        @handleConfirm="handleConfirm"  />
                    </div>
                </div>
                <span v-for="(group) in componentData">
                    <div v-if="showcomponent[group.position]" class="row justify-content-lg-center">
                        <div class="col-lg-8 col-md-12 col-sm-12 col-12">
                            <PartialsProductsAutoComponent
                                :id="group.position" 
                                :attribute_id="group.ml_attribute_id" 
                                :component="group.component" 
                                :label="group.name" 
                                :hint="group.hint" 
                                :tooltip="group.tooltip" 
                                :options="{ 
                                    options: group.options, 
                                    domain: group.ml_domain_id, 
                                    attributeId: group.ml_attribute_id
                                }" 
                                :name="group.ml_attribute_id"
                                :componentKey="group.position" 
                                :hidden="group.hidden ? true : false" 
                                :value_max_length="group.value_max_length" 
                                :required="group.required ? true : false"
                                :type="group.value_type"
                                @handleConfirm="handleConfirm"                               
                            /><br>
                        </div>
                    </div>
                    <div v-if="showbuttom[group.position]" class="row justify-content-lg-center">
                        <Card>
                            <template #content>
                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                                        <Button @click="handleReset()" label="Cancelar" outlined size="large" class="float-start" />
                                    </div>
                                    <div class="col-lg-8 col-md-8 col-sm-8 col-8">
                                    </div>
                                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                                        <Button @click="handleOnSubmit()" label="Cadastrar" outlined size="large" class="float-end" />
                                    </div>
                                </div>
                            </template>
                        </Card>
                    </div>
                </span>                               
            </form>
        </div>
    </div>  
    <Toast />
</template>
<script>
import items from "@/src/services/RegisterProductsService";
export default {
    props:{
        showcomponent: { 
            type: Object,
            required: true,
            default: []
        },
        componentData: { 
            type: Object,
            required: true,
            default: {}
        }
    },
    data(){
        return {
            formList: [],
            formData: [],
            showpredict: true,
            listCondition:[{
                code: 'new',
                name: 'Novo'
            },
            {
                code: 'used',
                name: 'Usado'
            },
            {
                code: 'reconditioned',
                name: 'Recondicionado'
            }],
            listBrand: [],
            showbuttom: []
        };
    },
    methods: {
        async showToast(severity, summary, detail) {
            this.$toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
        }, 
        async handleOnSubmit(){
            
            // const isValid = await this.isValidForm();

            // if(!isValid){
            //     this.$emit('handleOnSubmit',false);
            //     return false;
            // }

            const data = this.formData;
            const form = new FormData();
            let i = 0;
            let add = false;
            const entityId = localStorage.getItem('entityId');
            const userId = localStorage.getItem('userId');
            form.append('user_id', userId);
            form.append('entity_id', entityId);
            form.append('listing_type_id', 'free');            
            form.append('category_id', this.componentData[0].ml_category_id)
            form.append('currency_id', 'BRL');
            form.append('buying_mode', 'buy_it_now');
            form.append('id', '');
            form.append('original_price', 0.00);
            form.append('domain_id', this.componentData[0].ml_domain_id);           
            form.append('upload_type', 'items'); 

           for(const v in data){

                if (data[v].name == 'files'){
                    const file = data[v].value;

                    file.forEach(function(v,k){
                        form.append('files['+ k +']', v); 
                    })
                    add = true;
                }

                if (data[v].name == 'TITLE'){
                    form.append('title', data[v].value);
                    add = true;
                }

                if (data[v].name == 'ITEM_CONDITION'){
                    form.append('condition', data[v].value.code);
                    add = true;
                }

                if (data[v].name == 'PRICE'){
                    form.append('price', data[v].value);
                    add = true;
                }

                if (data[v].name == 'QUANTITY'){
                    form.append('avaliable_quantity', data[v].value);
                    add = true;
                }

                if (data[v].name == 'STOCK_LOCATION'){
                    form.append('stock_location', data[v].value);
                    add = true;
                }

                if(!add){
                    form.append('attributes['+data[v].name+'][id]', data[v].name);  
                    form.append('attributes['+data[v].name+'][name]', data[v].label);
                    form.append('attributes['+data[v].name+'][value_type]', data[v].type);

                    if(data[v].value == 'N/A'){                        
                        form.append('attributes['+data[v].name+'][value_id]', -1);
                        form.append('attributes['+data[v].name+'][value_name]', -1);
                    } else {
                        form.append('attributes['+data[v].name+'][value_id]', data[v].value?.code ?? null);
                        form.append('attributes['+data[v].name+'][value_name]', data[v].value?.name ?? data[v].value);
                    }                    
                }
                i++;
                add = false;
            }

            const item = new items();
            const {data: responseData, error: responseError} = await item.upload(form);

            let status = responseData.value ? responseData._rawValue.status : null;
            status = status ?? (responseError.value ? responseError.value.statusCode : null);

            if(status == 201){
                this.showToast('success','Sucesso','Registro salvo com sucesso');
                this.formData = [];
                this.showbuttom = [];
                this.$emit('handleOnSubmit',true);

                const showComponent = this.showcomponent;
                for(let i = 1; showComponent.length > i; i++){
                    this.showcomponent[i] = false;
                }
            }
            
        },
        async handleReset(){
            this.formData = [];
        },
        async handleConfirm( value ){
            this.formData[value.name] = value;
            this.showcomponent[value.position + 1] = true;
            this.showbuttom[value.position] = false;
            this.showbuttom[value.position + 1] = true;
            let values = this.componentData ?? [];
            let list = [];

            if(values.length){
                values.forEach(function(v,k){
                    if(v.ml_attribute_id == 'BRAND'){
                        list = { options: v.options, domain: v.ml_domain_id }
                    }
                });
                this.listBrand = list;
            }
        },     
        async handleSearchOtherCategory(){
            this.showpredict = true; 
        },
        async handleClean( value ){
            this.formData.name = '';
            this.$emit('handleClean');
        },
        async handleSearch(){
            this.$emit('handleSearch');
        },       
        async handleSelectItems(id){
            this.$emit('handleSelectItems', id);
            this.showpredict = false;
        },
        async handleSearchItems(name){
            this.$emit('handleSearchItems', name);
        },
        async handleSearchCategory(name){
            this.$emit('handleSearchCategory', name);
        },
        async handleSelectCategory(id){
            this.showpredict = true;
            this.$emit('handleSelectCategory', id);
        },
        async handleImportItem( data ){
            this.$emit('handleImportItem', data);
        },
        async handleGetModelByBrand( data, domain ){
            this.$emit('handleGetModelByBrand', data, domain);
        },
        async isValidForm(){
            const data = this.formData;
            let isValid = true;
           
            if(data.length == 0){
                this.showToast('warn','Atenção','Campos obrigatórios em branco.');
                isValid = false;
            }
            
            return isValid;
        }
    },
    emits: [
        'handleSelectItems',
        'handleSearchItems',
        'handleClean',
        'handleSearchCategory',
        'handleSelectCategory',
        'handleSearch',
        'handleImportItem',
        'handleGetModelByBrand',
        'handleOnSubmit'
    ]
}
</script>