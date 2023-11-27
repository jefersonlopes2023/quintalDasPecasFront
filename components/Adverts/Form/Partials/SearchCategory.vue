<template>
    <div v-for="category in categories">
        <div class="row box-image row-border cursor-pointer" @click="handleSelectCategory(category.code)">
            <div class="col-lg-2 col-md-2 col-sm-2 col-2">                               
                <Image 
                    :src="category.image" 
                    :alt="category.name"  
                    width="70" 
                    class="image-ajust" 
                    v-if="category.image"
                />
            </div>
            <div class="col-lg-9 col-md-9 col-sm-9 col-9"> 
                <span class="text-md fs-4">{{ category.name }}</span> <br> 
                <span class="text-md fs-6">{{ category.path }}</span> <br>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-1 col-1 d-flex align-items-center">
                <i class="bi bi-chevron-right float-end fs-26 icon-color"></i>
            </div>
        </div>
    </div>
    <div v-if="isLoading && categories.length <= 0">   
        <div class="flex justify-content-center">
            <ProgressSpinner />
        </div>
    </div>
</template>
<script>
export default {
    props:{        
        categories: {
            type: Object,
            required: true,
            default: []
        },
        isLoading: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    methods: {
        async handleSelectCategory( id ){
            this.$emit('handleSelectCategory', id);            
        }
    },
    emits: [
    'handleSelectCategory'
    ]
};
</script>