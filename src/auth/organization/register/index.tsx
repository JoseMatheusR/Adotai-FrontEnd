import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DefaultLayoutRegisterPage } from "../../../components/DefaultLayoutRegisterPage";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RegisterSchema } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { IRegister } from "./types.s";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useAuthContext } from "../../../contexts/authContext";
import { ErrorMessage } from "../../../types/errorMessage";
import { useState, useEffect } from "react";
import "dayjs/locale/pt-br";
import { orgAuthRoutes } from "../constants/routes";
import { RegisterServices } from "./services/registerService";
import { animalManagmentRouter } from "../../../pages/animalManagement/constants/router";

export const RegisterPage = () => {
  useEffect(() => {
    document.title = "Registro - Adotaí Pets";
  }, []);

  const navigate = useNavigate();
  const { setAuthToken } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: Partial<IRegister>) => {
      const res = await RegisterServices.post(data);
      return res;
    },
    onSuccess: (res) => {
      setAuthToken(res.token);
      console.log(res.token);
      enqueueSnackbar("Conta criada com Sucesso!", { variant: "success" });
      navigate(animalManagmentRouter.root());
    },
    onError: (error: ErrorMessage) => {
      enqueueSnackbar(error.response?.data?.message || "Erro ao criar conta", {
        variant: "error",
      });
    },
  });

  const onSubmit = (data: IRegister) => {
    const { confirmPassword, ...payload } = data;
    mutateAsync(payload);
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <DefaultLayoutRegisterPage type="organization">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Box
          width={"80%"}
          p={2}
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Box textAlign={"center"} width={"100%"}>
            <Box
              component="img"
              src="..\..\public\assets\org_login.png"
              alt="Logo Illustration"
              sx={{
                width: "130px",
                maxWidth: "300px",
                mb: 1,
              }}
            />
            <Box textAlign={"left"} width={"100%"}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    "& > .MuiTextField-root": {
                      paddingBottom: 1,
                    },
                  }}
                >
                  <Typography variant="subtitle2" color="secondary" mb={0.5}>
                    {"Nome:"}
                  </Typography>
                  <TextField
                    {...register("name")}
                    fullWidth={true}
                    size="small"
                    error={!!errors.name}
                    helperText={errors.name?.message || " "}
                    FormHelperTextProps={{
                      sx: {
                        margin: "2px 14px 0",
                        fontSize: "0.5rem",
                      },
                    }}
                  />
                  <Typography variant="subtitle2" color="secondary" mb={0.5}>
                    {"Email:"}
                  </Typography>
                  <TextField
                    {...register("email")}
                    fullWidth={true}
                    size="small"
                    error={!!errors.email}
                    helperText={errors.email?.message || " "}
                    FormHelperTextProps={{
                      sx: {
                        margin: "2px 14px 0",
                        fontSize: "0.5rem",
                      },
                    }}
                  />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    gap={2}
                    sx={{
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      width={{ xs: "100%", sm: "50%" }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="secondary"
                        mb={0.5}
                      >
                        {"CPF ou CNPJ"}
                      </Typography>
                      <TextField
                        {...register("document")}
                        fullWidth
                        size="small"
                        error={!!errors.document}
                        helperText={errors.document?.message || " "}
                        FormHelperTextProps={{
                          sx: {
                            margin: "2px 14px 0",
                            fontSize: "0.5rem",
                          },
                        }}
                      />
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      width={{ xs: "100%", sm: "50%" }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="secondary"
                        mb={0.5}
                      >
                        {"Telefone:"}
                      </Typography>
                      <TextField
                        {...register("contactPhone")}
                        fullWidth
                        size="small"
                        error={!!errors.contactPhone}
                        helperText={errors.contactPhone?.message || " "}
                        FormHelperTextProps={{
                          sx: {
                            margin: "2px 14px 0",
                            fontSize: "0.5rem",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    gap={2}
                    sx={{
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      width={{ xs: "100%", sm: "50%" }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="secondary"
                        mb={0.5}
                      >
                        {"Senha:"}
                      </Typography>
                      <TextField
                        {...register("password")}
                        fullWidth
                        size="small"
                        type={showPassword ? "text" : "password"}
                        error={!!errors.password}
                        helperText={errors.password?.message || " "}
                        FormHelperTextProps={{
                          sx: {
                            margin: "2px 14px 0",
                            fontSize: "0.5rem",
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {" "}
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          ),
                        }}
                      />
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      width={{ xs: "100%", sm: "50%" }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="secondary"
                        mb={0.5}
                      >
                        {"Confirme sua senha:"}
                      </Typography>
                      <TextField
                        {...register("confirmPassword")}
                        fullWidth
                        size="small"
                        type={showConfirmPassword ? "text" : "password"}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message || " "}
                        FormHelperTextProps={{
                          sx: {
                            margin: "2px 14px 0",
                            fontSize: "0.5rem",
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={handleToggleConfirmPasswordVisibility}
                              edge="end"
                            >
                              {" "}
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          ),
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    mt={1}
                    paddingTop={"15px"}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        width: "30%",
                      }}
                      type="submit"
                    >
                      {"Cadastrar-se"}
                    </Button>
                  </Box>
                </Box>
              </form>

              <Typography
                sx={{
                  textAlign: "center",
                  marginTop: "15px",
                }}
              >
                Já tem uma conta?{" "}
                <Link
                  to={orgAuthRoutes.login()}
                  style={{
                    color: "#E67E22",
                    textDecoration: "underline",
                  }}
                >
                  Entre aqui.
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </DefaultLayoutRegisterPage>
  );
};
