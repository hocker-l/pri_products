import { Config }  from "../utils/config.js";
class Token{
  constructor(){
    this.verifyUrl = Config.requestUrl +"verify";
    this.tokenUrl = Config.requestUrl +"getToken";
  }
  varify(){
    var token =wx.getStorageSync("token");
    if(!token){
      console.log("getTokenServer");
      this.getTokenServer();
    }else{
      console.log("_verifyToken");
      this._verifyToken(token);            
    }
  }
  _verifyToken(token){
    var that =this;
    wx.request({
      url:that.verifyUrl,
      method:"post",
      data:{
        token:token
      },
      success:function(res){
        if (!res.data.isValid){
          that.getTokenServer();
        }
      }
    })
  }
  getTokenServer(callback){
     var that =this;
     wx.login({
       success:function(res){
          wx.request({
            url:that.tokenUrl,
            method:"post",
            data:{
              code:res.code
            },
            success:function(res){
              wx.setStorageSync("token",res.data);
              callback && callback(res.data);
            }
          })
       }
     }) 
  }

}

export {Token}