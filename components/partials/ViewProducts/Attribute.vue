<template>
    <div class="row bla">
        <h3> Características do produto </h3>
    </div>
   <div class="row">        
        <div class="col-lg-8 col-md-8 col-sm-8 col-8">
            <table class="andes-table bla">
                <tbody class="andes-table__body">
                    <tr class="andes-table__row ui-vpp-striped-specs__row" rowspan="" v-for="(v,k) in Attributes">
                        <th class="andes-table__header andes-table__header--left ui-vpp-striped-specs__row__column ui-vpp-striped-specs__row__column--id" scope="col"> 
                            <div class="andes-table__header__container">{{ v.name }}</div>
                        </th>
                        <td class="andes-table__column andes-table__column--left andes-table__column--vertical-align-center ui-vpp-striped-specs__row__column">
                            <span class="andes-table__column--value">{{ v.values }}</span>
                        </td>
                    </tr>                    
                </tbody>
            </table>
        </div>  
    </div>
</template>

<script>
    export default{
        props:{
            Attributes: {
                type: String,
                default: '',
                required: true
            }
        }
    }
</script>