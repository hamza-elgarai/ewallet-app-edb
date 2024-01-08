import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EdbHeaderComponent } from './edb-header/edb-header.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { BenefPageComponent } from './benef-page/benef-page.component';
import { SubmitTransactionPageComponent } from './submit-transaction-page/submit-transaction-page.component';

import { TransactionPageComponent } from './transactions-page/transaction-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ButtonModule } from 'primeng/button';
// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    EdbHeaderComponent,
    HomePageComponent,

    BenefPageComponent,
    SubmitTransactionPageComponent,

    TransactionPageComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // BrowserAnimationsModule,
    // ButtonModule,
    // ToastModule,
    ToastNoAnimationModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    DatePipe  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
