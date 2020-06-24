<template>
  <div>
    <div>
      <router-view style="margin-bottom: 60px;" />
    </div>
    <v-footer
      padless
      fixed
      style="background-image: linear-gradient(to top, rgb(224, 227, 218), rgb()); height: 70px; margin-bottom: -22px; z-index: 20;"
      class="flex-column justify-center"
    >
      <div class="d-flex justify-space-around align-cennter box">
        <div v-for="(item, index) in functions" :key="index" class="d-flex justify-center box">
          <Icon :icon="item.icon" :name="item.name" :path="item.path" :size="size"></Icon>
        </div>
      </div>
    </v-footer>
  </div>
</template>

<script>
import Icon from '../../components/Icon'
export default {
  name: 'Index',
  data() {
    return {
      functions: [
        {
          icon: 'mdi-home-outline',
          name: '首页',
          path: '/home'
        },
        {
          icon: 'mdi-message-processing-outline',
          name: '消息',
          path: '/new'
        },
        {
          icon: 'mdi-account-circle-outline',
          name: '我的',
          path: '/my'
        }
      ],
      size: 25
    }
  },
  components: {
    Icon
  },
  created() {},
  mounted() {},
  methods: {
    toPage(i) {
      this.$router.push(this.functions[i].path)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  align-items: center;
}
</style>
