<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
#app{
  width: 100vw;
  height: 100vh;
}
</style>
