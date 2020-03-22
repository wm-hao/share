<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
        v-for="{ prop, label } in colConfigs"
        :key="prop"
        :prop="prop"
        :label="label"
      ></el-table-column>
    </el-table>
    {{ msg }}
    <input v-model="msg" />
  </div>
</template>

<script>
import "../my";
import axios from "axios";
import { serverUrl } from "../my";
export default {
  data() {
    this.colConfigs = [
      { prop: "date", label: "日期" },
      { prop: "name", label: "姓名" },
      { prop: "address", label: "地址" }
    ];
    return {
      msg: "山成员",
      tableData: [
        {
          date: "2020",
          name: "信息",
          address: "阿萨德"
        }
      ]
    };
  },
  methods: {
    setData(item) {
      this.tableData.push(item);
    }
  },
  created: function() {
    let self = this;
    axios
      .get(serverUrl + "share/list")
      .then(function(response) {
        console.log(response);
        response.data.forEach(element => {
          var item = {};
          item.name = element.name;
          self.setData(item);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>