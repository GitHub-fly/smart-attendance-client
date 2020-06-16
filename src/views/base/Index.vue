<template>
  <div>
    <div>
      <router-view />
    </div>
    <v-footer
      padless
      fixed
      style="background-color: rgb(238, 238, 238); height: 70px; margin-bottom: -20px; z-index: 2;"
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
