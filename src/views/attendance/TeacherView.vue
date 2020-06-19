<template>
  <div>
    <Nav title="班主任查看学生打卡情况"></Nav>
    <v-container>
      <div class="d-flex mt-5 align-center flex-wrap">
        <v-card class="ma-3" width="150" justify="center" v-for="(item, index) in stuVo" :key="index">
          <v-avatar size="100" class="">
            <v-img :src="item.sysUserAvatar" style="border-radius: 50%;"></v-img>
          </v-avatar>
          <v-list-item>
            <v-list-item-title class="ml-10">{{ item.sysUserName }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>{{ item.sysUserPhone }}</v-list-item-title>
          </v-list-item>
          <v-chip color="green" text-color="white" v-if="item.isAttendance === 1">
            <v-icon color="dark">mdi-checkbox-marked-circle</v-icon>已打卡
          </v-chip>
          <v-chip color="red" text-color="white" v-if="item.isAttendance === 0"> <v-icon color="dark">highlight_off</v-icon>未打卡</v-chip>
        </v-card>
      </div>
    </v-container>
    <!-- <span class="">班级打卡情况</span> -->
  </div>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'TeacherView',
  data() {
    return {
      user: {
        pkSysUserId: '003',
        roleId: 2
      },
      stuVo: {}
    }
  },
  components: { Nav },
  created() {
    this.getStudents()
  },
  mounted() {},
  methods: {
    async getStudents() {
      let students = await this.GLOBAL.API.init('/attendance/manager/info', this.user, 'post')
      console.log(students)
      this.stuVo = students.data
      console.log(students)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.v-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
