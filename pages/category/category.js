import { Category } from "category_model.js"
var category =new Category(); 
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
    category.getCategory((allCategoryData)=>{
      console.log(allCategoryData);
      this.setData({
        "allCategoryArr":allCategoryData
      });

      category.getProductByCategory(allCategoryData[0].id, (res) => {
        var objectArr ={
              topic_img: allCategoryData[0].related_topic_img.url,
              toppic_name: allCategoryData[0].name,
              data: res
            };
            console.log(objectArr);
        this.setData({
          "categoryInfo": objectArr
        });
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