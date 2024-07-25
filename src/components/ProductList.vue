<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import LoadingAnimation from "./LoadingAnimation.vue";

const store = useStore();
const products = computed(() => store.getters["products/getProducts"]);
const revProducts = computed(() => {
    return [...products.value].reverse();
});
const loading = computed(() => store.getters["products/getLoading"]);

function addToCart(id){
    store.dispatch('carts/addToCart', id);
}

onMounted(() =>{
    store.dispatch('products/fetchProducts');
});
</script>


<template>
    <div class="products">
        <h4 class="mb-4">Just For You</h4>
        <div class="row">
            <div class="col-sm-3 mb-4" v-for="product in revProducts" :key="product.id">
                <div class="card" style="width: 18rem">
                    <img :src="product.img" class="card-img-top" alt="Product image" />
                    <div class="card-body">
                        <router-link :to="{ name: 'productDetails', params: { id: product.id } }">
                            <h6 class="card-title">{{ product.name }}</h6>
                        </router-link>
                        <span>TK. {{ product.price }}</span>
                        <a href="#" class="btn btn-sm btn-success float-end" @click="addToCart(product.id)"><i class="bi bi-cart-plus-fill"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <LoadingAnimation v-if="loading" />
</template>