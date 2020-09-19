import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-payment',
  templateUrl: './qr-payment.component.html',
  styleUrls: ['./qr-payment.component.styl']
})
export class QrPaymentComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  request = {"merId":"", "transRef":""};
  cbResult = "";
  resObj:any = this.Objfun();
  transRef = "";

  Objfun(){
    return { "code" : "","msg" : "","merDqrCode" : "","transExpiredTime" : "","refNo" : "","transRef" : ""};
  }
  constructor(private http : HttpClient, 
    private location : Location,
    private router : Router) { 
    this.resObj = this.Objfun();    
  }

  ngOnInit(): void {
   this.generate();
  }
  generate(){
    const url: string="/payment-api/v1/qr/generate-transaction.service"; 
    const json: any = {
      "reqId": "2d21a5715c034efb7e0aa383b885fc7a",
      "merId": "581500000000017",
      "subMerId": "0000000001700001",
      "terminalId": "03000001",
      "transAmount": "800",
      "transCurrency": "MMK",
      "ref1": "9592353534",
      "ref2": "1004355346"
    }
    
    this.http.request('post',url,{body:json}).subscribe(
      (data:any)=> {
        if(data.code == '0000'){
          this.resObj.merDqrCode = data.merDqrCode;
          this.transRef = data.transRef;
          console.warn("success: ", data.transRef);
        }else{
          console.warn("fail: " , data);
        }
          },
      error => {   
         console.warn('error' , error);             
      },
    );
  }

  checkStatus(){
    const url: string="/payment-api/v1/qr/check-transaction.service";  
    this.request.merId = "581500000000017";
    this.request.transRef = this.transRef;     
    const json: any = this.request;
    this.http.request('post',url,{body:json}).subscribe(
      (data:any) => {   
      this.cbResult =  data.msg;
      this.router.navigate(['cbresult']);
      console.log("success: ", data.transStatus); },
       error => {
        this.router.navigate(['fail']);
         console.warn("error: " , error);
      });      
  }

  cancel(){
    this.router.navigate(['cbPay']);
  }
}
