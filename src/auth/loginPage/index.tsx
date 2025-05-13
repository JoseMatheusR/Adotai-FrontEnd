import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { DefaultLayoutLoginPage } from "../../components/DefaultLayoutLoginPage";
import { ILogin } from "./types.s";
import { ErrorMessage } from "../../types/errorMessage";
import { homeRouters } from "../../pages/home/constants/routes";
import { enqueueSnackbar } from "notistack";
import { LoginServices } from "./services/loginService";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./schema";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerRoutes } from "../registerPage/constants/routes";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: ILogin) => {
      const res = await LoginServices.post(data);
      return res;
    },
    onSuccess: (res) => {
      setAuthToken(res.token);
      enqueueSnackbar("Login Realizado com Sucesso!", { variant: "success" });
      navigate(homeRouters.root());
    },
    onError: (error: ErrorMessage) => {
      enqueueSnackbar(error.response?.data?.message || "Erro ao criar conta", {
        variant: "error",
      });
    },
  });

  const onSubmit = (data: ILogin) => {
    mutateAsync(data);
  };

  return (
    <DefaultLayoutLoginPage>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Box
          borderRadius="16px"
          width="450px"
          padding={2}
          paddingLeft={6}
          paddingRight={6}
          display="flex"
          flexDirection="column"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          gap={2}
          sx={{
            background: "#F9EAD1",
            border: "4px solid #EFC7A9",
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
        >
          <Box>
            <Box
              component="img"
              src="../src/assets/dog_cat_hug.png"
              alt="Logo Illustration"
              sx={{
                width: "175px",
                maxWidth: "175px",
              }}
            />
          </Box>

          <Box textAlign="left" width="100%">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="subtitle2" color="secondary" mb={0.5}>
                {"E-mail:"}
              </Typography>

              <TextField
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : " "}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    backgroundColor: "white",
                    borderRadius: "12px",
                    border: "2px solid #EFC7A9",
                    padding: "0 8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "9px",
                  },
                }}
                {...register("email", { required: true })}
              />

              <Typography variant="subtitle2" color="secondary" mt={2} mb={0.5}>
                {"Senha:"}
              </Typography>

              <TextField
                error={!!errors.password}
                type="password"
                helperText={errors.password ? errors.password.message : " "}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    backgroundColor: "white",
                    borderRadius: "12px",
                    border: "2px solid #EFC7A9",
                    padding: "0 8px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "9px",
                  },
                }}
                {...register("password", { required: true })}
              />

              <Box mt={4} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  sx={{
                    width: "50%",
                    minWidth: "40%",
                    borderRadius: "8px",
                    backgroundColor: "#E67E22",
                  }}
                  type="submit"
                >
                  {"Entrar"}
                </Button>
              </Box>
            </form>
          </Box>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 1,
            }}
          >
            Não tem uma conta?{" "}
            <Link
              to={registerRoutes.root()}
              style={{
                color: "#E67E22",
                textDecoration: "underline",
              }}
            >
              Cadastre-se agora!
            </Link>
          </Typography>
        </Box>
      </Box>
    </DefaultLayoutLoginPage>
  );
};
