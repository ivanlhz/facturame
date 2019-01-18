<template>
  <v-container>
    <v-layout text-xs-center wrap justify-center>
      <v-flex md6>
        <v-form v-model="valid">
          <v-flex md4>
            <v-text-field
              v-model="form.cif"
              :rules="cifRules"
              :counter="cifMax"
              label="CIF/NIF"
              :maxlength="cifMax"
            />
          </v-flex>
          <v-flex md12>
            <v-text-field
              v-model="form.name"
              :rules="nameRules"
              :counter="largeFieldMax"
              label="Nombre"
              :maxlength= "largeFieldMax"
              required
            />
          </v-flex>
          <v-flex md6>
            <v-text-field v-model="form.cp" :rules="cpRules" :counter="cpMax" :maxlength="cpMax" label="C.P"/>
          </v-flex>
          <v-flex md6>
            <v-text-field v-model="form.tfno" :rules="tfnoRules" :maxlength="tfnoMax" label="Teléfono" required />
          </v-flex>
          <v-flex md12>
            <v-text-field v-model="form.street" :rules="streetRules" :maxlength= "largeFieldMax" label="Calle"/>
          </v-flex>
          <v-flex md12>
            <v-text-field v-model="form.city" :rules="cityRules" :maxlength= "largeFieldMax" label="Ciudad"/>
          </v-flex>
          <v-flex md12>
            <v-text-field v-model="form.provice" :rules="provinceRules" :maxlength= "largeFieldMax" label="Provincia"/>
          </v-flex>
          <v-flex md2>
            <v-text-field v-model="form.IGIC" type="number" :rules="igicRules" label="IGIC"/>
          </v-flex>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
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
      province: "",
      IGIC: 6.5
    },
    valid: false
  })
};
</script>