
<template>
    <div id="app">
        <Demo></Demo>
    </div>
</template>

<script>
import Demo from "./components/Demo";
export default {
    name: "App",
    components: {
        Demo
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
html,
body,
div {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>
