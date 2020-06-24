<template>
  <div>
    <div class="header">
      <!-- 顶部小组件区域 -->
      <div class="top d-flex justify-space-between">
        <v-icon class="search-icon">search</v-icon>
        <input class="input" type="text" placeholder="校园网" />
        <div class="functions">
          <v-icon color="rgb(167, 167, 162)" class="icon">mdi-account-multiple</v-icon>
          <v-icon color="rgb(167, 167, 162)" class="icon" style="margin-left: 20px;" @click="loginOut()">exit_to_app</v-icon>
        </div>
      </div>
      <!-- 轮播 -->
      <div>
        <template>
          <v-carousel cycle height="200" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
              :src="slide"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
            </v-carousel-item>
          </v-carousel>
        </template>
      </div>
      <!-- 功能区 -->
      <div class="icons d-flex flex-row justify-start flex-wrap">
        <div class="ml-6 d-flex align-center align-content-center" v-for="(item, index) in functions" :key="index">
          <Icon
            iconColor="rgb(254, 253, 249)"
            fontColor="black"
            :icon="item.icon"
            :name="item.name"
            :path="item.path"
            :size="size"
            :isCircle="isCircle"
            :bcColor="item.bcColor"
          ></Icon>
        </div>
      </div>
      <!-- 静态资源区 -->
      <div class="modille">
        <div class="card elevation-3" v-for="(punishment, index) in punishments" :key="index">
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
    <Alert info="退出登录" :isShow="dialog"></Alert>
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
          path: '/scan',
          bcColor: '#03a6ff'
        }
      ],
      size: 32,
      colors: ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
      slides: [
        'http://www.niit.edu.cn/_upload/article/images/10/47/c4fa3ce343beb2795dff798f1ba1/6ba30170-e52a-41c2-8b80-82fcaeb46309.jpg',
        'http://www.niit.edu.cn/_upload/article/images/58/86/2f0aae57446288dc38eb137d9f99/83bef855-e910-41df-b6f5-bcfd7cc7f573.jpg',
        'http://www.niit.edu.cn/_upload/article/images/09/1d/407f4a2c45a097779e7ec9e9cd86/bfc70dc3-01a0-4c0d-a4fd-d4f8113f1e6c.jpg',
        'http://www.niit.edu.cn/_upload/article/images/8b/07/6ebca6434fbc8aedced0efc95914/813b9f22-8755-4340-b65c-6d173f5ce5be.jpg'
      ],
      dialog: false,
      isCircle: true,
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
          time: '6月20日'
        },
        {
          title: '超市优惠',
          content: '零食全场优惠',
          time: '6月20日'
        },
        {
          title: '理发优惠',
          content: '今日理发全部减5元',
          time: '6月20日'
        },
        {
          title: '超市优惠',
          content: '水果特价优惠',
          time: '6月20日'
        },
        {
          title: '洗衣优惠',
          content: '假期洗衣优惠',
          time: '6月20日'
        }
      ],
      bcColor: ['#45d9fd', '#1ec0ff', '#0080ff', '#03a6ff']
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
        path: item.path,
        bcColor: this.bcColor[i % 4]
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
  padding: 10px;
  .title {
    height: 70px;
    display: flex;

    justify-content: center;
    align-items: center;
    // background-color: burlywood;
  }
  .top {
    padding: 10px 0 10px 0;
    .search-icon {
      position: absolute;
      // top: 10px;
      left: 18px;
    }
    .input {
      padding-left: 40px;
      background-color: #eaeeee;
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
  width: 95%;
  display: flex;
  overflow-x: scroll;
}
.modille::-webkit-scrollbar {
  display: none;
}
.card {
  min-width: 135px;
  height: 80px;
  //line-height: 70px;
  margin: 10px;
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
  // overflow-x: scroll;
  white-space: wrap;

  background-image: linear-gradient(to top right, #cadbe9, #6aafe6);
  color: white;
}
.schoolLife {
  height: 70px;
  border-bottom: 1px solid gainsboro;
  padding: 10px 10px 5px 15px;
}
</style>
