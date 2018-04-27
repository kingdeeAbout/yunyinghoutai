/**
 * Created by Administrator on 2018/3/7.
 */
import Mock from "mockjs";

Mock.mock(/\/crm\/role\/notes/, {
  "result": true,
  "message": "成功",
  "status": "200",
  "data":  [{
    recordsText: "用百度简单搜索答题神器，自动显示答案，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
    recordsName: "大大",
    recordsDate: "2018-01-12 20:08:08"
  },
    {
      recordsText: "用百度简单搜索答题神器，自动显示答案，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
      recordsName: "大大王",
      recordsDate: "2018-01-12 20:08:08"
    }]
})