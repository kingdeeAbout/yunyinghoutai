import Mock from "mockjs";

Mock.mock(/\/crm\/role\/findusermenu/, {
  "total": 1,
  "count": 1,
  "result": true,
  "message": "成功",
  "status": "200",
  "data": [{
    "id": 6,
    "name": "销售人员",
    "desc": "销售人员",
    "isSystem": 1,
    "menuItems": [{
      "id": 7742,
      "name": "运营数据",
      "url": null,
      "type": null,
      "code": "100",
      "level": 1,
      "children": [{
        "id": 7743,
        "name": "数据概览",
        "url": null,
        "type": null,
        "code": "100001",
        "level": 2,
        "children": null
      }]
    },
      {
        "id": 7742,
        "name": "运营数据",
        "url": null,
        "type": null,
        "code": "200",
        "level": 2,
        "children": null
    },
      {
        "id": 7742,
        "name": "运营数据",
        "url": null,
        "type": null,
        "code": "300",
        "level": 2,
        "children": null
      }]
  }]
});