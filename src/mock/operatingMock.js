import Mock from "mockjs";

Mock.mock(/\/crm\/homeData\/getHourStatData/, {
  "status": 200,
  "message": "操作成功",
  "data|31": [
    {
      "key": "@guid",
      "id": "@guid",
      "dateOnly|+1": 0,
      "date": function () {
        var dateOnly = this.dateOnly % 31 + 1;
        return "2018-01-" + (dateOnly < 10 ? ("0" + dateOnly) : dateOnly);
      },
      "order": "@natural(3000, 9000)"
    }
  ]
});

Mock.mock(/\/crm\/homeData\/getStatData/, {
  "total": 0,
  "count": 0,
  "result": true,
  "message": "成功",
  "status": "200",
  "data": {"onlinePayed": 17856040.9, "expCount": 958511, "newMarkets": 28249, "activeMarkets": 3}
});

Mock.mock(/\/crm\/homeData\/getPieData/, {
  "status": 200,
  "message": "操作成功",
  "data|31": [
    {
      "key": "@guid",
      "id": "@guid",
      "dateOnly|+1": 0,
      "date": function () {
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