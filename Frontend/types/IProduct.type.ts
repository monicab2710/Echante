export interface IProductRes {
  results: any;
  code: number | string;
  message: string;
  status: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryId: number;
}








