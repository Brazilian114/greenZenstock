import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController,Content, ModalController, NavParams, List } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Utility } from '../../../helper/utility';

import { SaleOrderService } from '../../../services/saleorderservice';
import { ProductService } from '../../../services/productservice';

@IonicPage(
  {name:'AddProductPage',
  segment: 'AddProduct'}
)

@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html'
})
export class AddProductPage {
  
  @ViewChild(Content) pageTop: Content;
  public pageScroller(){
    this.pageTop.scrollToTop();
  }
  oClient:string = "7LINE";
  oCustomer:string = "";
  isChecked:any = [];

  arrayItem:any = [];
  item2 = [];
  data_product:any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public modalCtrl: ModalController
    , private utility: Utility, private saleorderServ: SaleOrderService, private productServ: ProductService, public navParams: NavParams) {
      this.oCustomer = navParams.get('oCustomer');
      console.log(this.oCustomer);
      this.arrayItem = navParams.get('arrayItem');
      console.log("array",this.arrayItem);
  }
  ionViewWillEnter(){
    this.doGetProduct();
  }
  checkItem(){
    console.log(this.isChecked);
    
  }
  doGetProduct(){
    this.utility.presentLoading();
    this.saleorderServ.GetProduct(this.oClient).then((res)=>{
      this.data_product = res;
      for(let i = 0; i < 30; i++){
        this.item2.push(this.data_product[this.item2.length]);
        }  
      console.log(this.data_product);
      this.utility.finishLoding();
    })
  }

  doInfinite(ionInfinite) {
    console.log("Start Scroll");
      setTimeout(() => {      
       for(let i = 0; i < 30; i++){
         this.item2.push(this.data_product[this.item2.length]);
         } 
       console.log('End Scroll'); 
       
       ionInfinite.complete();
         }, 500);  
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
  getProductByKeyword(oKeyword){
    this.utility.presentLoading();
    this.productServ.GetProductByKeyword(this.oClient, oKeyword).then((res)=>{
      this.data_product = res;
     
      console.log(this.data_product); 
      this.utility.finishLoding();    
    })
  }
  SaveSaleOrder(){
    this.viewCtrl.dismiss(this.arrayItem);
  }
  dismiss() {
    this.viewCtrl.dismiss();
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

  
}
