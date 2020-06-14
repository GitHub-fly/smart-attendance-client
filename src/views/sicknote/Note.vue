<template>
  <v-app>
    <div>
      <Nav title="学生请假"></Nav>
    </div>
    <div>
      <div class="top">
        <div class="userName">
          <sapn style="margin: 20px 0 0 30px">请假人</sapn>
          <sapn style="margin: 20px 0 0 20%">{{ user.userName }} {{ user.userGender }} {{ user.userXh }}</sapn>
        </div>
        <div class="userPhone">
          <span style="margin: 15px 0 0 30px">联系方式</span>
          <input type="text" style="margin: 5px 0 0 15%; border: 1px solid gray; border-radius: 5px;" placeholder="手机号" />
        </div>
      </div>
      <div class="middle">
        <div class="reason">
          <span style="margin-left: 20px">请假原因*</span>
          <input type="textarea" value="请输入请假原因" />
          <!-- <v-textarea auto-grow outlined v-on="on"></v-textarea> -->
          <div class="label">
            <span style="margin-right: 20px;">请假类型*</span>
            <label v-for="(label, index) in labels" :key="index">{{ label }}</label>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="time">
          <span>请假起止时间*</span>
          <div style="display: flex">
            <div>
              <div class="my-content-list" @click="show">
                <div class="date-time-input">现在时间&nbsp;&nbsp;{{ msg }}</div>
              </div>
              <date-time ref="dateTime" @confirm="select" format="yyyy-MM-dd hh:mm" color="black">
                <div slot="prevMonth"><i>-</i></div>
                <div slot="nextMonth"><i>+</i></div>
              </date-time>
            </div>
            <span>至</span>
            <div>
              <div class="my-content-list" @click="show1">
                <div class="date-time-input">截止时间&nbsp;&nbsp;{{ msg1 }}</div>
              </div>
              <date-time ref="dateTime1" @confirm="select1" format="yyyy-MM-dd hh:mm" color="black">
                <div slot="prevMonth"><i>-</i></div>
                <div slot="nextMonth"><i>+</i></div>
              </date-time>
            </div>
          </div>
        </div>
        <div class="dayCount">
          <span>请假天数*</span>
          <input type="text" style="width: 20px" />天
        </div>
        <div class="school">
          <sapn>是否需要出校门*</sapn>
          <v-checkbox v-model="school" :label="`是否需要出校`"></v-checkbox>
        </div>
        <div class="attentance" style="display: flex">
          <span>是否归寝*</span>
          <v-checkbox v-model="attentance" :label="`是否归寝`"></v-checkbox>
        </div>
        <div class="teacher">
          <span>班级审核人*</span>
          <span>{{ user.teacherName }}</span>
        </div>
        <div class="acmedy">
          <span>学院审核人*</span>
          <span>{{ user.instructorName }}</span>
        </div>
      </div>
      <button class="btn" @click="getday">提交</button>
    </div>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
import DateTime from 'vue-date-time-m'
export default {
  name: 'Note',
  data() {
    return {
      labels: ['事假', '病假', '休学', '其他'],
      user: {
        userName: JSON.parse(localStorage.getItem('user')).sysUserName,
        userGender: JSON.parse(localStorage.getItem('user')).sysUserGender,
        userXh: JSON.parse(localStorage.getItem('user')).sysJobNumber,
        teacherName: JSON.parse(localStorage.getItem('user')).teacherName,
        instructorName: JSON.parse(localStorage.getItem('user')).sysUserInstructorName
      },
      msg: '',
      msg1: '',
      count: 0,
      isLoading: false,
      school: false,
      attentance: false
    }
  },
  components: { Nav, DateTime },
  created() {},
  mounted() {
    // async getUser() {
    //   let users = await this.GlOBAL.API.init('')
    // }
  },
  methods: {
    commit() {
      this.$router.push('/notepreview')
    },
    show() {
      console.log(this.$refs)
      this.$refs.dateTime.show()
    },
    show1() {
      this.$refs.dateTime1.show()
    },
    // 日期组件回调
    select(val) {
      this.msg = val
    },
    select1(val1) {
      this.msg1 = val1
    },
    getday() {
      var number1 = this.msg.replace(/[^0-9]/gi, '').substring(6, 8) //提取数字
      console.log(number1)
      var number2 = this.msg1.replace(/[^0-9]/gi, '').substring(6, 8) //提取数字
      console.log(number2)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.top {
  width: 95%;
  height: 65px;
  margin: 5% auto;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: #fbfbfb;
}
.middle {
  width: 95%;
  height: 150px;
  margin: 20px auto;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 10px;
  background-color: #fbfbfb;
}
.bottom {
  width: 95%;
  height: 350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid gray;
  background-color: #fbfbfb;
}
.reason {
  display: flex;
  float: left;
  flex-direction: column;
}
.reason input {
  width: 300px;
  height: 70px;
  margin-top: 2px;
  margin-left: 20px;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
}
.label {
  margin: 10px auto;
}
.label label {
  margin-left: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 30%;
  background-color: #fbfbfb;
}
.electTime {
  display: flex;
}
.time {
  width: 100%;
  height: 120px;
  // border-bottom: 1px solid gray;
  // background-color: aqua;
}
.dayCount {
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  // background-color: aqua;
}
.school {
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // border: 1px solid gray;
  // background-color: aqua;
}
.attentance {
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  // background-color: aqua;
}
.teacher {
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid gray;
  
  // background-color: aqua;
}
.acmedy {
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // border: 1px solid gray;
  // background-color: aqua;
}
.btn {
  width: 95%;
  height: 50px;
  margin: 30px 0 0 2.5%;
  border-radius: 10px;
  background-color: #6200ea;
}
</style>
