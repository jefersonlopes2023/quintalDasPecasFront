<template>
    <div class="ui-pdp-container__row">
        <div class="ui-pdp-container__col col-2">
            <div class="ui-pdp-container__row ui-pdp-container__row--gallery" id="gallery">
                <div class="ui-pdp-gallery" role="group" aria-label="">                   
                    <div class="ui-pdp-gallery__column">
                        <div class="ui-pdp-gallery__column__variation-picture">
                            <img
                                id="variation-gallery" decoding="async"
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                class="ui-pdp-gallery__column__variation-gallery"
                                alt="variation-gallery">
                        </div>
                        <span  v-for="(v, k) in Images">                                      
                            <input 
                                class="ui-pdp-gallery__input" 
                                type="radio" 
                                name="gallery-radio"
                                :id="'gallery-thumbnail-'+v.ml_pictures_id" 
                                readonly=""
                                value="1"
                                :checked="k == 0"
                            >
                            <span class="ui-pdp-gallery__wrapper ">
                                 <figure class="ui-pdp-gallery__figure viewGalleria">
                                    <Image :src="v.url" data-index="1" width="700" height="500" class="ui-pdp-image ui-pdp-gallery__figure__image" preview></Image>                                                    
                                </figure>
                                <label
                                    :for="'gallery-thumbnail-'+v.ml_pictures_id"
                                    class="ui-pdp-gallery__label">
                                    <div role="presentation"
                                        class="ui-pdp-thumbnail ui-pdp-gallery__thumbnail">
                                        <div class="ui-pdp-thumbnail__picture">
                                            <Image :src="v.url" class="ui-pdp-image" />
                                        </div>
                                    </div>
                                </label>
                                
                            </span> 
                        </span> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:{
            Images: {
                type: String,
                default: '',
                required: true
            },
        }
    }
</script>