<template>    
    <div v-for="item in items">
        <div class="row box-image row-border cursor-pointer" @click="handleSelectItems(item.id)">
            <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                <img :src="item.image" :alt="item.name"  width="70" class="image-ajust"/>
            </div>
            <div class="col-lg-9 col-md-9 col-sm-9 col-9">
                <span class="text-md">{{ item.name }}</span> <br> 
                <div class="row"> 
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">    
                        <Tag :value="item.brand" v-if="item.brand"/>
                        &nbsp;
                        <Tag :value="item.model" v-if="item.model"/>
                        &nbsp;
                        <Tag :value="item.condition" v-if="item.condition"/>
                    </div>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-1 col-1 d-flex align-items-center">
                <i class="bi bi-chevron-right float-end fs-26 icon-color"></i>
            </div>
        </div>
    </div>
    <div v-if="isLoading && items.length <= 0">   
        <div class="flex justify-content-center">
            <ProgressSpinner />
        </div>
    </div>
</template>
<script>
export default {
    props:{
        items: {
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
        async handleSelectItems( id ){
            this.$emit('handleSelectItems', id);
        }
    },
    emits: ['handleSelectItems']
};
</script>