import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().nonempty("Campo obrigatório"),
  password: z.string().nonempty("Campo obrigatório"),
});

export type Ilogin = z.infer<typeof LoginSchema>;
