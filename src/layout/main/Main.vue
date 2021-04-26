<template>
  <div>

    <Layout>
      <template #left>
        <div class="left">
          <MyMenu />
          <!-- <PersonalDes /> -->
        </div>
      </template>
      <template #default>
        <div class="header">
          <MyHeader />
        </div>
        <div class="footer">
          <router-view />
        </div>
      </template>

    </Layout>
  </div>
</template>
<script>
import Layout from '@/components/Layout'
import MyMenu from '@/components/Menu'
import MyHeader from '@/layout/header/Header'
export default {
  components: {
    Layout,
    MyMenu,
    MyHeader
  }
}
</script>
<style scoped lang="scss">
.left {
  width: 200px;
  background-color: #001529;
}
.header {
  height: 110px;
}
.footer {
  height: calc(100vh - 110px);
  background-color: #f0f2f5;
}
</style>
