<template>
  <v-form>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
         <v-flex xs12 md4>
          <v-text-field  v-model="invoice.number" :counter="invoiceMax" :maxlength="invoiceMax" label="Nº Factura"/>
        </v-flex>
        <v-flex xs12 md4>
             <v-menu
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
            <v-text-field  slot="activator" v-model="invoice.date" type="date" label="fecha" prepend-icon="event"
            readonly required />
           <v-date-picker locale="es" v-model="invoice.date" @input="menu = false"></v-date-picker>
          </v-menu>
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
import moment from 'moment';
import {mapState} from 'vuex';

export default {
  components: {
    InvoiceItemsTable,
    InvoiceTotalsTable
  },
  data: () => ({
    nMax: 12,
    invoiceMax: 7,
    sellerMax: 7,
    menu: false,
    invoice: {
      number: '', // Invoce number
      date: new Date().toISOString().substr(0, 10), // Ivoice date
      seller:'', // Invioce seller
      totalBruto: 0, // Invvoice current total
      data:[], // Invoice Lines
      footerData: {} // Invoice totals calulations
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
      const invoice = Object.assign({}, this.invoice);
      invoice.date = moment(invoice.date).format('DD/MM/YYYY')
      this.$emit('save', invoice);
    },
    saveFooterData (value) {
      this.invoice.footerData = value;
    },
  }
}
</script>
