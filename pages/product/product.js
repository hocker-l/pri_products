import { Product } from "product_model.js";
import { Cart } from "../cart/cart_model.js";
var product = new Product();
var cart = new Cart();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     id:null,
     productCounts:1,
     countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
     currentTabsIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    this._loadData();

  },
  _loadData(){
    product.getProductById(this.data.id, (res) => {
      console.log(res[0])
      this.setData({
        cartTotalCounts: cart.getCartTotalCounts().counts1,
        product: res[0]
      });
    })
  },
  bindPickerChange:function(e){
    console.log(e.detail.value);
    this.setData({
      productCounts: this.data.countsArray[e.detail.value]
    });
  },
  onTabsItemTap:function(e){
    console.log(e);
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentTabsIndex: index
    })
  },
  onAddingToCartTap:function(e){
    this.addToCart();
    this.setData({
      cartTotalCounts: cart.getCartTotalCounts().counts1
    });
  },
  addToCart:function(){
    var tempObj ={};
    var keys = ["id", "name", "price","related_image"];
    for(var key in this.data.product){
      if(keys.indexOf(key)>=0){
        tempObj[key] = this.data.product[key];
      }
    }
    cart.add(tempObj, this.data.productCounts);
  },
  onCartTap(event){
    var id = event.currentTarget.dataset.id;
    wx.switchTab({
      url: "../cart/cart",
    })
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