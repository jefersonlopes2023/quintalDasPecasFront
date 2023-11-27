
<template>
    <Message severity="success" v-if="successMessage">{{ successMessage }}</Message>
    <Message severity="error" v-if="errorMessage">{{ errorMessage }}</Message>
    <div class="card">
        <DataTable 
            :value="entityFilesData" 
            dataKey="id" 
            tableStyle="min-width: 50rem"
            paginator 
            :rows="5" 
            :rowsPerPageOptions="[5, 10, 20, 50]"
            stripedRows 
        >            
            <Column field="id" header="ID" sortable >
                <template #body="slotProps">                 
                    #{{slotProps.data.id}}
                </template>
            </Column>
            <Column header="Nome" sortable>
                <template #body="slotProps">                   
                    <NuxtLink :to="slotProps.data.file" target="_blank">
                        {{slotProps.data.file_name}}
                    </NuxtLink> 
                </template>
            </Column>
            <Column field="format" header="Formato" sortable></Column>
            <Column field="size" header="Tamanho" sortable></Column>
            <Column field="name" header="Entidade" sortable></Column>
            <Column field="status" header="Status" sortable></Column>
            <Column header="Ação">
                <template #body="slotProps">                 
                    <Button
                        v-if="!slotProps.data.rejected"
                        icon="pi pi-times" 
                        v-tooltip.top="'Reprovar'" 
                        outlined rounded severity="danger" 
                        @click="handleConfirmDialog(2,slotProps.data.id)"
                        size="large"
                    />
                    {{ !slotProps.data.status ? "&nbsp;" : "" }}
                    <Button
                        v-if="!slotProps.data.approved"
                        icon="pi pi-check" 
                        v-tooltip.top="'Aprovar'" 
                        outlined rounded severity="success" 
                        @click="handleConfirmDialog(1,slotProps.data.id)"
                        size="large"
                    />
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
    <ConfirmDialog />
</template>
<script>
import uploadService from '@/src/services/UploadService';
import entityFileService from '@/src/services/EntityFileService';

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
            entityFilesData: null,
            metaKey: true
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
        async uploadEvent(uploadCallback) {
           this.successMessage = '';
           this.totalSizePercent = this.totalSize / 10;

           const formData = new FormData();   
           const files = this.files;
           
            files.forEach(function(v,k){
                formData.append('files['+k+']', v);
            });           
           formData.append('user_id', localStorage.getItem('userId'));
           formData.append('entity_id', localStorage.getItem('entityId'));
           formData.append('upload_type', 'entityDocuments');

           const service = new uploadService();
           const responseData = await service.Upload(formData);

           if (responseData.data._rawValue.status == 201){               
                this.getEntityFileByEntityId();
                uploadCallback();
           }
        },
        onTemplatedUpload() {
            this.showToast('success','Sucesso','Upload concluído com sucesso.');
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
        async showToast(severity, summary, detail) {
            this.$toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
        },     
        async getEntityFileByEntityId(){           
           
            const entityId = localStorage.getItem('entityId');
            
            if( !entityId ){
                return false;
            }
            
            const entity = new entityFileService();
            const responseData = await entity.getFileByEntityId(entityId);
            const status = responseData.data._rawValue ? responseData.data._rawValue.status : [];

            if (status === 200) {
                this.entityFilesData = responseData.data._rawValue.data;
            }            
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
        },   
        async handleConfirmDialog( action, data ){           
            this.confirmDiaog = true;
            this.formData = data;
            this.action = action;
            switch(action){                
                case 1:
                    this.msgDialogConfirm = 'Tem certeza que deseja aprovar o documento?';
                break;
                case 2:
                    this.msgDialogConfirm = 'Tem certeza que deseja reprovar o documento?';
                break;
            }

            this.$confirm.require({
                message: this.msgDialogConfirm,
                header: 'Atenção!',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sim',
                rejectLabel: 'Não',
                accept: () => {
                    this.handleYesDialog(action, data);
                },
                reject: () => {
                    this.handleNoDialog();
                }
            });         
        },
        async handleYesDialog(action, id){
            switch(action){                
                case 1:
                    this.handleApproveDoc(id);
                break;
                case 2:
                    this.handleRejectDoc(id);
                break;
            }
        },
        async handleNoDialog(){
            console.log('no')
        },
        async handleApproveDoc(id){
            const entity = new entityFileService();
            const responseData = await entity.approve(id);
            const status = responseData.data._rawValue ? responseData.data._rawValue.status : [];

            if (status === 201) {
                this.getEntityFileByEntityId();
            }
        },
        async handleRejectDoc(id){
            const entity = new entityFileService();
            const responseData = await entity.reject(id);
            const status = responseData.data._rawValue ? responseData.data._rawValue.status : [];

            if (status === 201) {
                this.getEntityFileByEntityId();
            }
        }
    },
    mounted() {
        this.getEntityFileByEntityId();
    }
};
</script>
