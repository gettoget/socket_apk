<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <Input v-model="form.captcha" placeholder="Enter something..." style="width: 300px" />
    <img :src="YzUrl" width="100%" alt="验证码" style="width: 100px;cursor: pointer" >

    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data(){
    return {
      YzUrl:'',
      form: {
        username: 'admini',
        password: '123456',
        captcha:'',
        codeID:''
      }
    }
  },
  created(){
    this.getUrl()
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.login()
      // this.$router.push({
      //   name: this.$config.homeName
      // })

      // this.handleLogin({ userName, password }).then(res => {
      //   this.getUserInfo().then(res => {
      //   })
      // })
    },
    getRandom(val) {//取随机数
      let line = 1
      if (val && val > 1) {
        line = val
      }
      let num = ''
      for (var i = 0; i < line; i++) {
        num += Math.floor(Math.random() * 10)
      }
      return num
    },
    getUrl() {
      let codeId =this.getRandom(8)
      this.YzUrl = this.apis.url + this.apis.LOGIN.YZ + codeId
      this.form.codeID = codeId
    },
    login(){
      var v = this
      v.$http.post(this.apis.LOGIN.QUERY, this.form).then((res) => {
        // if (res.code === 200) {
        //   localStorage.setItem('user',this.form.username)
        //   Cookies.set('usermess', this.form.username);
        //   Cookies.set('accessToken', res.result.accessToken);
        //
        //   sessionStorage.setItem("userInfo", JSON.stringify(res.result.userInfo));
        //   localStorage.setItem('menuList', JSON.stringify(res.result.menuTree))
        //   this.setMenuList()
        //   v.initDict(res.result.dictList);
        //
        //   this.$router.push('home')
        // } else {
        //   this.swal({
        //     text: res.message,
        //     type: 'error',
        //     showCancelButton: false,
        //     confirmButtonText:'确认',
        //   });
        // }
        // this.getUrl()
      })
    },
  }
}
</script>

<style>

</style>
