<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const mappedCartItems = computed(() => store.getters['carts/getMappedCartItems']);
const getCartLength = computed(() => store.getters['carts/getCartLength']);
const getCartTotal = computed(() => store.getters['carts/getCartTotal']);
const getShippingFee = computed(() => store.getters['carts/getShippingFee']);
const getDiscount = computed(() => store.getters['carts/getDiscount']);
const getCuponError = computed(() => store.getters['cupons/getCuponError']);

function addShippingFee(fee) {
    store.commit('carts/addShippingFee', fee);
}

function productDecrease(id, quantity) {
    if (quantity > 1) {
        quantity--;
    }
    store.dispatch('carts/productQtyUp', { id, quantity });
}

function productIncrease(id, quantity) {
    quantity++;
    store.dispatch('carts/productQtyUp', { id, quantity });
}

function addCupon(code) {
    store.commit('cupons/checkCupon', code);
}

function deleteCartItem(id) {
    store.dispatch('carts/deleteCartItem', id);
}


</script>

<template>
    <div class="card">
        <div class="row">
            <div class="col-md-8 cart">
                <div class="title">
                    <div class="row">
                        <div class="col">
                            <h4><b>Shopping Cart</b></h4>
                        </div>
                        <div class="col align-self-center text-right text-muted">{{ getCartLength }} items</div>
                    </div>
                </div>
                <div :class="{ 'row': true, 'border-top': index === 0 || index === mappedCartItems.length - 1, 'border-bottom': index === 0 || index === mappedCartItems.length - 1 }"
                    v-for="(product, index) in mappedCartItems" :key="product.id">
                    <div class="row main align-items-center">
                        <div class="col-2"><img class="img-fluid" :src="product.img"></div>
                        <div class="col">
                            <div class="row text-muted">{{ product.category }}</div>
                            <div class="row">{{ product.name }}</div>
                        </div>
                        <div class="col">
                            <a href="#" @click="productDecrease(product.id, product.quantity)">-</a><a href="#"
                                class="border">{{ product.quantity }}</a><a href="#"
                                @click="productIncrease(product.id, product.quantity)">+</a>
                        </div>
                        <div class="col">&#2547; {{ (product.quantity * product.price).toFixed(2) }} <span class="close"
                                style="cursor: pointer;" @click="deleteCartItem(product.id)">&#10005;</span></div>
                    </div>
                </div>

                <div class="back-to-shop"><a href="/products">&leftarrow;</a><span class="text-muted">Back to
                        shop</span></div>
            </div>
            <div class="col-md-4 summary">
                <div>
                    <h5><b>Summary</b></h5>
                </div>
                <hr>
                <div class="row">
                    <div class="col" style="padding-left:0;">ITEMS {{ getCartLength }}</div>
                    <div class="col text-right">&#2547; {{ getCartTotal.toFixed(2) }}</div>
                </div>
                <div class="row" v-if="getDiscount.discount">
                    <div class="col" style="padding-left:0;">Discount </div>
                    <div class="col text-right">&#2547; {{ getDiscount.discount }}</div>
                </div>
                <form>
                    <p>SHIPPING</p>
                    <select @change="event => addShippingFee(event.target.value)">
                        <option class="text-muted" value="5">Standard-Delivery- &#2547;5.00</option>
                        <option class="text-muted" value="10">Express-Delivery- &#2547;10.00</option>
                    </select>
                    <p>PROMO CODE</p>
                    <input id="code" class="mb-0" placeholder="Enter your code"
                        @blur="event => addCupon(event.target.value)"
                        :value="getDiscount.cuponName ? getDiscount.cuponName : ''">
                    <small class="text-danger" v-if="getCuponError">Invalid Cupon Code</small>
                </form>
                <div class="row mt-3" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
                    <div class="col">TOTAL PRICE</div>
                    <div class="col text-right">&#2547; {{ (getCartTotal + Number(getShippingFee) -
                        Number(getDiscount.discount ? getDiscount.discount : 0 )).toFixed(2) }}</div>
                </div>
                <component :is="getCartTotal ? 'router-link' : 'span'" :to="{ name: 'checkout' }" class="btn">
                    CHECKOUT
                </component>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart {
    padding: 4vh 5vh;
}

.summary {
    background-color: #ddd;
    padding: 4vh;
    color: rgb(65, 65, 65);
}

.summary .col-2 {
    padding: 0;
}

.summary .col-10 {
    padding: 0;
}

.row {
    margin: 0;
}

.title b {
    font-size: 1.5rem;
}

.main {
    margin: 0;
    padding: 2vh 0;
    width: 100%;
}

.col-2,
.col {
    padding: 0 1vh;
}

a {
    padding: 0 1vh;
}

.close {
    margin-left: auto;
    font-size: 0.7rem;
}

img {
    width: 3.5rem;
}

.back-to-shop {
    margin-top: 4.5rem;
}

h5 {
    margin-top: 4vh;
}

hr {
    margin-top: 1.25rem;
}

form {
    padding: 2vh 0;
}

select {
    border: 1px solid rgba(0, 0, 0, 0.137);
    padding: 1.5vh 1vh;
    margin-bottom: 4vh;
    outline: none;
    width: 100%;
    background-color: rgb(247, 247, 247);
}

input {
    border: 1px solid rgba(0, 0, 0, 0.137);
    padding: 1vh;
    margin-bottom: 4vh;
    outline: none;
    width: 100%;
    background-color: rgb(247, 247, 247);
}

input:focus::-webkit-input-placeholder {
    color: transparent;
}

.btn {
    background-color: #000;
    border-color: #000;
    color: white;
    width: 100%;
    font-size: 0.7rem;
    margin-top: 4vh;
    padding: 1vh;
    border-radius: 0;
}

.btn:focus {
    box-shadow: none;
    outline: none;
    box-shadow: none;
    color: white;
    -webkit-box-shadow: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: none;
}

.btn:hover {
    color: white;
}

a {
    color: black;
    text-decoration: none;
}

a:hover {
    color: black;
}

#code {
    background-image: linear-gradient(to left, rgba(255, 255, 255, 0.253), rgba(255, 255, 255, 0.185)), url("https://img.icons8.com/small/16/000000/long-arrow-right.png");
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: center;
}
</style>