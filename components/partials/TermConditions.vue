<template>    
    <div class="row justify-content-center">
        <div class="col-lg-1 col-md1 col-sm-1 col-1 d-flex justify-content-center align-self-center">             
            <Checkbox @click="acceptTermCondition" v-model="termCondition" inputId="termCondition" name="termCondition" value="true" />                    
        </div>
        <div class="col-lg-10 col-md-10 col-sm-10 col-10">
            <label for="termCondition" class="ml-2">Aceito os Termos e condições e autorizo o uso de meus dados de acordo com a Declaração de privacidade.</label>
        </div>
    </div>
    <div class="row justify-content-center">
        <br>
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-6 col-sm-6 col-6 d-grid gap-2 d-flex justify-content-start">            
            <ToggleButton @click="typeRegister(1)" :disabled="isDisabledEntity" v-model="type[1]"  onLabel="Conta empresa" offLabel="Conta empresa" onIcon="pi pi-building" offIcon="pi pi-building" />
        </div>       
        <div class="col-lg-6 col-md-6 col-sm-6 col-6 d-grid gap-2 d-flex justify-content-end">
            <ToggleButton @click="typeRegister(2)" :disabled="isDisabledPerson" v-model="type[2]" onLabel="Conta pessoal" offLabel="Conta pessoal" onIcon="pi pi-user" offIcon="pi pi-user" />
        </div>
    </div>
</template>
<script >

export default {
  data() {
    return {
        termCondition: false,
        type: [],
        isDisabledEntity: true,
        isDisabledPerson: true
    };
  },
  methods: {
    acceptTermCondition(){
        this.isDisabledEntity = false;
        this.isDisabledPerson = false;
        if( this.termCondition[0] ){
            this.isDisabledEntity = true;
            this.isDisabledPerson = true;
            this.type[1] = false;
            this.type[2] = false;
        }  
    },
    typeRegister( value ){
        this.type[1] = false;
        this.type[2] = false;
        switch( value ){
            case 1:
                this.type[1] = true;
                this.$emit('typeRegister', 1);
            break;
            case 2:
                this.type[2] = true;
                this.$emit('typeRegister', 2);
            break;
        }
        this.isDisabledEntity = false;
        this.isDisabledPerson = false;
    }
  },
  emits: ['typeRegister'],
};
</script>