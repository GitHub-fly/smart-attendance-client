<template>
  <div class="d-flex align-center">
    <v-card class="mt-12 ml-5" color="#40c4ff" width="150" justify="center" dark v-for="(item, index) in dormitoryVo" :key="index">
      <v-avatar size="100" class="ml-5 mt-n12"
        ><div class="circle">{{ item.dormitoryName.substring(5, 8) }}</div></v-avatar
      >
      <v-list-item
        ><v-list-item-title>{{ item.teacherName }}</v-list-item-title></v-list-item
      >
      <v-list-item
        ><v-list-item-title>{{ item.teacherPhone }}</v-list-item-title></v-list-item
      >
      <v-list-item
        ><v-list-item-title>{{ item.clazzName }}</v-list-item-title></v-list-item
      >
    </v-card>
  </div>
</template>

<script>
import { DecryptData, EncryptData } from '../../util/encryption.js'
import axios from 'axios'
export default {
  name: 'AllttendanceInfo',
  data() {
    return {
      user: {
        pkSysUserId: '1',
        roleId: 5
      },
      dormitoryVo: {},
      stuVo: {}
    }
  },
  components: {},
  created() {
    this.getDormitory()
  },
  mounted() {},
  methods: {
    async getDormitory() {
      // let dormitory = await this.GLOBAL.API.init('/attendance/manager/info', this.user, 'post')
      // dormitory = DecryptData(dormitory)
      // this.dormitoryVo = dormitory.data
      // console.log(dormitory.data)
      axios({
        method: 'post',
        url: '/attendance/manager/info',
        data: EncryptData(JSON.stringify(this.user)),
        headers: { 'Content-Type': 'application/json' }
      }).then((res) => {
        let dormitory = res.data
        console.log(dormitory)
        dormitory = DecryptData(dormitory)
        this.dormitoryVo = dormitory.data
        console.log(dormitory.data)
      })
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.circle {
  width: 100px;
  height: 100px;
  background-color: #eee;
  border: 1px solid rgb(202, 212, 200);
  border-radius: 50%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
