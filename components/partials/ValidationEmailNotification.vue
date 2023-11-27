<template>
     <div class="home" >
        <section data-testid="recommendations" class="recommendations" type="recommendations">
            <div class="container">   
                <div class="row justify-content-center g-4">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div>
                            <Card>
                                <template #title> Bem vindo! </template>
                                <template #content>
                                    <p>
                                        Enviamos um e-mail de confirmação  do cadastro.
                                    </p>
                                </template>
                                <template #footer>
                                    <NuxtLink to="/" class="btn btn-primary">Navegar</NuxtLink>
                                </template>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>                           
</template>