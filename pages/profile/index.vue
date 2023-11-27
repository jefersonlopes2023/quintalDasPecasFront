<template>  
    <div class="home">
        <section data-testid="recommendations" class="recommendations" type="recommendations">
            <div class="container">
                <div class="row g-8  justify-content-center">
                    <div class="col-lg-1 col-md-1 col-sm-1 col-1 "></div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                        <NuxtLink to="/" class="btn btn-outline-primary btn-lg btn-width-defult">
                            Página Principal
                        </NuxtLink>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-9 col-9 "></div>
                    <div class="col-lg-10 col-md-10 col-sm-10 col-10 ">
                        <div class="center accordion-custom">
                            <Accordion>
                                <AccordionTab header="Dados Pessoais">
                                    <FormPersonalData />
                                </AccordionTab>
                                <AccordionTab header="Contato">
                                    <FormContact />
                                </AccordionTab>
                                <AccordionTab header="Endereço">
                                    <FormAddress />
                                </AccordionTab>
                                <AccordionTab header="Alterar senha">
                                    <FormChangePassword />
                                </AccordionTab>
                                <AccordionTab header="Arquivos">
                                    <FormUploads />
                                </AccordionTab>    
                            </Accordion>
                        </div>
                    </div>    
                </div>
            </div>
        </section>
    </div>                    
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>