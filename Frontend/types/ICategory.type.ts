export interface ICategoryResponse {
  code: number;
  status: string;
}

export interface ICategory {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string;
}
