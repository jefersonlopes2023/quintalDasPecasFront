<template>
    <div v-if="!isForm" class="row g-4 justify-content-center">
        <div class="col-lg-10 col-md-10 col-sm-10 col-10">
            <form class="panel">                
                <div class="row">                   
                    <div class="col-lg-5 col-md-5 col-sm-5 col-5"></div>
                    <div class="col-lg-5 col-md-5 col-sm-5 col-5"></div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        <NuxtLink @click="handleCreate(true)" class="btn btn-outline-primary btn-lg btn-width-defult">
                            Cadastrar
                        </NuxtLink>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <DataTable paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" selectionMode="single" :metaKeySelection="false" dataKey="id" :value="items" tableStyle="min-width: 50rem">
                            <Column sortable field="id" header="ID"></Column>
                            <Column sortable field="name" header="Forma de Pagamento" ></Column>
                            <Column sortable  field="status" header="Ativo">
                                <template #body="slotProps">
                                    <Tag :value="slotProps.data.status" class="adverts" :severity="getSeverity(slotProps.data)" />
                                </template>
                            </Column>
                            <Column header="Ação" :exportable="false" style="min-width:8rem; text-align: right;">
                                <template #body="slotProps">
                                    <Button v-if="slotProps.data.status == 'Sim'" v-tooltip.top="'Editar'" icon="pi pi-pencil" outlined rounded @click="handleConfirmDialog(3,slotProps.data)" />
                                    &nbsp;
                                    <Button v-if="slotProps.data.status == 'Não'" v-tooltip.top="'Ativar'" icon="pi pi-check" outlined rounded severity="success" @click="handleConfirmDialog(1,slotProps.data)" />
                                    &nbsp;
                                    <Button v-if="slotProps.data.status == 'Sim'" v-tooltip.top="'Desativar'" icon="pi pi-times" outlined rounded severity="danger" @click="handleConfirmDialog(2,slotProps.data)" />
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </form>
        </div>       
    </div>

    <div v-if="isForm" class="row g-4 justify-content-center">
        <div class="col-lg-8 col-md-8 col-sm-8 col-8">
            <form class="panel">                
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <label class="form-label label-lg" > Forma de pagamento: </label>
                        <div>
                            <InputText v-model="formData.name" class="form-control" size="large" maxlength="50" />
                        </div>
                    </div>                    
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        <NuxtLink @click="handleCreate(false)" class="btn btn-outline-primary btn-lg btn-width-defult">
                            Voltar
                        </NuxtLink>
                    </div>
                        <div class="col-lg-8 col-md-8 col-sm-8 col-8"></div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        <NuxtLink @click="handleSubmit()" class="btn btn-outline-primary btn-lg btn-width-defult">
                            Confirmar
                        </NuxtLink>
                    </div>
                </div>               
            </form>                
        </div>
    </div>
    <Toast />
</template>

<script>
    import FormPay from '@/src/services/FormOfPaymentService'

export default {
    data() {
        return {
            isForm: false,
            formData : '',
            items : [],            
            confirmDiaog: false, 
            msgDialogConfirm: '',
            action:''    
        };
    },
    methods:{
        async handleCreate(isForm){
            this.formData = {};
            this.isForm = isForm;
            this.handleGetAllActive();
        },
        async handleSubmit(){
            const id = this.formData.id;
            if ( id ){
                this.handleUpdate();
            }
            if( !id ){
                this.handleStore();
            }
        },
        async handleStore(){
            const formPay = new FormPay();
            const formData = new FormData();
            formData.append('name', this.formData.name);
            
            const { data: responseData, error: responseError } = await formPay.store(formData);
            let status = responseData.value ? responseData._rawValue.status : null;
            status = status ?? (responseError.value ? responseError.value.statusCode : null);
            
            if(status === 201){
                this.showToast('success', 'Sucesso', 'Salvo com sucesso');
                this.attributes = false;
                this.showpredict = true;
                this.formData = {};
            }

            if(status === 400){
                this.showToast('error', 'Erro', responseError.value.data.data[0]);           
            }
        },
        async handleUpdate(){
            const formPay = new FormPay();
            const formData = new FormData();
            formData.append('name', this.formData.name);
            
            const { data: responseData, error: responseError } = await formPay.update(this.formData.id,formData);
            let status = responseData.value ? responseData._rawValue.status : null;
            status = status ?? (responseError.value ? responseError.value.statusCode : null);

            if(status === 201){
                this.showToast('success', 'Sucesso', 'Salvo com sucesso');
                this.attributes = false;
                this.showpredict = true;
                this.formData = {};
            }

            if(status === 400){
                this.showToast('error', 'Erro', responseError.value.data.data[0]);           
            }
        },
        async showToast(severity, summary, detail) {
            this.$toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
        }, 
        async handleGetAllActive(){
            const formPay = new FormPay();

            const { data: responseData, error: responseError } = await formPay.all();
            let status = responseData.value ? responseData._rawValue.status : null;
            status = status ?? (responseError.value ? responseError.value.statusCode : null);

            if ( status === 200 ){
                this.items = responseData._rawValue.data;
            }
        },
        async handleEnable(id){           
            const formPay = new FormPay();
            const form = new FormData();

            form.append('deleted_at', null);
            const result = await formPay.enable(id, form);
            this.handleGetAllActive();
        },
        async handleDestroy(id){ 
            const formPay = new FormPay();                               
            const result = await formPay.destroy(id);
            this.handleGetAllActive();
        },
        async handleEdit(data){
            this.formData = data;
            this.isForm = true;
           
            if(this.isEdit){
                this.isEdit = false;
                return false;
            }

            if(!this.isEdit){
                this.isEdit = true;
                return false;
            }
           
        },   
        getSeverity(data) {
            switch (data.status) {
                case 'Sim':
                    return 'success';
                case 'Não':
                    return 'danger';
                default:
                    return null;
            }
        },
        async handleYesDialog(){
            switch(this.action){
                case 1:
                    this.handleEnable(this.formData.id);
                    break;
                case 2:
                    this.handleDestroy(this.formData.id);
                    break;
                case 3:
                    this.handleEdit(this.formData);
                    break;
            }
        },
        async handleNoDialog(){
            this.confirmDiaog = false;
            this.formData = '';
        },
        async handleConfirmDialog( action, data ){           
            this.confirmDiaog = true;
            this.formData = data;
            this.action = action;
            switch(action){                
                case 1:
                    this.msgDialogConfirm = 'Tem certeza que deseja ativar a registro?';
                break;
                case 2:
                    this.msgDialogConfirm = 'Tem certeza que deseja desativar a registro?';
                break; 
                case 3:
                    this.msgDialogConfirm = 'Tem certeza que deseja editar a registro?';
                break;   
            }

            this.$confirm.require({
                message: this.msgDialogConfirm,
                header: 'Atenção!',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sim',
                rejectLabel: 'Não',
                accept: () => {
                    this.handleYesDialog();
                },
                reject: () => {
                    this.handleNoDialog();
                }
            });         
        },

   
    },
    mounted(){
        this.handleGetAllActive()
    }
}
</script>
