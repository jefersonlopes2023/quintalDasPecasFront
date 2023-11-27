<template>   
    <DataTable paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" selectionMode="single" :metaKeySelection="false" dataKey="id" :value="items" tableStyle="min-width: 50rem">
        <Column sortable  field="id" header="ID"></Column>
        <Column sortable  field="client_id" header="ID do Aplicativo"></Column>
        <Column sortable  field="client_secret" header="Chave Secreta"></Column>
        <Column sortable  field="seller_id" header="ID do Vendedor"></Column>
        <Column sortable  field="status" header="Ativo">
            <template #body="slotProps">
                <Tag :value="slotProps.data.status" class="adverts" :severity="getSeverity(slotProps.data)" />
            </template>
        </Column>
        <Column header="Ação" :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
                <Button v-if="slotProps.data.status == 'Sim'" v-tooltip.top="'Editar'" icon="pi pi-pencil" outlined rounded @click="handleConfirmDialog(3,slotProps.data)" />
                &nbsp;
                <Button  v-if="slotProps.data.status == 'Não'" v-tooltip.top="'Ativar'" icon="pi pi-check" outlined rounded severity="success" @click="handleConfirmDialog(1,slotProps.data)" />
                &nbsp;
                <Button  v-if="slotProps.data.status == 'Sim'" v-tooltip.top="'Desativar'" icon="pi pi-times" outlined rounded severity="danger" @click="handleConfirmDialog(2,slotProps.data)" />
            </template>
        </Column>
    </DataTable>
    <ConfirmDialog />
</template>
<script>
export default {
    props:{
        items:{
            type: Object,
            default: {},
            required: true
        }
    },
    data(){
        return {
            formData: {},
            confirmDiaog: false, 
            msgDialogConfirm: '',
            action:''                 
        }
    },
    methods:{
        async handleCreate( isForm ){
            this.isForm = isForm;
        },
        async handleEnable(id){
            this.$emit('handleEnable', id); 
        },
        async handleDestroy(id){
            this.$emit('handleDestroy', id); 
        },
        async handleEdit(id){
            this.$emit('handleEdit', id);
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
                    this.msgDialogConfirm = 'Tem certeza que deseja ativar a credencial?';
                break;
                case 2:
                    this.msgDialogConfirm = 'Tem certeza que deseja desativar a credencial?';
                break; 
                case 3:
                    this.msgDialogConfirm = 'Tem certeza que deseja editar a credencial?';
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
    },
    emits:['handleEnable','handleDestroy','handleEdit']
}
</script>