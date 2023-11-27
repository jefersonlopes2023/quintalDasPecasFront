<template>
   <div class="container">       
      <div class="row">
         <form  @submit.prevent="handleOnSubmit" class="row justify-content-lg-center g-4">               
            <div class="row justify-content-lg-center">
               <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                  <NuxtLink to="/" class="btn btn-outline-primary btn-lg btn-width-defult">
                     <i class="pi pi-home"></i> Página Principal
                  </NuxtLink>
               </div>
               <div class="col-lg-2 col-md-2 col-sm-2 col-2"></div>
               <div class="col-lg-4 col-md-4 col-sm-4 col-4" v-show="isGrid">
                  <NuxtLink @click="handleShowImport()" class="btn btn-outline-primary btn-lg btn-width-defult">
                     <i class="pi pi-file-import"></i> Importar anuncios do Mercado Livre
                  </NuxtLink>
               </div> 
               <div class="col-lg-2 col-md-2 col-sm-2 col-2"></div>
               <div class="col-lg-2 col-md-2 col-sm-2 col-2" v-if="!isForm">
                  <NuxtLink @click="handleCreate(true)" class="btn btn-outline-primary btn-lg btn-width-defult">
                     <i class="pi pi-car"></i> Anunciar
                  </NuxtLink>
               </div>               
               <div class="col-lg-2 col-md-2 col-sm-2 col-2" v-if="isForm">
                  <NuxtLink @click="handleCreate(false)" class="btn btn-outline-primary btn-lg btn-width-defult">
                     Voltar
                  </NuxtLink>
               </div>
            </div> 
            <div class="row justify-content-lg-center" v-if="isProgressBar">
               <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                  <label>Importando itens do mercado livre</label>
                  <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar> 
               </div>
            </div>
            <div class="row justify-content-lg-center" v-if="message">
               <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                  <Message severity="error">{{ message }}</Message>
               </div>
            </div> 
            <div class="row justify-content-lg-center" v-if="isGrid">    
               <div class="col-lg-12 col-md-12 col-sm-12 col-12">                
                  <AdvertsGrid 
                     :items="itemsGrid" 
                     @handleEnableItem="handleEnableItem" 
                     @handleDisableItem="handleDisableItem"
                     @handleEdit="handleEdit"
                  />
               </div>
            </div>
            <div class="row justify-content-lg-center" v-if="isForm">    
               <div class="col-lg-12 col-md-12 col-sm-12 col-12">                
                  <AdvertsForm 
                     @handleSearchCategory="handleSearchCategory"
                     @handleSelectCategory="handleSelectCategory"
                     @handleSearchItems="handleSearchItems"
                     @handleSelectItems="handleSelectItems"
                     @handleSearch="handleSearch"
                     @handleClean="handleClean"
                     @handleImportItem="handleImportItem"
                     @handleGetModelByBrand="handleGetModelByBrand"
                     @handleOnSubmit="handleOnSubmit"
                     :items="items" 
                     :categories="categories"
                     :attributes="attributes"
                     :showcomponent="showcomponent"
                     :componentData="componentData"
                     :isReview="isReview"
                  />
               </div>
            </div>
            <div class="row justify-content-lg-center" v-if="isImport">    
               <div class="col-lg-12 col-md-12 col-sm-12 col-12">                
                 <AdvertsFormPartialsImport />         
               </div>
            </div>           
            <br>
         </form>
      </div>
   </div>
   <Toast></Toast>
</template>
<script>
   import ProductService from "@/src/services/ProductService";
   import Preditor from '@/src/services/PreditorCategoriesService';
   import Attribute from '@/src/services/AttributeService';
   import RegisterProductsService from '@/src/services/RegisterProductsService';

   export default{
      data() {
         return {
            entityId: '',
            itemsGrid: [],
            items: [],
            isProgressBar: false,
            message: '',
            isForm: false,
            showcomponent: [],
            formData: [],
            attributes: {},
            categories: [],
            componentData: {},
            isImport: false,
            isGrid: true,
            isLoad: false,
            isReview: false
         }
      },
      methods: {
         async handleConfirm(value){
            this.formData[value.name] = value;
            this.showcomponent[value.position + 1] = true;
         },  
         async handleGetProductsByEntityId(){
            const productservice = new ProductService();
            this.entityId = localStorage.getItem('entityId');
            const { data: responseData, error: responseError } = await productservice.getProductsByEntityId(this.entityId);
            let status = responseData.value ? responseData._rawValue.status : null;
            status = status ?? (responseError.value ? responseError.value.statusCode : null);                 

            if (status === 200){
                  const data = responseData._rawValue.data;
                  this.itemsGrid = data;
            }
         },
         async handleImportItems(){
            this.isForm = false;
            this.message = '';
            this.isProgressBar = true;
            const productservice = new ProductService();
            const form = new FormData();
            this.entityId =  localStorage.getItem('entityId');

            if (!this.entityId){
               return false;
            }

            form.append('entity_id',this.entityId);
            
            const { data: responseData, error: responseError } = await productservice.importItems(form);
            let status = responseData.value ? responseData._rawValue.status : null;
            status = status ?? (responseError.value ? responseError.value.statusCode : null); 
            let detail = '';
            let severity = '';
            let sumarry = ''

            if (status === 200){                    
               this.isProgressBar = false;
               detail = 'Importação concluida!';
               severity = 'success';
               sumarry = 'Sucesso'
               this.handleGetProductsByEntityId();                    
            }

            if (status > 200){  
               this.isProgressBar = false;
               detail = 'Não foi possível importar registros, verifique se existe credenciais cadastradas.';
               severity = 'error';
               sumarry = 'Erro'
            }

            this.showToast(severity,sumarry,detail);
         },
         async handleEnableItem(id){
            const productService = new ProductService();
            const form = new FormData();
            form.append('deleted_at', null)
            const product = await productService.updateProduct(id, form)
            this.handleGetProductsByEntityId();
         },
         async handleDisableItem(id){
            const productService = new ProductService();                                 
            const product = await productService.destroy(id); 
            this.handleGetProductsByEntityId();   
         },
         async handleCreate( value ){
            this.isForm = value;
            this.isGrid = !value;
            this.items = [];
            this.isReview = false;
         },
         async handleSearchCategory(value){
            try{
                  this.showcomponent[1] = false;
                  this.items = [];
                  this.categories = [];
                  this.componentData = [];   
                  this.formList = [];   
                  this.message = false;  
                  const preditor = new Preditor();
                  const { data: responseData, error: responseError, pending: responsePending } = await preditor.getPreditorCategories(value);
                  let status = responseData.value ? responseData._rawValue.status : null;
                  status = status ?? (responseError.value ? responseError.value.statusCode : null);

                  if( status == 200 ){                
                     let form = [];
                     let img = '';
                     this.formList = [];
                     const data = responseData._rawValue.data;
                     data.forEach(function( vv, key ){                      
                        img = vv.picture ? vv.picture : null;
                        if(img){
                           if(img.indexOf(';') !== -1){
                              img = img.split(';');
                              img = img.length > 0 ? img[(img.length)] : img;
                           }
                        }
                        form[key] = { code: vv.category_id, name: vv.category_name, path: vv.category_root, image: img };
                     });
                     this.categories = form;
                     this.showpredict = true; 
                  }            
            }catch( error ){
               console.log(error)
                  this.message = 'Não foi possível realizar a pesquisa.';
                  this.isValid = true;
                  setTimeout(() => {
                  this.isValid = false;
                  }, 5000);
                  return false;
            }
         },
         async handleSelectCategory(value){
            if( value ){
                  this.formList = [];
                  this.handleGetAttributeByCategoryId( value );
                  this.formList[0] = value;
                  this.showcategory = false;
                  this.showlistcategory = true;
            }            
         },        
         async handleSearchItems(name){
            this.items = [];
            this.categories = [];
            this.showcomponent[1] = false;
            const registerproduct = new RegisterProductsService();
            const { data: responseData, error: responseError, pending: responsePending } = await registerproduct.getSearchByName(name);
            let status = responseData.value ? responseData._rawValue.status : null;
            status = status ?? (responseError.value ? responseError.value.statusCode : null);

            if( status == 200 ){
                  const values = responseData._rawValue.data;
                  const list = []; 
                  values.forEach(function( v, k){
                     list[k] = { 
                        id: v.id, 
                        code: v.id, 
                        name: v.title,                        
                        image: v.thumbnail, 
                        brand: v.brand ? 'Marca: ' + v.brand : null,
                        model: v.model ? 'Model: ' + v.model.slice(0,30) : null,
                        condition: v.condition ? 'Condição: ' + v.condition : null
                     };
                  });
                  this.items = list;
            }
         },
         async handleSelectItems(id){
            this.isReview = true;
            this.attributes = undefined;
            const registerproduct = new RegisterProductsService();
            const { data: responseData, error: responseError } = await registerproduct.getItemsByItem(id);
            let status = responseData.value ? responseData._rawValue.status : null;
            status = status ?? (responseError.value ? responseError.value.statusCode : null);
           
            if( status == 200 ){                 
                  this.attributes = responseData._rawValue.data;                 
            }
         },        
         async handleGetSelected(value){
            if( value?.code ){
                  this.formList = [];
                  this.handleGetAttributeByCategoryId( value.code );
                  this.formList[0] = value;
                  this.showcategory = false;
                  this.showlistcategory = true;
            }            
         },
         async handleShowImport(){
            this.isImport = true;
            this.isGrid = false;
         }, 
         async handleImportItem(value){           
            this.handleGetProductsByEntityId();
            if(value){
               this.isForm = false;
               this.isReview = false;
            }
            this.handleCreate(false);
         },
         async handleGetAttributeByCategoryId(value){
            this.componentData = [];            
            const attribute = new Attribute();
            const { data: responseData, error: responseError } = await attribute.getAttributeByCategoryId(value);
            let status = responseData.value ? responseData._rawValue.status : null;
            status = status ?? (responseError.value ? responseError.value.statusCode : null);
           
            if(status == 200){
               this.handleForm(responseData._rawValue.data);
            }
            
            if(status > 200){
               this.message = 'Não foi possível encontrar registros';
            }
         },
         async handleForm(value){
            this.showcomponent[0] = true;
            const comp = [];
            value.forEach(function( value, key ){                                            
                 comp[key] = value;
                 comp[key].position = (key + 7);
            });
            this.componentData = comp;
         },
         async handleSearch(){
            this.attributes = [];
            this.categories = {};
            this.items = {};
            this.showpredict = true;
            this.isReview = false;
         },
         async handleClean(){
            this.items = [];
            this.categories = {};
         },
         async showToast(severity, summary, detail) {
            this.$toast.add({ severity: severity, summary: summary, detail: detail });
         },
         async handleGetModelByBrand(data, domain){
          
         },
         async handleOnSubmit(){
            // this.isForm = true;
         },
         async handleEdit(data){
            this.attributes = data;
            this.isForm = true;
            this.isReview = true;
            this.isGrid = false;
         }
      },
      mounted() {
         this.handleGetProductsByEntityId()
      }
   }

</script>