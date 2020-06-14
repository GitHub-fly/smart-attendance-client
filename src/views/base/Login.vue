<template>
  <v-container>
    <v-content>
      <v-responsive height="780">
        <v-row class="flex-column align-center" style="margin-top: 200px">
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
            style="margin-top: 80px"
            v-model="loginDto.password"
          ></v-text-field>
          <v-btn @click="login()">登录</v-btn>
        </v-row>
      </v-responsive>
    </v-content>
    <v-footer absolute class="font-weight-medium">
      <v-col class="text-center" cols="12"> {{ new Date().getFullYear() }} — <strong>smart-attendance</strong> </v-col>
    </v-footer>
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
      }
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
        this.$router.push('/index')
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
</style>
