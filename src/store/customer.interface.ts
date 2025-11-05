export interface customerAllDataInterface {
    Campaign: string;
    CustomerType:string;
    customerName:string;
    CustomerSubtype:string;
    ContactNumber:string;
    City:string;
    Location:string;
    Area:string;
    Address:string;
    Email:string;
    Facilities:string;
    ReferenceId:string;
    CustomerId:string;
    CustomerDate:string;
    CustomerYear:string;
    Others:string;
    Description:string;
    Video:string;
    GoogleMap:string;
    isFavourite:boolean;
    Verified:string;
    CustomerImage:File[];
    SitePlan:File
}

export interface customerGetDataInterface {
    _id: string;
    Campaign: string;
    Type: string;
    SubType: string;
    Name: string;
    Email: string;
    City: string;
    Location: string;
    isFavourite:boolean;
    ContactNumber: string;
    AssignTo:string;
    Date:string;
}

export interface CustomerAdvInterface {
    _id: string[];
    StatusAssign: string[];
    Campaign: string[];
    CustomerType: string[];
    CustomerSubtype:string[];
    City: string[];
    Location: string[];
    User: string[];
    StartDate:string;
    EndDate:string;
    Limit: string[];
  }

export interface DeleteDialogDataInterface {
    id: string;
    customerName: string;
    ContactNumber: string;
  }