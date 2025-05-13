import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().nonempty("Campo obrigatório").min(4, "Nome muito curto"),
  document: z
    .string()
    .nonempty("Campo obrigatório")
    .regex(
      /^(\d{3}\.\d{3}\.\d{3}\-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})$/,
      "CPF ou CNPJ inválido"
    ),
  email: z.string().nonempty("Campo obrigatório").email("Email inválido"),
  contactPhone: z
    .string()
    .nonempty("Campo obrigatório")
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos")
    .nonempty("Campo obrigatório"),
  confirmPassword: z.string().nonempty("Campo obrigatório"),
});

export type IRegister = z.infer<typeof RegisterSchema>;
