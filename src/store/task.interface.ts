export interface TaskType {
  _id?: string; // MongoDB id
  date: string;
  Time: string;
  Description: string;
  User: string;
}

export interface DeleteDialogDataInterface {
  id: string;
  description: string;
  date: string;
}