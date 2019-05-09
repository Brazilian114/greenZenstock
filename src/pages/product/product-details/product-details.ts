import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';
import { ProductService } from '../../../services/productservice';

@IonicPage(
  {name:'ProductDetailsPage',
  segment: 'ProductDetails'}
)

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
  providers: [ProductService]
})
export class ProductDetailsPage {
  data_item:any;
  data_productuom:any;
  data_productstock:any;

  oQty_Avail:string = "";
  oUom:string = "";
  oPrice:string = "";

  oItem_Qty:string = "";
  oItem_Uom:string = "";

  oClient:string = "001";
  oItemNo:string = ""; 
  oGrade:string = ""; 
  oLotNo:string = ""; 
  oBatchNo:string = ""; 
  oItemSize:string = ""; 
  oItemColor:string = "";
  oItemClass:string = "";
  oWarehouse:string = "";
  oZone:string = "";
  oItemPacking:string = "";
  oExpiryDate:string = "";
  oProdDate:string = ""; 
  oLocation:string = ""; 
  oPalletNo:string = "";
  oOiNo:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private utility: Utility, private storage: Storage, private productServ: ProductService) {
    this.data_item = navParams.get('item');
    console.log(this.data_item);
    
  }
  ionViewWillEnter(){
    this.doGetProductUom();
    this.doGetProductStock();
  }
  doGetProductUom(){
    this.productServ.GetProductUom(this.oClient, this.data_item.item_no).then((res)=>{
      this.data_productuom = res;
      console.log(this.data_productuom);   
      this.oItem_Qty = this.data_productuom.item_qty;
      this.oItem_Uom = this.data_productuom.item_uom;
    })
  }
  doGetProductStock(){
    this.productServ.GetProductStock(this.oClient, this.data_item.item_no, this.oGrade, this.oLotNo, this.oBatchNo, this.oItemSize
      , this.oItemColor, this.oItemClass, this.oWarehouse, this.oZone, this.oItemPacking, this.oExpiryDate, this.oProdDate
      , this.oLocation, this.oPalletNo, this.oOiNo).then((res)=>{

      this.data_productstock = res;   
      console.log(this.data_productstock); 
      this.oQty_Avail = this.data_productstock.qty_avail;
      this.oUom = this.data_productstock.uom;
      this.oPrice = this.data_productstock.unit_price;
    })
  }
}
