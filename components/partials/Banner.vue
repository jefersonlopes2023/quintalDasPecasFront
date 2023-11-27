<template>
    <Message severity="success" v-if="successMessage">{{ successMessage }}</Message>
    <Message severity="error" v-if="errorMessage">{{ errorMessage }}</Message>
    <div class="row-g4  col-lg-2 col-md-2 col-sm-2 col-2">
        <NuxtLink to="/" class="btn btn-outline-primary btn-lg btn-width-defult">
            Página Principal
        </NuxtLink>
    </div>
    <div class="col-lg-10 col-md-10 col-sm-10 col-10"></div>
    <div class="row g-4 bannerTop">
        <DataTable v-model:selection="selected" :value="bannerServiceData" dataKey="id" tableStyle="min-width: 50rem" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
            <Column field="id" header="ID"></Column>
            <Column field="file_path" header="Banner">
                <template #body="slotProps">
                    <img :src="slotProps.data.file_path" class="w-6rem shadow-2 border-round" />
                </template>
            </Column>
            <Column field="format" header="Formato"></Column>
            <Column field="size" header="Tamanho"></Column>
            <Column sortable header="Ativo">
                <template #body="slotProps">
                    <Tag class="adverts" :value="slotProps.data.status" :severity="getSeverity(slotProps.data)" />
                </template>
            </Column>
            <Column field="name" header="Ação">
                <template #body="slotProps">
                    <Button v-if="slotProps.data.status==='Não'" icon="pi pi-check" outlined rounded severity="success" class="mr-2" @click="handleEnable(slotProps.data.id)" />
                    <Button v-if="slotProps.data.status==='Sim'" icon="pi pi-times" outlined rounded severity="danger" @click="handleDisable(slotProps.data.id)" />
                </template>
            </Column>
        </DataTable>       
    </div>
        <br>  
    <FileUpload name="files[]" :url="url" @upload="onTemplatedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
        <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
            <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                <div class="flex gap-2">
                    <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
                    <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>
                    <Button @click="clearCallback();" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
                </div>
                <ProgressBar :value="totalSizePercent" :showValue="false" :class="['md:w-20rem h-1rem w-full md:ml-auto', { 'exceeded-progress-bar': totalSizePercent > 100 }]">
                    <span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span>
                </ProgressBar>
            </div>
        </template>
        <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
            <div v-if="files.length > 0">
                <h5>Pending</h5>
                <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                    <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                        <div>
                            <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" class="shadow-2" />
                        </div>
                        <span class="font-semibold">{{ file.name }}</span>
                        <div>{{ formatSize(file.size) }}</div>
                        <Badge value="Pending" severity="warning" />
                        <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded  severity="danger" />
                    </div>
                </div>
            </div>
            <div v-if="uploadedFiles.length > 0">
                <h5>Completed</h5>
                <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                    <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                        <div>
                            <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" class="shadow-2" />
                        </div>
                        <span class="font-semibold">{{ file.name }}</span>
                        <div>{{ formatSize(file.size) }}</div>
                        <Badge value="Completed" class="mt-3" severity="success" />
                        <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded  severity="danger" />
                    </div>
                </div>
            </div>
        </template>
        <template #empty>
                <div class="flex align-items-center justify-content-center flex-column">
                    <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
                    <p class="mt-4 mb-0">Arraste e solte os arquivos aqui para fazer o upload.</p>
                </div>
            </template>
    </FileUpload>
    <Toast />
</template>
<script>
import BannerService from '@/src/services/BannerService';
export default {    
    props: {
        url:{
            type: String,
            default: 'upload'
        }
    },
    data() {
        return {
            files: [],
            totalSize: 0,
            totalSizePercent: 0,
            errorMessage: '',
            successMessage: '',
            products: null,
            columns: null,
            selected: null,
            metaKey: true,
            bannerServiceData: []
        };
    },
    methods: {
        onRemoveTemplatingFile(file, removeFileCallback, index) {
            removeFileCallback(index);
            this.totalSize -= parseInt(this.formatSize(file.size));
            this.totalSizePercent = this.totalSize / 10;
            this.onTemplatedUpload('');
        },
        onClearTemplatingUpload(clear) {
            clear();
            this.totalSize = 0;
            this.totalSizePercent = 0;    
            this.onTemplatedUpload('');        
        },
        onSelectedFiles(event) {
            this.files = event.files;
            this.files.forEach((file) => {
                this.totalSize += parseInt(this.formatSize(file.size));
            });
        },
        async uploadEvent(callback) {
           this.successMessage = '';
           this.totalSizePercent = this.totalSize / 10;

           const formData = new FormData();
           const files = this.files;

            files.forEach(function(v,k){
                formData.append('files['+k+']', v);
            }); 

           formData.append('user_id', localStorage.getItem('userId'));
           formData.append('entity_id', localStorage.getItem('entityId'));

           const service = new BannerService();
           const responseData = await service.Upload(formData);

           if (responseData.data._rawValue.status == 201){             
                this.getBanner();
           }
           callback();
        },
        onTemplatedUpload() {
            this.showToast('success','Sucesso','Upload realizado com sucesso.');
        },
        formatSize(bytes) {
            if (bytes === 0) {
                return '0 B';
            }

            let k = 1000,
                dm = 3,
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));

            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },
        ClearMsg(){
            this.onTemplatedUpload('');
        },
        onRowEditSave(event) {
            let { newData, index } = event;

            this.products[index] = newData;
        },        
        async getBanner(){           
           
            const bannerService = new BannerService();
            const responseData = await bannerService.getBanner();
            const status = responseData.data._rawValue ? responseData.data._rawValue.status : [];

            if (status === 200) {
                this.bannerServiceData = responseData.data._rawValue.data; 
            }            
        },
        async handleOnDelete(){
            this.successMessage = '';
            
            if( !this.selected ){
                this.errorMessage = 'Selecione um documento para ser excluído.';
                return false;
            }

            const deletePromises = [];
            this.bannerService = null; 
            const bannerService = new BannerService();

            this.selected.forEach((register)=>{                            
                deletePromises.push(bannerService.destroy(register.id));                          
            });          

            await Promise.all(deletePromises);  
            this.getBanner();                
        },
        async handleEnable(id){           
            const bannerService = new BannerService();
            const form = new FormData();
            form.append('deleted_at', null)
           const banner = await bannerService.enable(id, form)
            this.getBanner();  
        },
        async handleDisable(id){ 
            const bannerService = new BannerService();                                 
            const banner = await bannerService.destroy(id); 
            this.getBanner();   
        },
        getSeverity(banner) {
                switch (banner.status) {
                    case 'Sim':
                        return 'success';
                    case 'Não':
                        return 'danger';

                    default:
                        return null;
                }
        },
        async showToast(severity, summary, detail) {
            this.$toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
        }, 
    },
    created() {
        this.columns = [
            { field: 'file_name', header: 'Name' },
            { field: 'format', header: 'Tipo' },
            { field: 'size', header: 'Tamanho' },
            { field: 'name', header: 'Entidade' }
        ];
    },
   
    mounted() {
        this.getBanner();
    }
};
</script>
