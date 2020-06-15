<template>
  <div>
    <Nav title="我的所有假条"></Nav>
    <div class="notes d-flex flex-column align-center">
      <div class="note" v-for="(note, index) in noteList" :key="index">
        <span>{{ note.gmtCreate }}</span>
        <span class="span">{{ note.type }}</span>
        <span class="span" :style="{ backgroundColor: note.color }">{{ note.status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'NoteAll',
  data() {
    return {
      sysNote: {
        userId: JSON.parse(localStorage.getItem('user')).pkSysUserId
      },
      noteList: []
    }
  },
  components: { Nav },
  created() {
    this.getNote()
  },
  mounted() {},
  methods: {
    async getNote() {
      let noteAll = await this.GLOBAL.API.init('/note/student/all', this.sysNote, 'post')
      this.noteList = noteAll.data
      this.noteList.forEach((item) => {
        if (item.status == 0) {
          item.status = '驳回'
          item['color'] = 'rgb(239, 83, 80)'
        }
        if (item.status == 1) {
          item.status = '未审核'
          item['color'] = 'rgb(255, 238, 88)'
        }
        if (item.status == 2) {
          item.status = '同意'
          item['color'] = 'rgb(102, 187, 106)'
        }
        if (item.type == 1) {
          item.type = '事假'
        }
        if (item.type == 2) {
          item.type = '病假'
        }
        if (item.type == 3) {
          item.type = '休学'
        }
        if (item.type == 4) {
          item.type = '其它'
        }
      })
      console.log(this.noteList)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.notes {
  width: 90%;
  margin: 0 auto;
  padding-top: 20px;
  .note {
    margin: 20px 0 20px 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    border: 1px solid gray;

    .span {
      border-radius: 10px;
      width: 50px;
      height: 22px;
      display: flex;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
