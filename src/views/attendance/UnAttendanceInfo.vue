<template>
  <div class="d-flex mt-5 justify-space-between align-center flex-wrap" style="width: 95%">
    <v-card
      elevation="3"
      class="d-flex flex-column align-center mb-12"
      width="150"
      justify="center"
      v-for="(item, index) in stuVo"
      :key="index"
    >
      <v-icon v-show="iconShow[index]" class="warn" @click="warn(index)">notifications_active</v-icon>
      <v-avatar size="60" style="margin-top: -30px">
        <v-img :src="item.sysUserAvatar" style="border-radius: 50%;"></v-img>
      </v-avatar>
      <v-list-item>
        <v-list-item-title class="">{{ item.sysUserName }}</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>{{ item.sysUserPhone }}</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>班主任：{{ item.teacherName }}</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>{{ item.teacherPhone }}</v-list-item-title>
      </v-list-item>
    </v-card>
    <Alert :info="info" :isShow="dialog"></Alert>
  </div>
</template>

<script>
import Alert from '../../components/Alert'
export default {
  name: 'UnAttendanceInfo',
  data() {
    return {
      user: {
        pkSysUserId: '1'
      },
      stuVo: {},
      info: '',
      dialog: false,
      time: 1,
      iconShow: []
    }
  },
  components: { Alert },
  created() {
    this.getUnCheckStu()
  },
  mounted() {},
  methods: {
    async getUnCheckStu() {
      let stu = await this.GLOBAL.API.init('/attendance/info/not', this.user, 'post')
      this.stuVo = stu.data
      let length = this.stuVo.length
      for (let i = 0; i < length; i++) {
        this.iconShow.splice(i, 0, true)
      }
    },
    /**
     * 提醒打卡的方法
     */
    async warn(i) {
      this.info = '已提醒'
      this.iconShow.splice(i, 1, false)
      this.timer()
      console.log(i)
      await this.GLOBAL.sendNew('[打卡消息]', this.stuVo[i].sysUserName + '，请您尽快回寝打卡！', this.stuVo[i].pkUserId)
    },

    /**
     * 倒计时并跳转的方法
     */
    timer() {
      this.dialog = true
      let timer = setInterval(() => {
        this.time--
        if (this.time == 0) {
          clearInterval(timer)
          this.dialog = false
          this.time = 1
        }
      }, 1000)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.v-list-item-title {
  //   text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-card {
  position: relative;
  .warn {
    position: absolute;
    z-index: 2;
    top: 0px;
    right: 30px;
  }
}
</style>
