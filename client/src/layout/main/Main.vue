<template>
  <div>
    <Layout>
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
import MyHeader from '@/layout/header/Header'
export default {
  components: {
    Layout,
    MyHeader
  }
}
</script>
<style scoped lang="scss">
.header {
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  box-shadow: 2px 2px 2px black;
}
.footer {
  height: calc(100vh - 60px);
  background-color: white;
}
</style>
