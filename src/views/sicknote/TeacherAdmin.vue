<template>
  <div>
    <Nav title="请假管理"></Nav>
    <div class="noteBody">
      <div class="topNav">
        <ul>
          <li v-for="(item, index) in funList" :key="index" @click="changeData(index)">{{ item }}</li>
        </ul>
      </div>
      <div class="container">
        <div class="all">
          <div class="allNote" v-for="(note, index) in infoList" :key="index">
            <span class="padding">{{ note.type }}</span>
            <div style="display: flex; flex-direction: column; align-items: center;">
              <img :src="note.sysUserAvatar" class="user-avatar" />
              <span>{{ note.sysUserName }}</span>
              <span>{{ note.name }}</span>
              <span>{{ note.gmtCreate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'TeacherAdmin',
  data() {
    return {
      // studentNotes: [],
      infoList: [],
      funList: ['全部', '事假', '病假', '休学', '其他'],
      teacher: {
        pkSysUserId: '003'
      }
    }
  },
  components: { Nav },
  created() {
    this.getAllNote()
    // this.getNote()
  },
  mounted() {},
  methods: {
    async getAllNote() {
      let res = await this.GLOBAL.API.init('/note/teacher/all', this.teacher, 'post')
      let studentNotes = res.data
      studentNotes.forEach((item) => {
        if (item.type == 1) {
          item.type = '事假'
        } else if (item.type == 2) {
          item.type = '病假'
        } else if (item.type == 3) {
          item.type = '休学'
        } else {
          item.type = '其他'
        }
      })
      this.infoList = studentNotes

      // this.studentNotes = studentNotes.data
    },
    changeData(i) {
      switch (i) {
        case 0:
          // this.infoList = this.studentNotes
          console.log(this.infoList[0].name)
          break
        case 1:
          this.dealData('事假')
          break
        case 2:
          this.dealData('病假')
          break
        case 3:
          this.dealData('休学')
          break
        case 4:
          this.dealData('其他')
          break
      }
    },
    dealData(str) {
      this.infoList = []
      this.studentNotes.forEach((item) => {
        if (item.noteType == str) {
          this.infoList.push(item)
        }
      })
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.padding {
  padding: 5px 0 15px 5px;
}
.user-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.noteBody {
  width: 100%;
  height: 100%;
}
.topNav {
  width: 100%;
  height: 40px;
}
.topNav ul {
  display: flex;
  justify-content: space-around;
}
.container {
  height: 500px;
}
.all {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.allNote {
  width: 140px;
  height: 210px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: blueviolet;
}
</style>
