<template>
    <div class="row g-4">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <form class="panel">
                <h3>Selecione uma cor</h3>
                <div class="col-lg-8 col-md-8 col-sm-8 col-8">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                         <InputText v-model="formData.color" class="colorBox" type="color" />      
                    </div>
                     <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                        <InputText v-model="formData.color" size="large" maxlength="7" />
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                    <NuxLink @click="handleColor()" class="btn btn-primary btn-lg btn-width-defult">
                        Confirmar  <i class="pi pi-check"></i>
                    </NuxLink>
                </div>
            </form>
        </div>
    </div>     
</template>
<script>   
    import Color from '@/src/services/ConfigColorService';

    export default {  
        data(){
            return {
                formData: {
                    id:'',
                    color:''
                },
                editor:'',
                editorConfig: {
                    simpleUpload: {
                        uploadUrl: 'path_to_image_controller',
                            headers: {
                                'Authorization': 'optional_token'
                            }
                    }
                },
                contentHolder: ""
            }
        },
        methods:{
            async handleColor(){
                const color = new Color();
                const form = new FormData();
                form.append('color', this.formData.color);
                const { data: responseData, error: responseError } = await color.update(this.formData.id, form ); 
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);
               
                if(status === 201) {
                    this.successMessage = "Registro atualizado com sucesso!";
                    this.notification = true;       
                    localStorage.setItem('color', this.formData.color);          
                   window.location.href= '/config';
                }
                if( status == 400 ){
                    this.errorMessage.message = responseError.value.data.data[0];
                }
            },
            async getHandleColor(){
                const color = new Color();

                const { data: responseData, error: responseError } = await color.all(); 
                let status = responseData.value ? responseData._rawValue.status : null;
                status = status ?? (responseError.value ? responseError.value.statusCode : null);

                if(status === 200) {
                    this.formData.id = responseData._rawValue.data[0].id;
                    this.formData.color = responseData._rawValue.data[0].color;
                    localStorage.setItem('color', this.formData.color);                  
                }
            }
        },
        mounted(){
            this.getHandleColor();
        }
        
    }
</script>