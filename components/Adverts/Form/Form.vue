<template> 
    <div class="container">
        <div class="row">
            <form  @submit.prevent="handleOnSubmit" class="row justify-content-lg-center g-4">               
                <div class="row justify-content-lg-center" v-if="showpredict">
                    <div class="col-lg-8 col-md-12 col-sm-12 col-8">
                        <h2>
                            <p>Vamos começar identificando seu produto.</p>
                        </h2>
                    </div>
                </div>
                <div class="row justify-content-lg-center" v-if="showpredict">
                    <div class="col-lg-8 col-md-8 col-sm-12 col-8">
                        <AdvertsFormPartialsSearch
                            @handleClean="handleClean" 
                            @handleSelectCategory="handleSelectCategory"
                            @handleSelectItems="handleSelectItems" 
                            @handleSearchItems="handleSearchItems" 
                            @handleSearchCategory="handleSearchCategory"
                            :items="items" 
                            :categories="categories"
                        />
                    </div>
                </div>
                <div class="row justify-content-lg-center" v-if="isReview">
                    <div class="col-lg-8 col-md-8 col-sm-12 col-8">
                        <AdvertsFormPartialsReviewAndEdit
                            @handleSearch="handleSearch" 
                            @handleImportItem="handleImportItem"
                            :items="attributes"
                        />
                    </div>
                </div>
                <div class="row justify-content-lg-center" v-if="showcategory">
                    <div class="col-lg-10 col-md-10 col-sm-10 col-10">
                        <AdvertsFormPartialsStoreItem
                            @handleSearch="handleSearch" 
                            @handleImportItem="handleImportItem"
                            @handleGetModelByBrand="handleGetModelByBrand"
                            @handleOnSubmit="handleOnSubmit"
                            :showcomponent="showcomponent"
                            :componentData="componentData"
                        />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        isReview: {
            type: Boolean,
            required: true,
            default: false
        },
        showcomponent: {
            type: Object,
            required: true,
            default: []
        },
        categories: {
            type: Object,
            required: true,
            default: {}
        },
        items: {
            type: Object,
            required: true,
            default: {}
        },
        attributes: {
            type: Object,
            required: true,
            default: {}
        },
        componentData:{
            type: Object,
            required: true,
            default: {}
        },
    },
    data(){
        return {
            formList: [],
            formData: [],          
            showcategory: false,
            showpredict: true,
            categoryId: '',
            showReview: false
        };
    },
    methods: {
        async handleOnSubmit(value){
            if(value){
                this.showcategory = false;
                this.$emit('handleOnSubmit',true);
            }            
        },        
        async handleConfirm( value ){
            this.formData[value.name] = value;
            this.showcomponent[value.position + 1] = true;
        },     
        async handleSearchOtherCategory(){
            this.showpredict = true;           
            this.showcategory = false; 
            this.showcomponent = 0;
        },
        async handleClean( value ){
            this.formData.name = '';
            this.showcategory = false;
            this.$emit('handleClean');
        },
        handleSearch(){
            this.$emit('handleSearch');
            this.showpredict = true;
            this.showReview = false;
            this.showcategory = false;
        },       
        async handleSelectItems(id){
            this.$emit('handleSelectItems', id);
            this.showpredict = false;
            this.showReview = true;
        },
        async handleSearchItems(name){
            this.$emit('handleSearchItems', name);
        },
        async handleSearchCategory(name){
            this.$emit('handleSearchCategory', name);            
        },
        async handleSelectCategory(id){
            this.categoryId = id;
            this.showcategory = true;
            this.showpredict = false;
            this.$emit('handleSelectCategory', id);
        },
        async handleImportItem( data ){            
            this.showpredict = false;
            this.showReview = false;
            this.showcategory = false;
            this.$emit('handleImportItem', data);
        },
        async handleGetModelByBrand( data, domain ){
            this.$emit('handleGetModelByBrand', data, domain);
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