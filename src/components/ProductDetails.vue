<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

function addToCart(id){
    store.dispatch('carts/addToCart', id);
}

const product = computed(() => store.getters['products/getProductsById'](route.params.id));

</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <img :src="product.img"
                    alt="Product Image" class="img-fluid">
            </div>
            <div class="col-md-6">
                <h2>{{ product.name }}</h2>
                <p>{{ product.description }}</p>
                <h4>Price: &#2547; {{ product.price }}</h4>
                <button class="btn btn-primary" @click="addToCart(product.id)">Add to Cart</button>
            </div>
        </div>
    </div>
</template>