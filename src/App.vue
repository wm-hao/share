<template>
  <div id="app" class="both">
    <router-view></router-view>
  </div>
</template>

<script>
    import {store_f_changeLogin, store_s_step_key, store_s_userId_key} from "./const";

    export default {
        name: "App",
        destroyed() {
            console.log('App destroyed');
            this.$store.commit(store_f_changeLogin, null);
            localStorage.clear();
        },
        created() {

        },
        methods: {}
    }
</script>

<style scoped>
</style>


