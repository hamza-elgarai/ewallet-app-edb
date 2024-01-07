import { Component } from '@angular/core';
import transactionData from './transactions';
import TransactionResponse from '../interface/transaction-response.interface'

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent {

  transactions:any[] = transactionData.map((t:any)=>{let t1:any = {...t};t1.selected = false;return t1})
  renderedTransactions = this.transactions
  searchTerm=""
  
  handleSearch(){
    this.transactions = this.transactions
    this.renderedTransactions = this.transactions.filter((c)=>{
      let valuesString = JSON.stringify(Object.values(c))
      return (valuesString.toLowerCase().includes(this.searchTerm.toLowerCase()))
    })
  }

  issuerLabels:any = {
      "nom": "Nom",
      "prenom": "Prénom",
      "email": "E-mail",
      "phone": "Télephone",
  }
  benefLabels:any = {
      "nom": "Nom",
      "prenom": "Prénom",
      "email": "E-mail",
      "phone": "Télephone",
  }
  transactionLabels:any = {
      "paymentType": "Type de paiement",
      "issueDate": "Date de paiement",
      "amount": "Montant",
      "fraisTransfert": "Frais de transfert",
  }
  selectedTransaction:any = {}

getObjectKeys(obj: any): string[] {
  return Object.keys(obj);
}
get isTableEmpty(){
  return !(this.renderedTransactions && this.renderedTransactions.length >0)
}

modalClass="modal-bg"
openModal(event:Event){
  this.modalClass = "modal-bg modal-opened"
}
closeModal(event:Event){
  this.modalClass = "modal-bg"
}
stopPropagation(event:Event){
  event.stopPropagation()
}

editModalClass = "modal-bg"
openEditModal(id:any){
  console.log("openEditModal : "+id);
  this.selectedTransaction = transactionData.find((t)=>t.transactionId===id)
  this.editModalClass = "modal-bg modal-opened"
}
closeEditModal(){
  this.selectedTransaction = {}
  this.editModalClass = "modal-bg"
}
}