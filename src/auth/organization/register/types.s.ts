export interface IRegister {
  name: string;
  document: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactPhone: string;
}

export type RegisterResponse = {
  token: string;
};
