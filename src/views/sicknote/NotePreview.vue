<template>
  <div>
    <Nav title="假条详情（预览）" :items="items" style="margin-bottom: 20px" @operation="print"></Nav>
    <div class="d-flex flex-column align-center" style="margin-bottom: 20px">
      <p>学生事（病）请假条</p>
      <div class="table">
        <table border="1" cellspacing="0">
          <tbody>
            <!-- 基本信息区域 -->
            <tr>
              <td>姓名</td>
              <td>{{ note.sysUserName }}</td>
              <td>性别</td>
              <td>{{ note.sysUserGender }}</td>
            </tr>
            <tr>
              <td>学号</td>
              <td>{{ note.sysJobNumber }}</td>
              <td>联系方式</td>
              <td>{{ note.userPhone }}</td>
            </tr>
            <tr>
              <td>班级</td>
              <td>{{ note.clazzName }}</td>
              <td>班主任</td>
              <td>{{ note.teacherName }}</td>
            </tr>
            <tr>
              <td>类型</td>
              <td>{{ note.type }}</td>
              <td>请假天数</td>
              <td>{{ note.dayCount }} 天</td>
            </tr>
            <tr>
              <td>是否归寝</td>
              <td>{{ note.isDormitory }}</td>
              <td>是否出校</td>
              <td>{{ note.isSchool }}</td>
            </tr>
            <tr>
              <td>请假时间</td>
              <td colspan="3">{{ note.startTime }} 至 {{ note.finishTime }}</td>
            </tr>
            <!-- 请假原因 -->
            <tr>
              <td colspan="4" style="border-bottom: none">请假原因：</td>
            </tr>
            <tr>
              <td rowspan="3" colspan="4" style="border-top: none; height: 150px">
                {{ note.reason }}
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <!-- 班主任意见 -->
            <tr>
              <td colspan="4" style="border-bottom: none">班主任意见：</td>
            </tr>
            <tr>
              <td rowspan="3" colspan="4" class="re-top-bot" style="height: 60px; text-align: center; font-size: 18px">
                {{ note.teacherOpinion }}
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td colspan="2" class="border-bottom re-ri"></td>
              <td align="right" class="border-bottom  re-le-ri">签字</td>
              <td align="center" class="border-bottom  rele">凡颖</td>
            </tr>
            <!-- 辅导员意见 -->
            <tr>
              <td colspan="4" style="border-bottom: none">辅导员意见：</td>
            </tr>
            <tr>
              <td rowspan="3" colspan="4" class="re-top-bot" style="height: 60px; text-align: center; font-size: 18px">
                {{ note.instructorOpinion }}
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td colspan="2" class="border-bottom re-ri"></td>
              <td align="right" class="border-bottom  re-le-ri">签字</td>
              <td align="center" class="border-bottom  rele">解宇宁</td>
            </tr>
            <!-- 二级学院意见 -->
            <tr>
              <td colspan="4" style="border-bottom: none">二级学院意见：</td>
            </tr>
            <tr>
              <td rowspan="3" colspan="4" class="re-top-bot" style="height: 60px; text-align: center; font-size: 18px">
                {{ note.academyOpinion }}
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td colspan="2" class="border-bottom re-ri"></td>
              <td align="right" class="border-bottom  re-le-ri">签字</td>
              <td align="center" class="border-bottom  rele">刘老师</td>
            </tr>
            <!-- 假条说明区域 -->
            <tr>
              <td colspan="4" class="re-top-bot">说明：</td>
            </tr>
            <tr>
              <td colspan="4" class="re-top-bot" style="font-size: 11px">
                1. 本申请单由学工处统一印制，各院系派相关工作人员到学工处集体领用；
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td colspan="4" class="re-top-bot" style="font-size: 11px">
                2. 批假权限：1天以内由班主任审批；2-3天有辅导员审批；4天以上由学院领导审批；
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr>
              <td colspan="4" class="border-bottom" style="font-size: 11px">
                3. 本申请单分上、下联。上联交班级考勤员并由班级考勤员交任课教师查验。请假期间学生如不在校内宿舍，下联请交公寓管理站。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="text-center">
      <v-dialog v-model="dialog" width="200">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Info
          </v-card-title>

          <v-card-text>
            打印成功
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              关闭
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'NotePreview',
  data() {
    return {
      items: ['打印'],
      note: {},
      dialog: false
    }
  },
  components: { Nav },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    /**
     * 调取接口数据
     */
    async getData() {
      this.note['pkNoteId'] = 1
      let res = await this.GLOBAL.API.init('/note/info', this.note, 'post')
      let noteData = res.data
      this.note = noteData
      this.note.isDormitory = noteData.isDormitory == 0 ? '否' : '是'
      this.note.isSchool = noteData.isSchool == 0 ? '否' : '是'
      if (noteData.type == 1) {
        this.note.type = '事假'
      } else if (noteData.type == 2) {
        this.note.type = '病假'
      } else if (noteData.type == 3) {
        this.note.type = '休学'
      } else {
        this.note.type = '其它'
      }
    },
    print(items) {
      if (items[0] == '打印') {
        this.dialog = true
      }
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
}
.border-bottom {
  border-top: none;
  border-bottom: 1px solid black;
}
.re-le-ri {
  border-left: none;
  border-right: none;
}
.re-top-bot {
  border-top: none;
  border-bottom: none;
}
.re-ri {
  border-right: none;
}
.rele {
  border-left: none;
}
.table {
  width: 90%;
  margin: 0 auto;
}
td {
  font-size: 12px;
  padding: 5px;
  width: 140px;
  height: 30px;
  border: 1px solid black;
}
</style>
