<template>
  <div>
    <v-content>
      <router-view />
    </v-content>
    <v-footer padless fixed style="background-color: rgb(238, 238, 238);" class="flex-column justify-center">
      <v-col class="text-center d-flex justify-space-around" style="height: 60px;">
        <div v-for="(item, index) in functions" :key="index">
          <Icon :icon="item.icon" :name="item.name" :path="item.path"></Icon>
        </div>
      </v-col>
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
      ]
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
a {
  &.router-link-exact-active {
    color: rgb(239, 83, 80);
  }
}
</style>
