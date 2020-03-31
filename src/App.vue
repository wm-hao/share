<template>
  <div id="app" class="both">
    <router-view></router-view>
  </div>
</template>

<script>
    import {store_f_changeLogin, rememberPass} from "./const";

    export default {
        name: "App",
        destroyed() {
            console.log('App destroyed');
            this.$store.commit(store_f_changeLogin, null);
        },
        created() {
            console.log(document.body.scrollTop);
            console.log(document.body.clientWidth);
            console.log(document.body.clientHeight);
            console.log(document.body.offsetWidth);
            console.log(document.body.offsetHeight);
            console.log(window.screen.availHeight);
            console.log(window.screen.availWidth);
            console.log(window.innerWidth);
            console.log(window.innerWidth);
            console.log(this.getSize());
        },
        methods: {
            getSize: function () //函数：获取尺寸
            {
                let winWidth = document.body.clientWidth;
                let winHeight = document.body.clientHeight;
                //获取窗口宽度
                if (window.innerWidth)
                    winWidth = window.innerWidth;
                else if ((document.body) && (document.body.clientWidth))
                    winWidth = document.body.clientWidth;
                //获取窗口高度
                if (window.innerHeight)
                    winHeight = window.innerHeight;
                else if ((document.body) && (document.body.clientHeight))
                    winHeight = document.body.clientHeight;
                //通过深入Document内部对body进行检测，获取窗口大小
                if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
                    winHeight = document.documentElement.clientHeight;
                    winWidth = document.documentElement.clientWidth;
                }
                return {
                    width: winWidth,
                    height: winHeight
                }
            }
        }
    }
</script>

<style scoped>
</style>


