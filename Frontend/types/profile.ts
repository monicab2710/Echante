export type Profile = {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  userId: number;
  roleId: number;
};


export type User = {
  sub: string;
  userId: number;
  name: string;
  lastName: string;
  userName: string;
  iat: number;
  exp: number;
  roleId: number;
};

