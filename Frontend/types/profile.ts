export type Profile = {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  userId: number;
  role: string;
};


export type User = {
  sub: string;
  userId: number;
  name: string;
  lastName: string;
  userName: string;
  role: string;
  iat: number;
  exp: number;
  
};

