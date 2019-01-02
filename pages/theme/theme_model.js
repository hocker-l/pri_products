import {Base} from "../../utils/base.js";
class Theme extends Base{
  getProductByTheme(id,callback){
    var params ={
      url:"theme/product/"+id,
      type:"post",
      sCallback:function(res){
        callback&&callback(res);
      }
    }
    this.request(params);
  }
}
export {Theme}