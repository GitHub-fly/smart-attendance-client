<template>
  <div>
    <div class="header">
      <div class="top d-flex justify-space-between">
        <input class="input" type="text" placeholder="校园网" />
        <div class="functions">
          <v-icon class="icon">mdi-account-multiple</v-icon>
          <v-icon class="icon" style="margin-left: 20px;" @click="loginOut()">mdi-plus-circle-outline</v-icon>
        </div>
      </div>

      <div class="icons d-flex flex-row justify-start">
        <div v-for="(item, index) in functions" :key="index" style="margin-left: 40px;">
          <Icon
            iconColor="rgb(254, 253, 249)"
            fontColor="rgb(254, 253, 249)"
            :icon="item.icon"
            :name="item.name"
            :path="item.path"
            :size="size"
          ></Icon>
        </div>
      </div>
    </div>
    <div>
      <template>
        <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </template>
    </div>
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
          path: '/note'
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
      ],
      size: 32,
      colors: ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth']
    }
  },
  components: {
    Icon
  },
  created() {},
  mounted() {},
  methods: {
    loginOut() {
      this.$router.push('/')
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.header {
  height: 150px;
  background-color: rgb(21, 119, 253);
  .top {
    padding: 10px;
    .input {
      padding-left: 20px;
      background-color: rgb(246, 248, 250);
      border-radius: 5px;
      width: 250px;
      outline: none;
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
</style>
