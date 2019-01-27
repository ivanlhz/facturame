<template>
  <v-app>
    <v-content class="blue-grey darken-4">
      <v-toolbar dark color="primary">
         <v-toolbar-title class="headline text-uppercase">
          <span>Facturame! </span>
          <span class="font-weight-light">GENERA FACTURAS EN PDF</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat disabled>Guardar</v-btn>
        </v-toolbar-items>
      </v-toolbar>
       <v-layout justify-center>
          <router-view/>
       </v-layout>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
        
  })
}
</script>
