/**
 * Created by Administrator on 2018/3/1.
 */
import Mock from "mockjs";

Mock.mock(/\/crm\/project\/list/, {
  "total": 0,
  "count": 0,
  "result": true,
  "message": "成功",
  "status": "200",
  "data|5": [
    {
      "id": "@guid",
      name: '项目@string(number,1)',
      mstid: "@guid",
      sstid: "@guid",
      createTime: '@date',
      note: '@cname'
    }
  ]
});

Mock.mock(/\/crm\/project\/statData/, {
  "total": 0,
  "count": 0,
  "result": true,
  "message": "成功",
  "status": "200",
  "data": {
    "onlinePayed": 0,
    "onlinePayedIncrease": null,
    "expCount": 0,
    "expCountIncrease": null,
    "newMarkets": 0,
    "newMarketsIncrease": null,
    "activeMarkets": 0,
    "activeMarketsIncrease": null,
    "markets": 2,
    "activeRate": null,
    "activeRateIncrease": null,
    "dailyStatDatas": [
      {
        "id": 0,
        "sbid": 0,
        "statDate": "2018-03-01",
        "dateMM": 0,
        "dateWI": 0,
        "expCount": 0,
        "newMarkets": 0,
        "activeMarkets": 0,
        "markets": 0,
        "onlinePayed": 0,
        "onlinePayedExp": 0,
        "withdrawals": 0,
        "incomes": 0,
        "kuaidiComs": null,
        "expSources": null,
        "payeds": null,
        "monthActiveMarkets": 0
      },
      {
        "id": 0,
        "sbid": 0,
        "statDate": "2018-03-02",
        "dateMM": 0,
        "dateWI": 0,
        "expCount": 0,
        "newMarkets": 0,
        "activeMarkets": 0,
        "markets": 0,
        "onlinePayed": 0,
        "onlinePayedExp": 0,
        "withdrawals": 0,
        "incomes": 0,
        "kuaidiComs": null,
        "expSources": null,
        "payeds": null,
        "monthActiveMarkets": 0
      }
    ]
  }
});

Mock.mock(/\/crm\/project\/areaStatData/, {
  "total": 0,
  "count": 0,
  "result": true,
  "message": "成功",
  "status": "200",
  "data": {
    "onlinePayed": 0,
    "onlinePayedIncrease": null,
    "expCount": 0,
    "expCountIncrease": null,
    "newMarkets": 0,
    "newMarketsIncrease": null,
    "activeMarkets": 0,
    "activeMarketsIncrease": null,
    "markets": 2,
    "activeRate": null,
    "activeRateIncrease": null,
    "dailyStatDatas": [
      {
        "id": 0,
        "sbid": 0,
        "statDate": "2018-03-01",
        "dateMM": 0,
        "dateWI": 0,
        "expCount": 0,
        "newMarkets": 0,
        "activeMarkets": 0,
        "markets": 0,
        "onlinePayed": 0,
        "onlinePayedExp": 0,
        "withdrawals": 0,
        "incomes": 0,
        "kuaidiComs": null,
        "expSources": null,
        "payeds": null,
        "monthActiveMarkets": 0
      },
      {
        "id": 0,
        "sbid": 0,
        "statDate": "2018-03-02",
        "dateMM": 0,
        "dateWI": 0,
        "expCount": 0,
        "newMarkets": 0,
        "activeMarkets": 0,
        "markets": 0,
        "onlinePayed": 0,
        "onlinePayedExp": 0,
        "withdrawals": 0,
        "incomes": 0,
        "kuaidiComs": null,
        "expSources": null,
        "payeds": null,
        "monthActiveMarkets": 0
      }
    ]
  }
});