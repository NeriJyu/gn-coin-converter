export interface I_User {
  id: number;
  email: string;
  password: string;
  name?: string;
}

export interface I_CreateUser {
  email: string;
  password: string;
  name?: string;
}
