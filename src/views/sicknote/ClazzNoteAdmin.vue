<template>
  <v-app>
    <Nav :title="title" path="/counseloradmin"></Nav>
    <div class="notes d-flex flex-column align-center">
      <div elevation="8" v-ripple class="note elevation-2" v-for="(note, index) in noteList" :key="index" @click="toNoteInfo(note)">
        <span>{{ note.gmtCreate1 }}</span>
        <!-- <span>{{ note.sysJobNumber }}</span> -->
        <span>{{ note.sysUserName }}</span>
        <span class="span">{{ note.type }}</span>
        <span class="span" :style="{ color: note.color }">{{ note.status }}</span>
      </div>
    </div>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'ClazzNoteAdmin',
  data() {
    return {
      title: '',
      clazz: {
        name: this.$store.state.clazzName
      },
      noteList: [],
      model: [1]
    }
  },
  components: { Nav },
  created() {
    this.getClazzNote()
    this.title = this.$store.state.clazzName + '班假条'
  },
  mounted() {},
  methods: {
    async getClazzNote() {
      let noteAll = await this.GLOBAL.API.init('/clazz/noteAll', this.clazz, 'post')
      this.noteList = noteAll.data
      this.noteList.forEach((item) => {
        item.gmtCreate1 = item.gmtCreate.substr(0, 10)
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
    },
    /**
     * 查看假条详情的方法
     */
    toNoteInfo(item) {
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
.notes {
  width: 90%;
  margin: 0 auto;
  .note {
    margin: 20px 0 20px 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;

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
