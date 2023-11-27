<template>
    <div v-if="!isForm" class="row g-4 justify-content-center">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
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
                            <Column sortable field="name" header="Assinatura"></Column>
                            <Column sortable field="subscribe_name" header="Plano"></Column>
                            <Column sortable field="form_of_payment_name" header="Forma de pagamento"></Column>
                            <Column sortable field="payment_term_name" header="Condição de pagamento"></Column>

                            <Column sortable field="description" header="Descrição"></Column>
                            <Column sortable field="installments" header="Parcelas"></Column>
                            <Column sortable field="price" header="Preço"></Column>
                            <Column sortable  field="status" header="Ativo">
                                <template #body="slotProps">
                                    <Tag :value="slotProps.data.status" class="adverts" :severity="getSeverity(slotProps.data)" />
                                </template>
                            </Column>
                            <Column header="Ação" :exportable="false" style="min-width:8rem; text-align: right;">
                                <template #body="slotProps">
                                    <Button v-if="slotProps.data.status == 'Sim'" v-tooltip.top="'Editar'" icon="pi pi-pencil" outlined rounded @click="handleConfirmDialog(3,slotProps.data)" />
                                    &nbsp;
                                    <Button  v-if="slotProps.data.status == 'Não'" v-tooltip.top="'Ativar'" icon="pi pi-check" outlined rounded severity="success" @click="handleConfirmDialog(1,slotProps.data)" />
                                    &nbsp;
                                    <Button  v-if="slotProps.data.status == 'Sim'" v-tooltip.top="'Desativar'" icon="pi pi-times" outlined rounded severity="danger" @click="handleConfirmDialog(2,slotProps.data)" />
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
                        <h1>Nome</h1>
                    <h1>Descrição</h1>
                    <br>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <label class="form-label label-lg" > Nome: </label>
                        <div>
                            <InputText v-model="formData.name" class="form-control" size="large" maxlength="50" />
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <label class="form-label label-lg" >Plano </label>
                        <div>
                            <Dropdown v-model="formData.subscribe" :options="subscribe" optionLabel="name" placeholder="Selecionar"  />
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <label class="form-label label-lg" > Forma de pagamento: </label>
                        <div>
                            <Dropdown v-model="formData.formOfPayment" :options="formOfPayment" optionLabel="name" placeholder="Selecionar"  />
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <label class="form-label label-lg" > Condiçao de pagamento:</label>
                        <div>
                            <Dropdown v-model="formData.paymentTerm" :options="paymentTerm" optionLabel="name" placeholder="Selecionar"  />
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <label class="form-label label-lg" > Quantidade de parcelas: </label>
                        <div>
                            <InputText v-model="formData.installment" class="form-control" size="large" maxlength="25" />
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <label class="form-label label-lg" > Descrição: </label>
                        <div>
                            <InputText v-model="formData.description" class="form-control" size="large" maxlength="25" />
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <label class="form-label label-lg" > Preço: </label>
                        <div>
                          <InputText v-model="formData.price" class="form-control" size="large" maxlength="25" />
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        <NuxtLink @click="handleCreate(false)" class="btn btn-outline-primary btn-lg btn-width-defult">
                            Voltar
                        </NuxtLink>
                    </div>
                        <div class="col-lg-8 col-md-8 col-sm-8 col-8"></div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        <NuxtLink @click="handleSubmit()" class="btn btn-primary btn-lg btn-width-defult">
                            Confirmar
                        </NuxtLink>
                    </div>
                </div>               
            </form>                
        </div>
    </div>
</template>
<script>
    import SubPlan from '@/src/services/SubscriptionPlanService'

    export default {
        data() {
            return {
                FormOfPayment: null,
                isForm: false,
                formData: {},

                isForm: false,
                formData : '',
                items : [],            
                confirmDiaog: false, 
                msgDialogConfirm: '',
                action:'',
                subscribe: [],
                formOfPayment: [],
                paymentTerm:[]
            };
        },
        methods:{
            async handleCreate(isForm){
                this.formData = {};
                this.isForm = isForm;
                this.handleGetAll();
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
                const subPlan = new SubPlan();
                const formData = new FormData();
                formData.append('name', this.formData.name);
                formData.append('subscribe_id',this.formData.subscribe.id);
                formData.append('form_of_payment_id',this.formData.formOfPayment.id);
                formData.append('payment_term_id',this.formData.paymentTerm.id);
                formData.append('installments',this.formData.installment);
                formData.append('description',this.formData.description);
                formData.append('price',this.formData.price.replace(',', '.'));
                
                const { data: responseData, error: responseError } = await subPlan.store(formData);
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
                const subPlan = new SubPlan();
                const formData = new FormData();
                formData.append('name', this.formData.name);
                formData.append('subscribe_id',this.formData.subscribe.id);
                formData.append('form_of_payment_id',this.formData.formOfPayment.id);
                formData.append('payment_term_id',this.formData.paymentTerm.id);
                formData.append('installments',this.formData.installment);
                formData.append('description',this.formData.description);
                formData.append('price',this.formData.price.replace(',', '.'));


                const { data: responseData, error: responseError } = await subPlan.update(this.formData.id,formData);
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
            async handleGetAll(){
                const subPlan = new SubPlan();

                const { data: responseData, error: responseError } = await subPlan.all();
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);

                if ( status === 200 ){
                    this.items = responseData._rawValue.data;
                }
            },
            async handleGetAllActive()
            {
                const subPlan = new SubPlan();

                const { data: responseData, error: responseError } = await subPlan.getAllActive();
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);
                
                if ( status === 200 ){
                    const valor = responseData._rawValue.data;
                    this.subscribe = valor.subscribe;
                    this.formOfPayment = valor.formOfPayment;
                    this.paymentTerm = valor.paymentTerm;
                }
            },
            async handleEnable(id){           
                const subPlan = new SubPlan();
                const form = new FormData();

                form.append('deleted_at', null);
                const result = await subPlan.enable(id, form);
                this.handleGetAll();
            },
            async handleDestroy(id){ 
                const subPlan = new SubPlan();                               
                const result = await subPlan.destroy(id);
                this.handleGetAll();
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
            this.handleGetAll();
            this.handleGetAllActive();
        }
    }
</script>

