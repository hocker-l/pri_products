import { Config} from "config.js";
import { Token } from "../utils/token.js";
var token =new Token(); 
class Base{
  baseRequestUrl="";
  constructor(){
    this.baseRequestUrl = Config.requestUrl;
  }
  request(params,noRefetch){
    var that =this;
    var url =this.baseRequestUrl+params.url;
    if(!params.type){
      params.type="GET";
    }
    wx.request({
      url: url,
      data: params.data,
      header:{
        "content-type": "application/json",
        "token":wx.getStorageSync("token")
      },
      method: params.type,
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        var code =res.statusCode.toString();
        var startChar =code.charAt(0);
        if(startChar=="2"){
          params.sCallback && params.sCallback(res.data);
        }else{
          if(code =="401"){
            if(!noRefetch){
              that._refetch(params);
            }
          }
          if(noRefetch){
            params.eCallback && params.eCallback(res.data);
          }
        }
      },
      fail: function(res) {
        that._processError(res);
      },
      complete: function(res) {},
    })
  }
  _refetch(params){
    token.getTokenServer((res)=>{
      this.request(params,true);
    });
  }
  _processError(err) {
    console.log(err);
  }

  
}
export {Base};