<template>
  <div>
    <div class="user-info d-flex flex-column justify-center">
      <p class="headline d-flex justify-center">个人中心</p>
      <div class="img d-flex justify-center">
        <v-avatar color="orange" size="160">
          <img :src="user.sysUserAvatar" alt="头像" />
        </v-avatar>
      </div>
      <p class="title d-flex justify-center">{{ user.sysUserNickname }}</p>
    </div>
    <div class="function-area d-flex flex-column align-center">
      <!-- <div class="row-box">
        <p class="title font-weight-black">我的假条</p>
        <div class="item-area d-flex">
          <Icon class="icon" name="假条列表" path="/mynoteall" icon="mdi-equal-box"></Icon>
        </div>
      </div>
      <div class="row-box">
        <p class="title font-weight-black">我的签到</p>
        <div class="item-area d-flex">
          <Icon class="icon" name="签到历史" path="/noteall" icon="mdi-equal-box"></Icon>
        </div>
      </div> -->
    </div>

    <template>
      <v-row
        v-touch="{
          left: () => swipe('Left'),
          right: () => swipe('Right'),
          up: () => swipe('Up'),
          down: () => swipe('Down')
        }"
        align="center"
        class="grey lighten-2"
        justify="center"
        style="height: 500px"
      >
        <v-subheader>Swipe Direction</v-subheader>
        {{ swipeDirection }}
      </v-row>
    </template>
  </div>
</template>

<script>
// import Icon from '../../components/Icon'
export default {
  name: 'My',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      swipeDirection: 'None'
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    swipe(direction) {
      this.swipeDirection = direction
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.user-info {
  padding: 10px;
  background-color: rgb(61, 90, 254);
  .img {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  p {
    color: white;
  }
}
.function-area {
  padding: 5px;
  .row-box {
    width: 90%;
    padding: 20px;
    margin-bottom: 30px;
    border: 0.5px solid rgb(188, 188, 188);
    border-radius: 5px;
  }
  margin-top: 15px;
  .icon {
    margin-right: 40px;
  }
}
</style>
