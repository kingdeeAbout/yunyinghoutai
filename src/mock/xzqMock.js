import Mock from "mockjs";

Mock.mock(/\/network\/www\/searchapi.do/,//method=getcounty
  [
    {
      "fullName": "广东,深圳市,光明新区", "name": "光明新区", "number": "440306_2"
    },
    {
      "fullName": "广东,深圳市,坪山新区", "name": "坪山新区", "number": "440307_0"
    },
    {
      "fullName": "广东,深圳市,龙华新区", "name": "龙华新区", "number": "440306_3"
    },
    {
      "fullName": "广东,深圳市,罗湖区", "name": "罗湖区", "number": "440303"
    },
    {
      "fullName": "广东,深圳市,福田区", "name": "福田区", "number": "440304"
    },
    {
      "fullName": "广东,深圳市,大鹏新区", "name": "大鹏新区", "number": "440307_1"
    },
    {
      "fullName": "广东,深圳市,龙岗区", "name": "龙岗区", "number": "440307"
    },
    {
      "fullName": "广东,深圳市,盐田区", "name": "盐田区", "number": "440308"
    },
    {
      "fullName": "广东,深圳市,南山区", "name": "南山区", "number": "440305"
    },
    {
      "fullName": "广东,深圳市,宝安区", "name": "宝安区", "number": "440306"
    }
  ]
)