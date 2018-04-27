
import {observable, action, computed} from 'mobx'
import { message } from 'antd';
import ProjectApi from '../api/projectApi'

const api = new ProjectApi();

export class ProjectStore {
  @observable breadcrumb = observable.map();
  @observable isLoading = false;
  @observable activeId;
  @observable projectList = observable.map();
  @observable myArea;

  //修改资料modal
  @observable updateModalVisible;

  rootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  clear() {
    this.breadcrumb.clear();
    this.activeId = '';
    this.projectList.clear();
    this.myArea = null;
    this.updateModalVisible = false;
  }

  @computed get breadcrumbData() {
    return this.breadcrumb.values();
  }

  @action showUpdateModal = () => {
    this.updateModalVisible = true
  };
  @action hideUpdateModal = () => {
    this.updateModalVisible = false;
    // this.clear();
  };

  @action addBreadcrumb = (sbid, name) => {
    this.breadcrumb.set(sbid, {
      sbid: sbid,
      name: name
    });
  };
  @action gotoBreadcrumb = (sbid) => {
    let isFound = false;
    this.breadcrumb.forEach((value, key) => {
      console.log("check", sbid, key, sbid === key);
      if(isFound) this.breadcrumb.delete(key);
      else if(sbid === key){
        isFound = true;
        if(sbid) {
          this.getNextLevelProjectList(sbid, value.name);
        } else {
          this.getProjectList();
        }
      }
    });
  };

  @action setActiveId = (id) => {
    this.activeId = id;
    const sbid = this.projectList.get(id).sbid;
    this.getProjectDetail(sbid);
  };

  @computed get activeProject() {
    return this.projectList.get(this.activeId);
  }

  @computed get projectData() {
    return this.projectList.values();
  }

  @action getProjectDetail = (sbid) => {
    this.rootStore.courierStore.getProjectCourierData({
      queryType: 1,
      sbid: sbid
    });
    this.rootStore.operatingStore.getProjectStatData(sbid);
  };

  getProjectListPromise() {
    if (this.rootStore.roleStore.role === 1) return api.getProjectList({});
    else if (this.rootStore.roleStore.role === 4) return api.getProjectAreaList({});
    else return api.getSalesProjectList({});
  }

  @action getProjectList = () => {
    this.isLoading = true;
    this.projectList.clear();
    this.getProjectListPromise().then((data) => {
      this.isLoading = false;
      if (data.status === "200") {
        if(data.data && data.data.length > 0){
          data.data.forEach((item) => {
            // 测试环境数据有问题，缺少id
            item.id = item.id ? item.id : 0;
            item.key = item.id;
            this.projectList.set(item.id, item);
          });
          this.setActiveId(data.data[0].id);
        }
      } else {
        message.error(data.message);
      }
    });
    // .finally(action(() => { this.isLoading = false; }));
  };

  @action getNextLevelProjectList = (sbid, name) => {
    const data = {
      sbid: sbid
    };
    if(name) {
      // 添加面包屑
      this.addBreadcrumb(sbid, name);
    }
    this.isLoading = true;
    this.projectList.clear();
    api.getProjectAreaList(data).then((data) => {
      if (data.status === "200") {
        if(data.data && data.data.length > 0) {
          data.data.forEach((item) => {
            item.key = item.id;
            this.projectList.set(item.id, item);
          });
          this.setActiveId(data.data[0].id);
        }
      } else {
        message.error(data.message);
      }
    });
  };

  @action addProject = (data, callback) => {
    api.addProject(data).then((data) => {
      if (data.status === "200") {
        message.success(data.message);
        typeof(callback) === "function" && callback();
      } else {
        message.error(data.message);
      }
    });
  };

  @action addManager = (data, callback) => {
    api.addManager(data).then((data) => {
      if (data.status === "200") {
        message.success(data.message);
        typeof(callback) === "function" && callback();
      } else {
        message.error(data.message);
      }
    });
  };

  @action setMyArea(aid){
    if(aid){
      // console.log("setAid:", aid);
      api.getAreaByCode({"code": aid}).then((data) => {
        if (data.status === "200") {
          this.myArea = data.data;
        } else {
          this.myArea = null;
        }
      });
    } else {
      this.myArea = null;
    }
  }

  @action updateProject = (data) => {
    api.updateProject(data).then((data) => {
      if (data.status === "200") {
        message.success(data.message);
        this.hideUpdateModal();
        this.getProjectList();
      } else {
        message.error(data.message);
      }
    });
  };

  @action updateProjectArea = (data) => {
    api.updateProjectArea(data).then((data) => {
      if (data.status === "200") {
        message.success(data.message);
        this.hideUpdateModal();
        this.getProjectList();
      } else {
        message.error(data.message);
      }
    });
  };
}