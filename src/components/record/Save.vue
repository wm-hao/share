<template>
  <div class="both">
    <el-row>
      <el-table :data="rows"
                :header-cell-style="{background:'#eef1f6',color:'#606266',fontWeight:'normal'}"
      >
        <el-table-column align="left" prop="name" label="股票名称" min-width="10%">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="code" label="股票代码" min-width="10%">
          <template slot-scope="scope">
            <el-input v-model="scope.row.code"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="buyPrice" label="买入价格"
                         min-width="10%">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.buyPrice"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="buyCount" label="买入数量" min-width="10%">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.buyCount"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="sellPrice" label="卖出价格"
                         min-width="10%">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.sellPrice"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="buyTime" label="买入时间" min-width="15%">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.buyTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyyMMdd"

            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="sellTime" label="卖出时间" min-width="15%">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.sellTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyyMMdd"

            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column fixed="right" min-width="20%"
                         align="left" label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-plus" size="medium " type="success"
                       @click="add(scope.$index, scope.row)">新增
            </el-button>
            <el-button icon="el-icon-close" size="medium " type="danger"
                       @click="reset(scope.$index, scope.row)">重置
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Save",
        data() {
            return {
                rows: [{
                    seen: true
                }]
            }
        },
        methods: {
            add(index, row) {

            },
            reset(index, row) {

            }
        }
    }
</script>

<style scoped>

</style>
