<template>
    <FileUpload name="files[]" :url="url" @upload="onTemplatedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
        <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
            <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                <div class="flex gap-2">
                    <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
                    <Button @click="uploadEvent()" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>
                    <Button @click="ClearMsg();" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
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
</template>
<script>
import ProductService from '@/src/services/ProductService';

export default {    
    props: {
        url:{
            type: String,
            default: 'upload'
        },
        componentKey: {
            type: Number,
            required: true
        },
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
            entityFilesData: null,
            metaKey: true,
            formData: []
        };
    },
    methods: {
        async handleConfirm( value ){
            this.formData[value.name] = value;
            this.showcomponent[value.position + 1] = true;
           
        }, 
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
                    
            this.$emit('handleConfirm', { name: 'files' , value: this.files, position: this.componentKey });
        },
        async uploadEvent() {
           this.successMessage = '';
           this.totalSizePercent = this.totalSize / 10;

           const formData = new FormData();
           formData.append('files[]', this.files, this.files[0].name);
           formData.append('user_id', localStorage.getItem('userId'));
           formData.append('entity_id', localStorage.getItem('entityId'));

           const service = new ProductService();
           const responseData = await service.Upload(formData);

           if (responseData.data._rawValue.status == 201){
                this.onTemplatedUpload('Upload realizado com sucesso.');
                this.getEntityFileByEntityId();
                this.clearCallback();
           }
        },
        onTemplatedUpload( msg ) {
            this.successMessage = msg;
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
        async handleOnDelete(){
            this.successMessage = '';
            
            if( !this.selected ){
                this.errorMessage = 'Selecione um documento para ser excluído.';
                return false;
            }

            const deletePromises = [];
            this.entityFilesData = null; 
            const entity = new entityFileService();

            this.selected.forEach((register)=>{                            
                deletePromises.push(entity.destroy(register.id));                          
            });          

            await Promise.all(deletePromises);  
            this.getEntityFileByEntityId();                
        }
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
       
    },
    emits: ['handleConfirm']
};
</script>
