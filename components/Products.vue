<template>
    <div class="ui-vip-core" @click="handleGetProductByToken(formData.token)">
        <div class="ui-pdp-container ui-pdp-container--pdp">
            <div class="ui-pdp-container__row ui-pdp-container__row--reverse ui-pdp--relative  pb-40"
                id="ui-pdp-main-container">
                <PartialsViewProductsViewItem :formData="formData" />               
                <div class="ui-pdp-container__col col-2 ui-pdp-container--column-left pb-40">
                    <PartialsViewProductsGalleria :Images="formData.pictures" />
                    <PartialsViewProductsDescription :description="formData.description" /> 
                    <!-- CARACTERISTICAS DO PRODUTO  -->
                    <PartialsViewProductsAttribute :Attributes="formData.attributes" />
                </div>
            </div>
        </div>
    </div>
    <br/>
    <br/>
</template>
<script>

    export default{
    props: {
        formData: {
            type: Object,
            default: '',
            required: true
        }
    },
}
</script>