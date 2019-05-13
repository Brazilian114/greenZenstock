import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';
import { SaleOrderService } from '../../../services/saleorderservice';
@IonicPage(
  {name:'AddSaleOrderPage',
  segment: 'AddSaleOrder'}
)

@Component({
  selector: 'page-addsaleorder',
  templateUrl: 'addsaleorder.html',
  providers: [SaleOrderService]
})
export class AddSaleOrderPage {

  oClient:string = "001";
  oCustomer:string = "";
  oCustomer_name:string = "";
  oType:string = "";
  oDate:any = new Date().toISOString();
  oPayTerm:string = "";
  oSale:string = "";
  oDateSale:any = new Date().toISOString();

  oVat1:string = "";
  oDiscount1:string = "";
  oCheckDiscount1:any = false;
  oVat2:string = "";
  oDiscount2:string = "";
  oCheckDiscount2:any = false;
  oVat3:string = "";
  oDiscount3:string = "";
  oCheckDiscount3:any = false;

  oRemark:string = "";

  data_customerparam:any;
  data_productparampayterm:any;
  data_productparamsale:any;

  constructor(public navCtrl: NavController, private utility: Utility, public navParams: NavParams
    , private storage: Storage, private saleorderServ: SaleOrderService, private modalCtrl: ModalController) {

  }
  ionViewWillEnter(){
    this.doProductParamPayTerm();
    this.doProductParamSale();
  }
  doCustomerModal(){
    this.utility.presentLoading();
    let modal = this.modalCtrl.create("CustomerModalPage")
    modal.present();
    modal.onDidDismiss(data =>{
      console.log(data);
      if(data != undefined){
       this.oCustomer = data.customer;
       this.oCustomer_name = data.customer_name;
      }else{

      }
    });
    this.utility.finishLoding();
  }
  doProductParamPayTerm(){
    this.saleorderServ.GetProductParam("PAY-TERM").then((res)=>{
      this.data_productparampayterm = res;
      console.log(this.data_productparampayterm);      
    })
  }
  doProductParamSale(){
    this.saleorderServ.GetProductParam("SALES CODE").then((res)=>{
      this.data_productparamsale = res;
      console.log(this.data_productparamsale);      
    })
  }
  doProductModal(){
    this.utility.presentLoading();
    let modal = this.modalCtrl.create("AddProductPage")
    modal.present();
    modal.onDidDismiss(data =>{
      console.log(data);
      if(data != undefined){

      }else{

      }
    });
    this.utility.finishLoding();
  }
  doChangeTypeVat1(oVat1){
    this.oVat1 = oVat1;
  }
  doChangeTypeVat2(oVat2){
    this.oVat2 = oVat2;
  }
  doChangeTypeVat3(oVat3){
    this.oVat3 = oVat3;
  }
  doChangeTextDiscount1(oDiscount1){
    this.oDiscount1 = oDiscount1;
  }
  doChangeTextDiscount2(oDiscount2){
    this.oDiscount2 = oDiscount2;
  }
  doChangeTextDiscount3(oDiscount3){
    this.oDiscount3 = oDiscount3;
  }
  doChangeDiscount1(oCheckDiscount1){
    this.oCheckDiscount1 = oCheckDiscount1;
  }
  doChangeDiscount2(oCheckDiscount2){
    this.oCheckDiscount2 = oCheckDiscount2;
  }
  doChangeDiscount3(oCheckDiscount3){
    this.oCheckDiscount3 = oCheckDiscount3;
  }
}