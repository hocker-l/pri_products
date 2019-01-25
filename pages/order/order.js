import { Order } from "../order/order_model.js";
import { Cart }  from "../cart/cart_model.js";
import { Address } from "../../utils/address.js";

var order =new Order();
var cart =new Cart();
var address =new Address();
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
      var productArr;
      this.data.account =options.account;
    productArr = cart.getCartDataFromLocal(true);
    console.log(productArr);
      this.setData({
        productsArr: productArr,
        account:this.data.account,
        orderStatus:0
      }); 
    address.getAddress((res)=>{
      this._bindAddressInfo(res);
    })
  },
  editAddress:function(options){
    var that = this;
    wx.chooseAddress({
      success:function(res){
        console.log(res);
        var addressInfo = {
          name:res.userName,
          mobile:res.telNumber,
          totalDetail: address.setAddressInfo(res)
        }
        
        that._bindAddressInfo(addressInfo);

        address.submitAddress(res,(flag)=>{
          if(!flag){
            that.showTips("操作提示","地址信息更新失败！");
          }
        })
      }
    })
  },
  _bindAddressInfo(addressInfo){
    this.setData({
      addressInfo:addressInfo
    });
  },
  /*
   * 提示窗口
   * params:
   * title - {string}标题
   * content - {string}内容
   * flag - {bool}是否跳转到 "我的页面"
   */
  showTips: function (title, content, flag) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success: function (res) {
        if (flag) {
          wx.switchTab({
            url: '/pages/my/my'
          });
        }
      }
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