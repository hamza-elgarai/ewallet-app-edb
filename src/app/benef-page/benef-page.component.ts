import { Component, OnInit } from '@angular/core';
// import benefData from '../beneficiaires';
import { ApiServiceService } from '../_services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../_services/client/client.service';
import { TokenStorageService } from '../_services/auth/token-storage.service';

@Component({
  selector: 'app-benef-page',
  templateUrl: './benef-page.component.html',
  styleUrls: ['./benef-page.component.css'],
})
export class BenefPageComponent implements OnInit {
  benefData: any;
  beneficiaires: any[] = [];
  renderedBenefs: any[] = [];

  authenticationClientId: number = 1;
  constructor(
    private apiService: ApiServiceService,
    private toastr: ToastrService,
    private clientService:ClientService,
    private tokenService:TokenStorageService
  ) {}
  ngOnInit(): void {

    this.clientService.getClientByEmail(this.tokenService.getUserEmail()).subscribe(
      (response) => {
        console.log('im getting client data', response);
        this.authenticationClientId = response['id'];
      },
      (error) => {
        console.log('error getting client data', error);
      }
    );


    this.apiService.getBeneficiaries(this.authenticationClientId).subscribe(
      (response) => {
        console.log('im getting the beneficiaries', response);
        this.beneficiaires = response.map((b: any) => {
          b.selected = false;
          return b;
        });
        this.renderedBenefs = this.beneficiaires;
      },
      (error) => {
        console.log('error getting beneficiaries', error);
      }
    );
  }

  searchTerm = '';

  selectedBenefs: any[] = [];
  isSelectAllChecked = false;
  handleSearch() {
    this.beneficiaires = this.beneficiaires.map((c) => {
      c.selected = false;
      return c;
    });
    this.renderedBenefs = this.beneficiaires.filter((c) => {
      let valuesString = JSON.stringify(Object.values(c));
      return valuesString.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
  handleClickOnRadio(event: Event) {
    event.stopPropagation();
  }
  selectAll(event: Event) {
    if (this.isSelectAllChecked) {
      this.beneficiaires = this.beneficiaires.map((c) => {
        c.selected = false;
        return c;
      });
    } else {
      this.beneficiaires = this.beneficiaires.map((c) => {
        c.selected = true;
        return c;
      });
    }
    this.isSelectAllChecked = !this.isSelectAllChecked;
  }
  handleSelectRow() {
    console.log(this.beneficiaires.find((c) => !c.selected) ? false : true);
    this.isSelectAllChecked = this.beneficiaires.find((c) => !c.selected)
      ? false
      : true;
  }

  labels: any = {
    nom: 'Nom',
    prenom: 'Prénom',
    email: 'E-mail',
    phone: 'Télephone',
  };

  beneficiaire: any = {
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    isBlockListed: false,
  };
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  get isTableEmpty() {
    return !(this.renderedBenefs && this.renderedBenefs.length > 0);
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

  editBenef: any = {
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    isBlockListed: false,
  };
  editModalClass = 'modal-bg';
  openEditModal(id: any) {
    console.log('openEditModal : ' + id);
    this.editBenef = this.beneficiaires.find((b) => b.id === id);
    this.editModalClass = 'modal-bg modal-opened';
  }
  closeEditModal() {
    this.editModalClass = 'modal-bg';
  }

  // * create a new benificiary
  addNewBenificiary() {
    console.log('new benificiary', this.beneficiaire);
    this.apiService
      .createBeneficiary(this.beneficiaire, this.authenticationClientId)
      .subscribe(
        (data) => {
          console.log('benficiary Created successfully', data);
          this.beneficiaires.push(data);
          // this.benefId = data.id;
          this.toast('benficiary Created successfully', 'success');
        },
        (error) => {
          console.log('error creating benficiary', error);
          this.toast('error creating benficiary', 'error');
        }
      );
  }

  // * update benificiary
  updateBenificiary() {
    console.log('update benificiary', this.editBenef);
    this.apiService
      .createBeneficiary(this.editBenef, this.authenticationClientId)
      .subscribe(
        (data) => {
          console.log('benficiary updated successfully', data);
          this.toast('benficiary updated successfully', 'success');
        },
        (error) => {
          console.log('error updating benficiary', error);
          this.toast('error updating benficiary', 'error');
        }
      );
  }

  toast(message: string, state: string) {
    if (state === 'success') {
      this.toastr.success(message, 'Success', {
        timeOut: 2000,
        progressBar: true,
      });
    } else if (state === 'error') {
      this.toastr.error(message, 'Error', {
        timeOut: 2000,
        progressBar: true,
      });
    }
  }
}
