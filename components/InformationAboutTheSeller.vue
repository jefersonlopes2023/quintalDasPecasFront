<template>
    <div class="ui-box-component ui-box-component-pdp__visible--desktop">
                           <h2 class="ui-box-component__title">Informações sobre o vendedor</h2>
                           <div class="ui-seller-info">
                               <div class="ui-seller-info__status-info">
                                   <figure aria-hidden="true"
                                       class="ui-seller-info__status-info__icon ui-pdp-color--GREEN">
                                       <div class="ui-pdp-icon ui-pdp-icon--medal ui-pdp-color--GREEN"><img
                                               decoding="async"
                                               src="https://http2.mlstatic.com/frontend-assets/vpp-frontend/medal.svg"
                                               alt=""></div>
                                   </figure>
                                   <div>
                                       <p class="ui-seller-info__status-info__title ui-pdp-seller__status-title">
                                           MercadoLíder Gold</p>
                                       <p class="ui-seller-info__status-info__subtitle">É um dos melhores do site!</p>
                                   </div>
                               </div>
                               <ul aria-hidden="true" class="ui-thermometer" value="5">
                                   <li class="ui-thermometer__level ui-thermometer__level--1"></li>
                                   <li class="ui-thermometer__level ui-thermometer__level--2"></li>
                                   <li class="ui-thermometer__level ui-thermometer__level--3"></li>
                                   <li class="ui-thermometer__level ui-thermometer__level--4"></li>
                                   <li class="ui-thermometer__level ui-thermometer__level--5"></li>
                               </ul>
                               <div class="ui-pdp-seller__reputation-info">
                                   <ul class="ui-pdp-seller__list-description">
                                       <li class="ui-pdp-seller__item-description"><strong
                                               class="ui-pdp-seller__sales-description">+1000</strong>
                                           <p class="ui-pdp-seller__text-description">Vendas nos últimos 60 dias</p>
                                       </li>
                                       <li class="ui-pdp-seller__item-description"><strong aria-hidden="true"
                                               class="ui-pdp-seller__icon-description">
                                               <div
                                                   class="ui-pdp-icon ui-pdp-icon--message-positive ui-pdp-color--REP_SELLER_ATTENTION_GOOD">
                                                   <img decoding="async"
                                                       src="https://http2.mlstatic.com/frontend-assets/vpp-frontend/message-positive.svg"
                                                       alt="">
                                               </div>
                                           </strong>
                                           <p class="ui-pdp-seller__text-description">Presta bom atendimento</p>
                                       </li>
                                       <li class="ui-pdp-seller__item-description"><strong aria-hidden="true"
                                               class="ui-pdp-seller__icon-description">
                                               <div
                                                   class="ui-pdp-icon ui-pdp-icon--time-positive ui-pdp-color--REP_SELLER_DELIVERY_TIME_GOOD">
                                                   <img decoding="async"
                                                       src="https://http2.mlstatic.com/frontend-assets/vpp-frontend/time-positive.svg">
                                               </div>
                                           </strong>
                                           <p class="ui-pdp-seller__text-description">Entrega os produtos dentro do
                                               prazo</p>
                                       </li>
                                   </ul>
                               </div>
                           </div><a  target="_blank"
                               class="ui-pdp-media__action ui-box-component__action">Ver mais dados deste vendedor<span
                                   class="ui-pdp--hide">Abrirá em uma nova janela</span></a>
    </div>
</template>