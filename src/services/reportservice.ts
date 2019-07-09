import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as xml2js from "xml2js"

import { Storage } from '@ionic/storage';
@Injectable()
export class ReportService {
  public hostWebService:string;
  url:string;
  constructor(private http: Http, private storage: Storage){

    this.storage.get('_url').then((res)=>{
      this.url = res;
      this.hostWebService = "http://"+this.url+"/RF-Service_GreenTimberland_zenstock/RFService.asmx";
    })
  }

//GET
//NEW
GetSalesOrdersByDateRange(oClient, oUserId, oStartDate, oEndDate, oUserGroup) {
  let parameters='oClient='+oClient+'&oUserId='+oUserId+'&oStartDate='+oStartDate+'&oEndDate='+oEndDate+'&oUserGroup='+oUserGroup;
  return this.http.get(this.hostWebService +"/Get_Sales_Orders_By_Date_Range?"+parameters)
    .toPromise()
    .then(response =>
      {
          let a;
          xml2js.parseString(response.text(),{explicitArray:true},function (err,result) {
          a = result;
      });
          try {
              // return a.DataTable["diffgr:diffgram"].NewDataSet.Table; //explicitArray false
              return a.DataTable["diffgr:diffgram"]["0"].NewDataSet["0"].Table //explicitArray true
          }
          catch (e) {
            return [];
          }
      }
    );
} 
}
