import axios from 'axios'
import store from '../store'

const cuponModule = {
  namespaced: true,
  state: {
    cupons: [
      {
        id: 1,
        name: 'Cupon1',
        discount: 10
      },
      {
        id: 2,
        name: 'Cupon2',
        discount: 20
      },
      {
        id: 3,
        name: 'Cupon3',
        discount: 30
      }
    
    ],
    error: false,
  },
  getters: {
    getCuponError(state) { 
      return state.error
    },
  },
  mutations: {
    checkCupon(state, payload) {
      const cupon = state.cupons.find(cupon => cupon.name === payload);
      if (cupon) {
        store.commit('carts/addDiscount', { cuponName: cupon.name, discount: cupon.discount });
        state.error = false;

      }
      else{
        store.commit('carts/addDiscount', { cuponName: '', discount: 0 });
        state.error = true;
      }
    },

  },
  actions: {

    
  }
}

export default cuponModule
