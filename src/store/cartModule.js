import axios from 'axios'
import store from '../store'

const cartModule = {
  namespaced: true,
  state: {
    cartItems: [],
    shippingFee: 5,
    discount: [
      {
        cuponName: '',
        discount: 0
      }
    ],
  },
  getters: {
    getCartItems(state) {
      return state.cartItems
    },
    getCartLength(state) {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    getMappedCartItems(state) {
      return state.cartItems.map(cartItem => {
        const product = store.getters['products/getProducts'].find(product => product.id === cartItem.id);
        return {
          ...product,
          quantity: cartItem.quantity
        };
      });
    },
    getCartTotal(state, getters) {
      return getters.getMappedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    getShippingFee(state) {
      return state.shippingFee
    },
    getDiscount(state) {

      return state.discount
    },
    
  },
  mutations: {
    setCartItems(state, payload) {
      const cartItem = state.cartItems.find(item => item.id === payload);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        state.cartItems.push({ id: payload, quantity: 1 });
      }
    },
    addShippingFee(state, payload) {
      state.shippingFee = payload
    },
    productQtyUp(state, { id, quantity }) {
      const cartItem = state.cartItems.find(item => item.id === id);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    removeCart(state){
      state.cartItems = [];
      state.discount = [];
    },
    addDiscount(state, payload) {
      state.discount = payload;
    },
    deleteCartItem(state, payload) {
      state.cartItems = state.cartItems.filter(item => item.id !== payload);
    },
  },
  actions: {
    async addToCart({ commit }, payload) {
      try {
        commit('setCartItems', payload)
      } catch (error) {
        alert(error)
      }
    },
    async productQtyUp({ commit }, { id, quantity }) {
      try {
        commit('productQtyUp', { id, quantity })
      } catch (error) {
        alert(error)
      }
    },
    async deleteCartItem({ commit }, payload) {
      try {
        commit('deleteCartItem', payload)
      } catch (error) {
        alert(error)
      }
    }
    
  }
}

export default cartModule
