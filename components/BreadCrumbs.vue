<template>
        <br>
        <div class="ui-vip-core">
                <div class="ui-pdp-container ui-pdp-container--top">
                        <div class="ui-pdp-container__row">
                            <NuxtLink v-if="link" :to="'/search/' + link">Voltar á lista</NuxtLink>&nbsp;&nbsp;
                            <NuxtLink v-if="!link" to="/">Voltar</NuxtLink>&nbsp;&nbsp;   
                            <Breadcrumb :home="home" :model="items" class="ui-pdp-container__col col-1 ui-vip-core-container--head"/>                                
                        </div>
                </div>
        </div>        
</template>

<script>

import utils from '@/src/utils/Utils';
export default {
    data(){
        return{
            link: ''
        }
    },
    props:{
        items:{
            type: Object,
            defualt: ''
        }
    },mounted(){
        
        const url = window.location.search;
        const p = utils.getQueryParam("p", url); 
        if( p ){
            this.link = p;
        }
    }
}
</script>