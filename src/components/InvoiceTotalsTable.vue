<template>
   <v-data-table
    :headers="table.headers"
    :items="table.items"
    class="elevation-3"
    hide-actions
  >
     <template slot="items" slot-scope="props">
      <td class="text-xs-right">{{ props.item.totalBruto }}</td>
      <td class="text-xs-right">{{ props.item.descuento }}</td>
      <td class="text-xs-right">{{ props.item.descuentoNeto }}</td>
      <td class="text-xs-right">{{ props.item.igic }}</td>
      <td class="text-xs-right">{{ props.item.igicNeto }}</td>
      <td class="text-xs-right">{{ props.item.gastosEnvio }}</td>
      <td class="text-xs-right">{{ props.item.totalNeto }}</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props:['totalBruto'],
    data: () => ({
      table : {
        items: [
          {
            totalBruto: 0,
            igic : 6.5,
            igicNeto : 0,
            totalNeto : 0,
            descuento: 0,
            descuentoNeto: 0,
            gastosEnvio: 0
          }
        ],
        headers : [
          { text: 'Tot. Bruto', value: 'totalBruto',sortable: false },
          { text: '% Dto', value: 'descuento',sortable: false },
          { text: 'Descuento', value: 'descuentoNeto' },
          { text: 'IGIC',  align: 'center', value: 'igic', sortable: false },
          { text: 'Cuota',  align: 'center', value: 'igicNeto', sortable: false },
          { text: 'G. Envio',  align: 'center', value: 'gastosEnvio', sortable: false },
          { text: 'NETO',  align: 'center', value: 'totalNeto', sortable: false }
        ]
      }
    }),
    watch: {
      totalBruto(value, oldValue) {
       this.table.items[0].totalBruto = value;
       this.calculaDescuentoNeto(value);
       this.calculaIGIC(value);
       this.calculaTotal(value);
      }
    },
    methods: {
      calculaDescuentoNeto (totalB = 0) {
        const item = this.table.items[0];
        item.descuentoNeto = totalB ? totalB * (item.descuento / 100) : 0;
      },
      calculaIGIC (totalB = 0) {
        const item = this.table.items[0];
        item.igicNeto = totalB ? totalB * (item.igic / 100) : 0;
      },
      calculaTotal (totalB = 0) {
        const item = this.table.items[0];
        item.totalNeto = totalB ? totalB + item.igicNeto - item.descuentoNeto  + item.gastosEnvio : 0;
      }
    }
  }
</script>