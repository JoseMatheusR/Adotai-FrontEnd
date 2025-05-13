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
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";

export interface Header {
  children?: ReactNode;
  body?: ReactNode;
}

export const Header = ({ children }: Header) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthToken } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const handleLogout = () => {
    setAuthToken(null);
    Cookies.remove("token");
    enqueueSnackbar("Logout realizado com sucesso!", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
    });
    navigate("/");
    handleUserMenuClose();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
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
      backgroundColor: "#ffd7d5",
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

  const menuItems = [
    { title: "Animal do Mês", href: "#" },
    { title: "Parceiros", href: "#" },
    { title: "Colabore", href: "#" },
    { title: "Sobre nós", href: "#" },
  ];

  const isHomePage = location.pathname === "/home";

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={{ xs: 2, sm: 3, md: 5 }}
        py={1}
        paddingTop={2}
        position="relative"
        sx={{
          backgroundColor: "#F7F3EB",
        }}
      >
        <Link onClick={() => navigate("/home")}>
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

        {isHomePage && (
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
        )}

        <Box display={{ xs: "none", md: "flex" }} sx={{ flexGrow: 1 }} />

        <Box display={{ xs: "none", md: "flex" }}>
          <IconButton
            onClick={handleUserMenuOpen}
            sx={{
              color: "#54270C",
              border: "1px solid #54270C",
              transform: "scale(0.9)",
            }}
          >
            <PersonIcon />
          </IconButton>
          <Menu
            anchorEl={userMenuAnchorEl}
            open={Boolean(userMenuAnchorEl)}
            onClose={handleUserMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={menuStyle}
          >
            <MenuItem
              onClick={handleLogout}
              sx={{
                ...menuItemStyle,
                "&:hover": {
                  backgroundColor: "#ffd7d5",
                },
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>

        <Box display={{ xs: "block", md: "none" }}>
          <IconButton onClick={toggleMobileMenu} sx={{ color: "#e67e22" }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

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
          <ListItem sx={{ justifyContent: "center", mb: 2 }}>
            <IconButton
              disabled
              sx={{
                color: "#54270C",
                border: "1px solid #54270C",
                transform: "scale(1.1)",
              }}
            >
              <PersonIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </ListItem>

          {isHomePage ? (
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
            </List>
          ) : (
            <ListItem
              component={Link}
              onClick={() => {
                navigate("/home");
                toggleMobileMenu();
              }}
              sx={{
                color: "black",
                textDecoration: "none",
                fontWeight: "bold",
                py: 1.5,
                "&:hover": {
                  color: "#e67e22",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            >
              Home
            </ListItem>
          )}

          <ListItem sx={{ padding: "16px 0 0 0" }}>
            <Button
              fullWidth
              onClick={handleLogout}
              sx={{
                ...mobileButtonStyle,
                color: "white",
                backgroundColor: "#FF746C",
                border: "3px solid #FF746C",
                fontWeight: "bold",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#FF645C",
                  border: "3px solid #FF645C",
                },
              }}
            >
              Logout
            </Button>
          </ListItem>
        </List>
      </Drawer>

      {children}
    </Box>
  );
};
