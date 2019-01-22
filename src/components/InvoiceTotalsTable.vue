<template>
   <v-data-table
    :headers="table.headers"
    :items="table.items"
    class="elevation-1"
    hide-actions
  >
     <template slot="items" slot-scope="props">
      <td class="text-xs-right">{{ props.item.totalBruto }}</td>
      <td class="right">
        <v-edit-dialog
          :return-value.sync="props.item.descuento"
          lazy
          @save="save"
        > {{ props.item.descuento }}
          <v-text-field
            slot="input"
            v-model="props.item.descuento"
            label="Edit"
            single-line
            counter
          ></v-text-field>
        </v-edit-dialog>
      </td>
      <td class="text-xs-right">{{ props.item.descuentoNeto }}</td>
      <td class="right">
        <v-edit-dialog
          :return-value.sync="props.item.igic"
          lazy
          @save="save"
        > {{ props.item.igic }}
          <v-text-field
            slot="input"
            v-model="props.item.igic"
            label="Edit"
            single-line
            counter
          ></v-text-field>
        </v-edit-dialog>
      </td>
      <td class="text-xs-right">{{ props.item.igicNeto }}</td>
      <td class="right">
        <v-edit-dialog
          :return-value.sync="props.item.gastosEnvio"
          lazy
          @save="save"
        > {{ props.item.gastosEnvio }}
          <v-text-field
            slot="input"
            v-model="props.item.gastosEnvio"
            label="Edit"
            single-line
            counter
          ></v-text-field>
        </v-edit-dialog>
      </td>
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
      this.save();
      }
    },
    methods: {
      calculaDescuentoNeto () {
        const item = this.table.items[0];
        item.descuentoNeto = item.totalBruto ? (item.totalBruto + item.igicNeto) * (item.descuento / 100) : 0;
      },
      calculaIGIC () {
        const item = this.table.items[0];
        item.igicNeto = item.totalBruto ? item.totalBruto * (item.igic / 100) : 0;
        item.igicNeto = parseFloat(item.igicNeto.toFixed(2));
      },
      calculaTotal () {
        const item = this.table.items[0];
        item.totalNeto = item.totalBruto ? item.totalBruto + item.igicNeto + parseFloat(item.gastosEnvio) - item.descuentoNeto : 0;
        item.totalNeto = item.totalNeto.toFixed(2);
      },
      save () {
        this.calculaIGIC();
        this.calculaDescuentoNeto ();
        this.calculaTotal ();
        this.$emit('footer-data', this.table.items[0])
      }
    }
  }
</script>