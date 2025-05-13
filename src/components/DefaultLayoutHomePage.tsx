import {
  Box,
  Button,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  Menu,
  MenuItem,
} from "@mui/material";
import { ReactNode, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { userAuthRoutes } from "../auth/user/constants/routes";
import { homeRouters } from "../pages/home/constants/routes";
import { orgAuthRoutes } from "../auth/organization/constants/routes";

export interface IDefaultLayoutHomePage {
  children?: ReactNode;
  body?: ReactNode;
}

export const DefaultLayoutHomePage = ({ children }: IDefaultLayoutHomePage) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginAnchorEl, setLoginAnchorEl] = useState<HTMLElement | null>(null);
  const [registerAnchorEl, setRegisterAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoginAnchorEl(event.currentTarget);
  };

  const handleRegisterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRegisterAnchorEl(event.currentTarget);
  };

  const handleLoginClose = () => {
    setLoginAnchorEl(null);
  };

  const handleRegisterClose = () => {
    setRegisterAnchorEl(null);
  };

  const handleUserLogin = () => {
    window.location.href = userAuthRoutes.login();
    handleLoginClose();
  };

  const handleOrgLogin = () => {
    window.location.href = orgAuthRoutes.login();
    handleLoginClose();
  };

  const handleUserRegister = () => {
    window.location.href = userAuthRoutes.register();
    handleRegisterClose();
  };

  const handleOrgRegister = () => {
    window.location.href = orgAuthRoutes.register();
    handleRegisterClose();
  };

  const menuItems = [
    { title: "Animal do Mês", href: "#" },
    { title: "Parceiros", href: "#" },
    { title: "Colabore", href: "#" },
    { title: "Sobre nós", href: "#" },
  ];

  const buttonBaseStyle = {
    padding: "4px 12px",
    height: "32px",
    fontSize: "12px",
    textTransform: "none",
    transition: "all 0.6s ease-in-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const loginButtonStyle = {
    ...buttonBaseStyle,
    width: "85px",
    color: "#e67e22",
    backgroundColor: "transparent",
    border: "3px solid #e67e22",
    "&:hover": {
      backgroundColor: "#f39c44",
      color: "white",
      border: "3px solid #f39c44",
    },
  };

  const registerButtonStyle = {
    ...buttonBaseStyle,
    width: "95px",
    color: "white",
    backgroundColor: "#e67e22",
    border: "3px solid #e67e22",
    "&:hover": {
      backgroundColor: "#cf711f",
      border: "3px solid #cf711f",
    },
  };

  const mobileButtonStyle = {
    textTransform: "none",
    padding: "8px",
    "&:hover": {
      backgroundColor: "#f39c44",
      color: "white",
      border: "3px solid #f39c44",
    },
  };

  const menuStyle = {
    "& .MuiPaper-root": {
      minWidth: "120px",
      marginTop: "2px",
      borderRadius: "10px",
      boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
      padding: "10px",
    },
    "& .MuiList-root": {
      padding: "0px",
    },
  };

  const menuItemStyle = {
    fontSize: "12px",
    padding: "2px 10px",
    minHeight: "28px",
    "&:hover": {
      backgroundColor: "rgba(230, 126, 34, 0.08)",
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F7F3EB",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={{ xs: 2, sm: 3, md: 5 }}
        py={1}
        paddingTop={2}
        position="relative"
      >
        {/* Logo */}
        <Link top={homeRouters.root}>
          <Box
            component="img"
            src="../../public/assets/image_logo_without_text.png"
            alt="Logo Illustration"
            sx={{
              width: "40px",
              height: "auto",
              zIndex: 1,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <Box
          display={{ xs: "none", md: "flex" }}
          gap={5}
          alignItems="center"
          sx={{
            position: { md: "absolute" },
            left: { md: "50%" },
            transform: { md: "translateX(-50%)" },
            "& > a": {
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                color: "#e67e22",
                textDecoration: "none",
              },
            },
          }}
        >
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              {item.title}
            </Link>
          ))}
        </Box>

        {/* Mobile Menu Button - Only on mobile */}
        <Box display={{ xs: "block", md: "none" }}>
          <IconButton onClick={toggleMobileMenu} sx={{ color: "#e67e22" }}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Auth Buttons - Only on desktop */}
        <Box display={{ xs: "none", md: "flex" }} gap={4}>
          <Button
            sx={loginButtonStyle}
            onClick={handleLoginClick}
            endIcon={<ArrowDropDownIcon />}
          >
            Login
          </Button>
          <Menu
            anchorEl={loginAnchorEl}
            open={Boolean(loginAnchorEl)}
            onClose={handleLoginClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={menuStyle}
          >
            <MenuItem onClick={handleUserLogin} sx={menuItemStyle}>
              Usuário
            </MenuItem>
            <MenuItem onClick={handleOrgLogin} sx={menuItemStyle}>
              Organização
            </MenuItem>
          </Menu>

          <Button
            sx={registerButtonStyle}
            onClick={handleRegisterClick}
            endIcon={<ArrowDropDownIcon />}
          >
            Registro
          </Button>
          <Menu
            anchorEl={registerAnchorEl}
            open={Boolean(registerAnchorEl)}
            onClose={handleRegisterClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={menuStyle}
          >
            <MenuItem onClick={handleUserRegister} sx={menuItemStyle}>
              Usuário
            </MenuItem>
            <MenuItem onClick={handleOrgRegister} sx={menuItemStyle}>
              Organização
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: "70%",
            maxWidth: "300px",
            backgroundColor: "#F7F3EB",
            padding: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={toggleMobileMenu}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              component={Link}
              href={item.href}
              sx={{
                color: "black",
                textDecoration: "none",
                fontWeight: "bold",
                py: 1.5,
                "&:hover": {
                  color: "#e67e22",
                  textDecoration: "none",
                },
              }}
            >
              {item.title}
            </ListItem>
          ))}

          {/* Mobile Login Options */}
          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Box sx={{ mb: 1, fontWeight: "bold", fontSize: "14px" }}>
                Login como:
              </Box>
              <Button
                fullWidth
                sx={{
                  ...mobileButtonStyle,
                  color: "#e67e22",
                  backgroundColor: "transparent",
                  border: "3px solid #e67e22",
                  mb: 1,
                }}
                onClick={() => (window.location.href = userAuthRoutes.login())}
              >
                Usuário
              </Button>
              <Button
                fullWidth
                sx={{
                  ...mobileButtonStyle,
                  color: "#e67e22",
                  backgroundColor: "transparent",
                  border: "3px solid #e67e22",
                }}
                onClick={() => (window.location.href = orgAuthRoutes.login())}
              >
                Organização
              </Button>
            </Box>

            {/* Mobile Register Options */}
            <Box>
              <Box sx={{ mb: 1, fontWeight: "bold", fontSize: "14px" }}>
                Registrar como:
              </Box>
              <Button
                fullWidth
                sx={{
                  ...mobileButtonStyle,
                  color: "white",
                  backgroundColor: "#e67e22",
                  border: "3px solid #e67e22",
                  mb: 1,
                  "&:hover": {
                    backgroundColor: "#cf711f",
                    border: "3px solid #cf711f",
                  },
                }}
                onClick={() =>
                  (window.location.href = userAuthRoutes.register())
                }
              >
                Usuário
              </Button>
              <Button
                fullWidth
                sx={{
                  ...mobileButtonStyle,
                  color: "white",
                  backgroundColor: "#e67e22",
                  border: "3px solid #e67e22",
                  "&:hover": {
                    backgroundColor: "#cf711f",
                    border: "3px solid #cf711f",
                  },
                }}
                onClick={() =>
                  (window.location.href = orgAuthRoutes.register())
                }
              >
                Organização
              </Button>
            </Box>
          </Box>
        </List>
      </Drawer>

      {children}
    </Box>
  );
};
