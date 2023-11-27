<template>
    <div class="ui-pdp-container__row ui-pdp-component-list pr-16 pl-16">
        <div class="ui-pdp-container__col col-2 ui-vip-core-container--short-description ui-vip-core-container--column__right">
            <section data-testid="reviews-desktop" class="ui-review-capability-main ui-review-capability__container-vpp">
                <div>
                    <h3>Informações do vendedor</h3> <hr>
                </div>
                <div v-if="name">                   
                    <h5><i class="pi pi-user iconSize" ></i> {{ name }} </h5> <hr>
                </div>
                <div>
                    <i v-if="formData.address" class="bi bi-geo-alt iconSize"></i> 
                    <span v-if="formData.address">{{ formData.address }},</span> 
                    <span v-if="formData.number">{{ formData.number }} -</span> 
                    <span v-if="formData.neighborhood">{{ formData.neighborhood }},</span>
                    <span v-if="formData.city">{{ formData.city }} - </span>
                    <span v-if="formData.state">{{ formData.state }}, </span>
                    <span v-if="formData.zipcode">{{ formData.zipcode }} <hr></span>                    
                </div>
                <div v-if="formData.facebook">
                    <i class="pi pi-facebook iconSize"></i> {{ formData.facebook }}
                </div>
                <div v-if="formData.email">
                    <i class="pi pi-envelope iconSize"></i> {{ formData.email }}
                </div>
                <div v-if="formData.phone">    
                    <i class="pi pi-whatsapp iconSize"></i> 
                    <a :href="'https://api.whatsapp.com/send?phone='+this.formatarNumeroCelular(formData.phone)" target="_blank">&nbsp;{{ this.formatarNumeroCelular(formData.phone) }}</a>                     
                </div>
                <hr>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: '',
            required: true
        },
        formData: {
            type: Object,
            default: '',
            required: true,
        },
    },
    methods:{
        formatarNumeroCelular(numero) {
            // Remove qualquer caractere não numérico do número
            const numeroLimpo = numero.replace(/\D/g, '');

            // Aplica a formatação desejada
            const regex = /^(\d{2})(\d{5})(\d{4})$/;
            const resultado = numeroLimpo.replace(regex, '($1) $2-$3');

            return resultado;
        }
    }
}
</script>