
import {OperatingStore} from './operatingStore'
import {ProjectStore} from './projectStore'
import {MarketingStore} from './marketingStore'
import {CourierStore} from './courierStore'
import {UserListStore} from './userListStore'
import {BindUserStore} from './bindUserStore'
import {LoginStore} from './loginStore'
import {RoleStore} from './roleStore'
import {PageStore} from './pageStore'
import {ExpressListStore} from './expressListStore'

export class RootStore {
  constructor() {
    this.operatingStore = new OperatingStore(this);
    this.projectStore = new ProjectStore(this);
    this.marketingStore = new MarketingStore(this);
    this.courierStore = new CourierStore(this);
    this.userListStore = new UserListStore(this);
    this.bindUserStore = new BindUserStore(this);
    this.loginStore = new LoginStore(this);
    this.roleStore = new RoleStore(this);
    this.pageStore = new PageStore(this);
    this.expressListStore = new ExpressListStore(this);
  }
}