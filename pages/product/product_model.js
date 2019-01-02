import {Base} from "../../utils/base.js";

class Product extends Base{
   getProductById(id,callback){
      var params ={
        url:"product/"+id,
        type:"post",
        sCallback:function(res){
          callback&&callback(res);
        }
      }
      this.request(params);
   }

}

export {Product};