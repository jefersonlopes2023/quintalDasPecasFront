<template>
    <footer role="contentinfo" class="nav-footer">
        <div class="nav-footer-user-info nav-bounds">
            <div class="nav-footer-info-wrapper">
                <div class="nav-footer-primaryinfo">
                    <small class="nav-footer-copyright">Copyright ©&nbsp;2023 {{ formData.fantasy_name }}.com.br LTDA.</small>
                    <nav class="nav-footer-navigation">
                        <ul class="nav-footer-navigation__menu">
                            <li class="nav-footer-navigation__item">
                                <a class="nav-footer-navigation__link">Trabalhe conosco</a>
                            </li>
                            <li class="nav-footer-navigation__item">
                                <a class="nav-footer-navigation__link" href="/termandconditions">Termos e condições</a>
                            </li>
                            <li class="nav-footer-navigation__item">
                                <a class="nav-footer-navigation__link">Como cuidamos da sua privacidade</a></li>
                            <li class="nav-footer-navigation__item">
                                <a class="nav-footer-navigation__link">Acessibilidade</a>
                            </li>
                            <li class="nav-footer-navigation__item">
                                <a class="nav-footer-navigation__link">Contato</a>
                            </li>
                            <li class="nav-footer-navigation__item">
                                <a class="nav-footer-navigation__link">Informações sobre seguros</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <p class="nav-footer-secondaryinfo" v-if="formData">
                    CNPJ n.º {{ formData.cnpj }} / {{ formData.address }}, nº {{ formData.number }}, {{ formData.neighborhood }}, {{ formData.city}}/{{ formData.state }} - CEP {{ formData.zipcode }}.
                </p>
            </div>
        </div>
        <a class="nav-footer-hp">Mercado Livre</a>
    </footer>
</template>
<script>
    import Portal from '@/src/services/PortalService';
    import Utils from '@/src/utils/Utils';
    export default {
        data(){
            return{
                formData: {}
            }
        },
        methods:{
            async handleFooter(){
                const portal = new Portal();
              
                const { data: responseData, error: responseError } = await portal.all();
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);
                

                if (status == 200) {
                    this.formData = responseData._rawValue.data[0];

                    if( this.formData.zipcode){
                        this.formData.zipcode = Utils.formatZipCode(this.formData.zipcode);
                    }
                
                    if( this.formData.cnpj ){
                        this.formData.cnpj = Utils.formatCNPJ(this.formData.cnpj); 
                    }
                }              
            }
        },
        mounted(){
            this.handleFooter();
        }
    }
</script>