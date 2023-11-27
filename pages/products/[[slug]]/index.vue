<template>    
  <BreadCrumbs :items="formData.items"></BreadCrumbs>
  <Products :formData="formData"></Products>
</template>
  <style>
  .ui-vip-core .ui-pdp-container--top {
    margin-bottom: 12px;
  }
  </style>
<script >

  import utils from '@/src/utils/Utils';
  import ViewProductService from '@/src/services/ViewProductService'

  export default{
    data(){
      return{
        productToken: '',
        formData: {},
        items:{}
      }
    },
    methods:{
      async handlequeryString(){
        const url = window.location.search;
        this.productToken = utils.getQueryParam("token", url);
      },
      async handleViewProductByToken(){

        const viewProductService = new ViewProductService();
        const { data: responseData, error: responseError } = await viewProductService.getActiveProductsByToken(this.productToken);
        let status = responseData.value ? responseData._rawValue.status : null;
        status = status ?? (responseError.value ? responseError.value.statusCode : null);                 
        
        if(status === 200){
          // //usuario
          this.formData.name = responseData._rawValue.data.name;
          this.formData.fantasy_name = responseData._rawValue.data.fantasy_name;
          this.formData.zipcode = responseData._rawValue.data.zipcode;
          this.formData.address = responseData._rawValue.data.address;
          this.formData.number = responseData._rawValue.data.number;
          this.formData.comment = responseData._rawValue.data.comment;
          this.formData.neighborhood = responseData._rawValue.data.neighborhood;
          this.formData.country = responseData._rawValue.data.country;
          this.formData.state = responseData._rawValue.data.state;
          this.formData.city = responseData._rawValue.data.city;
          this.formData = responseData._rawValue.data;
        }      
      }
    },
    mounted () {
      this.handlequeryString();
      this.handleViewProductByToken();
    }
  }

</script>