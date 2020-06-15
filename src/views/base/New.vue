<template>
  <div>
    <Nav title="消息" :items="items" @operation="operation"></Nav>
    <div class="test">
      <div id="container" style="width: 300px; height: 300px"></div>
      <button @click="showLocation()" style="marigin-right: 20px">定位</button>
      <span>{{ area }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Nav from '../../components/Nav'
import AMap from '../../util/AMap'
export default {
  name: 'New',
  data() {
    return {
      items: ['预览', '打印'],
      map: null,
      area: ''
    }
  },
  components: { Nav },
  created() {},
  methods: {
    showLocation() {
      AMap().then((AMap) => {
        let map = new AMap.Map('container', {
          resizeEnable: true
        })
        AMap.plugin('AMap.Geolocation', () => {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：5s
            buttonPosition: 'RB', //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
          })
          map.addControl(geolocation)
          geolocation.getCurrentPosition((status, result) => {
            if (status == 'complete') {
              this.onComplete(result)
            } else {
              this.onError(result)
            }
          })
        })
      })
    },

    onComplete(data) {
      let location = data.position.lng + ',' + data.position.lat
      let urlStr =
        'https://restapi.amap.com/v3/geocode/regeo?output=json&key=c366ab4d4a894354574b28c1e817c247&radius=1000&roadlevel=1&location=' +
        location
      axios({
        methods: 'get',
        url: urlStr
      }).then((res) => {
        this.area = res.data.regeocode.formatted_address
      })
    },
    onError() {
      // console.log(data)
    },
    operation() {}
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
