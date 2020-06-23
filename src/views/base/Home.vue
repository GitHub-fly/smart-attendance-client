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
          style="margin-left: 30px; background-color: burlywood"
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
      <div class="modille">
        <div class="card" v-for="(punishment, index) in punishments" :key="index">
          <span>{{ punishment.title }}:</span>
          <span>{{ punishment.content }}</span>
        </div>
      </div>
      <div class="mt-7">
        <label class="ml-4" style="font-size: 20px">校园生活</label>
        <div class="schoolLife" v-for="(life, index) in lifes" :key="index">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-weight: bold;">{{ life.title }}</span>
            <span>{{ life.time }}</span>
          </div>
          <span class="mt-3" style="color: #888888">{{ life.content }}</span>
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
      time: 1,
      punishments: [
        {
          id: 1,
          title: '处分通知',
          content: '夜不归宿'
        },
        {
          id: 2,
          title: '阿姨建议',
          content: '清理宿舍卫生'
        },
        {
          id: 3,
          title: '处分通知',
          content: '夜不归宿'
        },
        {
          id: 4,
          title: '阿姨建议',
          content: '清理宿舍卫生'
        }
      ],
      lifes: [
        {
          title: '超市优惠',
          content: '水果特价优惠',
          time: '6月10日'
        },
        {
          title: '超市优惠',
          content: '零食全场优惠',
          time: '6月10日'
        },
        {
          title: '理发优惠',
          content: '今日理发全部减5元',
          time: '6月11日'
        },
        {
          title: '超市优惠',
          content: '水果特价优惠',
          time: '6月10日'
        },
        {
          title: '洗衣优惠',
          content: '假期洗衣优惠',
          time: '6月15日'
        }
      ]
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
  .title {
    height: 70px;
    display: flex;

    justify-content: center;
    align-items: center;
    // background-color: burlywood;
  }
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
    // font-weight: bold;
  }
}
.modille {
  width: 100%;
  display: flex;
  margin-top: 20px;
  overflow-x: scroll;
  white-space: nowrap;
  background-color: aquamarine;
}
.modille::-webkit-scrollbar {
  display: none;
}
.card {
  min-width: 170px;
  height: 80px;
  //line-height: 70px;
  margin: 10px;
  padding: 5px;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
  // overflow-x: scroll;
  white-space: wrap;
  background-color: brown;
}
.schoolLife {
  height: 70px;
  border-bottom: 1px solid gainsboro;
  padding: 10px 10px 5px 15px;
}
</style>
