import { Category } from "category_model.js"
var category =new Category(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transClassArr: ['tanslate0', 'tanslate1', 'tanslate2', 'tanslate3', 'tanslate4', 'tanslate5'],
    currentMenuIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    category.getCategory((allCategoryData)=>{
      console.log(allCategoryData.length);
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
          "categoryInfo0": objectArr
        });
      });

    });
  },
  changeCategory:function(event){
    var id = event.currentTarget.dataset.id;
    var index = event.currentTarget.dataset.index;
    this.setData({
      currentMenuIndex:index
    });
    if(this.isLoadedData(index)){
      console.log(id);
      category.getProductByCategory(id,(resData)=>{
        this.setData(
          this.getDataObjForBind(index,resData)
        );
      })
    }
  },
  isLoadedData(index){
    if (this.data["categoryInfo"+index]){
      return false;
    }else{
      return true;
    }
  },
  getDataObjForBind:function(index,data){
    var obj ={};
    var baseData = this.data.allCategoryArr[index];
    obj["categoryInfo" + index] ={
      topic_img: baseData.related_topic_img.url,
      toppic_name: baseData.name,
      data: data
    };
    return obj;
  },
  onProductItemTap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../product/product?id=' + id,
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