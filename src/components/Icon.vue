<template>
  <router-link :to="path" class="body-2">
    <div class="d-flex flex-column justify-center align-center" style="width: 65px">
      <v-icon :style="{ backgroundColor: bcColor }" :class="isCircle ? 'circle' : ''" :size="size" :color="iconColor">{{ icon }}</v-icon>
      <p :style="{ color: fontColor }">{{ name }}</p>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      default() {
        return ''
      }
    },
    name: {
      type: String,
      default() {
        return ''
      }
    },
    path: {
      type: String,
      default() {
        return ''
      }
    },
    size: {
      type: Number,
      default() {
        return 30
      }
    },
    iconColor: {
      type: String,
      default() {
        return undefined
      }
    },
    fontColor: {
      type: String,
      default() {
        return undefined
      }
    },
    isCircle: {
      type: Boolean,
      default() {
        return false
      }
    },
    bcColor: {
      type: String,
      default() {
        return ''
      }
    }
  },
  watch: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped lang="scss">
p {
  color: black;
  font-size: 15px;
}

a {
  z-index: 10;
  .circle {
    padding: 10px;
    border-radius: 50%;
  }
  &.router-link-exact-active {
    p {
      color: rgb(20, 118, 250);
      margin-bottom: 20px;
    }
    .v-icon {
      color: rgb(20, 118, 250);
      margin-top: -5px;
    }
  }
}
</style>
