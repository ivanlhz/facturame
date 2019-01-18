<template>
  <v-app>
    <v-toolbar app color="blue">
      <v-toolbar-title class="headline text-uppercase white--text">
        <span>Facturame: </span>
        <span class="font-weight-light">Creación de facturas PDF</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <FirstStep/>
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
      //
    }
  }
}
</script>
