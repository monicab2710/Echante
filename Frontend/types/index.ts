export type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryId: number;
};

export type ProductsAPIResponse = Product[];

export type categories = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

