<template>
  <div>
    <div>
      <Nav title="各班级假条管理"></Nav>
    </div>
    <div class="content d-flex align-center">
      <v-card
        class="mt-12 ml-5 margin-top"
        color="#40c4ff"
        width="150"
        justify="center"
        dark
        v-for="(item, index) in dormitoryVo"
        :key="index"
      >
        <v-avatar size="100" class="ml-5 mt-n12 margin-top"><img class="circle margin-top" :src="item.avatar"/></v-avatar>
        <v-list-item
          ><v-list-item-title class="center">{{ item.teacherName }}</v-list-item-title></v-list-item
        >
        <v-list-item
          ><v-list-item-title class="center">{{ item.teacherPhone }}</v-list-item-title></v-list-item
        >
        <v-list-item
          ><v-list-item-title class="center">{{ item.clazzName }}</v-list-item-title></v-list-item
        >
      </v-card>
    </div>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'CounselorAdmin',
  data() {
    return {
      user: {
        pkSysUserId: '1'
      },
      dormitoryVo: [
        {
          avatar: 'https://s1.ax1x.com/2020/06/17/NAQixP.jpg',
          teacherName: '凡颖',
          teacherPhone: '18851996666',
          clazzName: '软件1821'
        },
        {
          avatar: 'https://s1.ax1x.com/2020/06/17/NAQixP.jpg',
          teacherName: '许莫淇',
          teacherPhone: '18851996666',
          clazzName: '软件1851'
        },
        {
          avatar: 'https://s1.ax1x.com/2020/06/17/NAQm5j.jpg',
          teacherName: '李中科',
          teacherPhone: '18851996666',
          clazzName: '软件1813'
        },
        {
          avatar: 'https://s1.ax1x.com/2020/06/17/NAQm5j.jpg',
          teacherName: '刘芳芳',
          teacherPhone: '18851996666',
          clazzName: '软件1811'
        }
      ],
      stuVo: {}
    }
  },
  components: { Nav },
  created() {
    // this.getDormitory()
  },
  mounted() {},
  methods: {
    // async getDormitory() {
    //   let dormitory = await this.GLOBAL.API.init('/attendance/manager/info', this.user, 'post')
    //   this.dormitoryVo = dormitory.data
    //   console.log(dormitory.data)
    // }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.margin-top {
    margin-top: 30px;
}
.content {
    display: flex;
    flex-wrap: wrap;
}
.center {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}
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
