import { Component } from '@angular/core';

import TransactionResponse from '../interface/transaction-response.interface';
import { ApiServiceService } from '../_services/api-service.service';
import { ClientService } from '../_services/client/client.service';
import { TokenStorageService } from '../_services/auth/token-storage.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css'],
})
export class TransactionPageComponent {
  constructor(private apiService: ApiServiceService,private clientService:ClientService,private tokenService:TokenStorageService) {}
  transactions: any[] = [];
  ngOnInit() {
    console.log(this.tokenService.getUserEmail());
    this.clientService.getClientByEmail(this.tokenService.getUserEmail()).subscribe((response:any)=>{
      
      console.log(response.id);
      this.apiService.getTransactions(response.id).subscribe(
        (transactionsData) => {
          console.log(transactionsData);
          this.transactions = transactionsData.map((t: any) => {
            let t1: any = { ...t };
            t1.selected = false;
            return t1;
          });
          this.renderedTransactions = this.transactions;
          console.log('transactions', this.transactions);
        },
        (error) => {
          console.log('error getting transactions', error);
        }
      );
    })
  }

  renderedTransactions = this.transactions;
  searchTerm = '';

  handleSearch() {
    this.transactions = this.transactions;
    this.renderedTransactions = this.transactions.filter((c) => {
      let valuesString = JSON.stringify(Object.values(c));
      return valuesString.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  issuerLabels: any = {
    nom: 'Nom',
    prenom: 'Prénom',
    email: 'E-mail',
    phone: 'Télephone',
  };
  benefLabels: any = {
    nom: 'Nom',
    prenom: 'Prénom',
    email: 'E-mail',
    phone: 'Télephone',
  };
  transactionLabels: any = {
    paymentType: 'Type de paiement',
    issueDate: 'Date de paiement',
    amount: 'Montant',
    fraisTransfert: 'Frais de transfert',
  };
  selectedTransaction: any = {};

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  get isTableEmpty() {
    return !(this.renderedTransactions && this.renderedTransactions.length > 0);
  }

  modalClass = 'modal-bg';
  openModal(event: Event) {
    this.modalClass = 'modal-bg modal-opened';
  }
  closeModal(event: Event) {
    this.modalClass = 'modal-bg';
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  editModalClass = 'modal-bg';
  openEditModal(id: any) {
    console.log('openEditModal : ' + id);
    this.selectedTransaction = this.transactions.find(
      (t) => t.transactionId === id
    );
    this.editModalClass = 'modal-bg modal-opened';
  }
  closeEditModal() {
    this.selectedTransaction = {};
    this.editModalClass = 'modal-bg';
  }
}
