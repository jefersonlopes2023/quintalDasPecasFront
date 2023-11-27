<template>
    <Card>
        <template #title>Sua busca coincide com estas categorias. Alguma delas corresponde ao seu produto?</template>
        <template #subtitle></template>
        <template #content>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <Listbox  v-model="selectedCategory" :options="formList" filter optionLabel="name" class="w-full md:w-14rem" />   
                </div>
            </div>
        </template>
        <template #footer>
            <div class="row">             
                <div class="col-lg-6 col-md-3 col-sm-3 col-3 d-grid gap-3 d-md-flex justify-content-start">
                    <Button label="Pesquisar outra categoria" outlined size="large" @click="handleSearchOtherCategory()" />
                </div>
                <div class="col-lg-6 col-md-3 col-sm-3 col-3 d-grid gap-3 d-md-flex justify-content-end">
                    <Button outlined @click="handleGetSelected()" label="Confirmar" size="large" class="float-end"/>
                </div>
            </div>
        </template>
    </Card>
</template>
<script>
export default {
    props: {       
        formList: {
            type: Object,
            required: true
        },
    },
    data() {
        return {           
            selectedCategory: null           
        };
    },
    methods:{
        async handleGetSelected(){
            this.$emit('handleGetSelected', this.selectedCategory  );
        },
        async handleSearchOtherCategory(){
            this.$emit('handleSearchOtherCategory', true );
        }
    },
    emits: ['handleGetSelected','handleSearchOtherCategory']
};
</script>