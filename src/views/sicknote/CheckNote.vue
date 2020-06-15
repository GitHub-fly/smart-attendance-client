<template>
  <div>
    <div>
      <Nav title="学生假条详情"></Nav>
    </div>
    <div class="content">
      <div class="user display bottom margin">
        <span>请假人</span>
        <sapn>谢小茜</sapn>
      </div>
      <div class="gender display bottom margin">
        <span>性别</span>
        <span>女</span>
      </div>
      <div class="studentNumber display bottom margin">
        <span>学号</span>
        <span>1802343124</span>
      </div>
      <div class="phone display bottom margin">
        <span>联系方式</span>
        <span>18851999738</span>
      </div>
      <div class="time bottom margin">
        <span>请假起止时间</span>
        <div class="display">
          <span>2020-06-06 18:00</span>
          <span>至</span>
          <span>2020-06-09 20:00</span>
        </div>
      </div>
      <div class="dayCount display bottom margin">
        <span>请假天数</span>
        <span>1天</span>
      </div>
      <div class="school display bottom margin">
        <span>是否需要出校</span>
        <sapn>是</sapn>
      </div>
      <div class="dorimtry display bottom margin">
        <span>是否归寝</span>
        <span>是</span>
      </div>
      <div class="reason bottom margin">
        <span>请假原因</span>
        <textarea type="textarea" class="inputarea" />
      </div>
      <div class="teacherOpinoin margin">
        <span>班主任意见</span>
        <textarea type="textarea" class="inputarea" />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'CheckNote',
  data() {
    return {}
  },
  components: { Nav },
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss">
.content {
  width: 95%;
  height: 1000px;
  margin: 20px 10px 0 10px;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  //   background-color: aquamarine;
}
.margin {
  margin: 25px 20px 10px 30px;
}
.inputarea {
  width: 95%;
  height: 100px;
  outline: none;
  padding: 4px;
  border-radius: 5px;
  border: 1px solid #dfdfdf;
}
.display {
  display: flex;
  justify-content: space-between;
}
.bottom {
  border-bottom: 1px solid #dfdfdf;
}
</style>
