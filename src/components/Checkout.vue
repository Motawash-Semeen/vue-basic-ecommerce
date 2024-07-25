<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const mappedCartItems = computed(() => store.getters['carts/getMappedCartItems']);
const getShippingFee = computed(() => store.getters['carts/getShippingFee']);
const getCartTotal = computed(() => store.getters['carts/getCartTotal']);
const getDiscount = computed(() => store.getters['carts/getDiscount']);
const getAuthUserInfo = computed(() => store.getters['getAuthUserInfo']);

function removeCart(){
    var fname = document.getElementById('firstName').value;
    var lname = document.getElementById('lastName').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    if(!fname || !lname || !username || !email || !address){
        alert('Please fill all the fields');
        return;
    }
    if(getCartTotal.value == 0){
        alert('Please add some products to cart');
        return;
    }
    store.commit('carts/removeCart');
    alert('Order placed successfully');
    router.push({ name: 'productList' });
}
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-4 order-md-2 mb-4">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <span class="text-muted">Your cart</span>
                        <span class="badge badge-secondary badge-pill">3</span>
                    </h4>
                    <ul class="list-group mb-3 sticky-top">
                        <li class="list-group-item d-flex justify-content-between lh-condensed" v-for="product in mappedCartItems" :key="product.id">
                            <div>
                                <h6 class="my-0">{{ product.name }}</h6>
                                <small class="text-muted">{{ product.category }}</small>
                            </div>
                            <span class="text-muted">&#2547; {{ (product.quantity*product.price).toFixed(2) }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 class="my-0">SHIPPING</h6>
                                <small class="text-muted">{{ getShippingFee==5 ? 'Standard' : 'Express' }}</small>
                            </div>
                            <span class="text-muted">&#2547; {{ getShippingFee }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between bg-light" v-if="getDiscount.cuponName">
                            <div class="text-success">
                                <h6 class="my-0">Promo code</h6>
                                <small>{{ getDiscount.cuponName }}</small>
                            </div>
                            <span class="text-success">-&#2547; {{ getDiscount.discount }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Total (BDT)</span>
                            <strong>&#2547; {{ (getCartTotal + Number(getShippingFee ? getShippingFee : 0) - Number(getDiscount?.discount ? getDiscount?.discount : 0)).toFixed(2) }}</strong>
                        </li>
                    </ul>
                </div>
                <div class="col-md-8 order-md-1">
                    <h4 class="mb-3">Billing address</h4>
                    <form class="needs-validation" novalidate="">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="firstName">First name</label>
                                <input type="text" class="form-control" id="firstName" placeholder="" :value="getAuthUserInfo.firstName"
                                    required="" readonly/>
                                <div class="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="lastName">Last name</label>
                                <input type="text" class="form-control" id="lastName" placeholder="" :value="getAuthUserInfo.lastName"
                                    required="" readonly/>
                                <div class="invalid-feedback">Valid last name is required.</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="username">Username</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">@</span>
                                </div>
                                <input type="text" class="form-control" id="username" placeholder="Username"
                                    required="" :value="getAuthUserInfo.username" readonly/>
                                <div class="invalid-feedback" style="width: 100%">
                                    Your username is required.
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="email">Email <span class="text-muted">(Optional)</span></label>
                            <input type="email" class="form-control" id="email" placeholder="you@example.com" :value="getAuthUserInfo.email" readonly/>
                            <div class="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="address">Address</label>
                            <input type="text" class="form-control" id="address" placeholder="1234 Main St"
                                required="" />
                            <div class="invalid-feedback">
                                Please enter your shipping address.
                            </div>
                        </div>
                        <hr class="mb-4" />
                        <h4 class="mb-3">Payment</h4>
                        <div class="d-block my-3">
                            <div class="custom-control custom-radio">
                                <input id="cod" name="paymentMethod" type="radio" class="custom-control-input"
                                    checked="" required="" />
                                <label class="custom-control-label ms-2" for="credit">
                                    Cash on delivery</label>
                            </div>
                        </div>
                    </form>
                </div>
                <button class="order-md-3 btn btn-primary btn-lg text-center" type="submit"
                    style="width: max-content; margin: auto" @click="removeCart">
                    Continue to checkout
                </button>
            </div>
        </div>
    </div>
</template>
