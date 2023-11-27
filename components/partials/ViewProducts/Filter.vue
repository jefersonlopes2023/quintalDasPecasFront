<template>
    <section class="ui-search-filter-groups shops__filter-groups" v-for="(v , k) in formData.states">
        <div class="ui-search-filter-dl shops__filter-items">
            <div role="heading" aria-level="3" class="ui-search-filter-dt-title shops-custom-primary-font">
                {{ v.name }} 
            </div>
            <ul class="ulBox">
                <li class="ui-search-filter-container shops__container-lists" v-for="(vv , kk) in JSON.parse(v.value)">
                    <Checkbox v-model="selectedState" :name="'state[]'" :value="handleReturnValue(kk,vv)"/>
                    &nbsp;
                    <label :for="vv.id">{{ vv.value }}</label>
                </li>
            </ul>
        </div>
    </section>   
    <section class="ui-search-filter-groups shops__filter-groups" v-for="(v , k) in formData.filters">
        <div class="ui-search-filter-dl shops__filter-items">
            <div role="heading" aria-level="3" class="ui-search-filter-dt-title shops-custom-primary-font">
                {{ v.name }} 
            </div>
            <ul class="ulBox">
                <li class="ui-search-filter-container shops__container-lists" v-for="(vv , kk) in JSON.parse(v.value)">
                    <Checkbox v-model="selected"  :name="'filter[]'" :value="handleReturnValue(kk,vv)"/>
                    &nbsp;
                    <label :for="vv.id">{{ vv.value }}</label>
                </li>
            </ul>
        </div>
    </section>   
    <div class="row g-4">
        <div class="col-lg-6">
            <NuxtLink class="btn btn-primary btn-lg btn-width-defult" @click="handleFilter()" v-if="selected.length || selectedState.length">
                Filtrar
            </NuxtLink>
        </div>
        <div class="col-lg-6">
            <NuxtLink class="btn btn-primary btn-lg btn-width-defult" @click="handleClearSelected()"  v-if="selected.length || selectedState.length">
                Limpar filtro
            </NuxtLink>
        </div>
    </div>
    <div v-if="qtde == 0">
          <Skeleton width="100%" height="8rem"></Skeleton> <br>
          <Skeleton width="100%" height="8rem"></Skeleton> <br>
          <Skeleton width="100%" height="8rem"></Skeleton> <br>
          <Skeleton width="100%" height="8rem"></Skeleton> <br>
          <Skeleton width="100%" height="8rem"></Skeleton> <br>
          <Skeleton width="100%" height="8rem"></Skeleton> <br>
          <Skeleton width="100%" height="8rem"></Skeleton> <br>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                selected: [],
                selectedState: [],
                param:'',
            }
        },
        props:{
            formData:{
                type: Object,
                default: '',
                required: true,
            },
            qtde: {
                type: Number,
                default: '',
                required: true,
            }
        },
        methods:{
            handleFilter(){
                const selecteds = this.selected;
                const selectedState = this.selectedState;

                if (selecteds.length === 0){
                    return false;
                }

                const attribute = [];
                selecteds.forEach(function( v, k ){
                    let data = JSON.parse(v);
                    attribute[k] = {'attribute_id' : data.id, 'value' : data.value};
                });

                const state = [];
                selectedState.forEach(function( v, k ){
                    let data = JSON.parse(v);
                    state[k] = {'state' : data.value};
                });

                const form = [attribute, state];

                this.$emit('handleFilter',form);
            },
            handleReturnValue( k, v){
                const obj = { k: k, id: v.id, value: v.value}
                if ( v ){
                    return JSON.stringify(obj);
                }
            },
            handleReturnStateValue( k, v){
                const obj = { value: v.value }
                if ( v ){
                    return JSON.stringify(obj);
                }
            },
            handleClearSelected(){
                this.selected = [];
                this.selectedState = [];
                this.$emit('handleClearSelected', true)
            }
        },
        mounted(){
            const route = useRoute();
            this.param = route.params.slug;
        },
        emits: ['handleFilter','handleClearSelected'],
    }
</script>