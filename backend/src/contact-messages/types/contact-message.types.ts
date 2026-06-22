export type CreateContactMessage = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export type UpdateContactMessage = {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
};