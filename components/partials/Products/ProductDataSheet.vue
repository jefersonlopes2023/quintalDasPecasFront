<template>
    <Card>    
        <template #title>Preencha a ficha técnica do seu produto</template>
        <template #subtitle>Você terá um posicionamento melhor nos resultados de busca, e seus compradores terão toda a informações necessárias para comprarem de você</template>
        <template #content>
            <div class="row g-2">
                <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                    <label for="inputMarca" class="form-label label-lg">Marca</label>
                    <InputText size="large" autocomplete="off"  type="text" class="form-control" id="inputMarca" name="Marca" />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                    <label for="inputNumeroPeca" class="form-label label-lg">Número de peça</label>
                    <InputText size="large" autocomplete="off"  type="text" class="form-control" id="inputNumeroPeca" name="NumeroPeca" />
                </div>
            </div>          
        </template>
        <template #footer>
            <div class="row g-2 box-button">             
                <div class="col-lg-3 col-md-3 col-sm-3 col-3 d-grid gap-3 d-md-flex justify-content-end"></div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-3 d-grid gap-3 d-md-flex justify-content-end"></div> 
                <div class="col-lg-3 col-md-3 col-sm-3 col-3 d-grid gap-3 d-md-flex justify-content-end"></div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-3 d-grid gap-3 d-md-flex justify-content-end">
                    <Button label="Confirmar" size="large" class="float-end"/>
                </div>
            </div>
        </template>
    </Card>
</template>