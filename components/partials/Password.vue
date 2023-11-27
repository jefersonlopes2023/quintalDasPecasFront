<template>
     <div class="row g-2 justify-content-center">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <label for="inputEmail" class="form-label label-lg">E-mail</label>                                        
            <InputText type="email" class="form-control" @blur="setFormDataPassword(formData)" v-model="formData.email" size="large" id="inputEmail" name="email" :feedback="false" toggle-mask autocomplete="off" :maxlength="150" />
            <small class="p-error" id="text-error" v-if="errorMessage.email">{{ errorMessage.email || '&nbsp;' }}</small>
        </div>
    </div>   
    <div class="row g-2 justify-content-center">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <label for="new-password" class="form-label label-lg">Nova senha</label>
            <Password @blur="setFormDataPassword(formData)" v-model="formData.password" size="large" id="new-password" name="new-password" :feedback="false" toggle-mask autocomplete="new-password" :maxlength="16" />
            <small class="p-error" id="text-error" v-if="errorMessage.password">{{ errorMessage.password || '&nbsp;' }}</small>
        </div>
    </div>
    <div class="row g-2 justify-content-center">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <label for="recoverpassword" class="form-label label-lg">Repetir nova senha</label>
            <Password @blur="setFormDataPassword(formData)" v-model="formData.recoverpassword" size="large" id="recoverpassword" name="recoverpassword" :feedback="false" toggle-mask :maxlength="16" />
            <small class="p-error" id="text-error" v-if="errorMessage.recoverpassword">{{ errorMessage.recoverpassword || '&nbsp;' }}</small>
        </div>
    </div>
</template>
<script>
    export default { 
        props : {
            errorMessage : {
                type : Object
            }
        },
        data(){
            return{
                formData : {
                    password : '',
                    recoverpassword : ''
                } 
            };
        },
        methods:{
            setFormDataPassword( value ){
                this.$emit('formDataPassword', value);
            }
        },
        emits: ['formDataPassword'],
    }
</script>