<template>
    <div class="card">
        <DataTable :value="items" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"  tableStyle="min-width: 50rem">
            <Column sortable field="id" header="ID">
                <template #body="slotProps">#{{ slotProps.data.id }}</template>
            </Column>           
            <Column sortable header="Imagem">
                <template #body="slotProps">
                    <img :src="slotProps.data.thumbnail" :alt="slotProps.data.thumbnail" class="w-6rem shadow-2 border-round" />
                </template>
            </Column>
            <Column sortable field="title" header="Nome"></Column>
            <Column sortable field="price" header="Preço">
                <template #body="slotProps">
                    {{ (slotProps.data.price) }}
                </template>
            </Column>
            <Column sortable field="ml_product_id" header="MLID"></Column>
            <Column sortable field="condition" header="Condição"></Column>           
            <Column sortable header="Ativo">
                <template #body="slotProps">
                    <Tag class="adverts" :value="slotProps.data.actived" :severity="getSeverity(slotProps.data)" />
                </template>
            </Column>
            <Column field="name" header="Ação">
                <template #body="slotProps">
                    <Button v-if="slotProps.data.actived==='Sim'" icon="pi pi-pencil" v-tooltip.top="'Editar'" outlined rounded @click="handleConfirmDialog(3,slotProps.data)" />
                    &nbsp;
                    <Button v-if="slotProps.data.actived==='Não'" icon="pi pi-check" v-tooltip.top="'Ativar'" outlined rounded severity="success" class="mr-2" @click="handleConfirmDialog(1,slotProps.data.id)" />
                    &nbsp;
                    <Button v-if="slotProps.data.actived==='Sim'" icon="pi pi-times" v-tooltip.top="'Desativar'" outlined rounded severity="danger" @click="handleConfirmDialog(2,slotProps.data.id)" />
                </template>
            </Column>
            <template #footer> In total there are {{ items ? items.length : 0 }} products. </template>
        </DataTable>
    </div>
    <ConfirmDialog />
</template>
<script>
    import ViewProduct from '@/src/services/ViewProductService';

export default { 
        data() {
            return {
                mitems: [
                    { separator: true },
                    {
                        label: 'Profile',
                        icon: 'pi pi-fw pi-user'
                    },
                    {
                        label: 'Settings',
                        icon: 'pi pi-fw pi-cog',
                        badge: 2
                    },
                    { separator: true }
                ],
                isForm: false,
                formData : '',
                confirmDiaog: false, 
                msgDialogConfirm: '',
                action:''   
            };
        },
        props:{
            items:{
                type: Object,
                default: '',
                required: true
            }
        },
        methods:{
            getSeverity(product) {
                switch (product.actived) {
                    case 'Sim':
                        return 'success';
                    case 'Não':
                        return 'danger';
                    default:
                        return null;
                }
            },
            async handleEnableItem(id){           
                this.$emit('handleEnableItem', id);   
            },
            async handleDisableItem(id){ 
                this.$emit('handleDisableItem', id);    
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
            async handleYesDialog(){
                switch(this.action){
                    case 1:
                        this.handleEnableItem(this.formData);
                        break;
                    case 2:
                        this.handleDisableItem(this.formData);
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
            async handleEdit(){
                this.$emit('handleEdit', await this.handlegetProductByToken()); 
            },
            async handlegetProductByToken(){
                const viewProduct = new ViewProduct()
                const token = this.formData.token;

                const { data: responseData, error: responseError } = await viewProduct.getActiveProductsByToken(token);
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);

                if (status == 200) {
                  return responseData._rawValue.data                    
                }
            }
        },
    emits: ['handleEnableItem','handleDisableItem', 'handleEdit']
};
</script>