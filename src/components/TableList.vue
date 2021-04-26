<template>
  <div class="table-list-container">
    <table>
      <thead>
        <td
          v-for="(item,index) in dataTitle"
          :key="index"
        >{{item}}</td>

      </thead>
      <tbody>
        <tr
          v-for="items in dataList"
          :key="items.id"
        >
          <td
            v-for="(item,index) in items"
            :key="index"
          >{{item}}</td>
          <!-- 最后一个按钮操作列 -->
          <td @click="handleEdit(items)">编辑</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ['dataTitle', 'dataList'],
  methods: {
    handleEdit (item) {
      this.$emit('edit', item)
    }
  }
}
</script>
<style scoped lang='scss'>
@import "~@/style/color.scss";
.table-list-container {
  width: 95%;
  border: 1px solid $Border-Base;
  border-radius: 10px;
  padding: 10px;
  min-height: 500px;
  margin: 0 auto;
  table {
    width: 100%;
    thead {
      width: 100%;
      text-align: center;
      background-color: white;
      line-height: 50px;
      font-weight: 700;
      font-size: 16px;
      td {
        border: 1px solid $Border-Base;
        min-width: 25px;
      }
    }
    tbody {
      width: 100%;
      text-align: center;
      line-height: 50px;
      font-size: 14px;
      tr {
        cursor: pointer;
        &:hover {
          background-color: #e6f7ff;
        }
      }
      td {
        border: 1px solid $Border-Base;
      }
    }
  }
}
</style>
