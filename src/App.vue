<template>
  <v-app>
    <v-content class="blue-grey darken-4">
       <v-layout wrap justify-center>
        <v-flex md6>
          <page-title />
          <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 0" step="1">Detalle cliente</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 1" step="2">Detalle factura</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
                <v-stepper-content step="1">
                  <FirstStep v-on:step-is-valid="getFormData"/>
                </v-stepper-content>
                <v-stepper-content step="2">
                  HOLA SOY EL STEP 2
                  <v-flex md4 right>
                    <v-btn large color="secondary" @click="e1=1">ATRAS</v-btn>
                    <v-btn large color="primary">GUARDAR</v-btn>
                  </v-flex>
                </v-stepper-content>
              </v-stepper-items>
          </v-stepper>
        </v-flex>
       </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import FirstStep from './components/FirstStep'
import PageTitle from './components/PageTitle'

export default {
  name: 'App',
  components: {
    FirstStep,
    PageTitle
  },
  data: () => ({
        e1: 0,
        stepValid: false,
        valdiate: false,
  }),
  methods: {
    getFormData (value) {
      if(value) this.e1 = 2
    }
  }
}
</script>
