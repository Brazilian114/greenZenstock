import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../../helper/utility';
import { SaleOrderService } from '../../../../services/saleorderservice';
@IonicPage(
  {name:'EditProductModalPage',
  segment: 'EditProductModal'}
)

@Component({
  selector: 'page-editproductmodal',
  templateUrl: 'editproductmodal.html'
})
export class EditProductModalPage {
  @ViewChild('focusQty') InputQty;

  oClient:string = "7LINE";
  oUsername:string = "";
  oItem_no:string = "";
  oDescription:string = "";
  oCustomer:any;
  oCustomer2:any;
  oOrder_no:string = "";
  oPrice1:string = "";
  oPrice2:string = "";
  oParamCode:any;
  oUOM:any;
  oZone:any;
  oUnit:any;
  oCheckDiscount:boolean = false;

  oAvailable:any;
  oFree:any;
  oUomQty:string = "";
  oPerCount:any;
  oUomSale:string = "";
  oQty:string = "";
  oPrice:string = "";
  oDiscount:string = "";
  oRemark:string = "";

  item: any;
  data_customerparam:any;
  data_productuom:any;
  data_productdefault:any;
  data_productcolor:any;
  data_lastsale:any;
  data_productparam:any;
  data_zone:any;
  data_productstock:any;
  data_price:any;

  data_addsaledetail:any;
  data_return:any = [];
  arrayItem:any = [];
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public viewCtrl: ViewController, private utility: Utility, public navParams: NavParams
    , private storage: Storage, private saleorderServ: SaleOrderService) {
      this.storage.get('_userId').then((res) => {
        this.oUsername = res;  
        //console.log(this.oUsername);
         
      });

      this.item = navParams.get('item');
      
      this.oCustomer2 = navParams.get('oCustomer');
      if(this.oCustomer = navParams.get('oCustomer') != "7LINE"){
        this.oCustomer = "ALL"
        }else{
        this.oCustomer = navParams.get('oCustomer');
        }
      
      this.oOrder_no = navParams.get('oOrder_no');

      console.log(this.item);     
      
      this.oItem_no = this.item.item_no;
      this.oDescription = this.item.item_description;    
      setTimeout(()=>{        
        this.InputQty.setFocus();
      },1000);
  }
  ionViewWillEnter(){
    this.doGetProductUom();
    this.doGetProductDefault();
    this.doGetProductColor();
    this.doGetLastSale();
    this.doGetProductParam();
    this.doGetZone();
  }
  ionViewDidEnter(){
    this.doGetProductStock("",this.data_productuom["0"].item_packing);
  }
  doConfirm(oItem_no, oZone, oQty, oUOM, oParamCode, oPrice, oDiscount, oRemark, oUnit){
    if(oUnit == undefined || oUnit == "0"){
      this.utility.Alert("Warning","กรุณาเลือกประเภทสินค้าในการจัดส่ง");
    }else if(oQty == undefined || oQty == "" || oQty <= 0){
      this.utility.Alert("Warning","กรุณาเพิ่มจำนวนสินค้าในการจัดส่ง");
    }else if(oQty > this.oAvailable){
      this.utility.Alert("Warning","จำนวนสินค้าเกินจำนวนในสต๊อก");
    }else{
      this.saleorderServ.AddOrdersDetails(this.oClient, this.oUsername, this.oOrder_no, "", this.item.line_no, oItem_no
      , "", oUOM, oQty, "", "", "", oRemark, "", "", "", "", "", "", ""
      , oZone, "", this.oCustomer2, "", "", oUnit).then((res)=>{
        this.data_addsaledetail = res;
        console.log(this.data_addsaledetail);
        if(this.data_addsaledetail["0"].sqlstatus != "0"){
          this.utility.Alert(this.data_addsaledetail["0"].sqlmsg, this.data_addsaledetail["0"].sqlmsg2);
        }else{
          this.utility.Alert(this.data_addsaledetail["0"].sqlmsg, this.data_addsaledetail["0"].sqlmsg2);
        }
      })
      this.viewCtrl.dismiss();
    }
  }
  doGetProductUom(){
    this.saleorderServ.GetProductUom(this.oClient, this.item.item_no).then((res)=>{
      this.data_productuom = res;
      console.log(this.data_productuom); 
      this.oUOM = this.data_productuom["0"].item_packing["0"];
    })
  }
  doGetProductDefault(){
    this.saleorderServ.GetProductDefault(this.oClient, this.item.item_no).then((res)=>{
      this.data_productdefault = res;
      console.log(this.data_productdefault);
      
    })
  }
  doGetProductColor(){
    this.saleorderServ.GetProductColor(this.oClient, this.item.item_no).then((res)=>{
      this.data_productcolor = res;
      console.log(this.data_productcolor);
      
    }) 
  }
  doGetLastSale(){
    this.saleorderServ.GetLastSale(this.oClient, this.item.item_no, this.oCustomer).then((res)=>{
      this.data_lastsale = res;
      console.log("Last Sale",this.data_lastsale);
      if(this.data_lastsale.length <= 0){
          this.oPerCount = 0;

      }else{
        // this.oPerCount = this.data_lastsale["0"].ราคาขายต่อหน่วย;
        this.oUomSale = this.data_lastsale["0"].หน่วยขาย;

        var percount = +this.data_lastsale["0"].ราคาขายต่อหน่วย;
        this.oPerCount = percount.toFixed();
      }
    })
  }
  doGetProductParam(){
    this.saleorderServ.GetProductParam("PRODUCT_RATE").then((res)=>{
      this.data_productparam = res;
      console.log(this.data_productparam);
      this.oParamCode = this.data_productparam["4"].param_code["0"];
      
    })
  }
  doGetZone(){
    this.saleorderServ.GetZone(this.oUsername, "").then((res)=>{
      this.data_zone = res;
      console.log(this.data_zone);
      this.oZone = this.data_zone["0"].Zone["0"];
      
    })
  }
  doGetProductStock(oZone, oItemPacking){
    this.saleorderServ.GetProductStock(this.oClient,this.oCustomer, this.oItem_no, "", "", "", "", "", "", "", oZone, oItemPacking, "", "", "", "", "").then((res)=>{
      this.data_productstock = res;
      console.log(this.data_productstock);
      if(this.data_productstock.length <= 0){
        this.oAvailable = 0;
        this.oFree = 0;
      }else{
        // this.oAvailable = this.data_productstock["0"].qty_avail;
        // this.oFree = this.data_productstock["0"].qty_free;
        this.oUomQty = this.data_productstock["0"].uom;

        //var available = +this.data_productstock["0"].qty_avail;
        var free = +this.data_productstock["0"].qty_free;        
        //var price = +this.data_productstock["0"].unit_price;

        this.oAvailable = parseInt(this.data_productstock["0"].qty_avail);
        //console.log(this.oAvailable);
        
        this.oFree = free.toFixed();
        var price1 = +this.data_productstock["0"].price_assemble_no
        var price2 = +this.data_productstock["0"].price_assemble
        this.oPrice1 = price1.toFixed(2);
        this.oPrice2 = price2.toFixed(2);
        //this.oPrice = this.data_productstock["0"].unit_price["0"];
        // this.oPrice = price.toFixed();      
      }   
      /*if(this.oQty <= "0"){
        this.utility.Alert("Warning","กรุณาเพิ่มจำนวนสินค้าในการจัดส่ง");
      }else if(this.oQty > this.data_productstock["0"].qty_avail){
        this.utility.Alert("Warning","จำนวนสินค้าเกินจำนวนในสต๊อก");
      }*/   
    })
  }
  doClear(){
    this.oQty = "";
    this.oUnit = "";
    this.oRemark = "";
}
  doAddOrdersDetailsAsync(value) {
    return new Promise((resolve) => {
      setTimeout(() => {

        resolve(value);
      }, Math.floor(Math.random() * 1000));
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
