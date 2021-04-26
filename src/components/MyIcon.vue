<template>
  <span
    class="iconfont"
    :class="`icon-`+type"
  ></span>

</template>
<script>
export default {
  props: {
    type: {
      type: String
    }
  }
}
</script>
<style scoped>
@import url("//at.alicdn.com/t/font_2439602_tn2u2xbq90a.css");
</style>
