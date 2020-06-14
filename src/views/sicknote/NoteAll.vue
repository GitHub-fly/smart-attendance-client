<template>
  <div>
    <div>
      <Nav title="我的所有假条"></Nav>
    </div>
    <div class="notes">
      <div class="note" v-for="(note, index) in noteList" :key="index">
        <span>{{ note.gmtCreate }}</span>
        <span v-if="note.type === 1">事假</span>
        <span v-if="note.type === 2">病假</span>
        <span v-if="note.type === 3">休学</span>
        <span v-if="note.type === 4">其他</span>
        <span v-if="note.status === 0">未审核</span>
        <span v-if="note.status === 1">同意</span>
        <span v-if="note.status === 3">驳回</span>
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
      console.log(this.noteList)
      console.log(noteAll.data[0].gmtCreate)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.note {
  width: 95%;
  height: 50px;
  margin: 20px 10px 15px 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  border: 1px solid gray;
}
</style>
