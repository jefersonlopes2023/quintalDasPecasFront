<template>
    <div class="ui-pdp-container__row ui-pdp-component-list pr-16 pl-16">
        <div class="ui-pdp-container__col col-2 ui-vip-core-container--short-description ui-vip-core-container--column__right">
            <div class="ui-pdp-container__row ui-pdp-container__row--header" id="header">
                <div class="ui-pdp-header">
                    <div class="ui-pdp-header__title-container">
                        <h1 class="ui-pdp-title">
                            {{title}}
                        </h1>                        
                    </div>                   
                </div>
            </div>            
            <div class="ui-pdp-container__row ui-pdp-container__row--price" id="price">
                <div class="ui-pdp-price mt-16 ui-pdp-price--size-large">
                    <div class="ui-pdp-price__main-container">
                        <s v-if="originalPrice" class="andes-money-amount ui-pdp-price__part ui-pdp-price__original-value andes-money-amount--previous andes-money-amount--cents-superscript andes-money-amount--compact" style="font-size:16px">
                            <span class="andes-money-amount__currency-symbol" aria-hidden="true">R$</span>
                            <span class="andes-money-amount__fraction" aria-hidden="true">{{ originalPrice }}</span>
                            <span class="andes-visually-hidden" aria-hidden="true">,</span>
                            <span class="andes-money-amount__cents andes-money-amount__cents--superscript-16" style="font-size:10px;margin-top:1px" aria-hidden="true">,{{ originalPriceCents }}</span>
                        </s>
                        <div class="ui-pdp-price__second-line">
                            <span class="andes-money-amount ui-pdp-price__part andes-money-amount--cents-superscript andes-money-amount--compact" style="font-size:36px" itemprop="offers" itemscope="" itemtype="http://schema.org/Offer">                               
                                <span class="andes-money-amount__currency-symbol" itemprop="priceCurrency" aria-hidden="true">R$</span>
                                <span class="andes-money-amount__fraction" aria-hidden="true">{{ price }}</span>
                                <span class="andes-visually-hidden" aria-hidden="true">,</span>
                                <span class="andes-money-amount__cents andes-money-amount__cents--superscript-36" style="font-size:18px;margin-top:4px" aria-hidden="true">,{{ cents }}</span>
                            </span>                           
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            title: {
                type: String,
                default: '',
                required: true
            },
            originalPrice: {
                type: String,
                default: '',
                required: true
            },
            originalPriceCents:{
                type: String,
                default: '',
                required: true
            },
            price: {
                type: String,
                default: '',
                required: true
            },
            cents:{
                type: String,
                default: '',
                required: true
            }
        },
        methods:{

        },
        mounted(){

        }
    }
</script>