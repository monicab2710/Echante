export interface IProductRes {
  code: number | string;
  message: string;
  status: string;
  
  data: {
    [key: string]: any;
    title: string;
    price: number;
    description: string;
    results: IProduct[];
  };
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryId: number;
  pageCount: number;
  resourceURI: string;
  category: Category;
 
}

export interface TextObject {
  type: string;
  language: string;
  text: string;
}



export interface Price {
  type: string;
  price: number;
}


export interface Item {
  title: string;
  resourceURI: string;
  name: string;
  role: string;
}

export interface Category {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  items: Item[];
}







