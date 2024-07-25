import axios from 'axios'
import { defaultAxios } from '@/axiosInstance/axiosInstance'
const productModule = {
  namespaced: true,
  state: {
    products: [],
    loading: true
  },
  getters: {
    getProducts(state) {
      return state.products
    },
    getProductsById: (state) => (id) => {
      return state.products.find(product => product.id == id)
    },
    getLoading(state) {
      return state.loading
    }
    
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setLoading(state, payload) {
      state.loading = payload
    }
    
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('setLoading', true, { root: true })
      commit('setProducts', [])
      await defaultAxios.get('products').then((response) => {
        const products = response.data?.products?.map((product) => {
          return {
            id: product.id,
            name: product.title,
            price: product.price,
            img: product.thumbnail,
            description: product.description,
            category: product.category
          }
        })
        commit('setProducts', products)
        commit('setLoading', false)
      }).catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
      // commit('setProducts', response.data)
    }
    
  }
}

export default productModule
