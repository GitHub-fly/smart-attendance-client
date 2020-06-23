<template>
  <v-app>
    <Nav title="学生假条详情"></Nav>
    <div class="d-flex flex-column align-center">
      <div class="content">
        <div class="user display bottom margin">
          <span class="font">请假人</span>
          <span>{{ notePreview.sysUserName }}</span>
        </div>
        <div class="gender display bottom margin">
          <span class="font">性别</span>
          <span>{{ notePreview.sysUserGender }}</span>
        </div>
        <div class="studentNumber display bottom margin">
          <span class="font">学号</span>
          <span>{{ notePreview.sysJobNumber }}</span>
        </div>
        <div class="phone display bottom margin">
          <span class="font">联系方式</span>
          <span>{{ notePreview.userPhone }}</span>
        </div>
        <div class="time bottom margin">
          <span>请假起止时间</span>
          <div class="display padding">
            <span style="font-size: 12px">{{ notePreview.startTime }}</span>
            <span>至</span>
            <span style="font-size: 12px">{{ notePreview.finishTime }}</span>
          </div>
        </div>
        <div class="dayCount display bottom margin">
          <span>请假天数</span>
          <span>{{ notePreview.dayCount }}天</span>
        </div>
        <div class="school display bottom margin">
          <span>是否需要出校</span>
          <span>是</span>
        </div>
        <div class="dorimtry display bottom margin">
          <span>是否归寝</span>
          <span>是</span>
        </div>
        <div class="reason margin">
          <span>请假原因</span>
          <textarea type="textarea" v-model="notePreview.reason" disabled class="inputarea margin-top" />
        </div>
        <div class="teacherOpinoin margin" v-if="notePreview.dayCount > 3 && roleId == 3">
          <span>班主任意见</span>
          <textarea type="textarea" disabled v-model="notePreview.teacherOpinion" class="inputarea margin-top" />
        </div>
        <!-- <div class="teacherOpinoin margin" v-if="notePreview.dayCount > 3 && roleId == 3">
          <span>辅导员意见</span>
          <textarea type="textarea" disabled v-model="notePreview.instructorOpinion" class="inputarea margin-top" />
        </div> -->
      </div>
      <div class="button-box margin-top1">
        <button v-ripple style="background-color: #4caf50" @click="access()">批准</button>
        <button v-ripple style="background-color: #dd2c00" @click="refuse()">驳回</button>
      </div>
    </div>
    <Alert :info="info" :isShow="dialog"> </Alert>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
import Alert from '../../components/Alert'
export default {
  name: 'CheckNote',
  data() {
    return {
      notePreview: {},
      noteIdDto: {},
      noteDto: {},
      note: {},
      info: '',
      dialog: false,
      time: 1,
      roleId: JSON.parse(localStorage.getItem('user')).roleId
    }
  },
  components: { Nav, Alert },
  created() {
    this.note = this.$route.params.note
    this.noteIdDto.pkNoteId = this.note.pkNoteId
    this.noteDto.pkNoteId = this.note.pkNoteId
    this.noteDto.roleId = JSON.parse(localStorage.getItem('user')).roleId
    this.getNotepreview()
  },
  mounted() {},
  methods: {
    async getNotepreview() {
      let res = await this.GLOBAL.API.init('/note/info', this.noteIdDto, 'post')
      this.notePreview = res.data
    },
    /**
     * 教师同意的方法
     */
    async access() {
      console.log(this.note)
      let res = await this.GLOBAL.API.init('/note/teacher/agreeAdvice', this.noteDto, 'post')
      if (res.code == 1 && this.roleId == 2) {
        if (this.notePreview.dayCount > 3) {
          // 给辅导员发送消息
          await this.GLOBAL.sendNew('[假条消息]', '有假条需要您审核。', this.note.instructorId)
        }
        // 给学生发送消息
        await this.GLOBAL.sendNew('[假条消息]', '您' + this.note.gmtCreate + '的假条有更新哟!', this.note.pkSysUserId)
        this.info = '已批准'
        this.timer(true)
      }
    },
    /**
     * 教师拒绝的方法
     */
    async refuse() {
      let res = await this.GLOBAL.API.init('/note/teacher/unAgreeAdvice', this.noteDto, 'post')
      if (res.code == 1) {
        await this.GLOBAL.sendNew('[假条消息]', '您' + this.note.gmtCreate + '的假条有更新哟!', this.note.pkSysUserId)
        this.info = '已驳回'
        this.timer(true)
      }
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
            if (JSON.parse(localStorage.getItem('user')).roleId == 2) {
              this.$router.push('/teacheradmin')
            } else {
              this.$router.push('/clazzNoteAdmin')
            }
          }
        }
      }, 1000)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.content {
  width: 90%;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
}
.margin {
  margin: 25px 20px 10px 30px;
}
.margin-top {
  margin-top: 6px;
}
.margin-top1 {
  margin-top: 10px;
}
.inputarea {
  width: 95%;
  height: 100px;
  outline: none;
  padding: 4px;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
}
.display {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bottom {
  border-bottom: 1px solid #dfdfdf;
}
.padding {
  padding-top: 5px;
}
.font {
  font: 宋体;
}
.button-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button-box button {
  width: 90%;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  outline: none;
}
</style>
