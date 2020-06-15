<template>
  <v-app>
    <Nav title="学生请假" :items="items" @operation="handle"></Nav>
    <div class="d-flex flex-column align-center" style="padding-top: 20px">
      <div class="top d-flex flex-column justify-center padding">
        <div class="userName d-flex justify-space-between">
          <span>请假人</span>
          <span>{{ user.userName }} {{ user.userGender }} {{ user.userXh }}</span>
        </div>
        <div class="userPhone d-flex justify-space-between margin-top">
          <span>联系方式</span>
          <input
            type="text"
            style="padding-left: 5px; border: 1px solid gray; outline: none; border-radius: 5px; width: 145px"
            placeholder="手机号"
          />
        </div>
      </div>
      <div class="middle padding d-flex flex-column align-start margin">
        <div class="reason">
          <span style="display: block">请假原因*</span>
          <textarea type="textarea" placeholder="请输入请假原因" class="margin-top" />
          <!-- <v-textarea auto-grow outlined v-on="on"></v-textarea> -->
          <div class="margin-top">
            <span>请假类型*</span>
            <label class="label" v-for="(label, index) in labels" :key="index">{{ label }}</label>
          </div>
        </div>
      </div>
      <div class="bottom margin padding">
        <div class="border-bottom d-flex flex-column">
          <span>请假起止时间*</span>
          <div class="margin-top" style="display: flex;">
            <div class="date-box" @click="show">
              <div class="my-content-list">
                <div class="d-flex align-center justify-center subtitle-2">{{ msg }}</div>
              </div>
              <date-time ref="dateTime" @confirm="select" format="yyyy-MM-dd hh:mm" color="black">
                <div slot="prevMonth"><i>-</i></div>
                <div slot="nextMonth"><i>+</i></div>
              </date-time>
            </div>
            <span style="margin-left: 5px; margin-right: 5px">至</span>
            <div class="date-box" @click="show1">
              <div class="my-content-list">
                <div class="d-flex align-center justify-center subtitle-2">{{ msg1 }}</div>
              </div>
              <date-time ref="dateTime1" @confirm="select1" format="yyyy-MM-dd hh:mm" color="black">
                <div slot="prevMonth"><i>-</i></div>
                <div slot="nextMonth"><i>+</i></div>
              </date-time>
            </div>
          </div>
        </div>
        <div class="border-bottom dayCount margin">
          <span>请假天数*</span>
          <input type="text" style="width: 20px" />天
        </div>
        <div class="border-bottom school margin">
          <span>是否需要出校门*</span>
          <v-checkbox dense class="checkbot" v-model="school" :label="`是否需要出校`"></v-checkbox>
        </div>
        <div class="border-bottom attentance margin" style="display: flex">
          <span>是否归寝*</span>
          <v-checkbox class="checkbot" v-model="attentance" :label="`是否归寝`"></v-checkbox>
        </div>
        <div class="border-bottom teacher margin">
          <span>班级审核人*</span>
          <span>{{ user.teacherName }}</span>
        </div>
        <div class="acmedy margin">
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
      msg: '请假时间',
      msg1: '结束时间',
      count: 0,
      isLoading: false,
      school: false,
      attentance: false,
      items: ['预览', '退出']
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
    async commit() {
      let data = {}
      this.$router.push('/notepreview')
      let increaseRes = await this.GLOBAL.API.init('/note/increase', data, 'psot')
      console.log(increaseRes)
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
    },
    handle(items) {
      if (items[0] == '预览') {
        this.$router.push('/notePreview')
      } else {
        this.$router.back(-1)
      }
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.margin-top {
  margin-top: 15px;
}
.margin {
  margin-top: 30px;
}
.padding {
  padding: 8px 20px 8px 20px;
}
.border-bottom {
  padding-bottom: 8px;
  border-bottom: 1px solid gray;
}
.checkbot {
  height: 25px;
  margin-top: -3px;
}
.top {
  width: 90%;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: #fbfbfb;
}
.middle {
  width: 90%;
  border-radius: 10px;
  border: 1px solid gray;
  background-color: #fbfbfb;
}
.bottom {
  width: 90%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid gray;
  background-color: #fbfbfb;

  .date-box {
    width: 50%;
    border: 1px solid gray;
    border-radius: 10px;
    text-align: center;
    height: 28px;
  }
}
.reason textarea {
  width: 300px;
  height: 100px;
  border-radius: 5px;
  outline: none;
  padding: 5px 10px 5px 15px;
  border: 1px solid #e5e5e5;
}
.label {
  margin-left: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background-color: #fbfbfb;
  padding: 3px 8px 3px 8px;
  font-size: 12px;
}
.electTime {
  display: flex;
}
.dayCount {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.school {
  display: flex;
  justify-content: space-between;
}
.attentance {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.teacher {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.acmedy {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.btn {
  width: 90%;
  height: 35px;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #6200ea;
  font-size: 22px;
}
</style>
