<template>
  <div class="d-flex justify-space-between" style="width: 95%; flex-wrap: wrap;">
    <v-card class="mb-10" elevation="3" min-height="215" v-for="(item, dorIndex) in dormitoryVo" :key="dorIndex" @click="show(dorIndex)">
      <v-card
        v-if="showList[dorIndex]"
        class="d-flex flex-column align-center"
        height="215"
        style="background-image: linear-gradient(to top,#6AAFE6, #CADBE9);"
        width="150"
      >
        <v-avatar color="rgb(255, 255, 255)" height="40" size="100" class="elevation-1">
          <span class="headline" style="color: black">{{ item.dormitoryName.substring(5) }}</span>
        </v-avatar>
        <div class="d-flex flex-column align-center mt-10">
          <v-list-item>
            <v-list-item-title>{{ item.teacherName }}</v-list-item-title>
          </v-list-item>
          <v-list-item style="margin-top: -10px">
            <v-list-item-title>{{ item.teacherPhone }}</v-list-item-title>
          </v-list-item>
          <v-list-item style="margin-top: -10px">
            <v-list-item-title>{{ item.clazzName }}</v-list-item-title>
          </v-list-item>
        </div>
      </v-card>
      <v-card v-else class="d-flex flex-column pl-2 pr-2" height="215" color="rgb(245, 245, 245)" width="150">
        <div class="d-flex justify-space-between align-center card-item" v-for="(item, index) in studentList[dorIndex]" :key="index">
          <span>{{ item.bedNumber }}</span>
          <span style="width: 50px">{{ item.studentName }}</span>
          <v-checkbox dense class="checkbot" disabled v-model="item.isAttendance"></v-checkbox>
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'AllttendanceInfo',
  data() {
    return {
      user: {
        pkSysUserId: '1',
        roleId: 5
      },
      dormitoryVo: {},
      stuVo: {},
      showList: [],
      studentList: []
    }
  },
  components: {},
  created() {
    this.getDormitory()
  },
  mounted() {},
  methods: {
    async getDormitory() {
      let res = await this.GLOBAL.API.init('/attendance/manager/info', this.user, 'post')
      this.dormitoryVo = res.data
      let size = this.dormitoryVo.length
      for (let i = 0; i < size; i++) {
        this.showList.splice(i, 0, true)
        this.studentList.push([])
      }
    },
    async getStudentInfo(i) {
      let res = await this.GLOBAL.API.init(
        '/attendance/info/number',
        {
          pkSysDormitoryId: this.dormitoryVo[i].dormitoryId
        },
        'post'
      )
      this.studentList.splice(i, 1, res.data)
    },
    /**
     *  切换到宿舍学生信息的方法
     */
    show(i) {
      this.showList.splice(i, 1, !this.showList[i])
      this.getStudentInfo(i)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.card-item {
  margin-top: -13px;
  margin-bottom: -13px;
}
</style>
