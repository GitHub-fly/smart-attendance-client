<template>
  <v-app>
    <div>
      <Nav title="各班级假条管理"></Nav>
    </div>
    <div class="content">
      <v-card class="card" color="#40c4ff" width="150" height="190" justify="center" dark v-for="(item, index) in dormitoryVo" :key="index">
        <v-avatar size="100" class="ml-6 mt-n12" @click="toNoteInfo(index)">
          <img class="circle" :src="item.teacher.sysUserAvatar" />
        </v-avatar>
        <v-list-item class="item margin-top">
          <v-list-item-title>{{ item.teacher.teacherName }}</v-list-item-title>
          <v-list-item-title class="margin1-top">{{ item.teacher.teacherPhone }}</v-list-item-title>
          <v-list-item-title class="margin1-top">{{ item.teacher.name }}</v-list-item-title>
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
.margin-top {
  margin-top: 20px;
}
.margin1-top {
  margin-top: 10px;
}
.content {
  width: 90%;
  margin: auto;
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
.card {
  margin-top: 70px;
}
.circle {
  width: 95px;
  height: 95px;
  background-color: #eee;
  border: 1px solid rgb(202, 212, 200);
  border-radius: 50%;
  color: black;
  display: flex;
  // align-items: center;
  // justify-content: center;
}
.item {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
</style>
