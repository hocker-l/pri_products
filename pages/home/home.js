import { Home } from "home_model.js";
var home = new Home();
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
     var id=1;
     var ids="1,2,3";
     var count =15;
    home.getBannerItems(id,(res)=>{
      console.log(res);
      this.setData({
        'bannerArr': res
      });
    });
    home.getThemes(ids,(res)=>{
      console.log(res);
      this.setData({
        'themeArr':res
      });
    });
    home.getRecentProducts(count,(res)=>{
      console.log(res);
      this.setData({
        'recentProductsArr': res
      });
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})