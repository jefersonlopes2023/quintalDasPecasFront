<template>   
    <Card>       
        <template #content>
            <div class="row box-image">
                <Message severity="error" v-if="isMessage"  :closable="false">{{ message }}</Message>
                <div class="col-lg-10 col-md-10 col-sm-10 col-10">
                    <span class="p-inputgroup" style="width: 100%;">
                        <span class="p-inputgroup-addon no-border no-border-right">
                            <i class="pi pi-search" />
                        </span>
                        <InputText @keydown.enter="handleSearch(typeSearch, formData.name)" v-model="formData.name" :placeholder="placeholder" :name="'predict'" size="large" class="input-text-main-features" />
                        <span class="p-inputgroup-addon no-border no-border-left">
                            <NuxtLink @click="handleClean()"><i class="pi pi-times" /></NuxtLink>
                        </span>
                    </span>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-2 d-grid gap-2 d-md-flex justify-content-start">
                    <Button label="Buscar" size="large" class="btn-search-custom" text  outlined @click="handleSearch(typeSearch, formData.name)" />                   
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-12" v-if="products.length > 1 ? true : false">
                    <h5>Não encontrou o item na lista, 
                        <NuxtLink to="#" @click="handleSearch(products.length ? 1 : (categories.length ? 2 : 0), formData.name)">
                            <span v-if="categories.length < 0">
                                Pesquisar produto!
                            </span>
                            <span v-if="products.length > 0">
                                Pesquisar categoria!
                            </span>
                        </NuxtLink>                        
                    </h5>
                    <h5>Estes produtos coincidem com sua busca. Algum deles é o seu?</h5>
                </div>
            </div>
            <div class="row box-image row-border cursor-pointer" v-for="product in products">
                <div class="col-lg-2 col-md-2 col-sm-2 col-2" @click="handleSelectProducts(product.id)">
                    <img :src="product.image" :alt="product.name"  width="70" class="image-ajust"/>
                </div>
                <div class="col-lg-9 col-md-9 col-sm-9 col-9" @click="handleSelectProducts(product.id)">
                    <span class="text-md">{{ product.name }}</span> <br> 
                    <div class="row"> 
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">    
                            <Tag :value="product.brand" v-if="product.brand"/>
                            &nbsp;
                            <Tag :value="product.model" v-if="product.model"/>
                            &nbsp;
                            <Tag :value="product.condition" v-if="product.condition"/>
                        </div>
                    </div>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-1 col-1 d-flex align-items-center" @click="handleSelectProducts(product.id)">
                    <i class="bi bi-chevron-right float-end fs-26 icon-color"></i>
                </div>
            </div>
            <div class="row box-image row-border cursor-pointer" v-for="category in categories">
                <div class="col-lg-2 col-md-2 col-sm-2 col-2"  @click="handleSelectCategories(category.code)">                               
                    <img :src="category.image" :alt="category.name"  width="70" class="image-ajust" v-if="category.image"/>           
                </div>
                <div class="col-lg-9 col-md-9 col-sm-9 col-9"  @click="handleSelectCategories(category.code)"> 
                    <span class="text-md fs-4">{{ category.name }}</span> <br> 
                    <span class="text-md fs-6">{{ category.path }}</span> <br>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-1 col-1 d-flex align-items-center" @click="handleSelectCategories(category.code)">
                    <i class="bi bi-chevron-right float-end fs-26 icon-color"></i>
                </div>
            </div>
        </template> 
        <template #footer>
        </template>
    </Card>
</template>
<script>
export default {
    props:{
        products: {
            type: Object,
            required: true,
            default: []
        },
        categories: {
            type: Object,
            required: true,
            default: []
        }
    },
    data() {
        return {
            formData: {
                name: '',
                productId: ''
            },
            isMessage: false,
            placeholder: 'Ex.: Lanterna traseira lado direito',
            typeSearch: 2,
            isSkeleton: false
        };
    },
    methods: {
        async handleSelectProducts(productId){
            this.$emit('handleSelectProducts', productId);
        },
        async handleSearchProducts( name ){
            if( !this.formData.name ){
                this.message = 'Informe um termo para realizar a pesquisa.';
                this.isMessage = true;
                setTimeout(() => {
                    this.isValid = false;
                }, 5000);
                return false;
            }
           
            this.$emit('handleSearchProducts', name);
        },
        handleClean(){
            this.isMessage = false;
            this.formData.name = '';
            this.$emit('handleClean', true); 
        },
        async handleSearchCategory( name ){
            this.$emit('handleSearchCategory', name);
        },
        async handleSearch(typeSearch, name){
            this.typeSearch = typeSearch;
            this.isSkeleton = true;
            if (this.typeSearch == 1){
                this.handleSearchCategory(name);
            }

            if (this.typeSearch == 2){
                this.handleSearchProducts(name);
            }
        },
        async handleSelectCategories( id ){
            this.$emit('handleSelectCategories', id);
        }
    },
    emits: ['handleSelectProducts','handleSearchProducts','handleClean','handleSearchCategory','handleSelectCategories']
};
</script>