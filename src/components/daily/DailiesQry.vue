<template>
  <div class="both">
    <el-row>
      <el-collapse v-model="activeNames" @change="handleChange" accordion>
        <el-collapse-item v-for="(daily,index) in dailies" :title="daily.title" :name="daily.name" :key="daily.id">
          <el-row>
            <el-col :span="20">

              <span v-if="daily.seen"> {{daily.idea}}</span>
              <el-input v-else type="textarea" v-model="daily.idea" maxlength="1000"
                        show-word-limit
                        :clearable="true"></el-input>

            </el-col>
            <el-col :span="4" style="text-align: center">
              <el-button v-if="daily.seen" icon="el-icon-edit" type="primary" @click="editDaily(index)">编辑</el-button>
              <el-button v-if="!daily.seen" type="success" size="small"  icon="el-icon-circle-check"
                         @click="confirmEdit(daily,index)">保存
              </el-button>
              <el-button v-if="!daily.seen" size="small" icon="el-icon-refresh"  type="warning"
                         @click="cancelEdit(daily,index)">取消
              </el-button>
            </el-col>
          </el-row>
        </el-collapse-item>

      </el-collapse>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :span="8" style="min-height: 1px"></el-col>
      <el-col :span="8" style="min-height: 1px;text-align: center">
        <el-pagination

          layout="prev, pager, next, total"
          :total="total"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
          :page-size="pageSize"
        >
        </el-pagination>
      </el-col>
      <el-col :span="8" style="min-height: 1px"></el-col>
    </el-row>

  </div>
</template>

<!--<script src="../assets/layui/layui.all.js"></script>-->
<script>
    import {dailySelect, dailyUpdate, store_s_userId_key, successCode} from "../../const";

    export default {
        name: "Dailies",
        data() {
            return {
                preActiveName: null,
                activeNames: null,
                total: 0,
                currentPage: 1,
                dailies: [],
                cacheDailies: [],
                pageSize: 8
            };
        },
        methods: {
            handleChange(val) {
                if (this.preActiveName !== null) {
                    if (this.preActiveName !== this.activeNames) {
                        let index = this.dailies.findIndex((item) => item.name === this.preActiveName);
                        let prev = this.dailies[index];
                        if (!prev.seen) {
                            this.saveData(prev);
                            this.activeNames = this.preActiveName;
                            prev.seen = true;
                        }
                    }
                }
                this.preActiveName = this.activeNames;
            },
            saveData(data) {
                this.$http.post(dailyUpdate, data)
                    .then(function (rsp) {
                        if (rsp.data.code === successCode) {

                        } else {
                            self.$message.error(rsp.data.message);
                        }
                    }).catch(function (err) {
                    self.$message.error(err.message);
                });
            },
            editDaily(index) {
                this.dailies[index].seen = false;
            },
            handlePrevClick(pageNum) {
                this.queryPage(pageNum);
            },
            handleNextClick(pageNum) {
                this.queryPage(pageNum);
            },
            handleCurrentChange(pageNum) {
                this.queryPage(pageNum);
            },
            setData(rows) {
                this.dailies.splice(0, this.dailies.length);
                this.cacheDailies.splice(0., this.cacheDailies.length);
                this.preActiveName = null;
                for (let index in rows) {
                    let item = rows[index];
                    item.title = '每日笔记-' + item.createDate.substr(0, 10);
                    item.seen = true;
                    item.name = '' + item.id;
                    let cacheItem = JSON.parse(JSON.stringify(item));
                    this.dailies.push(item);
                    this.cacheDailies.push(cacheItem);
                }
            },
            confirmEdit(daily, index) {
                daily.seen = true;
                this.saveData(daily);
                this.cacheDailies.splice(index, 1, daily);
            },
            cancelEdit(daily, index) {
                this.dailies.splice(index, 1, this.cacheDailies[index]);
            },
            queryPage(pageNum) {
                const self = this;
                this.$http.post(dailySelect, {
                    userId: localStorage.getItem(store_s_userId_key),
                    pageNum: pageNum,
                    pageSize: self.pageSize,
                    asc: 'N'
                }).then(function (rsp) {
                    if (rsp.data.code === successCode) {
                        self.setData(rsp.data.rows);
                        self.total = rsp.data.total;
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            }
        },
        created() {
            this.queryPage(1);
        }
    }
</script>

<style scoped>
  /*@import "../../assets/layui/css/layui.css";*/
</style>
