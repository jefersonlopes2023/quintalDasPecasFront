<template>
    <div class="form">
        <div class="row justify-content-center">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12  justify-content-center">
                <form class="panel">
                    <div class="row g-4 justify-content-center">
                        <div class="col-lg-4 col-md-4 col-sm-4 col-4 text-center">
                            <h4>Total</h4> 
                        </div>                    
                        <div class="col-lg-4 col-md-4 col-sm-4 col-4 text-center">
                            <h4>Importados</h4>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-4 text-center">
                            <h4>Pendentes</h4>
                        </div>
                    </div> 
                    <div class="row g-4 justify-content-center">
                        <div class="col-lg-4 col-md-4 col-sm-4 col-4 text-center">
                            <h4>{{ this.total }}</h4> 
                        </div>                    
                        <div class="col-lg-4 col-md-4 col-sm-4 col-4 text-center">
                            <h4>{{ this.imported }}</h4>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-4 text-center">
                            <h4>{{ this.toImport }}</h4>
                        </div>
                    </div>    
                    <div class="row g-4 justify-content-center" v-if="isImport">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <ProgressBar :value="porcentagem" >{{ porcentagem }} %</ProgressBar>
                        </div>
                    </div>  
                    <div class="row g-4 justify-content-center" v-if="isAnalysis">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <ProgressBar mode="indeterminate" style="height: 6px;"></ProgressBar>
                        </div>
                    </div>  
                    <div class="row justify-content-center">
                        <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                            <NuxtLink @click="handleImportAnalysis()" class="btn btn-outline-primary btn-lg btn-width-defult">
                                Analisar
                            </NuxtLink>
                        </div>
                        <div v-if="btnStartImport" class="col-lg-4 col-md-4 col-sm-4 col-4">
                            <NuxtLink @click="handleStart()" class="btn btn-outline-success btn-lg btn-width-defult">
                                <i class="pi pi-play"></i>  Iniciar importação
                            </NuxtLink>
                        </div>
                        <div v-if="btnPauseImport" class="col-lg-4 col-md-4 col-sm-4 col-4">
                            <NuxtLink @click="handlePause()" class="btn btn-outline-danger btn-lg btn-width-defult">
                                <i class="pi pi-pause"></i>  Pausar importação
                            </NuxtLink>
                        </div>
                    </div>               
                </form>            
            </div>
        </div>           
    </div>
    <Toast></Toast>
</template>
<script>
    import ProductService from "@/src/services/ProductService";
    export default{
        data(){
            return{
                entityId: '',
                isImport: false,
                imported: 0,
                toImport: 0,
                total: 0,
                processando: 0,
                porcentagem: 0,
                totalItems: 0,
                mlIds: [],
                isAnalysis: false,
                isImport: false,
                pause: false,
                btnStartImport: false,
                btnPauseImport : false
            }
        },
        methods:{            
            async handleImportAnalysis(){     
                
                this.isAnalysis = true;
                const productservice = new ProductService();
                const form = new FormData();
                this.entityId = localStorage.getItem('entityId');

                if (!this.entityId){
                    return false;
                }

                form.append('entity_id',this.entityId);
                
                const { data: responseData, error: responseError } = await productservice.importItemsIndex(form);
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);

                if (status === 201){
                    this.formData = responseData._rawValue.data;
                    this.imported = this.formData.imported; 
                    this.toImport = this.formData.toImport;
                    this.total = this.formData.total;
                    this.mlIds = this.formData.result;                    
                    this.isImport = false;                    
                    this.isAnalysis = false;
                    this.btnStartImport =  this.toImport < 1 ? false : true;
                }

                if (status > 201){
                    this.showToast('warn', 'Atenção', 'Registros não encontrados.');
                }
            },
            async handleStart(){
                const productservice = new ProductService();
                
                this.entityId =  localStorage.getItem('entityId');
                this.btnStartImport = false;
                this.btnPauseImport = true;
                this.pause = false;

                if (!this.entityId){
                    return false;
                }

                if (!this.mlIds){
                    return false;
                }
                               
                const Ids = this.mlIds;
                let total = this.total;
                let totalAtual = 0;
                
                for(let i=0; i<total; i++){                    

                    const form = new FormData();
                    form.append('entity_id', this.entityId);
                    form.append('ml_id', Ids[i].ml_id);
                    const { data: responseData, error: responseError } = await productservice.importItem(form);
                    let status = responseData.value ? responseData._rawValue.status : null;
                    status = status ?? (responseError.value ? responseError.value.statusCode : null);

                    if (status === 201){                 
                        this.imported = responseData._rawValue.data.imported;
                        this.porcentagem = responseData._rawValue.data.percent;
                        this.toImport = responseData._rawValue.data.toImport;
                        this.isImport = true;
                        totalAtual = responseData._rawValue.data.toImport;                       
                        
                    }

                    if(this.pause){
                        total = totalAtual;
                        return false;
                    }
                }
                this.btnStartImport = this.toImport > 0 ? true : false;
            },
            async handleGetAnalysis(){     
                
                this.isAnalysis = true;
                const productservice = new ProductService();
                this.entityId = localStorage.getItem('entityId');

                if (!this.entityId){
                    return false;
                }
                
                const { data: responseData, error: responseError } = await productservice.getAnalisys(this.entityId);
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);

                if (status === 200){
                    this.imported = responseData._rawValue.data.imported; 
                    this.toImport = responseData._rawValue.data.toImport;
                    this.total = responseData._rawValue.data.total;                  
                    this.isAnalysis = false;
                    this.mlIds = responseData._rawValue.data.result;
                    this.btnStartImport = this.toImport > 0 ? true : false;
                    this.pause = false;
                    this.isImport = this.toImport > 0 ? true : false;
                    this.porcentagem = responseData._rawValue.data.percent;
                }

                if (!status){
                    this.isAnalysis = false;
                }
            },
            async handlePause(){
                if(!this.pause){
                    this.pause = true;
                    this.btnStartImport = true;
                    this.btnPauseImport = false;
                }
            },
            async showToast(severity, summary, detail) {
                this.$toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
            }, 
        },
        mounted(){
            this.handleGetAnalysis();
        }
    }
</script>