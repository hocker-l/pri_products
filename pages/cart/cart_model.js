import { Base } from "../../utils/base.js";

class Cart extends Base {
  constructor(){
    super();
    this._storageKeyName = 'cart';
  }
/*
* 获取购物车
* param
* flag - {bool} 是否过滤掉不下单的商品
*/
getCartDataFromLocal(flag){
  var res = wx.getStorageSync(this._storageKeyName);
  if(!res){
    res = [];
  }
  //在下单时过滤不下单的商品
  if(flag){
    var newRes = [];
    for (let i;i<res.length;i++){
      if(res[i].res.selectedStatus){
        newRes.push(res[i]);
      }
    }
    res = newRes;
  }
  return res;
}
 /*
   * 加入到购物车
   * 如果之前没有样的商品，则直接添加一条新的记录， 数量为 counts
   * 如果有，则只将相应数量 + counts
   * @params:
   * item - {obj} 商品对象,
   * counts - {int} 商品数目,
   * */
add(item,counts){
  var cartData = this.getCartDataFromLocal();
  if(!cartData){
    cartData = [];
  }
  var isHadInfo = this._isHasThatOne(item.id,cartData);
  if(isHadInfo.index ==-1){
    item.counts =counts;
    item.selectedStatus =true;
    cartData.push(item);
  }else{
    cartData[isHadInfo.index].counts +=counts;
  }
  wx.setStorageSync(this._storageKeyName, cartData);
  return cartData;
}

  /*购物车中是否已经存在该商品*/
  _isHasThatOne(id,arr){
    var result ={index :-1};
    for(let i=0;i<arr.length;i++){
      if(id ==arr[i].id){
          result ={
            index: i,
            data: arr[i]
          };
          break;
      }
    }
    return result;
  }
  /*
   *获得购物车商品总数目,包括分类和不分类
   * param:
   * flag - {bool} 是否区分选中和不选中
   * return
   * counts1 - {int} 不分类
   * counts2 -{int} 分类
   */
  getCartTotalCounts(flag){
    var data =this.getCartDataFromLocal();
    var counts =0;
    for(let i=0;i<data.length;i++){
      if(flag){
        if(data[i].selectedStatus){
          counts +=data[i].counts;
        }
      } else {
        counts += data[i].counts;
      }
    }
    return counts;
  }



}
 
export { Cart };