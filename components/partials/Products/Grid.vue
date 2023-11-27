<template>
    <div class="card">
        <DataTable :value="items" stripedRows paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"  tableStyle="min-width: 50rem">
            <Column sortable field="id" header="ID"></Column>           
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
            <Column sortable field="token" header="Token"></Column>
            <Column sortable header="Ativo">
                <template #body="slotProps">
                    <Tag class="adverts" :value="slotProps.data.actived" :severity="getSeverity(slotProps.data)" />
                </template>
            </Column>
            <Column field="name" header="Ação">
                <template #body="slotProps">                   
                    <Button v-if="slotProps.data.actived==='Não'" icon="pi pi-check" outlined rounded severity="success" class="mr-2" @click="handleEnableItem(slotProps.data.id)" />
                    <Button v-if="slotProps.data.actived==='Sim'" icon="pi pi-times" outlined rounded severity="danger" @click="handleDisableItem(slotProps.data.id)" />
                </template>
            </Column>
            <template #footer> In total there are {{ items ? items.length : 0 }} products. </template>
        </DataTable>
    </div>
</template>
<script>
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
            ]
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
          
        },
    emits: ['handleEnableItem','handleDisableItem']
    };
</script>