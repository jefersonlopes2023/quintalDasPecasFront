<template>
     <div class="ui-pdp-container__row ui-pdp-component-list pr-16 pl-16">
        <div class="ui-pdp-container__col col-2 ui-vip-core-container--short-description ui-vip-core-container--column__right">
            <section data-testid="reviews-desktop"
                class="ui-review-capability-main ui-review-capability__container-vpp">                
                <div class="ui-review-capability">
                    <div>
                        <article aria-roledescription="Score" aria-label="Score de Item">
                            <div class="" data-testid="rating-component">
                                <div class="ui-review-capability__rating__start-content">                                       
                                        <div>
                                            <p class="ui-review-capability__rating__label">1,275 avaliações</p>
                                        </div>
                                </div>
                                <div class="ui-review-capability__rating" style="padding-left:5px;">
                                    <div>
                                        <p class="ui-review-capability__rating__average ui-review-capability__rating__average--desktop">
                                            4.5
                                        </p>
                                    </div>
                                </div>
                                <div style="padding-left: 5px;">
                                    <Rating v-model="value" :cancel="false" readonly/>
                                </div>
                            </div>
                        </article>
                    </div>                   
                </div>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 4.5
        }
    }
};
</script>