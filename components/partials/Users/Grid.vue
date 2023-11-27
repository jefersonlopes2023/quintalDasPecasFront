
<template>
    <DataTable :value="items" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"  tableStyle="min-width: 50rem">
        <Column sortable field="id" header="ID"></Column>           
        <Column sortable field="name" header="Nome"></Column>
        <Column sortable field="email" header="E-mail"></Column>
        <Column sortable field="email_verified_at" header="Verificado">
            <template #body="slotProps">
                <Tag v-if="!slotProps.data.email_verified_at" :value="'E-mail não verificado'" :severity="'warning'" />                                
                <span  v-if="slotProps.data.email_verified_at">{{ slotProps.data.email_verified_at }}</span>
            </template>
        </Column>
        <Column sortable field="status" header="Ativo">
            <template #body="slotProps">
                <Tag :value="slotProps.data.status" class="adverts" :severity="getSeverity(slotProps.data)" />
            </template>
        </Column>
        <Column header="Ação">
            <template #body="slotProps">
                &nbsp;
                <Button v-tooltip.top="'Desativar'" v-if="slotProps.data.status==='Sim'" icon="pi pi-times" outlined rounded severity="danger" @click="handleConfirmDialog(slotProps.data, 1)" />
                <Button v-tooltip.top="'Ativar'" v-if="slotProps.data.status==='Não'" icon="pi pi-check" outlined rounded severity="success" class="mr-2" @click="handleConfirmDialog(slotProps.data, 2)" />
                &nbsp;
                <Button v-tooltip.top="'Notificar'" v-if="!slotProps.data.email_verified_at && slotProps.data.status==='Sim'" icon="pi pi-send" outlined rounded severity="secondary" @click="handleConfirmDialog(slotProps.data, 3)" />
                &nbsp;
                <Button v-tooltip.top="'Recuperar senha'" v-if="slotProps.data.status==='Sim'" icon="pi pi-key" outlined rounded severity="info" @click="handleConfirmDialog(slotProps.data, 4)" />
                &nbsp;
                <Button v-tooltip.top="'Editar'" v-if="slotProps.data.status==='Sim'" icon="pi pi-pencil" outlined rounded severity="primary" @click="handleConfirmDialog(slotProps.data, 5)"></Button>
            </template>
        </Column>          
    </DataTable>
    <ConfirmDialog />   
</template>
<script>
export default { 
    data(){
        return {
            icon: 'pi pi-send',            
            visibleDialogConfirm: false,
            msgDialogConfirm:'',
            callback: '',
            userId: '',
            userEmail: ''
        }
    },       
    props:{
        items:{
            type: Object,
            default: '',
            required: true
        }
    },
    methods:{           
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
        async handleEnableItem(data){           
            this.$emit('handleEnableItem', data.id);  
            this.visibleEnable = false;
        },
        async handleDisableItem(data){ 
            this.$emit('handleDisableItem', data.id); 
            this.visibleEnable = false;
        },   
        async handleSendEmail( data ){ 
            this.visibleSendMail = true;
            this.$emit('handleSendEmail', data.id);
            this.visibleSendMail = false;
        },
        async handleForgotPassword( data ){ 
            this.visibleRecovery = true;
            this.$emit('handleForgotPassword', data.email);
            this.visibleRecovery = false;
        },
        async handleEdit( data ){
            this.$emit('handleEdit', data); 
            this.visibleEnable = false;
        },
        async handleYesDialog(){
            switch(this.callback){               
                case 1:
                    this.handleDisableItem(this.userId);
                break;
                case 2:
                    this.handleEnableItem(this.userId);
                break;
                case 3:
                    this.handleSendEmail(this.userId);
                break;
                case 4:
                    this.handleForgotPassword(this.userId);
                break;
                case 5:
                    this.handleEdit(this.userId);
                break;
            } 
            this.visibleDialogConfirm = false;           
        },
        async handleNoDialog(){
            this.visibleDialogConfirm = false;  
        },
        async handleConfirmDialog( data, dialog ){
            this.callback = dialog;
            this.userId = data;
            switch(dialog){               
                case 1:
                    this.msgDialogConfirm = 'Tem certeza que deseja desativar o usuário?';
                break;
                case 2:
                    this.msgDialogConfirm = 'Tem certeza que deseja ativar o usuário?';
                break;
                case 3:
                    this.msgDialogConfirm = 'Tem certeza que deseja enviar e-mail de ativação do usuário?';
                break;
                case 4:
                    this.msgDialogConfirm = 'Tem certeza que deseja enviar e-mail de recuperação de senha?';
                break; 
                case 5:
                    this.msgDialogConfirm = 'Tem certeza que deseja editar o usuário?';
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
        this.icon = 'pi pi-send';
    },
    emits: ['handleEnableItem','handleDisableItem','handleSendEmail','handleForgotPassword','handleEdit']
};
</script>