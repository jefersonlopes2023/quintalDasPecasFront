<template>   
    <Card>       
        <template #content>           
            <div class="row box-image">
                <Message severity="error" v-if="isMessage" :closable="false">{{ message }}</Message>
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
                <div class="col-lg-12 col-md-12 col-sm-12 col-12" v-if="items.length > 1 ? true : false">
                    <h5>Não encontrou o item na lista, 
                        <NuxtLink to="#" @click="handleSearch(items.length ? 1 : (categories.length ? 2 : 0), formData.name)">
                            <span v-if="categories.length > 0">
                                Pesquisar produto!
                            </span>
                            <span v-if="items.length > 0">
                                Pesquisar categoria!
                            </span>
                        </NuxtLink>
                    </h5>
                    <h5>Estes produtos coincidem com sua busca. Algum deles é o seu?</h5>
                </div>
            </div>
            <AdvertsFormPartialsSearchItems
                v-if="typeSearch == 2"
                :items="items" 
                @handleSelectItems="handleSelectItems"
                :isLoading="isLoading"
            />
            <AdvertsFormPartialsSearchCategory 
                v-if="typeSearch == 1"
                :categories="categories" 
                @handleSelectCategory="handleSelectCategory"
                :isLoading="isLoading"
            />
        </template> 
        <template #footer>
        </template>
    </Card>
</template>
<script>
export default {
    props:{
        categories:
        {
            type: Object,
            required: true,
            default: []
        },
        items: {
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
            isLoading: false
        };
    },
    methods: {
        async handleSearch(typeSearch, name){
            this.isLoading = true;
            this.typeSearch = typeSearch;
            if (this.typeSearch == 1){
                this.handleSearchCategory(name);
            }

            if (this.typeSearch == 2){
                this.handleSearchItems(name);
            }
        },
        async handleSelectItems( id ){
            this.$emit('handleSelectItems', id );
        },       
        async handleClean(){          
            this.isLoading = false; 
            this.isMessage = false;
            this.formData.name = '';
            this.typeSearch = 2;
            this.$emit('handleClean');
        },
        async handleSearchCategory( name ){
            this.$emit('handleSearchCategory', name);
        }, 
        async handleSearchItems( name ){
            if( !name ){
                this.message = 'Informe um termo para realizar a pesquisa.';
                this.isMessage = true;
                setTimeout(() => {
                    this.isValid = false;
                }, 5000);
                return false;
            }
            this.$emit('handleSearchItems', name);           
        },       
        async handleSelectCategory( id ){
            this.$emit('handleSelectCategory', id);
        }
    },
    emits: [
        'handleSelectItems',
        'handleSearchItems',
        'handleClean',
        'handleSearchCategory',
        'handleSelectCategory'
    ]
};
</script>