import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-cb-pay',
  templateUrl: './cb-pay.component.html',
  styleUrls: ['./cb-pay.component.styl']
})
export class CBPayComponent implements OnInit {

  constructor(private http : HttpClient, 
     private location : Location,
     private router : Router) {     
  }

  ngOnInit(): void {
  }

   generate(){
    this.router.navigate(['qrcode']);
    }

    cancel(){
      this.router.navigate(['']);
    }
  }
 


 


