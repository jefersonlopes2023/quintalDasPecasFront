<template>
     <div class="ui-pdp-container__row ui-pdp-component-list pr-16 pl-16">
        <div class="ui-pdp-container__col col-2 ui-vip-core-container--short-description ui-vip-core-container--column__right">
            <section data-testid="reviews-desktop"
                class="ui-review-capability-main ui-review-capability__container-vpp">                
                <div class="ui-review-capability">
                   <h3>Termo de garantia</h3>
                </div>
                <div v-for="(v, k) in saleterm">
                    <span>{{ v.value_name }}</span>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        saleterm:{
            type: String,
            default: ''
        }
    },
    data() {
        return {
            value: 4.5
        }
    }
};
</script>