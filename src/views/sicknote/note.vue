<template>
  <v-app>
    <v-card flat>
      <v-container fluid>
        <v-row class="child-flex">
          <div style="flex-basis: 20%">
            <v-toolbar blue>
              <v-btn icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>学生请假</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
          </div>
        </v-row>
      </v-container>
    </v-card>
    <div>
      <div class="top">
        <div class="userName">
          <sapn style="margin: 20px 0 0 30px">请假人</sapn>
          <sapn style="margin: 10px 0 0 20%">谢小茜 女 1802343136</sapn>
        </div>
        <div class="userPhone">
          <span style="margin: 20px 0 0 30px">联系方式</span>
          <input type="text" style="margin: 10px 0 0 15%; border: 1px solid gray; border-radius: 5px;" placeholder="手机号" />
        </div>
      </div>
      <div class="middle">
        <div class="reason">
          <span>请假原因*</span>
          <input type="textarea" value="请输入请假原因" />
          <div class="label">
            <span style="margin-right: 20px;">请假类型*</span>
            <label>事假</label>
            <label>病假</label>
            <label>休学</label>
            <label>其他</label>
            <label>...</label>
          </div>
        </div>
      </div>
      <div class="bottom">
        
      </div>
      <button style="width: 95%; margin: 30px 0 0 2.5%; border-radius: 10px; bcakground-color: #f2f6fd">提交</button>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'Note',
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {
    // async getUser() {
    //   let users = await this.GlOBAL.API.init('')
    // }
  },
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss">
.top {
  width: 95%;
  height: 65px;
  margin: 0 auto;
  border: 1px solid gray;
  border-radius: 10px;
  // background-color: red;
}
.middle {
  width: 95%;
  height: 150px;
  margin: 20px auto;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 10px;
  // background-color: gray;
}
.bottom {
  width: 95%;
  height: 350px;
  margin: 0 auto;
  border-radius: 10px;
  border: 1px solid gray;
  background-color: bisque;
}
.reason {
  display: flex;
  float: left;
  flex-direction: column;
}
.reason input {
  width: 100%;
  height: 70px;

}
.label {
  margin: 0 auto;
}
.label label {
  margin-left: 10px;
  border: 1px solid white;
  border-radius: 30%;
}
</style>
