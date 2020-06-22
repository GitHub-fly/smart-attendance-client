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
        <div class="teacherOpinoin margin" v-if="notePreview.dayCount > 3">
          <span>班主任意见</span>
          <textarea type="textarea" disabled v-model="notePreview.teacherOpinion" class="inputarea margin-top" />
        </div>
        <div class="teacherOpinoin margin" v-if="notePreview.dayCount > 3">
          <span>辅导员意见</span>
          <textarea type="textarea" disabled v-model="notePreview.instructorOpinion" class="inputarea margin-top" />
        </div>
      </div>
      <div class="button-box margin-top1">
        <button style="background-color: #4caf50" @click="commit()">批准</button>
        <button style="background-color: #dd2c00">驳回</button>
      </div>
    </div>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
import axios from 'axios'
export default {
  name: 'CheckNote',
  data() {
    return {
      notePreview: {},
      note: {}
    }
  },
  components: { Nav },
  created() {
    this.note.pkNoteId = this.$route.params.note.pkNoteId
    this.getNotepreview()
  },
  mounted() {},
  methods: {
    async getNotepreview() {
      let res = await this.GLOBAL.API.init('/note/info', this.note, 'post')
      this.notePreview = res.data
      console.log(this.notePreview)
    },
    async commit() {
      axios({
        method: 'post',
        url: '/note/teacher/advice',
        data: this.note
      }).then((res) => {
        console.log(res)
      })
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
