import { useMediaQuery, useTheme } from "@mui/material";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SettingsContextProps {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
}

export const SettingsContext = createContext({} as SettingsContextProps);

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const values = {
    openDrawer,
    setOpenDrawer,
    isMobile,
  };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
