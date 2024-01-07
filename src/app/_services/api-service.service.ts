import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private baseUrl = 'http://localhost:8083';
  constructor(private http: HttpClient) {}

  getBeneficiaries(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/USER-SERVICE/api/client/beneficiaires/${id}`
    );
  }

  createBeneficiary(newBenificiary: any, clientId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/USER-SERVICE/api/client/beneficiaire/${clientId}`,
      newBenificiary
    );
  }

  getClientInfo(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/USER-SERVICE/api/client/get-client-data/${id}`
    );
  }

  // submitTransaction(montant: number, whoPayFees: string, benefId: number, transactionType: string): Observable<any> {

  // }
}
