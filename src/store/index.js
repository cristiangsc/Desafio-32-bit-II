import Vue from 'vue'
import Vuex from 'vuex'
import games from './juegos.json'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games
  },
  getters: {
    totalGames:state=>{
      return state.games.reduce((total, count)=>{
        return total + parseInt(count.stock)
      },0)
    }
  },
  mutations: {
    minStock:(state,codigoSeleccionado) =>{  // reducir el stock mediante un ciclo for
      state.games.forEach((game)=>{
        if (game.codigo == codigoSeleccionado.codigo && game.stock>0) {
          game.stock--
        }
      })
    },
    maxStock:(state,codigoSeleccionado) =>{ // aumentar el stock mediante funciones de array/objetos
      let cantidad = state.games.find(juego => juego.codigo == codigoSeleccionado.codigo)
      cantidad.stock++
    },
    SetearColor(state, { indice, newColor }) {
      state.games[indice].color = newColor
    },
  },
  actions: {
    reduceStock({commit},codigoSeleccionado){
      return new Promise(() => {
        commit('minStock',codigoSeleccionado)
      })
    },
    addStock({commit},codigoSeleccionado){
      return new Promise(() => {
        commit('maxStock',codigoSeleccionado)
      })
    },
    changeColor({commit, state}, { gameSelect, newColor }) {
      console.log(newColor)
      console.log(gameSelect)
      const juegos = state.games
      const indice = juegos.findIndex((juego) => juego.codigo === gameSelect.codigo)
      console.log(indice)
      commit('SetearColor', { indice, newColor })
    },
  },
  modules: {
  }
})
