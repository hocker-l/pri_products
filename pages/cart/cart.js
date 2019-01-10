import {Cart} from 'cart_model.js';
var cart = new Cart(); 
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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var cartData = cart.getCartDataFromLocal(),
	      countInfo = cart.getCartTotalCounts(true);
    console.log(cartData);
    this.setData({
      selectedCounts : countInfo.counts1,
      selectedTypeCounts : countInfo.counts2,
      account: this._calcTotalAccountAndCounts(cartData).account,
      cartData : cartData
    });
  },
  //离开页面时统一执行
  onHide:function(){
    cart.execSetStorageSync(this.data.cartData);
  },
	_calcTotalAccountAndCounts(data){
		var account = 0, //商品总价格
			selectedCounts =0,  //商品总数量
			selectedTypeCounts =0;   //商品类型个数
		let multiple =100;	 //倍数
		for(let i=0;i<data.length;i++){
			if(data[i].selectedStatus){
				account +=data[i].counts*multiple*Number(data[i].price)*multiple;
				selectedCounts +=data[i].counts;
				selectedTypeCounts ++;
			}
		}
		return {
			 selectedCounts: selectedCounts,
			 selectedTypeCounts: selectedTypeCounts,
			 account: account / (multiple * multiple)
		}
  }, 
  toggleSelect(event){
    var id = event.currentTarget.dataset.id;
    var status = event.currentTarget.dataset.status;
    var index = event.currentTarget.dataset.index;
    this.data.cartData[index].selectedStatus =!status;
    this._resetCartData(this.data.cartData);

  },
  toggleSelectAll(event){
    var status = (event.currentTarget.dataset.status =="true");
    for(let i=0;i<this.data.cartData.length;i++){
        this.data.cartData[i].selectedStatus =!status;
    }
    this._resetCartData();
  },
  _resetCartData(){
    var newData = this._calcTotalAccountAndCounts(this.data.cartData);
    this.setData({
      account: newData.account,
      selectedCounts: newData.selectedCounts,
      selectedTypeCounts: newData.selectedTypeCounts,
      cartData: this.data.cartData
    });
  },
  /*根据商品id得到 商品所在下标*/
  _getProductIndexById(id){
      var cartData = this.data.cartData,
        len = cartData.length;
        for(let i=0;i<len;i++){
          if (cartData[i].id ==id){
            return i;
          }
        }
  },

  //改变商品数量的函数，包括更新缓存和data的值
  changeCounts(event){
    var type = event.currentTarget.dataset.type;
    var id = event.currentTarget.dataset.id;
    var index = this._getProductIndexById(id);
    var count =1;
    if (type =='add'){
      cart.addCount(id,count);
    }else if(type == 'cut'){
      count=-1;
      cart.cutCount(id,-1);
    }
    this.data.cartData[index].counts +=count;
    this._resetCartData();
  },
  //删除购物车里的商品
  delete(event){
    var id = event.currentTarget.dataset.id;
    var index =this._getProductIndexById(id);
    this.data.cartData.splice(index,1);
    this._resetCartData();
  }
})