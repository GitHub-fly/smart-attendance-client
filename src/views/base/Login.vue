<template>
  <v-container>
    <div class="bg"></div>
    <v-content>
      <v-responsive height="780">
        <p class="tit">智慧考勤</p>
        <v-row class="flex-column align-center" style="margin-top: 180px">
          <v-text-field
            class="xun-input title"
            type="number"
            :rules="rulesPhone"
            label="Phone"
            hide-details="auto"
            v-model="loginDto.account"
          ></v-text-field>
          <v-text-field
            class="xun-input title"
            :rules="rulesPass"
            label="Password"
            type="password"
            style="margin-top: 60px"
            v-model="loginDto.password"
          ></v-text-field>
          <div class="d-flex justify-space-between" style="width: 50%">
            <v-btn @click="login()">登录</v-btn>
            <v-btn>注册</v-btn>
          </div>
        </v-row>
      </v-responsive>
    </v-content>
    <v-footer absolute class="font-weight-medium">
      <v-col class="text-center" cols="12"> {{ new Date().getFullYear() }} — <strong>smart-attendance</strong> </v-col>
    </v-footer>
    <Alert :info="info" :isShow="dialog"></Alert>
  </v-container>
</template>

<script>
import Alert from '../../components/Alert'
export default {
  name: 'Login',
  data() {
    return {
      rulesPhone: [(value) => !!value || 'Required.', (value) => (value && value.length >= 11) || 'Min 11 characters'],
      rulesPass: [(value) => !!value || 'Required.', (value) => (value && value.length >= 6) || 'Min 6 characters'],
      loginDto: {
        // 同学账号
        // account: '18851999738',
        // 班主任账号
        account: '14455559999',
        // 阿姨账号
        // account: '17783208600',
        password: '123456'
      },
      dialog: false,
      time: 2,
      info: ''
    }
  },
  components: { Alert },
  created() {},
  mounted() {},
  methods: {
    async login() {
      let loginRes = await this.GLOBAL.API.init('/user/login', this.loginDto, 'post')
      if (loginRes.code == 1) {
        let user = loginRes.data.user
        localStorage.setItem('user', JSON.stringify(loginRes.data.user))
        localStorage.setItem('menuList', JSON.stringify(loginRes.data.menuList))
        let roleName = ''
        if (user.roleId == 1) {
          roleName = '同学'
        } else if (user.roleId == 5) {
          roleName = '阿姨'
        } else {
          roleName = '老师'
        }
        this.info = '您好！' + loginRes.data.user.sysUserName + roleName
        this.timer(true)
      } else {
        this.info = loginRes.msg
        this.timer()
      }
    },
    /**
     * 倒计时并跳转的方法
     *
     * @param isGo 表示是否进行路由跳转
     */
    timer(isGo) {
      this.dialog = true
      let timer = setInterval(() => {
        this.time--
        if (this.time == 0) {
          clearInterval(timer)
          this.dialog = false
          this.time = 2
          if (isGo) {
            this.$router.push('/index')
          }
        }
      }, 1000)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.xun-input {
  width: 200px;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background: url('../../assets/bg.jpg') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
}
.tit {
  font-size: 30px;
  font-family: 'TrueType';
}
</style>
