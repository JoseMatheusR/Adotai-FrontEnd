export interface ILogin {
  document: string;
  password: string;
}

export type LoginResponse = {
  token: string;
};
