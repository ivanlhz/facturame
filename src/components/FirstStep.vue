<template>
  <v-container>
    <v-layout text-xs-center wrap justify-center>
      <v-flex md6>
        <v-form v-model="valid">
          <v-flex md4>
            <v-text-field
              v-model="form.cif"
              :counter="cifMax"
              label="CIF/NIF"
              :maxlength="cifMax"
            />
          </v-flex>
          <v-flex md12>
            <v-text-field
              v-validate="'required|min:10'"
              v-model="form.name"
              :counter="largeFieldMax"
              :maxlength= "largeFieldMax"
              label="Nombre y Apellidos"
              data-vv-name="name"
              required
              :error-messages="errors.collect('name')"
            />
          </v-flex>
          <v-flex md6>
            <v-text-field v-model="form.cp" :counter="cpMax" :maxlength="cpMax" label="C.P"/>
          </v-flex>
          <v-flex md6>
            <v-text-field v-model="form.tfno" :maxlength="tfnoMax" label="Teléfono" required />
          </v-flex>
          <v-flex md12>
            <v-text-field v-model="form.street" :maxlength= "largeFieldMax" label="Calle"/>
          </v-flex>
          <v-flex md12>
            <v-text-field v-model="form.city" :maxlength= "largeFieldMax" label="Ciudad"/>
          </v-flex>
          <v-flex md12>
            <v-text-field v-model="form.province" :maxlength= "largeFieldMax" label="Provincia"/>
          </v-flex>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout right>
      <v-flex>
        <v-btn large color="primary" @click="nextClickHandler">
          Siguiente
        </v-btn>
        <v-btn large flat @click="clearForm">Clear</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue"
import VeeValidate from "vee-validate"

Vue.use(VeeValidate)

export default {
   $_veeValidate: {
      validator: 'new'
    }, 
  data: () => ({
    largeFieldMax: 100,
    tfnoMax: 11,
    cifMax: 9,
    cpMax:5,
    form: {
      cif: "",
      name: "",
      cp: "",
      tfno: "",
      street: "",
      city: "",
      province: ""
    },
    valid: false
  }),
   methods: {
      async nextClickHandler () {
        const result = await this.$validator.validate();
        this.$emit('step-is-valid', {result, form: this.form});
     },
     clearForm () {
      this.form.cif = "";
      this.form.name = "";
      this.form.cp= "";
      this.form.tfno= "";
      this.form.street= "";
      this.form.city= "";
      this.form.province = "";
     }
   }
};
</script>