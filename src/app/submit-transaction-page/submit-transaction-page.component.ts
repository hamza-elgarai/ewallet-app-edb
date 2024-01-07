import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../_services/api-service.service';

@Component({
  selector: 'app-submit-transaction-page',
  templateUrl: './submit-transaction-page.component.html',
  styleUrls: ['./submit-transaction-page.component.css'],
})
export class SubmitTransactionPageComponent implements OnInit {
  benificiaryExists: string = 'yes';
  disableTextFields: boolean = true;
  disableDropDownChooseBenificiary: boolean = false;

  ClientData: any;
  Beneficiaries: any;

  // * data for the transaction
  montant: number = 0;
  whoPayFees: string = '';
  benefId: number = 0;
  transactionType: string = 'GAB';

  newBenificiary = {
    nom: '',
    prenom: '',
    phoneNumber: '',
  };

  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.apiService.getClientInfo(1).subscribe(
      (response) => {
        this.ClientData = response;
        console.log(this.ClientData.solde);

        console.log('im getting the client data', this.ClientData);
      },
      (error) => {
        console.log('error getting client data', error);
      }
    );

    this.apiService.getBeneficiaries(1).subscribe(
      (response) => {
        console.log('im getting the beneficiaries', response);
        this.Beneficiaries = response;
      },
      (error) => {
        console.log('error getting beneficiaries', error);
      }
    );
  }

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleVisibilityOfTextFields() {
    if (this.benificiaryExists === 'yes') {
      this.disableTextFields = true; // Disable the text field if "Yes" is selected
      this.disableDropDownChooseBenificiary = false;
    } else if (this.benificiaryExists === 'no') {
      this.disableTextFields = false; // Enable the text field if "No" is selected
      this.disableDropDownChooseBenificiary = true;
    }
  }

  // * update benefId when the user selects a beneficiary from the dropdown
  selectBenificiary(benificiary: any) {
    console.log('selected benificiary', benificiary);
    this.benefId = benificiary.id;

    console.log('who ' + this.whoPayFees);
  }

  // * update whoPayFees when the user selects an option from the dropdown
  changeWhoPayFees(event: any) {
    this.whoPayFees = event.target.value;
    console.log('who ' + this.whoPayFees);
  }

  // * create a new benificiary
  addNewBenificiary() {
    console.log('new benificiary', this.newBenificiary);
    this.apiService.createBeneficiary(this.newBenificiary, 1).subscribe(
      (data) => {
        console.log('benficiary Created successfully', data);
        this.Beneficiaries.push(data);
        this.benefId = data.id;
      },
      (error) => {
        console.log('error creating benficiary', error);
      }
    );
  }
}
