import {Base} from "../../utils/base.js"
class Category extends Base{
  getCategory(callback){
     var params ={
       url:"category/all",
       type:"post",
       sCallback:function(res){
         callback&&callback(res);
       }
     }
    this.request(params);
  }
  
  getProductByCategory(id,callback){
    var params ={
      url:"product/by_category/"+id,
      type:"post",
      sCallback:function(res){
        callback&&callback(res);
      }
    }
    this.request(params);
  }

}

export { Category}