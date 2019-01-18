<template>
  <v-app>
    <v-content>
       <v-layout wrap justify-center>
        <v-flex md6>
          <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 0" step="1">Detalle cliente</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 1" step="2">Detalle factura</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
                <v-stepper-content step="1">
                  <FirstStep />
                  <v-flex md4 right>
                    <v-btn large color="primary" @click="e1 = 2">Siguiente</v-btn>
                    <v-btn large flat>Cancel</v-btn>
                  </v-flex>
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

export default {
  name: 'App',
  components: {
    FirstStep
  },
  data () {
   return {
        e1: 0
      }
  }
}
</script>
