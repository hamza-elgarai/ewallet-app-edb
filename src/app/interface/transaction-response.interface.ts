export default interface TransactionResponse {
  message: string;
  transactionId: string;
  transaction: {
    id: number;
    transactionReference: string;
    status: string;
    paymentType: string;
    amount: number;
    issueDate: string;
    expiryDate: string;
    donorId: number;
    beneficiaryId: number;
    agentId: number;
    fraisTransfert: number;
    whoPayFees: string;
    clientResponse: {
      id: number;
      title: string;
      prenom: string;
      typePieceIdentite: string;
      paysEmissionPieceIdentite: string;
      numeroPieceIdentite: string;
      expirationPieceIdentite: string;
      dateNaissance: string;
      profession: string;
      paysNationalite: string;
      paysAdresse: string;
      adresseLegale: string;
      ville: string;
      gsm: string;
      email: string;
      agentResponse: {
        id: number;
        nom: string;
        prenom: string;
        email: string;
        phone: string;
        solde: number;
      };
      solde: null;
      beneficiaires: null;
    };
    beneficiaryResponse: {
      id: number;
      nom: string;
      prenom: string;
      email: string;
      phone: string;
      isBlockListed: boolean;
      walletCode: string;
      walletClient: null;
    };
    notificationFees: boolean;
    refundReason: null;
  };
  generatedOTP: null;
}
