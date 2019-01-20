<template>
  <v-form>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
         <v-flex xs12 md4>
          <v-text-field  v-model="invoice.number" :counter="invoiceMax" :maxlength="nMax" label="Nº Factura"/>
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field v-model="invoice.date" type="date" label="date" required />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field v-model="invoice.seller" :maxlength="sellerMax" label="Vendedor" required />
        </v-flex>
        <v-flex xs12 md12>
          <invoice-items-table v-on:table-data="getTableData"/>
        </v-flex>
        <v-flex>
          <invoice-totals-table :total-bruto="invoice.totalBruto"/>
        </v-flex>
        <v-flex xs4 right>
          <v-btn large color="secondary" @click="stepBack">ATRAS</v-btn>
          <v-btn large color="primary" @click="savePDF">GUARDAR</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceTotalsTable from './InvoiceTotalsTable';

export default {
  components: {
    InvoiceItemsTable,
    InvoiceTotalsTable
  },
  data: () => ({
    nMax: 12,
    invoiceMax: 7,
    sellerMax: 12,
    invoice: {
      number: '',
      date:'',
      seller:'',
      totalBruto: 0,
      data:[]
    }
  }), 
  methods:{
    stepBack() {
      this.$emit('step-back');
    },
    getTableData(val) {
      if(val.invoiceData.length >= 0) {
       this.invoice.data = [...val.invoiceData];
       this.invoice.totalBruto = val.totalBruto;
      }
    },
    savePDF() {
      this.$emit('save', this.invoice);
    }
  }
}
</script>
