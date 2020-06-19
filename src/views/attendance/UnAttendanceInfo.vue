<template>
  <div class="d-flex mt-5 justify-space-between align-center flex-wrap" style="width: 95%">
    <v-card
      elevation="3"
      class="d-flex flex-column align-center mb-12"
      width="150"
      justify="center"
      v-for="(item, index) in stuVo"
      :key="index"
    >
      <v-avatar size="60" style="margin-top: -30px">
        <v-img :src="item.sysUserAvatar" style="border-radius: 50%;"></v-img>
      </v-avatar>
      <v-list-item>
        <v-list-item-title class="">{{ item.sysUserName }}</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>{{ item.sysUserPhone }}</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>班主任：{{ item.teacherName }}</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>{{ item.teacherPhone }}</v-list-item-title>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'UnAttendanceInfo',
  data() {
    return {
      user: {
        pkSysUserId: '1'
      },
      stuVo: {}
    }
  },
  components: {},
  created() {
    this.getUnCheckStu()
  },
  mounted() {},
  methods: {
    async getUnCheckStu() {
      let stu = await this.GLOBAL.API.init('/attendance/info/not', this.user, 'post')
      this.stuVo = stu.data
      console.log(this.stuVo)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.v-list-item-title {
  //   text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
