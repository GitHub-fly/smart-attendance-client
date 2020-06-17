<template>
  <v-container>
    <div class="bg"></div>
    <v-content>
      <v-responsive height="780">
        <p class="tit">智慧考勤</p>
        <v-row class="flex-column align-center" style="margin-top: 180px">
          <v-text-field
            class="xun-input title"
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
    <v-dialog persistent v-model="dialog" max-width="180">
      <v-card height="60" class="d-flex flex-column align-center" style="padding: 15px 0 0 0" color="rgb(255, 255, 255)">
        <!-- <v-icon size="40" color="rgb(1, 217, 39)">check_circle_outline</v-icon> -->
        <p class="text">同学好</p>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      rulesPhone: [(value) => !!value || 'Required.', (value) => (value && value.length >= 11) || 'Min 11 characters'],
      rulesPass: [(value) => !!value || 'Required.', (value) => (value && value.length >= 6) || 'Min 6 characters'],
      loginDto: {
        account: '18851999738',
        password: '123456'
      },
      dialog: false,
      time: 1
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    async login() {
      let loginRes = await this.GLOBAL.API.init('/user/login', this.loginDto, 'post')
      if (loginRes.code == 1) {
        localStorage.setItem('user', JSON.stringify(loginRes.data.user))
        this.dialog = true
        let timer = setInterval(() => {
          this.time--
          if (this.time == 0) {
            clearInterval(timer)
            this.dialog = false
            this.time = 1
            this.$router.push('/index')
          }
        }, 1000)
      } else {
        alert(loginRes.msg)
      }
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
