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
            <second-step v-on:step-back="stepBack"/>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import FirstStep from '@/components/FirstStep'
  import SecondStep from '@/components/SecondStep'
  import PageTitle from '@/components/PageTitle'

  export default {
    components: {
      FirstStep,
      SecondStep,
      PageTitle
    },
    data: () => ({
        e1: 0,
        stepValid: false,
        clientData : {}
    }),
    methods: {
      getFormData (value) {
        this.clientData = value.form;
        if(value.result) this.e1 = 2
      },
      stepBack () {
        this.e1 =1;
      }
    }
  }
</script>
