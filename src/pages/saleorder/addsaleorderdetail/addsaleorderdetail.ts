import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController,Content,AlertController, ModalController, NavParams, List } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';

import { SaleOrderService } from '../../../services/saleorderservice';
import { ProductService } from '../../../services/productservice';
/**
 * Generated class for the AddsaleorderdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {name:'AddSaleOrderDetailPage',
  segment: 'AddSaleOrderDetail'}
)

@Component({
  selector: 'page-addsaleorderdetail',
  templateUrl: 'addsaleorderdetail.html',
})
export class AddsaleorderdetailPage {
  @ViewChild(Content) pageTop: Content;
  public pageScroller(){
    this.pageTop.scrollToTop();
  }
  oUsername:string = "";
  oUserId:string = "";
  oUserGroup:string = "";
  data_saleorderdetail:any;
  oClient:string = "7LINE";
  oCustomer:string = "";
  oCustomer_name:string = "";
  oPayment_term:string = "";
  oType:string = "ADHOC";
  oDate:any = new Date().toISOString();
  oPayTerm:string = "";
  oSale:string = "";
  oDateSale:any = new Date().toISOString();
  oTotalPrice: any = 0.00;
  oStreet:string="";

  discount:any = 0.0;
  total_price:any = 0.0;
  pricePlusTax:any = 0.0;
  real_discount:any = 0.0;
  tax:any = 1.0;

  oVat1:string = "";
  oDiscount1:string = "";
  oCheckDiscount1:any = false;
  oDiscountType1:string = "";
  oSearch:string = "";
  oVat2:string = "";
  oDiscount2:string = "";
  oCheckDiscount2:any = false;
  oDiscountType2:string = "";

  oVat3:string = "";
  oDiscount3:string = "";
  oCheckDiscount3:any = false;
  oDiscountType3:string = "";
  oSaleManCode:string="";
  oVat_id:string;
  oDescription:string;
  oVat:string;
  oAddress:string = "";
  oBuilding:string = "";
  oRemarks:string = "";
  oDueDate:string = "";
  oOrder_no:string = "";
  oDiscountType:string="";
  data_customerparam:any;
  data_productparampayterm:any;
  data_productVat:any;
  data_productparamsale:any;
  data_customerdelivery:any;
  data_addsaleorder:any;
  data_addsaledetail:any;
  data_item:any;
  date_time:any;
  items:any;
  arrayItem:any = [];
  data_product:any;
  constructor( private storage: Storage,public alertCtrl: AlertController,public navCtrl: NavController, public viewCtrl: ViewController, public modalCtrl: ModalController
    , private utility: Utility, private saleorderServ: SaleOrderService, private productServ: ProductService, public navParams: NavParams) {
   
      this.data_item = navParams.get('item');
      console.log(this.data_item);
      
      this.oOrder_no = this.data_item.order_no;
      this.oSaleManCode = this.data_item.salesman_code;
      //this.oDueDate = this.data_item.due_date;
      this.oRemarks = this.data_item.remarks;
      this.oCustomer = this.data_item.customer;
      this.oCustomer_name = this.data_item.customer_name;
     // this.oAddress = this.data_item.dlvr_street + " " + this.data_item.dlvr_bldg;
    //this.oDiscountRate = this.data_item.discount_rate;
      this.oType = this.data_item.order_type;
      this.oDiscountType = this.data_item.discount_type;
     // this.date_time = this.data_item.create_date
      //this.oDate = this.data_item.create_date
      this.oVat = this.data_item.vat_rate;
      this.oBuilding = this.data_item.dlvr_bldg;
      this.oAddress = this.data_item.dlvr_street;
      this.oUsername = this.data_item.created_by;
      this.oPayTerm = this.data_item.payment_term;
      this.oOrder_no = this.data_item.order_no;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddsaleorderdetailPage');
  }
  ionViewWillEnter(){
   
    this.doGetProduct();
    this.getProductByKeyword(this.oSearch)
    
    
  }
  initializeItems() {
    this.items = this.data_product;   
  }
  doGetProduct(){
    this.utility.presentLoading();
    this.saleorderServ.GetProduct(this.oClient).then((res)=>{
      this.data_product = res;
      
      console.log(this.data_product);
      this.utility.finishLoding();
    })
  }
  dismiss() {
  
      this.viewCtrl.dismiss();

   // this.viewCtrl.dismiss();
   /*
    this.saleorderServ.GetOrdersDetails(this.oClient, this.oUserId, this.oUserGroup, this.oOrder_no).then((res)=>{
      this.data_saleorderdetail = res;  
      this.viewCtrl.dismiss(this.data_saleorderdetail);
      //console.log(this.data_saleorderdetail);
      
    })*/

  }
  getProductByKeyword(oSearch){
    //this.utility.presentLoading();
    this.productServ.GetProductByKeyword(this.oClient, oSearch).then((res)=>{
      this.data_product = res;
      this.initializeItems();
      console.log(this.data_product); 
      //this.utility.finishLoding();    
    })
  }
  doProductModal(item){
    this.utility.presentLoading();
    let modal = this.modalCtrl.create("ProductModalPage",{ item: item, oCustomer: this.oCustomer, arrayItem: this.arrayItem })
    modal.present();
    modal.onDidDismiss(data =>{
      if(data != undefined){
        this.arrayItem.push(data);
        console.log("addsession", this.arrayItem);
        // for(let i = 0; i <= this.arrayItem.length; i++){
        //   console.log(this.arrayItem[i][0]);
        // }
      }else{
        
      }
    });
    this.utility.finishLoding();
 
    
}
doListProductModal(){
  this.utility.presentLoading();
  let modal = this.modalCtrl.create("ListProductModalPage",{ arrayItem: this.arrayItem })
  modal.present();
  modal.onDidDismiss(data =>{
    if(data != undefined){
      // this.arrayItem.push(data);
      // console.log("addsession", this.arrayItem);
      // for(let i = 0; i <= this.arrayItem.length; i++){
      //   console.log(this.arrayItem[i][0]);
      // }
    }else{
      
    }
  });
  this.utility.finishLoding();
}
doGetStorage(){
  this.storage.get('_user').then((res)=>{
    this.oUsername = res;
  })  
  this.storage.get('_userId').then((res)=>{
    this.oUserId = res;
    //console.log(this.oUserId["0"]);
  })  
  this.storage.get('_userGroup').then((res)=>{
    this.oUserGroup = res;
  })  
}
doAddOrdersDetailsAsync(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      this.saleorderServ.AddOrdersDetails(this.oClient, this.oUsername, this.oOrder_no, "", 0, this.arrayItem[value]["0"]
      , "", this.arrayItem[value]["3"], this.arrayItem[value]["2"], "", "", "", this.arrayItem[value]["7"], "", "", "", "", "", "", ""
      , this.arrayItem[value]["1"], "", this.oCustomer, "", "", this.arrayItem[value]["8"]).then((res)=>{
        this.data_addsaledetail = res;
        console.log(this.data_addsaledetail);
        if(this.data_addsaledetail["0"].sqlstatus != "0"){
          this.utility.Alert(this.data_addsaledetail["0"].sqlmsg, this.data_addsaledetail["0"].sqlmsg2);
        }else{

        }
      })
      resolve(value);
    }, Math.floor(Math.random() * 1000));
  });
 
}


  SaveSaleOrder(){
  
      if(this.arrayItem.length <= 0){
        this.utility.Alert("Warning","กรุณาเลือกสินค้าก่อน");
      }else{
                for(let i=0; i < this.arrayItem.length; i++){
                  this.doAddOrdersDetailsAsync(i) 
                }
                let alert = this.alertCtrl.create({
                  title: this.oOrder_no,
                  subTitle: "Sales Order Updated",
                  buttons: [ {
                      text: 'ตกลง',
                      handler: item => {
                        this.dismiss();
                                           
                      }
                    }]
                });
              
                alert.present();              
              }
      
    
    }

  
}

