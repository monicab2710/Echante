export interface ICategoryRes {
  results: any;
  code: number | string;
  message: string;
  status: string;
}

export interface ICategory {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string;
}
