export interface IProduct {
    name: string;
    price: number;
    id: string;
    numSales: number;
    numViews: number;
    quantity: number;
    available: number;
    category: string;
    brand: string;
    imgArray: Array<any>;
    isDeleted: boolean;
  }