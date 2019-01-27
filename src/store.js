import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    invoice: {
      cif: "",
      name: "",
      cp: "",
      tfno: "",
      street: "",
      city: "",
      province: "",
      lines: [],
      totals: {}
    }
  },
  mutations: {
    updateClienData(state, data) {
      state.invoice = data;
    }
  },
  actions: {}
});
