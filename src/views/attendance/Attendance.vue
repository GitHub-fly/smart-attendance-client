<template>
  <v-app>
    <Nav title="归寝打卡"></Nav>
    <v-container>
      <v-row class="d-flex flex-column align-center">
        <div class="img">
          <img :src="user.sysUserAvatar" />
        </div>
        <div class="mt-5 content" justify="space-between">
          <v-list-item-group>
            <v-list-item disabled class="item">
              <v-list-item-content>姓名 </v-list-item-content>
              <v-list-item-content>{{ user.sysUserName }} </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item disabled class="item">
              <v-list-item-content>学号</v-list-item-content>
              <v-list-item-content>{{ user.sysJobNumber }} </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item disabled class="item">
              <v-list-item-content>所属房间</v-list-item-content>
              <v-list-item-content>{{ studentVo.roomName }} </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item disabled class="item">
              <v-list-item-content>所属班级</v-list-item-content>
              <v-list-item-content>{{ studentVo.clazzName }} </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item disabled class="item">
              <v-list-item-content>所属学院</v-list-item-content>
              <v-list-item-content>{{ studentVo.academyName }} </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>当前位置</v-list-item-content>
              <v-list-item-content @click="showLocation()">点击获取当前定位</v-list-item-content>
            </v-list-item>
            <div class="d-flex flex-column">
              <div id="container" style="width: 290px; height: 200px" class="mt-1"></div>
              <span class="mt-1">{{ area }}</span>
            </div>
            <v-divider></v-divider>
          </v-list-item-group>
        </div>
        <div class="mt-5 d-flex justify-center" style="width: 290px;">
          <v-btn width="100%" color="rgb(1, 152, 255)" dark @click="commit()">立即打卡</v-btn>
        </div>
      </v-row>
      <Alert :info="info" :isShow="dialog"></Alert>
    </v-container>
  </v-app>
</template>

<script>
import Alert from '../../components/Alert'
import axios from 'axios'
import Nav from '../../components/Nav'
import AMap from '../../util/AMap'
export default {
  name: 'Attendance',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      studentVo: {},
      area: '',
      // 经度
      lat: '',
      // 纬度
      lng: '',
      dialog: false,
      time: 2,
      info: '打卡成功'
    }
  },
  components: { Nav, Alert },
  created() {
    this.area = ''
    this.getInfo()
    this.showLocation()
  },
  mounted() {},
  methods: {
    async getInfo() {
      let student = await this.GLOBAL.API.init('/attendance/user/info', this.user, 'post')
      this.studentVo = student.data
    },
    showLocation() {
      this.area = ''
      AMap().then((AMap) => {
        let map = new AMap.Map('container', {
          resizeEnable: true
        })
        AMap.plugin('AMap.Geolocation', () => {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：5s
            buttonPosition: 'RB', //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
          })
          map.addControl(geolocation)
          geolocation.getCurrentPosition((status, result) => {
            if (status == 'complete') {
              this.onComplete(result)
            } else {
              this.onError(result)
            }
          })
        })
      })
    },

    onComplete(data) {
      this.lng = data.position.lng
      this.lat = data.position.lat
      let location = this.lng + ',' + this.lat
      let urlStr =
        'https://restapi.amap.com/v3/geocode/regeo?output=json&key=c366ab4d4a894354574b28c1e817c247&radius=1000&roadlevel=1&location=' +
        location
      axios({
        methods: 'get',
        url: urlStr
      }).then((res) => {
        this.area = res.data.regeocode.formatted_address
      })
    },
    onError() {
      this.info = '定位失败'
      this.timer()
    },
    operation() {},
    /**
     * 提交打卡的方法
     */
    async commit() {
      if (this.lat == '' || this.lng == '') {
        this.info = '打卡失败'
        this.timer
        return
      }
      let user = {
        userId: JSON.parse(localStorage.getItem('user')).pkSysUserId,
        longitude: this.lat,
        latitude: this.lng
      }
      let res = await this.GLOBAL.API.init('/attendance/increase', user, 'post')
      if (res.code == 80001) {
        this.info = '不在打卡时间内'
      } else {
        this.info = '打卡成功'
      }
      this.timer()
    },
    /**
     * 计时器方法
     */
    timer() {
      this.dialog = true
      let timer = setInterval(() => {
        this.time--
        if (this.time == 0) {
          clearInterval(timer)
          this.dialog = false
          this.time = 2
        }
      }, 500)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.content {
  width: 290px;
  .item {
    color: black;
  }
}
.img {
  width: 140px;
  height: 140px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
