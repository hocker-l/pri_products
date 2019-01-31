import {Base} from "../../utils/base.js";
class Order extends Base{
  constructor(){
    super();
    this._storageKeyName = 'newOrder';
  }
  doOrder(param,callback){
    var that =this;
    var allParams ={
      url:"order", 
      type:"post",
      data: {products:param},
      sCallback:function(data){
          callback&&callback(data);
      },
      eCallback:function(){

      }
    };
    this.request(allParams);
  }
  execPay(orderNumber, callback) {
    var allParams = {
      url: 'pay',
      type: 'post',
      data: { id: orderNumber },
      sCallback: function (data) {
      }
    };
  this.request(allParams);

}
}
export { Order };