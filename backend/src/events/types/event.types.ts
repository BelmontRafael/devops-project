export type CreateEvent = {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createdBy: string;
};

export type UpdateEvent = {
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  createdBy?: string;
};
