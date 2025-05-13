import { z } from "zod";

export const LoginSchema = z.object({
  document: z
    .string()
    .nonempty("Campo obrigatório")
    .regex(
      /^(\d{3}\.\d{3}\.\d{3}\-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})$/,
      "CPF ou CNPJ inválido"
    ),
  password: z.string().nonempty("Campo obrigatório"),
});

export type ILogin = z.infer<typeof LoginSchema>;
