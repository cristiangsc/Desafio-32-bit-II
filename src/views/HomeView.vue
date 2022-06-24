<template>
  <div class="container">
    <h1>Tienda 32 Bits</h1>
    <h2>Lista de juegos</h2>
    <table>
      <thead>
      <tr>
        <th>Código</th>
        <th>Color</th>
        <th>Nombre</th>
        <th>Stock</th>
        <th>Precio</th>
        <th>Acciones</th>
      </tr>
      </thead>
      <tbody v-for="game in games" :key="game.codigo">
      <tr :style="{color: game.color}">
        <td>{{ game.codigo }}</td>
        <td>
          <select :value="game.color" @change="cambiarColor(game, $event)">
            <option v-for="(color, $index) in colors" :key="$index" :value="color.value">
              {{ color.label }}
            </option>
          </select>
        </td>
        <td>{{ game.nombre }}</td>
        <td>{{ game.stock }}</td>
        <td>{{ game.precio }}</td>
        <td>
          <button @click="SumStock(game)">+</button>
          <button @click="subStock(game)">-</button>
        </td>
      </tr>
      </tbody>
    </table>
    <h3>Total: {{ totalGames }} juegos</h3>
  </div>
</template>

<script>
// @ is an alias to /src

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'HomeView',
  data() {
    return {
      colors: [
        {value: 'red',   label: 'Rojo'},
        {value: 'blue',  label: 'Azul'},
        {value: 'green', label: 'Verde'},
        {value: 'black', label: 'Negro'},
      ],
    }
  },
  computed: {
    ...mapState(['games']),
    ...mapGetters(['totalGames']),
  },
  methods: {
    ...mapActions(['reduceStock', 'addStock', 'changeColor']),
    SumStock(game) {
      this.addStock(game)
    },
    subStock(game) {
      this.reduceStock(game)
    },
    cambiarColor(game, event) {
      console.log(event.target.value)
      this.changeColor({gameSelect: game, newColor: event.target.value})
    },
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 800px;
  justify-content: center;
  width: 70%;
  margin: 0 auto;
}

td {
  border: 2px solid black;
}

th {
  border: 2px solid black;
}

</style>