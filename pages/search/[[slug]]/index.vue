<template>    
  <div class="ui-search shops__ui-main">        
    <div style="display:contents"></div>
    <div class="ui-search-main ui-search-main--without-header ui-search-main--only-products shops__search-main">
      <aside class="ui-search-sidebar shops__sidebar">
        <div class="ui-search-breadcrumb shops__breadcrumb">
          <h1 class="ui-search-breadcrumb__title shops-custom-primary-font text-capitalize">{{ searchTerm }}</h1>
        </div>
        <div class="ui-search-search-result shops__result">
          <span class="ui-search-search-result__quantity-results shops-custom-secondary-font">{{ qtde }} resultados</span>
        </div>
        <a class="ui-search-styled-label screen-reader-only" >Ir para resultados</a>
        <div class="ui-search-styled-label screen-reader-only" role="heading" aria-level="2">Filtros</div>
        <PartialsViewProductsFilter :formData="viewproducts" :qtde="qtde" @handleFilter="handleFilter" @handleClearSelected="handleClearSelected"/>       
      </aside>
      <section class="ui-search-results ui-search-results--without-disclaimer shops__search-results" >
        <SearchResultItem :formData="viewproducts" :qtde="qtde"/>
      </section>
    </div>     
  </div>  
</template>

<script>
  import ViewProductService from '@/src/services/ViewProductService'

  export default{
    data(){
      return{
        viewproducts: {},
        searchTerm :'',
        qtde: 0,
        formData: {}
      }
    },
    methods:{
      async handleViewProducts(){
        const route = useRoute();
        let param = route.params.slug;
        param =  param.replace(/-/g,' ');
        this.searchTerm = param;

        if( !param ){
          return false;
        }
       
        const form = new FormData();
        const attribute = this.formData.attribute_id;
        const state = this.formData.state;
        
        form.append('title', param);

        if (attribute){
          attribute.forEach(function(v,k){
            form.append(`attribute[${v.attribute_id}]`, v.value);
          });
        } 
        
        if (state){
          state.forEach(function(v,k){
            form.append(`state[${k}]`, v.state);
          });
        } 
        
        const viewProductService = new ViewProductService();
        const { data: responseData, error: responseError } = await viewProductService.getActiveProductsByTitle(form);
        let status = responseData.value ? responseData._rawValue.status : null;
        status = status ?? (responseError.value ? responseError.value.statusCode : null); 
        this.viewproducts = responseData._rawValue.data;
        this.qtde = responseData._rawValue.data.items.length;
      },
      async handleFilter( value ){
        this.formData.attribute_id = value[0]; 
        this.formData.state = value[1]; 
        this.handleViewProducts();
      },
      async handleClearSelected(){
        this.formData.attribute_id = []; 
        this.handleViewProducts();
      }
    },
    mounted(){
      this.handleViewProducts();

    },

  }

</script>