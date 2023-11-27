<template> 
    <CarouselCustom :banners="banner"></CarouselCustom>
    <br><br>
    <div class="row g-8 justify-content-lg-center">
        <div class="col-lg-10">
            <div class="titulo">Baseada na sua última visita <NuxtLink class="min-titulo">Ver Histórico</NuxtLink> </div>        
        </div>
    </div>
    <div class="row justify-content-lg-center">
        <div class="col-lg-10">
            <div v-if="viewproducts == ''">
                <div class="flex flex-wrap">
                    <div class="w-full md:w-6 p-3">
                        <Skeleton width="15rem" height="15rem"></Skeleton>
                    </div>
                </div>
            </div>            
            <Carousel :value="viewproducts" :numVisible="5" :numScroll="5">
                <template #item="slotProps">
                    <NuxtLink :to="`products?token=${slotProps.data.token}`">
                        <div class="border-1 surface-border border-round m-1 bg-custom">
                            <div class="mb-3">
                                <img :src="slotProps.data.thumbnail" :alt="slotProps.data.name" class="w-12"/>
                            </div>
                            <div v-if=" slotProps.data.original_price_integer" class="ui-recommendations-card__price-and-discount originalCustom" >
                                <span class="price-size textteste originalPrice">R$ {{ slotProps.data.original_price_integer }} </span>
                                <span class="cents andes-money-amount__cents andes-money-amount__cents--superscript-24 originalPriceCents"> {{ slotProps.data.original_price_cents }}</span>                           
                            </div>
                            <div class="ui-recommendations-card__price-and-discount">
                                <span class="price-size textteste">R$ {{ slotProps.data.price_integer }} </span> 
                                <span class="cents andes-money-amount__cents andes-money-amount__cents--superscript-24">,{{ slotProps.data.price_cents }}</span>                           
                                <span class="installments">{{ slotProps.data.discount }} </span>
                            </div>
                            <div class="installments">{{ slotProps.data.parcela }}</div>
                            <div class="installments">{{ slotProps.data.frete }}</div>
                            <div class="textteste">{{ slotProps.data.title }} ...</div>
                        </div>
                    </NuxtLink>
                </template>
            </Carousel>
        </div>
    </div>
    <div class="row g-8 justify-content-lg-center">
        <div class="col-lg-10">
            <div class="titulo">Ofertas do dias <NuxtLink class="min-titulo">Ver Histórico</NuxtLink> </div>        
        </div>
    </div>
    <div class="row g-8 justify-content-center">
        <div class="col-lg-10 col-md-10 col-sm-10 col-10">
            <div v-if="viewproducts == ''">
                <div class="flex flex-wrap">
                    <div class="w-full md:w-6 p-3">
                        <Skeleton width="15rem" height="15rem"></Skeleton>
                    </div>
                </div>
            </div>  
            <Carousel :value="viewproducts" :numVisible="5" :numScroll="5">
                <template #item="slotProps">
                    <NuxtLink :to="`products?token=${slotProps.data.token}`">
                        <div class="border-1 surface-border border-round m-1 bg-custom">
                            <div class="mb-3">
                                <img :src="slotProps.data.thumbnail" :alt="slotProps.data.name" class="w-12"/>
                            </div>
                            <div v-if=" slotProps.data.original_price_integer" class="ui-recommendations-card__price-and-discount originalCustom" >
                                <span class="price-size textteste originalPrice">R$ {{ slotProps.data.original_price_integer }} </span>
                                <span class="cents andes-money-amount__cents andes-money-amount__cents--superscript-24 originalPriceCents"> {{ slotProps.data.original_price_cents }}</span>                           
                            </div>
                            <div class="ui-recommendations-card__price-and-discount">
                                <span class="price-size textteste">R$ {{ slotProps.data.price_integer }} </span> 
                                <span class="cents andes-money-amount__cents andes-money-amount__cents--superscript-24">,{{ slotProps.data.price_cents }}</span>                           
                                <span class="installments">{{ slotProps.data.discount }} </span>
                            </div>
                            <div class="installments">{{ slotProps.data.parcela }}</div>
                            <div class="installments">{{ slotProps.data.frete }}</div>
                            <div class="textteste">{{ slotProps.data.title }} ...</div>
                        </div>
                    </NuxtLink>
                </template>
            </Carousel>
        </div>
    </div>
</template>

<script>
 import ViewProductService  from '@/src/services/ViewProductService';
 import Carousel  from '@/src/services/BannerService';


export default {
    data() {
        return {
            banner: null,
            products: null,
            responsiveOptions: [
                {
                    breakpoint: '1199px',
                    numVisible: 4,
                    numScroll: 1
                },
                {
                    breakpoint: '991px',
                    numVisible: 2,
                    numScroll: 2
                },
                {
                    breakpoint: '767px',
                    numVisible: 1,
                    numScroll: 1
                }
                
            ],
            viewproducts: ''
        };
    },    
    methods: {      
        async handleViewProducts(){
                const viewProductService = new ViewProductService();

                const { data: responseData, error: responseError } = await viewProductService.getActiveProducts('');
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null); 
                this.viewproducts = responseData._rawValue.data;
        },
        handleGetProductByToken(token){
            navigateTo(`products?token=${token}`);
        },
        async handleBanner(){
            const carousel = new Carousel();

            const { data: responseData, error: responseError } = await carousel.getAllActive();
            let status = responseData.value ? responseData._rawValue.status : null;
            status = status ?? (responseError.value ? responseError.value.statusCode : null); 
            this.banner = responseData._rawValue.data;
        }
    },
    mounted() {       
        this.handleViewProducts();
        this.handleBanner();

    },
};
</script>