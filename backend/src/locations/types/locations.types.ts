export type CreateLocation = {
  name: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  uf: string;
  capacity?: number;
};

export type UpdateLocation = {
  name?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  uf?: string;
  capacity?: number;
};
