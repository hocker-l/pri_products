import {Base} from "../../utils/base.js";
class Home extends Base{
  getBannerItems(id,callback){
    var params ={
      url: "banner/" + id,
      type:"post",
      sCallback:function(res){
        callback && callback(res[0].related_items);
      }
    }
    this.request(params);
  }
  getThemes(ids,callback){
    var params = {
      url: "theme/" + ids,
      type: "post",
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }
  getRecentProducts(count,callback){
    var params ={
      url: "recent/" + count,
      type:"post",
      sCallback: function (res){
        callback && callback(res);
      }
    }
    this.request(params);
  }


}
export { Home };