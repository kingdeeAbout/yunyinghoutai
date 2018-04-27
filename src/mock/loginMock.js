/**
 * Created by Administrator on 2018/3/1.
 */
import Mock from "mockjs";

Mock.mock(/\/crm\/login\/getCode/, {
  "status": "200",
  "total": 0,
  "count": 0,
  "result": true,
  "message": "成功",
  "data": "028115"
});

Mock.mock(/\/crm\/login\/loginCode/, {
  "total":0,
  "count":0,
  "result":false,
  "message":"成功",
  "status":"200"
});