import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { SuccessPageComponent } from './success-page/success-page.component';
import { FailPageComponent } from './fail-page/fail-page.component';
import { HeaderComponent } from './header/header.component';
import { CBPayComponent } from './cb-pay/cb-pay.component';
import { QrPaymentComponent } from './qr-payment/qr-payment.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CBResultComponent } from './cbresult/cbresult.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'success', component: SuccessPageComponent },
  { path: 'fail', component: FailPageComponent },
  { path: 'cbPay', component: CBPayComponent },
  { path: 'qrcode', component: QrPaymentComponent },
  { path: 'cbresult', component: CBResultComponent }

];

@NgModule({
  declarations: [
    CBResultComponent,
    AppComponent,
    HomeComponent,
    LoginComponent,
    PaymentComponent,
    SuccessPageComponent,
    FailPageComponent,
    HeaderComponent,
    CBPayComponent, 
    QrPaymentComponent, CBResultComponent,
  ],
  
  imports: [
    NgxQRCodeModule,
    HttpClientModule,    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes,{useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
