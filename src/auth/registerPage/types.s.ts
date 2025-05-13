export interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  phone: string;
}

export type RegisterResponse = {
  token: string;
};
