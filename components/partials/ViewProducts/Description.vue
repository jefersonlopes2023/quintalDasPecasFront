<template>
    <div v-if="description" class="ui-pdp-container__col col-10 ui-vip-core-container--content-left">
        <div class="ui-pdp-container__row ui-pdp-container__row--description" id="description">
            <div class="ui-pdp-description">
                <h2 class="ui-pdp-description__title">Descrição</h2>
                <p class="ui-pdp-description__content">
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:{
            description: {
                type: String,
                default: '',
                required: true
            },
        }
    }
</script>