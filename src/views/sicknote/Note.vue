<template>
  <v-app>
    <Nav title="学生请假" :items="items" @operation="handle"></Nav>
    <div class="d-flex flex-column align-center">
      <div class="top d-flex flex-column justify-center padding">
        <div class="userName d-flex justify-space-between">
          <span>请假人</span>
          <span>{{ user.sysUserName }} {{ user.sysUserGender }} {{ user.sysJobNumber }}</span>
        </div>
        <div class="userPhone d-flex justify-space-between margin-top">
          <span>联系方式 <span class="point">*</span></span>
          <input
            type="number"
            style="padding-left: 5px; border: 1px solid gray; outline: none; border-radius: 5px; width: 145px"
            v-model="note.userPhone"
            placeholder="手机号"
          />
        </div>
      </div>
      <div class="middle padding d-flex flex-column align-start margin">
        <div class="reason">
          <span style="display: block">请假原因 <span class="point">*</span></span>
          <textarea v-model="note.reason" type="textarea" placeholder="请输入请假原因" class="margin-top" />
          <!-- <v-textarea auto-grow outlined v-on="on"></v-textarea> -->
          <div class="margin-top">
            <span>请假类型<span class="point">*</span></span>
            <label
              class="label"
              v-for="(label, index) in labels"
              :key="index"
              @click="getType(index)"
              :style="{ 'background-color': selectIndex === index ? 'rgb(189, 189, 189)' : '' }"
              >{{ label }}</label
            >
          </div>
        </div>
      </div>
      <div class="bottom margin padding">
        <div class="border-bottom d-flex flex-column">
          <span>请假起止时间 <span class="point">*</span></span>
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
          <span>请假天数</span>
          <span>{{ note.dayCount }} 天</span>
        </div>
        <div class="border-bottom school margin">
          <span>是否需要出校门 <span class="point">*</span></span>
          <v-checkbox dense class="checkbot" v-model="school" :label="`是否需要出校`"></v-checkbox>
        </div>
        <div class="border-bottom attentance margin" style="display: flex">
          <span>是否归寝 <span class="point">*</span></span>
          <v-checkbox class="checkbot" v-model="attentance" :label="`是否归寝`"></v-checkbox>
        </div>
        <div class="border-bottom teacher margin">
          <span>班级审核人</span>
          <span>{{ user.teacherName }}</span>
        </div>
        <div class="acmedy margin">
          <span>学院审核人</span>
          <span>{{ user.sysUserInstructorName }}</span>
        </div>
      </div>
      <v-btn width="90%" color="rgb(1, 152, 255)" dark @click="commit()" style="margin: 20px 0 20px 0">提交申请</v-btn>
    </div>
    <Alert :info="info" :isShow="dialog"></Alert>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
import Alert from '../../components/Alert'
import DateTime from 'vue-date-time-m'
export default {
  name: 'Note',
  data() {
    return {
      labels: ['事假', '病假', '休学', '其他'],
      selectIndex: 0,
      user: JSON.parse(localStorage.getItem('user')),
      msg: '请假时间',
      msg1: '请先选择开始时间',
      count: 0,
      isLoading: false,
      school: false,
      attentance: false,
      note: {
        type: 1
      },
      items: ['预览', '退出'],
      newNoteId: null,
      dialog: false,
      time: 3,
      info: '已发送'
    }
  },
  components: { Nav, DateTime, Alert },
  created() {
    // 调用初始化用户信息的方法
    this.createUser()
  },
  mounted() {},
  methods: {
    async commit() {
      if (
        this.note.userPhone == null ||
        this.note.reason == null ||
        this.msg == '请假时间' ||
        this.msg1 == '请先选择开始时间' ||
        this.note.dayCount == null
      ) {
        this.info = '有未填项'
        this.dialog = true
        let timer = setInterval(() => {
          this.time--
          if (this.time == 0) {
            clearInterval(timer)
            this.dialog = false
            this.time = 3
          }
        }, 500)
      } else {
        this.info = '已发送'
        this.note.isSchool = this.school ? 1 : 0
        this.note.isDormitory = this.attentance ? 1 : 0
        let res = await this.GLOBAL.API.init('/note/increase', this.note, 'post')
        this.newNoteId = res.data.noteId
        this.timer()
      }
    },
    timer() {
      this.dialog = true
      let ti = setInterval(() => {
        this.time--
        if (this.time == 0) {
          clearInterval(ti)
          this.dialog = false
          this.time = 3
        }
      }, 500)
    },
    show() {
      this.$refs.dateTime.show()
    },
    show1() {
      if (this.msg == '请假时间') {
        this.info = '请先选择开始时间'
        this.timer()
      } else {
        this.$refs.dateTime1.show()
      }
    },
    // 日期组件回调
    select(val) {
      this.msg = val
      this.note.startTime = this.msg + ':00'
    },
    select1(val1) {
      if (this.note.startTime == '') {
        alert('请先选择请假时间')
        return
      }
      if (val1 <= this.note.startTime) {
        alert('结束时间不能小于或等于开始时间')
        return
      }
      this.msg1 = val1
      this.note.finishTime = this.msg1 + ':00'
      this.getday()
    },
    getday() {
      let number1 = this.note.startTime.replace(/[^0-9]/gi, '').substring(6, 8) //提取数字
      let number2 = this.note.finishTime.replace(/[^0-9]/gi, '').substring(6, 8) //提取数字
      let count = number2 - number1
      this.note.dayCount = count == 0 ? 1 : count
    },
    getType(index) {
      this.note.type = index + 1
      this.selectIndex = index
    },
    handle(items) {
      if (items[0] == '预览') {
        this.$router.push({
          name: 'NotePreview',
          params: {
            note: this.note
          }
        })
      } else {
        this.$router.back(-1)
      }
    },
    createUser() {
      this.note.userId = this.user.pkSysUserId
      this.note.sysUserName = this.user.sysUserName
      this.note.sysUserGender = this.user.sysUserGender
      this.note.sysJobNumber = this.user.sysJobNumber
      this.note.clazzName = this.user.clazzName
      this.note.teacherName = this.user.teacherName
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.point {
  color: red;
}
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
  outline: none;
}
</style>
