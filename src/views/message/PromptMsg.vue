<template>
  <div>
    <Nav title="消息"></Nav>
    <!-- <div class="meg" v-if="getdate && studentVo.isAttendance == isShow">
      <span>系统提示</span>
      <span>即将超过归寝时间，请归寝并打卡</span>
    </div> -->
    <div class="meg" v-if="studentVo.isAttendance != isShow">
      <span>系统提示</span>
      <span>今日已打卡</span>
    </div>
    <div class="meg" v-else>
      <span>系统提示</span>
      <span>今日未打卡</span>
    </div>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="center" style="font-size: 15px; color: #171717; font-family: 宋体;">提醒</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 80px;">
          <span class="center" style="font-size: 15px; color: #171717; font-family: 宋体;">即将超过归寝时间，请归寝并打卡</span>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn style="font-family: 宋体" color="blue darken-1" text @click="dialog = false">去打卡</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Nav from '../../components/Nav'

export default {
  name: 'PromptMsg',
  data() {
    return {
      isShow: true,
      stipulateDate: '8:00:00',
      user: JSON.parse(localStorage.getItem('user')),
      studentVo: [],
      dialog: false
    }
  },
  components: { Nav },
  created() {
    this.getInfo()

    //this.getdate()
  },
  methods: {
    async getInfo() {
      let student = await this.GLOBAL.API.init('/attendance/user/info', this.user, 'post')
      this.studentVo = student.data
      if (student.data.isAttendance == 0) {
        student.data.isAttendance = true
      } else {
        student.data.isAttendance = false
      }
      console.log(student.data)
      let date = new Date(+new Date() + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '')
        .slice(11, 20)
      console.log(date)
      this.dialog = this.comptime(date, this.stipulateDate) && this.studentVo.isAttendance == this.isShow
    },
    comptime(a, b) {
      var dateA = new Date('1900/1/1 ' + a)
      var dateB = new Date('1900/1/1 ' + b)
      if (isNaN(dateA) || isNaN(dateB)) return null
      if (dateA > dateB) return true
      if (dateA <= dateB) return false
    }
  },
  computed: {
    getdate() {
      let date = new Date(+new Date() + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '')
        .slice(11, 20)
      console.log(date)
      return this.comptime(date, this.stipulateDate)
    }
  }
}
</script>
<style scoped lang="scss">
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.meg {
  width: 95%;
  height: 70px;
  margin: 0 auto;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  // z-index: 998;
  // background-color: #000;
  // opacity: 0.6;
}
.pro {
  height: 100px;
  width: 70%;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid gray;

  // z-index: 998;
  // background-color:#000;
  // opacity:0.6;
}
.button {
  // background-color: brown;
  width: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  outline: none;
  border-radius: 1px;
  border: 1px solid gray;
  // background-color: aquamarine;
}
</style>
