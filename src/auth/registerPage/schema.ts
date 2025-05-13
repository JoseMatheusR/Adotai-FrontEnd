import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().nonempty("Campo obrigatório").min(4, "Nome muito curto"),
    email: z
      .string()
      .nonempty("Campo obrigatório")
      .email("Email inválido")
      .nonempty("Campo obrigatório"),
    birthDate: z.string().nonempty("Campo obrigatório"),
    phone: z
      .string()
      .nonempty("Campo obrigatório")
      .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido"),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 dígitos")
      .nonempty("Campo obrigatório"),
    confirmPassword: z.string().nonempty("Campo obrigatório"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type IRegister = z.infer<typeof RegisterSchema>;
