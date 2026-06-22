export type CreateDonation = {
    userId: string;
    amount: number;
    paymentMethod: PaymentMethods;
    status: Status;
}

export type UpdateDonation = {
    userId?: string;
    amount?: number;
    paymentMethod?: PaymentMethods;
    status?: Status;
}

export enum PaymentMethods {
    CARTAO_DE_CREDITO = "Cartão de Crédito",
    CARTAO_DE_DEBITO = "Cartão de Débito",
    PIX = "PIX",
}

export enum Status {
    APROVADO = "Aprovado",
    NEGADO = "Negado",
    EM_PROCESSAMENTO = "Em Processamento",
}