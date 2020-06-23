<template>
  <v-app>
    <Nav title="各班级假条管理" class="mb-4"></Nav>
    <div class="content mt-4 mb-4">
      <v-card elevation="5"
        class="mt-6 mb-12 d-flex flex-column align-center justify-center"
        color="#40c4ff"
        width="150"
        height="215"
        justify="center"
        dark
        v-for="(item, index) in dormitoryVo"
        :key="index"
      >
        <div class="mt-n12 img" @click="toNoteInfo(index)">
          <img :src="item.teacher.sysUserAvatar" />
        </div>
        <v-list-item class="item margin-top mt-6 mb-n6">
          <v-list-item-title>{{ item.teacher.teacherName }}</v-list-item-title>
          <v-list-item-title class="mt-4">{{ item.teacher.teacherPhone }}</v-list-item-title>
          <v-list-item-title class="mt-4">{{ item.teacher.name }}</v-list-item-title>
        </v-list-item>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'CounselorAdmin',
  data() {
    return {
      user: {
        pkSysUserId: '004'
      },
      dormitoryVo: [],
      stuVo: {}
    }
  },
  components: { Nav },
  created() {
    this.getDormitory()
  },
  mounted() {},
  methods: {
    async getDormitory() {
      let dormitory = await this.GLOBAL.API.init('/note/instructor/all', this.user, 'post')
      this.dormitoryVo = dormitory.data
      // if(dormitory.code == 1) {
      //   localStorage.setItem('clazzNote', JSON.stringify())
      // }
      console.log(dormitory.data)
    },
    toNoteInfo(i) {
      this.$store.commit('setClazzName', this.dormitoryVo[i].teacher.name)
      this.$router.push('/clazzNoteAdmin')
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.img {
  width: 100px;
  height: 100px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.content {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.center {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}
.circle {
  width: 95px;
  height: 95px;
  background-color: #eee;
  border: 1px solid rgb(202, 212, 200);
  border-radius: 50%;
  color: black;
  display: flex;
}
.item {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
</style>
