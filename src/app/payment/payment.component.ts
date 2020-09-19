import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import * as crypto from 'crypto';
import { createHmac } from "crypto";
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.styl']
})
export class PaymentComponent implements OnInit {

  form: FormGroup;
  payment = {"merchantId":"", "invoiceNo":"",
    "productDesc": "", "amount":"", "currencyCode":"",
    "userDefined1":"", "userDefined2":"", "userDefined3":"",
    "hashValue":""};

  mpuData:any='';
  constructor(
    private location : Location,
    private router: Router,
    private http : HttpClient) 
    { }

  ngOnInit(): void {
  }


  submitForm(){
  const headers = new HttpHeaders().set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
    const url: string="/UAT/Payment/Payment/pay";  
    this.payment.merchantId = "204104001305002";
    this.payment.amount = "000000050000";
    this.payment.currencyCode = "104";
    this.payment.productDesc = "MOHT Payment Fee";
    this.payment.userDefined1 = "250";
    this.payment.userDefined2 = "13";
    this.payment.userDefined3 = "";      
    this.payment.hashValue = this.getHashValue().toLocaleUpperCase();
    console.log("this.getHashValue().toLocaleUpperCase(): " , this.getHashValue().toLocaleUpperCase())
    
    const json: any = this.payment;
    this.http.post(url, json,{ headers, responseType: 'text' as 'json', observe: 'response' }).subscribe(
      data=> {
          window.location.href = data.url;
          },
      error => {   
         console.warn('error' , error);             
      },
    );
  }

  getHashValue() : string{
    let params: Array<string> = [this.payment.merchantId, this.payment.invoiceNo, this.payment.currencyCode, this.payment.productDesc, this.payment.userDefined1, this.payment.userDefined2, this.payment.userDefined3, this.payment.amount];
    params.sort();
    let paramStr = "";
    for(var str of params){
      paramStr += str + "";
    }

    const key = "T3HJEW4ZIM1YT11ZOZN0CMNIHKEDQDFI";
    var crypto = require("crypto");
    return crypto.createHmac('sha1', key)
          .update(paramStr)
           .digest('hex') + "";  
  }

  cancel(){
    this.location.back();
  }
}
