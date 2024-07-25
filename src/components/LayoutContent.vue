<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const authUserInfo = computed(() => store.getters.getAuthUserInfo);
const authUserFullName = authUserInfo.value
    ? `${authUserInfo.value.firstName} ${authUserInfo.value.lastName}`
    : "";

const cartLength = computed(() => store.getters['carts/getCartLength']);

function logout() {
    store.commit('logout');
    router.push({ name: 'Login' })
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div class="container">
            <router-link class="navbar-brand" to="/">BAT Commerce</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page"
                            :to="{ name: 'productList' }">Products</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-link me-2">
                        <router-link class="btn btn-sm btn-primary position-relative" :to="{ name: 'cart' }">
                            <i class="bi bi-cart4"></i>
                            <span
                                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {{ cartLength ? cartLength : 0 }}
                                <span class="visually-hidden">Cart Items</span>
                            </span>
                        </router-link>
                        <a href=""></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false"> {{ authUserFullName ? authUserFullName : 'Guest' }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li><a class="dropdown-item" @click="logout()">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <slot />
</template>