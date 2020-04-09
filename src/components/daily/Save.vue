<template>
  <div class="both">
    <el-row style="margin-bottom: 10px">
      <el-col :span="6"></el-col>
      <el-col :span="12" style="text-align: center">
          <span style="margin: 10px;color: #9c9c9c">
              标题: {{title }}
          </span>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <el-row>
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <el-row>
          <el-input type="textarea" show-word-limit v-model="daily.idea" placeholder="请输入您的当日看法"
                    maxlength="1000" :rows="18"></el-input>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="8"></el-col>
          <el-col :span="8" style="text-align: center;">
            <el-button type="primary" style="width: 100%">提交</el-button>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Save",
        data() {
            return {
                daily: {
                    idea: ''
                },
                title: ''
            }
        },
        methods: {
            dateFtt(fmt, date) { //author: meizz
                var o = {
                    "M+": date.getMonth() + 1,     //月份
                    "d+": date.getDate(),     //日
                    "h+": date.getHours(),     //小时
                    "m+": date.getMinutes(),     //分
                    "s+": date.getSeconds(),     //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                    "S": date.getMilliseconds()    //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        },
        created() {
            let day = new Date();
            let date = this.dateFtt("yyyy-MM-dd", day);
            this.title = '每日日志-' + date;
        }
    }
</script>

<style scoped>
  .el-col {
    min-height: 1px;
  }

  .textarea {
    min-height: 400px;
  }
</style>
