<template>
  <v-app>
    <v-content class="blue-grey darken-4">
       <v-layout wrap justify-center>
        <v-flex md6>
          <router-view/>
        </v-flex>
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
