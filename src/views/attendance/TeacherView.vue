<template>
  <v-app>
    <Nav title="学生打卡情况"></Nav>
    <v-container style="width: 95%">
      <div class="d-flex mt-5 justify-space-between flex-wrap">
        <v-card class="mb-6" elevation="3" width="140" height="215" v-for="(item, index) in stuVo" :key="index">
          <v-icon class="warn" v-if="item.isShow" @click="warn(index)">notifications_active</v-icon>

          <v-avatar size="80" class="">
            <v-img :src="item.sysUserAvatar" style="border-radius: 50%;"></v-img>
          </v-avatar>
          <v-list-item>
            <v-list-item-title class="d-flex justify-center">{{ item.sysUserName }}</v-list-item-title>
          </v-list-item>
          <v-list-item style="margin-top: -30px;">
            <v-list-item-title class="d-flex justify-center">{{ item.sysUserPhone }}</v-list-item-title>
          </v-list-item>
          <v-chip color="green" text-color="white" v-if="item.isAttendance === 1">
            <v-icon color="dark">mdi-checkbox-marked-circle</v-icon>已打卡
          </v-chip>
          <v-chip v-else color="red" text-color="white">
            <v-icon color="dark" size="15" class="mr-2">highlight_off</v-icon>
            未打卡
          </v-chip>
        </v-card>
      </div>
    </v-container>
    <Alert :info="info" :isShow="dialog"></Alert>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
import Alert from '../../components/Alert'

export default {
  name: 'TeacherView',
  data() {
    return {
      user: {
        pkSysUserId: JSON.parse(localStorage.getItem('user')).pkSysUserId,
        roleId: JSON.parse(localStorage.getItem('user')).roleId
      },
      stuVo: {},
      info: '',
      dialog: false,
      time: 1
    }
  },
  components: { Nav, Alert },
  created() {
    this.getStudents()
  },
  mounted() {},
  methods: {
    async getStudents() {
      let students = await this.GLOBAL.API.init('/attendance/manager/info', this.user, 'post')
      students.data.forEach((item) => {
        if (item.isAttendance == 0) {
          item.isShow = true
        } else {
          item.isShow = false
        }
      })
      this.stuVo = students.data
      console.log(this.stuVo)
    },
    /**
     * 提醒打卡打的方法
     */
    async warn(i) {
      this.info = '已提醒'
      this.timer()
      let item = this.stuVo[i]
      item.isShow = false
      this.stuVo.splice(i, 1, item)
      await this.GLOBAL.sendNew('[打卡消息]', this.stuVo[i].sysUserName + '，请您尽快回寝打卡！', this.stuVo[i].pkSysUserId)
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
.v-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;

  .warn {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
.v-chip {
  margin-top: -20px;
}
</style>
