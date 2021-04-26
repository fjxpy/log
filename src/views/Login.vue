<template>
  <div
    class="login-container"
    ref="login"
  >
    <!-- -->
    <div class="login">
      <div class="left">
        <h1 class="title">后台登录系统</h1>

      </div>
      <div class="right">
        <div class="right-login">
          登录
        </div>
        <div class="right-wrapper">
          <div class="username">
            <MyIcon
              class="icon"
              type="denglu"
            />
            <input
              type="text"
              placeholder="用户名"
              v-model="name"
            >
            <span v-if="nameErr">{{nameErr}}</span>
          </div>
          <div class="password">
            <MyIcon
              class="icon"
              type="mima"
            />
            <input
              type="password"
              placeholder="密码"
              v-model="psd"
            >
            <span v-if="psdErr">{{psdErr}}</span>
          </div>

          <div class="code">
            <input
              type="text"
              placeholder="验证码"
              v-model="code"
               @keydown.enter="handleLogin"
            >
            <img
              class="captcha"
              src="http://duyixpy.top:12345/captcha"
              alt="验证码"
            >
            <div class="remember">
              <label for="rem">记住密码
                <input
                  type="checkbox"
                  id="rem"
                  v-model="checked"
                >
              </label>

            </div>

            <span>{{ codeErr }}</span>

          </div>
          <div
            class="submit"
            @click="handleLogin"
          >
            登录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyIcon from '@/components/MyIcon'
import axios from '@/axios/index.js'
export default {
  components: {
    MyIcon
  },
  data () {
    return {
      nameErr: '',
      psdErr: '',
      codeErr: '',
      name: '',
      psd: '',
      code: '',
      checked: true
    }
  },
  created () {
    this.name = localStorage.getItem('name')
    this.psd = localStorage.getItem('password')
  },
  mounted () {
    // this.$refs.login.addEventListener("")
  },
  destroyed () {

  },
  methods: {
    handleLogin () {
      if (this.name === '') {
        this.nameErr = '用户名不能为空'
      } else {
        this.nameErr = ''
      }
      if (this.psd === '') {
        this.psdErr = '密码不能为空'
      } else {
        this.psdErr = ''
      }

      if (this.code === '') {
        this.codeErr = '验证码不能为空'
      } else {
        this.codeErr = ''
      }
      if (this.nameErr || this.psdErr || this.codeErr) {
        // eslint-disable-next-line no-useless-return
        return
      }
      const params = {
        name: this.name,
        password: this.psd
      }
      axios.get('/user', {
        params
      }).then(data => {
        // 登录成功的时候
        if (data.data.code === 200) {
          // 保存至本地,判断是否记住密码如果记住面的话 保存到本地里面
          if (this.checked) {
            localStorage.setItem('name', params.name)
            localStorage.setItem('password', params.password)
          }
          this.$store.dispatch('setUsernameInfo', data.data.data)
          sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))
          this.$router.push({ name: 'Homepage' })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import "~@/style/color.scss";
.login-container {
  width: 100vw;
  height: 100vh;
  background: url(http://duyixpy.top/img/login.jpg) 50% / cover;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .title {
    margin-top: 20px;
    display: inline-block;
    font-size: 26px;
    color: white;
    text-shadow: 2px 2px 2px black, -2px 2px 2px black, 2px -2px 2px black,
      -2px -2px 2px black;
  }
  .login {
    width: 600px;
    height: 350px;
    border-radius: 20px;
    box-sizing: 2px 2px 5px black;
    .left {
      width: 50%;
      height: 100%;
      background: url(http://duyixpy.top/img/login-logo.png) 50% / cover;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      float: left;
    }
    .right {
      width: 50%;
      height: 100%;
      float: right;
      background-color: white;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      box-sizing: border-box;
      padding: 20px;
      .right-login {
        color: $Primary;
        text-align: left;
        font-size: 20px;
        line-height: 40px;
        border-bottom: 1px solid $Border-Light;
      }
      .right-wrapper {
        margin-top: 5px;
        input {
          display: inline-block;
          height: 36px;
          padding: 0 20px 0 32px;
          box-sizing: border-box;
          width: 100%;
          margin-top: 25px;
          outline: none;
          border: 1px solid $Border-Base;
          border-radius: 5px;
          &:focus {
            border-color: $Border-focus;
          }
        }
        .code {
          text-align: left;
          position: relative;
          input {
            width: 40%;
            text-align: left;
            padding: 0 8px;
          }
          .captcha {
            vertical-align: middle;
            height: 36px;
            width: 50%;
          }
          span {
            font-size: 12px;
            color: $Warning;
            position: absolute;
            left: 0;
            top: 65px;
          }
        }

        .username {
          position: relative;
          text-align: left;
          .icon {
            position: absolute;
            font-size: 16px;
            left: 8px;
            top: 35px;
          }
          span {
            font-size: 12px;
            color: $Warning;
            position: absolute;
            left: 0;
            top: 65px;
            &.iconfont {
              color: black;
            }
          }
        }
        .password {
          position: relative;
          text-align: left;
          .icon {
            position: absolute;
            font-size: 16px;
            left: 8px;
            top: 35px;
          }
          span {
            font-size: 12px;
            color: $Warning;
            position: absolute;
            left: 0;
            top: 65px;
            &.iconfont {
              color: black;
            }
          }
        }
        .submit {
          margin: 30px auto;
          text-align: center;
          width: 100%;
          box-sizing: border-box;
          color: #fff;
          padding: 8px;
          border-radius: 8px;
          background-color: #409eff;
          border: none;
          cursor: pointer;
          user-select: none;
        }
        .remember {
          position: absolute;
          font-size: 12px;
          width: 80px;
          height: 30px;
          right: -8px;
          bottom: -10px;
          input {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
}
</style>
