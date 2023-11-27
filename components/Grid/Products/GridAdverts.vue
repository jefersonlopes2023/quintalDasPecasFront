<template>
    <div class="container">       
        <div class="row">
            <form  @submit.prevent="handleOnSubmit" class="row justify-content-lg-center g-4">               
                <div class="row justify-content-lg-center">
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        <NuxtLink to="/" class="btn btn-outline-primary btn-lg btn-width-defult">
                            Página Principal
                        </NuxtLink>
                    </div>                    
                    <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                        <NuxtLink @click="handleImportItems()" class="btn btn-outline-primary btn-lg btn-width-defult">
                            <i class="pi pi-download"></i> Importar itens do Mercado Livre
                        </NuxtLink>
                    </div> 
                    <div class="col-lg-4 col-md-4 col-sm-4 col-4"></div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2" v-if="!isForm">
                        <NuxtLink @click="handleCreate(true)" class="btn btn-outline-primary btn-lg btn-width-defult">
                            Cadastrar
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
                        <Message severity="success">{{ message }}</Message>
                    </div>
                </div> 
                <div class="row justify-content-lg-center" v-if="!isForm">    
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">                
                        <PartialsProductsGrid :items="productItem" @handleEnableItem="handleEnableItem" @handleDisableItem="handleDisableItem" />
                    </div>
                </div>
                <div class="row justify-content-lg-center" v-if="isForm">    
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">                
                        <FormProducts />
                    </div>
                </div>
            </form>
         </div>
    </div>
</template>

<script>
    import ProductService from "@/src/services/ProductService";

    export default{
        data() {
            return {
                entityId: '',
                productItem: [],
                isProgressBar: false,
                message: '',
                isForm: false
            }
        },
        methods: {
            async handleGetProductsByEntityId(){
                const productservice = new ProductService();
                this.entityId = localStorage.getItem('entityId');
                const { data: responseData, error: responseError } = await productservice.getProductsByEntityId(this.entityId);
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);                 
             
                if (status === 200){
                    const data = responseData._rawValue.data;
                    this.productItem = data;
                }
            },
            async handleImportItems(){
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

                if (status === 200){                    
                    this.isProgressBar = false;
                    this.message = 'Importação concluida!';
                    this.handleGetProductsByEntityId();                    
                }

                if (status > 200){  
                    this.isProgressBar = false;
                }
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
            async handleCreate(isForm){
                this.isForm = isForm;
            }
        },
        mounted() {
            this.handleGetProductsByEntityId()            
        }
    }

</script>