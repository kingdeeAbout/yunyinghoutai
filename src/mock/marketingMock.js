import Mock from "mockjs";

Mock.mock(/\/getList.do/, function(options){
  console.log(options);
  var params = JSON.parse(options.body);
  var status = 0;
  if(params.type){
    switch(params.type){
      case("standardSuccess"):{
        status = 1;
        break;
      }
      default: {
        status = 0;
      }
    }
  }
  return Mock.mock({
    "status": 200,
    "data|5": [
      {
        "id": "@guid",
        "active": 0,
        "status": status,
        "name": "@province",
        "percent": "@natural(60, 80)",
        "subname": "@cname",
        "number": "@string(number,3),@string(number,3),@string(number,3)",
        "per": "@natural(70, 90)"
      }
    ],
    "message": "操作成功"
  });
});

Mock.mock(/\/getDetail.do/, {
  "status": 200,
  "message": "操作成功",
  "userTotal": "@natural(500, 600)",
  "userTotalCompare": "@natural(10, 20)",
  "courierTotal": "@natural(6000, 7000)",
  "courierTotalCompare": "@natural(-20, -10)",
  "orderTotal": "@natural(400000, 600000)",
  "orderTotalCompare": "@natural(10, 20)",
  "payTotal": "@natural(6000000, 7000000)",
  "payTotalCompare": "@natural(-20, -10)",
  "activePerTotal": "@natural(60, 70)",
  "activePerTotalCompare": "@natural(10, 20)",
  "data|31": [
    {
      "key": "@guid",
      "id": "@guid",
      "dateOnly|+1": 0,
      "date": function(){
        var dateOnly = this.dateOnly % 31 + 1;
        return "2018-01-" + (dateOnly < 10 ? ("0" + dateOnly) : dateOnly);
      },
      "user": "@natural(50, 70)",
      "courier": "@natural(600, 900)",
      "order": "@natural(3000, 9000)",
      "pay": "@natural(100000, 900000)",
      "activePer": "@natural(50, 90)"
    }
  ]
});