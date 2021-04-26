<template>
  <div class="message-container">
    <div class="input-name">
      <span class="choose-avatar">
        切换
        <div class="avatar-list">
          <AvatarList @chooseItem="chooseItem" />
        </div>
      </span>
      <div
        class="active-avatar"
        v-if="activeItem"
      >
        <MyAvatar
          v-if="active"
          :src="activeItem"
        />
      </div>
      <input
        class="name"
        type="text"
        v-model="name"
        placeholder="用户昵称"
        maxlength="10"
      >
      <div class="error">
        {{ nameErr }}
      </div>

    </div>
    <div class="input-content">
      <textarea
        class="area"
        v-model="content"
        placeholder="输入内容"
        maxlength="300"
      ></textarea>
      <div class="error">
        {{contentErr}}
      </div>
    </div>
    <div class="btn">
      <button
        class="submit"
        @click="handleclick"
      >提交</button>
    </div>
  </div>
</template>
<script>
import MyAvatar from '@/components/MyAvatar'
import AvatarList from '@/components/AvatarList'
export default {
  components: {
    MyAvatar,
    AvatarList
  },
  data () {
    return {
      name: '',
      content: '',
      active: '1',
      nameErr: '',
      contentErr: ''
    }
  },
  methods: {
    chooseItem (item) {
      this.active = item
    },
    handleclick () {
      // 提交校验
      if (this.name === '' || this.name === undefined) {
        this.nameErr = '昵称不能为空'
      } else {
        this.nameErr = ''
      }

      if (this.content === '' || this.content === undefined) {
        this.contentErr = '内容不能为空'
      } else {
        this.contentErr = ''
      }
      if (this.contentErr || this.nameErr) {
        return
      }
      // 执行函数的回调
      this.$emit('handlesubmit', {
        name: this.name,
        content: this.content,
        avatar: this.activeItem
      }, () => {
        this.$tip({ msg: '留言成功' })
        this.name = ''
        this.content = ''
      })
    }

  },

  computed: {
    activeItem () {
      return `http://duyixpy.top/img/avatar${this.active}.jpg`
    }
  }

}
</script>
<style scoped lang="scss">
@import "~@/style/color.scss";
.message-container {
  user-select: none;
  .choose-avatar {
    padding: 10px 5px;
    border: 1px solid $Dark;
    border-radius: 15px;
    text-align: center;
    color: $Dark;
    cursor: pointer;
    position: relative;
    &:active {
      border-color: $Border-focus;
    }

    .avatar-list {
      position: absolute;
      top: 38px;
      width: 40%;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: white;
      display: none;
      z-index: 999;
    }
    &:hover .avatar-list {
      display: block;
    }
  }
  .name {
    margin-left: 25px;
    outline: none;
    border: 1px dashed black;
    line-height: 36px;
    padding: 5px 15px;
    width: 45%;
    border-radius: 5px;
    &:focus {
      border-color: $Border-focus;
    }
  }

  .input-content {
    margin-top: 10px;
  }

  .active-avatar {
    margin-left: 20px;
    display: inline-block;
    vertical-align: middle;
  }

  .area {
    outline: none;
    resize: none;
    border: 1px dashed black;
    line-height: 36px;
    width: 100%;
    padding: 5px 15px;
    border-radius: 5px;
    height: 150px;
    &:focus {
      border-color: $Border-focus;
    }
  }

  .submit {
    margin: 20px 0 20px;
    padding: 0 40px;
    line-height: 32px;
    border-radius: 5px;
    color: #fff;
    border: none;
    cursor: pointer;
    background-color: #6b9eee;
  }
  .error {
    margin-top: 5px;
    color: $Warning;
    font-size: 14px;
    height: 15px;
    line-height: 15px;
  }
}
</style>
