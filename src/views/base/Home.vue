<template>
  <div>
    <div class="header">
      <div class="top d-flex justify-space-between">
        <input class="input" type="text" placeholder="校园网" />
        <div class="functions">
          <v-icon class="icon">mdi-account-multiple</v-icon>
          <v-icon class="icon" style="margin-left: 20px;">mdi-plus-circle-outline</v-icon>
        </div>
      </div>
      <div class="icons d-flex flex-row justify-start">
        <div v-for="(item, index) in functions" :key="index" style="margin-left: 40px;">
          <Icon :icon="item.icon" :name="item.name" :path="item.path"></Icon>
        </div>
      </div>
    </div>
    <div class="body"></div>
  </div>
</template>

<script>
import Icon from '../../components/Icon'
export default {
  name: 'Home',
  data() {
    return {
      functions: [
        {
          icon: 'mdi-credit-card-scan-outline',
          name: '扫一扫',
          path: '/notepreview'
        },
        {
          icon: 'mdi-note-outline',
          name: '请假条',
          path: '/note'
        },
        {
          icon: 'mdi-bullseye',
          name: '打卡',
          path: '/attendance'
        }
      ]
    }
  },
  components: {
    Icon
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss">
.header {
  height: 150px;
  background-color: rgb(88, 116, 242);
  .top {
    padding: 10px;
    .input {
      padding-left: 20px;
      background-color: rgb(246, 248, 250);
      border-radius: 5px;
      width: 250px;
    }
    .functions {
      .icon {
        color: aliceblue;
      }
    }
  }
  .icons {
    margin-top: 20px;
    margin-left: -25px;
  }
}
a {
  color: black;
}
</style>
