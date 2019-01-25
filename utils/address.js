import {Base} from "../utils/base.js";
import {Config} from "../utils/config.js";
class Address extends Base{
  isCenterCity(province){
    var centerCitys = ['北京市', '天津市', '上海市', '重庆市'],
        flag =centerCitys.indexOf(province)>=0;
        return flag;

  }
  /*
   *根据省市县信息组装地址信息
   * provinceName , province 前者为 微信选择控件返回结果，后者为查询地址时，自己服务器后台返回结果
   */
  setAddressInfo(res){
    var province =res.provinceName || res.province,
        city = res.cityName || res.city,
        country =res.countryName || res.country,
        detail =res.detailInfo || res.detail;
    var totalDetail =city +country + detail;  
    if(!this.isCenterCity(province)){
      totalDetail=province +totalDetail;
    }
    return totalDetail;  
  }
  submitAddress(data,callback){
    var data =this._setUpAddress(data);
    var param ={
        url:"address",
        type:"post",
        data:data,
        sCallback:function(res){
          callback && callback(true,res);
        },
        eCallback: function (res) {
        callback && callback(false, res);
        }
    };
    this.request(param);
  }
  _setUpAddress(data){
    var formData ={
      name: data.userName,
      province:data.provinceName,
      city :data.cityName,
      country: data.countyName,
      mobile:data.telNumber,
      detail :data.detailInfo
    }
    return formData;
  }
  /*获得我自己的收货地址*/
  getAddress(callback){
    var that =this;
    var param ={
      url:"getAddress",
      sCallback:function(res){
        if(res){
          res.totalDetail =that.setAddressInfo(res);
          callback && callback(res);
        }
      }
    };
    that.request(param);
  }

}
export { Address };