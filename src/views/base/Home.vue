<template>
  <div>
    <div class="header">
      <div class="title">
        <span>智慧考勤</span>
      </div>
      <div class="top d-flex justify-space-between">
        <input class="input" type="text" placeholder="校园网" />
        <div class="functions">
          <v-icon class="icon">mdi-account-multiple</v-icon>
          <v-icon class="icon" style="margin-left: 20px;" @click="loginOut()">exit_to_app</v-icon>
        </div>
      </div>
      <Alert info="退出登录" :isShow="dialog"></Alert>
      <div>
        <template>
          <v-carousel cycle height="200" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <v-sheet :color="colors[i]" height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="display-3">{{ slide }} Slide</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </template>
      </div>
      <div class="icons d-flex flex-row justify-start flex-wrap">
        <div
          class="d-flex align-center align-content-center"
          v-for="(item, index) in functions"
          :key="index"
          style="margin-left: 30px; background-color: burlywood; border-radius: 50%;"
        >
          <Icon
            iconColor="rgb(254, 253, 249)"
            fontColor="rgb(254, 253, 249)"
            :icon="item.icon"
            :name="item.name"
            :path="item.path"
            :size="size"
          ></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../../components/Icon'
import Alert from '../../components/Alert'
export default {
  name: 'Home',
  data() {
    return {
      functions: [
        {
          icon: 'mdi-credit-card-scan-outline',
          name: '扫一扫',
          path: '/scan'
        }
      ],
      size: 32,
      colors: ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
      dialog: false,
      time: 1
    }
  },
  components: {
    Icon,
    Alert
  },
  created() {
    let menuList = JSON.parse(localStorage.getItem('menuList'))
    for (let i = 0; i < menuList.length; i++) {
      let item = menuList[i]
      this.functions.push({
        icon: item.icon,
        name: item.name,
        path: item.path
      })
    }
  },
  mounted() {},
  methods: {
    loginOut() {
      localStorage.clear()
      this.timer(true)
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
          this.time = 1
          if (isGo) {
            this.$router.push('/login')
          }
        }
      }, 1000)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.header {
  // background-color: rgb(21, 119, 253);
  .top {
    padding: 10px;
    .input {
      padding-left: 20px;
      background-color: rgb(246, 248, 250);
      border-radius: 5px;
      width: 250px;
      outline: none;
    }
    .functions {
      .icon {
        color: aliceblue;
      }
    }
  }
  .icons {
    margin-top: 20px;
    margin-left: -25px;
  }
}
</style>
