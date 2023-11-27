<template>
     <div class="nav-header nav-header-plus ui-navigation-v2">
        <div class="nav-bounds nav-bounds-with-cart nav-bounds-with-cp">           
            <Logo />            
            <Search />          
            <div class="nav-header-plus-menu-wrapper nav-area nav-bottom-area nav-right-area">
                <nav id="nav-header-menu">
                    <a  data-link-id="registration" rel="nofollow">
                        Crie a sua conta
                    </a>
                    <a  data-link-id="login" rel="nofollow">
                        Entre
                    </a>
                    <a  data-link-id="purchases" rel="nofollow">
                        Compras
                    </a>
                </nav>
                <a  title="Carrinho de compras" class="nav-cart nav-cart-empty" id="nav-cart">
                    <i class="nav-icon-cart"></i>
                    <span class="nav-header-visually-hidden">
                        0 produtos em seu carrinho
                    </span>
                    <span class="nav-icon-cart-quantity"></span>
                </a>
            </div>
            <div class="nav-area nav-bottom-area nav-center-area">
                <div class="nav-menu">
                    <ul class="nav-menu-list">
                        <li class="nav-menu-item">
                            <a  class="nav-menu-categories-link" data-js="nav-menu-categories-trigger" rel="nofollow">
                                Categorias
                            </a>
                        </li>
                        <li class="nav-menu-item">
                            <a  class="nav-menu-item-link" rel="nofollow">
                                Ofertas do dia
                            </a>
                        </li>
                        <li class="nav-menu-item">
                            <a  class="nav-menu-item-link" rel="nofollow">
                                Histórico
                            </a>
                        </li>
                        <li class="nav-menu-item">
                            <a  class="nav-menu-item-link" rel="nofollow">
                                Moda
                            </a>
                        </li>
                        <li class="nav-menu-item">
                            <a  class="nav-menu-item-link" rel="nofollow">
                                Vender
                            </a>
                        </li>
                        <li class="nav-menu-item">
                            <a  class="nav-menu-item-link" rel="nofollow">
                                Contato
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>