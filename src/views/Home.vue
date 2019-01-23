<template>
  <v-container>
    <v-layout>
      <v-flex>
        <page-title />
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 0" step="1">Detalle cliente</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 1" step="2">Detalle factura</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <first-step v-on:step-is-valid="getFormData"/>
            </v-stepper-content>
            <v-stepper-content step="2">
            <second-step v-on:step-back="stepBack" v-on:save="savePDF"/>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
      <v-flex>
        <iframe v-if="url" :src="url" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import FirstStep from '@/components/FirstStep'
  import SecondStep from '@/components/SecondStep'
  import PageTitle from '@/components/PageTitle'
  import jsPDF from 'jspdf'
  import {InvoiceMaker, OTHERS_TYPE} from '@/libs/invocemaker'

  export default {
    components: {
      FirstStep,
      SecondStep,
      PageTitle
    },
    data: () => ({
        e1: 0,
        stepValid: false,
        clientData : {},
        url: undefined
    }),
    methods: {
      getFormData (value) {
        this.clientData = value.form;
        if(value.result) this.e1 = 2
      },
      stepBack () {
        this.e1 =1;
      },
      savePDF (value) {
        if (value.data.length > 0) {
          const doc = new jsPDF()
          const pdfMaker = new InvoiceMaker(doc);

          pdfMaker.pdfSetRjTictacInfo(20, OTHERS_TYPE);
          pdfMaker.pdfSetClientInfo(40, this.clientData);
          pdfMaker.pdfSetContentHeader(value);
          pdfMaker.pdfSetConentTable({
            headers:[
              {name: 'Cant', width: 35, align: 'right'},
              {name: 'Descripción', width: 150},
              {name: 'Precio Un.', width: 176, align: 'right'},
              {name: 'Importe', width: 200, align: 'right'}
            ],
            data : pdfMaker.parceDataForTable(value.data)
          })
          pdfMaker.pdfSetDocumentFooter(value.footerData);
          // pdfMaker.drawMargins();

          doc.save('a4.pdf')
        }
      }
    }
  }
</script>
