<template>
  <v-app>
    <Nav title="请假管理" path="/home"></Nav>
    <div class="noteBody d-flex flex-column align-center">
      <div class="topNav d-flex justify-center">
        <v-tabs height="30" style="margin-left: -30px">
          <v-tab v-for="(item, index) in funList" :key="index" @click="changeData(index)">{{ item }}</v-tab>
        </v-tabs>
      </div>
      <div class="mt-2 d-flex flex-wrap justify-space-between" style="width: 95%">
        <div class="allNote" v-for="(note, index) in studentNotes" :key="index" @click="checkNote(note)">
          <span class="mt-1 ml-1">{{ note.type }}</span>
          <div class="d-flex flex-column align-center">
            <img :src="note.sysUserAvatar" class="user-avatar mt-4" />
            <span class="mt-4">{{ note.sysUserName }}</span>
            <span class="date">{{ note.gmtCreate }}</span>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'TeacherAdmin',
  data() {
    return {
      // 所有假条数组
      infoList: [],
      funList: ['全部', '事假', '病假', '休学', '其他'],
      teacher: {
        pkSysUserId: JSON.parse(localStorage.getItem('user')).pkSysUserId
      },
      // 界面上被循环的数组对象
      studentNotes: [],
      instructorId: ''
    }
  },
  components: { Nav },
  created() {
    this.getAllNote()
  },
  mounted() {},
  methods: {
    async getAllNote() {
      let res = await this.GLOBAL.API.init('/note/teacher/all', this.teacher, 'post')
      // 假条数组
      this.infoList = res.data.noteList
      this.instructorId = res.data.instructorId
      this.infoList.forEach((item) => {
        if (item.type == 1) {
          item.type = '事假'
        } else if (item.type == 2) {
          item.type = '病假'
        } else if (item.type == 3) {
          item.type = '休学'
        } else {
          item.type = '其他'
        }
        item.gmtCreate = item.gmtCreate.split(' ')[0]
      })
      this.studentNotes = this.infoList
      console.log(this.infoList[0])
    },
    changeData(i) {
      switch (i) {
        case 0:
          this.studentNotes = this.infoList
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
      this.studentNotes = []
      this.infoList.forEach((item) => {
        if (item.type == str) {
          this.studentNotes.push(item)
        }
      })
    },
    /**
     * 跳转到审核界面的方法
     */
    checkNote(item) {
      item.instructorId = this.instructorId
      this.$router.push({
        name: 'CheckNote',
        params: {
          note: item
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
.topNav {
  width: 95%;
}
.topNav ul {
  display: flex;
  justify-content: space-around;
}
.all {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.allNote {
  width: 140px;
  height: 215px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: blueviolet;

  span {
    margin-top: 3px;
    font-size: 17px;
  }
  .date {
    text-align: center;
    font-size: 14px;
    padding: 6px;
  }
}
</style>
