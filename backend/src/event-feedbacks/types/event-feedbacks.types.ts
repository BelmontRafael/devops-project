export type CreateEventFeedback = {
  name: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  uf: string;
  capacity?: number;
};

export type UpdateEventFeedback = {
  name?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  uf?: string;
  capacity?: number;
};
