import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BenefPageComponent } from './benef-page/benef-page.component';
import { SubmitTransactionPageComponent } from './submit-transaction-page/submit-transaction-page.component';
import { TransactionPageComponent } from './transactions-page/transaction-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"beneficiaires",component:BenefPageComponent,canActivate: [AuthGuard]},
  {path:"add-transaction",component:SubmitTransactionPageComponent,canActivate: [AuthGuard]},
  {path:"transaction-history",component:TransactionPageComponent,canActivate: [AuthGuard]},
  {path:"login",component:LoginPageComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
