import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Event, Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
import { RpIntercomService } from '../framework/rp-intercom.service';

@Component({
  selector: 'app-qrstatus',
  templateUrl: './qrstatus.component.html',
  styleUrls: ['./qrstatus.component.styl']
})
export class QrstatusComponent implements OnInit {

  request = {"merId":"", "transRef":""};  
  qrString = "";   
  transStatus = "";
  showLoadingIndicator = false;
  resObj:any = this.Objfun();
  Objfun(){
    return { 
      "reqId":"","merId":"","subMerId":"","terminalId":"", "transAmount":"", "transCurrency":"","ref1":"", "ref2":"",
      "code" : "","msg" : "","merDqrCode" : "","transExpiredTime" : "","refNo" : "","transRef" : ""};
  }
  constructor(private http: HttpClient,
    private location: Location,
    private router: Router,
    private ics: RpIntercomService ) {    
     
  }
  
  ngOnInit(): void {
    this.checkStatus();
  }

  checkStatus() {
    const url: string = this.ics._cbpayurl + "check-transaction.service";
    this.request.merId = "581500000000017";
    this.request.transRef = this.ics.transRef;
    console.log(" this.transRef: ", this.ics.transRef);
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authen-Token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTY3NzU2NzIsIm1lcklkIjoiNTgxNTAwMDAwMDAwMDE3In0.hO4-eWFQHM5STCydXlwr2SjghmFe_4GgmccBq3vJvUY");
    this.http.post(url,this.request,{headers: headers}).subscribe((data:any)=> {
        this.transStatus = data.transStatus; // P, S, E
        this.showLoadingIndicator = false;
        this.updateStatus(this.transStatus);
      },

      error => {
        this.router.navigate(['fail']);
        console.warn("error: ", error);
      });
  }

  reload() {
    this.showLoadingIndicator = true;
    this.checkStatus();
  }

  nextOne() {
    this.generate();
  }

  generate(){
    const url: string= this.ics._cbpayurl + "generate-transaction.service"; 
    this.resObj.reqId =  "2d21a5715c034efb7e0aa383b885fc7a";
    this.resObj.merId = "581500000000017";
    this.resObj.subMerId = "0000000001700001";
    this.resObj.terminalId = "03000001";
    this.resObj.transAmount = "800";
    this.resObj.transCurrency =  "MMK";
    this.resObj.ref1 = "9592353534";
    this.resObj.ref2 = "1004355346"
    this.http.post(url,this.resObj,{"headers": {"Authen-Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTY3NzU2NzIsIm1lcklkIjoiNTgxNTAwMDAwMDAwMDE3In0.hO4-eWFQHM5STCydXlwr2SjghmFe_4GgmccBq3vJvUY"}}).subscribe(
      (data:any)=> {
        if(data.code == '0000'){
          this.ics.transRef = data.transRef;
          this.ics.merDqrCode = data.merDqrCode;
          this.router.navigate(['qrcode']);
          this.save(data);
        }else{
          console.warn("fail: " , data);
        }
          },
      error => {   
         console.warn('error' , error);             
      },
    );
  }

  updateStatus(obj){
      const json: any = {
        "transStatus": obj,
        "transRef": this.request.transRef
      }
      const url: string = this.ics._apiurl + "/operation/saveCBPaytransaction";
      this.http.post(url, json).subscribe(
        (data:any)=> {
         console.log("Save_____" + data);
        },
        error => {
            console.warn('error ' , error);             
        },
      );
    }

    save(obj){
      this.resObj.code = obj.code;
      this.resObj.msg = obj.msg;
      this.resObj.merDqrCode= obj.merDqrCode;
      this.resObj.refNo= obj.refNo;
      this.resObj.transExpiredTime= obj.transExpiredTime;
      this.resObj.transRef= obj.transRef;
      
      const url: string=this.ics._apiurl + "/operation/saveCBPaytransaction";
      this.http.post(url, JSON.stringify(this.resObj)).subscribe(
        (data:any)=> {
         console.log("Save_____" + data);
        },
        error => {
            console.warn('error ' , error);             
        },
      );
    }
  
}
