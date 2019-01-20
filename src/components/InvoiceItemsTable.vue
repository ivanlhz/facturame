<template>
  <div>
    <v-toolbar flat color="white">
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.amount" label="Cantidad"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.price" label="Precio"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea v-model="editedItem.description" label="description"></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Añadir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="invoiceLines"
      class="elevation-3"
      no-data-text="Añade un elemento"
      no-results-text="No se han encontrado elementos"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.amount }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">{{ calculate(props.item) }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
     <v-btn @click="dialog = true" block>Añadir Elemento</v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Cantidad',
          align: 'left',
          sortable: false,
          value: 'amount'
        },
        { text: 'Descrición', value: 'description' },
        { text: 'Precio Unitario', value: 'price',sortable: false },
        { text: 'Importe (€)', value: 'subtotal' },
        { text: 'Acciones',  align: 'center', sortable: false }
      ],
      totalBruto: 0,
      invoiceLines: [],
      editedIndex: -1,
      editedItem: {
        amount: 0,
        description:'',
        price: 0,
        subtotal: 0,
      },
      defaultItem: {
        amount: 0,
        description: '',
        price: 0,
        subtotal: 0,
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Elemento' : 'Editar Elemento'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.invoiceLines = []
      },

      editItem (item) {
        this.editedIndex = this.invoiceLines.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.invoiceLines.indexOf(item)
        if(confirm('¿Estás seguro de que quieres borrar este elemento?')) {
          this.invoiceLines.splice(index, 1);
          this.$emit('table-data', {totalBruto: this.calculateTotal(), invoiceData: this.invoiceLines })
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.invoiceLines[this.editedIndex], this.editedItem)
        } else {
          this.invoiceLines.push(this.editedItem)
        }

       this.totalBruto = this.calculateTotal()

        this.$emit('table-data', {totalBruto: this.calculateTotal(), invoiceData: this.invoiceLines })
        this.close()
      },

      calculateTotal() {
        let total = 0;
        this.invoiceLines.map( item => {
          total = total + this.calculate(item);
        })
        return total;
      },

      calculate (item) {
        return item.amount * item.price;
      }
    }
  }
</script>