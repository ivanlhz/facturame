<template>
  <v-form>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
         <v-flex xs12 md4>
          <v-text-field  v-model="invoice.number" :counter="invoiceMax" :maxlength="invoiceMax" label="Nº Factura"/>
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field v-model="invoice.date" type="date" label="date" required />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field v-model="invoice.seller" :counter="sellerMax" :maxlength="sellerMax" label="Vendedor" required />
        </v-flex>
        <v-flex xs12 md12 class="no-padding">
          <invoice-items-table v-on:table-data="getTableData"/>
        </v-flex>
        <v-flex class="no-padding">
          <invoice-totals-table :total-bruto="invoice.totalBruto" v-on:footer-data="saveFooterData"/>
        </v-flex>
        <div class="flex-right">
          <v-btn large flat @click="stepBack">ATRAS</v-btn>
          <v-btn large color="primary" @click="savePDF">GUARDAR</v-btn>
        </div>
      </v-layout>
    </v-container>
  </v-form>
</template>

<style lang="scss">
  .flex-right{
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  div.no-padding {
    padding: 0px !important;
  }
</style>

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
    sellerMax: 7,
    invoice: {
      number: '',
      date:'',
      seller:'',
      totalBruto: 0,
      data:[],
      footerData: {}
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
    },
    saveFooterData (value) {
      this.invoice.footerData = value;
    }
  }
}
</script>
