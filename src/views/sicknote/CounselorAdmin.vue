<template>
  <v-app>
    <Nav title="各班级假条管理" path="/home" class="mb-4"></Nav>
    <div class="content mt-4 mb-4" @click="toNoteInfo(index)">
      <v-card
        elevation="5"
        class="mt-6 mb-12 d-flex flex-column align-center justify-center"
        color="#40c4ff"
        width="150"
        height="215"
        justify="center"
        dark
        v-for="(item, index) in clazz"
        :key="index"
      >
        <div class="mt-n12 img">
          <img :src="item.sysUserAvatar" />
        </div>
        <v-list-item class="item margin-top mt-6 mb-n6">
          <v-list-item-title>{{ item.teacherName }}</v-list-item-title>
          <v-list-item-title class="mt-4">{{ item.teacherPhone }}</v-list-item-title>
          <v-list-item-title class="mt-4">{{ item.name }}</v-list-item-title>
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
      clazz: [],
      stuVo: {}
    }
  },
  components: { Nav },
  created() {
    this.clazz = []
    this.getDormitory()
  },
  mounted() {},
  methods: {
    async getDormitory() {
      let res = await this.GLOBAL.API.init('/note/instructor/all', this.user, 'post')
      let clazzList = res.data
      for (let i = 0; i < clazzList.length; i++) {
        const item = clazzList[i]
        let sta = item.status
        if (sta.length != 0) {
          console.log(item.status)
          for (let j = 0; j < sta.length; j++) {
            let obj = sta[j]
            if (obj == 1) {
              this.clazz.push(item.teacher)
              break
            }
          }
        }
      }
      console.log(this.clazz)
    },
    toNoteInfo(i) {
      this.$store.commit('setClazzName', this.clazz[i].name)
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
