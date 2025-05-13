import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ButtonGroup,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  Divider,
  Paper,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import AnimalTable from "./components/animalTable";
import { Header } from "../../components/Header";
import AnimalModal from "./components/animalModal";
import { AnimalModalInterface } from "./constants/animalModelInterface";
import { useSnackbar } from "notistack";
import { AnimalCreateService } from "./services/animalCreateService";
import { useAuthContext } from "../../contexts/authContext";
import { AnimalListService } from "./services/animalListService";
import { Animal } from "./constants/animalInterface";

type FilterTypes = "all" | "adopted" | "available" | "unavailable";

export const AnimalManagementPage: React.FC = () => {
  const { authToken } = useAuthContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const { enqueueSnackbar } = useSnackbar();

  const filterButtons = [
    { value: "all", label: "Todos" },
    { value: "adopted", label: "Adotados" },
    { value: "available", label: "Para Adoção" },
    { value: "unavailable", label: "Indisponíveis" },
  ];

  const [activeFilter, setActiveFilter] = useState<FilterTypes>("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [advancedFilter, setAdvancedFilter] = useState<string>("name");
  const [searchParams, setSearchParams] = useState({
    name: "",
    type: "",
    age: "",
    status: "",
  });

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        if (authToken) {
          const filteredParams = Object.fromEntries(
            Object.entries(searchParams).filter(
              ([_, value]) => value !== undefined && value !== ""
            )
          );

          console.log("Fetching animals with params:", filteredParams);
          const fetchedAnimals = await AnimalListService.getAll(
            authToken,
            filteredParams
          );
          setAnimals(fetchedAnimals);
        }
      } catch (error) {
        console.error("Error fetching animals:", error);
        enqueueSnackbar("Erro ao carregar lista de animais", {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchAnimals();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [authToken, searchParams]);

  const handleOpenCreateModal = (): void => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = (): void => {
    setIsCreateModalOpen(false);
  };

  const handleSaveCreate = async (
    newAnimal: AnimalModalInterface
  ): Promise<void> => {
    try {
      await AnimalCreateService.create(
        {
          name: newAnimal.name,
          age: newAnimal.age,
          type: newAnimal.type,
          breed: newAnimal.breed,
          status: "unavailable",
          createdAt: new Date().toISOString().split("T")[0],
          edited: null,
        },
        authToken || ""
      );

      enqueueSnackbar("Animal cadastrado com sucesso!", { variant: "success" });
      handleCloseCreateModal();

      setSearchParams((prevParams) => ({ ...prevParams }));
    } catch (error) {
      console.error("Error creating animal:", error);
      enqueueSnackbar("Erro ao cadastrar animal", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
      });
    }
  };

  const toggleFilterDrawer = (): void => {
    setIsFilterDrawerOpen(!isFilterDrawerOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => ({
      ...prev,
      [advancedFilter]: event.target.value,
    }));
  };

  const handleFilterChange = (newFilter: FilterTypes) => {
    setActiveFilter(newFilter);

    if (newFilter === "all") {
      setSearchParams((prev) => ({
        ...prev,
        status: "",
      }));
    } else if (newFilter === "adopted") {
      setSearchParams((prev) => ({
        ...prev,
        status: "ADOPTED",
      }));
    } else if (newFilter === "available") {
      setSearchParams((prev) => ({
        ...prev,
        status: "AVAILABLE",
      }));
    } else if (newFilter === "unavailable") {
      setSearchParams((prev) => ({
        ...prev,
        status: "UNAVAILABLE",
      }));
    }
  };

  const FiltersContent: React.FC = () => (
    <Box sx={{ width: 250, p: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Filtros</Typography>
        <IconButton onClick={toggleFilterDrawer}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle2" gutterBottom>
        Status
      </Typography>
      <Stack direction="column" spacing={1} mb={2}>
        <Button
          fullWidth
          variant={activeFilter === "all" ? "contained" : "outlined"}
          onClick={() => {
            handleFilterChange("all");
            if (isMobile) toggleFilterDrawer();
          }}
          sx={{
            color: activeFilter === "all" ? "#ffffff" : "#54270C",
            borderColor: "#FFA726",
            backgroundColor: activeFilter === "all" ? "#FFA726" : "#ffffff",
            "&:hover": {
              backgroundColor:
                activeFilter === "all" ? "#FB8C00" : "rgba(255, 167, 38, 0.04)",
              borderColor: "#FB8C00",
            },
          }}
        >
          Todos
        </Button>
        <Button
          fullWidth
          variant={activeFilter === "adopted" ? "contained" : "outlined"}
          onClick={() => {
            handleFilterChange("adopted");
            if (isMobile) toggleFilterDrawer();
          }}
          sx={{
            color: activeFilter === "adopted" ? "#ffffff" : "#54270C",
            borderColor: "#FFA726",
            backgroundColor: activeFilter === "adopted" ? "#FFA726" : "#ffffff",
            "&:hover": {
              backgroundColor:
                activeFilter === "adopted"
                  ? "#FB8C00"
                  : "rgba(255, 167, 38, 0.04)",
              borderColor: "#FB8C00",
            },
          }}
        >
          Adotados
        </Button>
        <Button
          fullWidth
          variant={activeFilter === "available" ? "contained" : "outlined"}
          onClick={() => {
            handleFilterChange("available");
            if (isMobile) toggleFilterDrawer();
          }}
          sx={{
            color: activeFilter === "available" ? "#ffffff" : "#54270C",
            borderColor: "#FFA726",
            backgroundColor:
              activeFilter === "available" ? "#FFA726" : "#ffffff",
            "&:hover": {
              backgroundColor:
                activeFilter === "available"
                  ? "#FB8C00"
                  : "rgba(255, 167, 38, 0.04)",
              borderColor: "#FB8C00",
            },
          }}
        >
          Para Adoção
        </Button>
        <Button
          fullWidth
          variant={activeFilter === "unavailable" ? "contained" : "outlined"}
          onClick={() => {
            handleFilterChange("unavailable");
            if (isMobile) toggleFilterDrawer();
          }}
          sx={{
            color: activeFilter === "unavailable" ? "#ffffff" : "#54270C",
            borderColor: "#FFA726",
            backgroundColor:
              activeFilter === "unavailable" ? "#FFA726" : "#ffffff",
            "&:hover": {
              backgroundColor:
                activeFilter === "unavailable"
                  ? "#FB8C00"
                  : "rgba(255, 167, 38, 0.04)",
              borderColor: "#FB8C00",
            },
          }}
        >
          Indisponíveis
        </Button>
      </Stack>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="filter-label">Filtros Avançados</InputLabel>
        <Select
          labelId="filter-label"
          id="filters"
          value=""
          onChange={() => {}}
        >
          <MenuItem value="">
            <em>Nenhum</em>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Header>
      <Container
        maxWidth="xl"
        sx={{
          width: "80%",
        }}
      >
        <Box sx={{ my: { xs: 2, sm: 3, md: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gerenciamento de Animais
          </Typography>

          {/* Mobile layout */}
          {isMobile && (
            <>
              <Stack spacing={2} mb={2}>
                <Stack direction="row" spacing={1}>
                  <TextField
                    label="Buscar"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchParams.name}
                    onChange={handleSearchChange}
                    InputProps={{
                      endAdornment: loading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <SearchIcon />
                      ),
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={toggleFilterDrawer}
                    sx={{
                      minWidth: "unset",
                      color: "#54270C",
                      borderColor: "#FFA726",
                      "&:hover": {
                        borderColor: "#FB8C00",
                        backgroundColor: "rgba(255, 167, 38, 0.04)",
                      },
                    }}
                  >
                    <FilterListIcon />
                  </Button>
                </Stack>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Filtro:{" "}
                    {activeFilter === "all"
                      ? "Todos"
                      : activeFilter === "adopted"
                      ? "Adotados"
                      : activeFilter === "available"
                      ? "Para Adoção"
                      : "Indisponíveis"}
                  </Typography>
                </Paper>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreateModal}
                  sx={{
                    backgroundColor: "#FFA726",
                    "&:hover": {
                      backgroundColor: "#FB8C00",
                    },
                  }}
                >
                  Adicionar novo pet
                </Button>
              </Stack>

              <Drawer
                anchor="right"
                open={isFilterDrawerOpen}
                onClose={toggleFilterDrawer}
              >
                <FiltersContent />
              </Drawer>
            </>
          )}

          {/* Tablet/Desktop layout */}
          {!isMobile && (
            <Stack direction="column" spacing={2} mb={2}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                flexWrap={isTablet ? "wrap" : "nowrap"}
              >
                <Stack
                  direction={isTablet ? "column" : "row"}
                  spacing={2}
                  alignItems={isTablet ? "flex-start" : "center"}
                  width={isTablet ? "100%" : "auto"}
                >
                  <ButtonGroup>
                    {filterButtons.map(({ value, label }) => (
                      <Button
                        key={value}
                        sx={{
                          backgroundColor:
                            activeFilter === value ? "#FFCD98" : "#ffffff",
                          color: "#54270C",
                          "&:hover": {
                            backgroundColor:
                              activeFilter === value
                                ? "#FB8C00"
                                : "rgba(255, 167, 38, 0.04)",
                          },
                        }}
                        onClick={() => handleFilterChange(value as FilterTypes)}
                      >
                        {label}
                      </Button>
                    ))}
                  </ButtonGroup>

                  <Stack
                    direction="row"
                    spacing={2}
                    width={isTablet ? "100%" : "auto"}
                  >
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel id="advanced-filter-label"></InputLabel>
                      <Select
                        labelId="advanced-filter-label"
                        value={advancedFilter}
                        onChange={(e) => {
                          const newFilter = e.target.value;
                          setAdvancedFilter(newFilter);

                          setSearchParams((prev) => ({
                            ...prev,
                            name: "",
                            type: "",
                            age: "",
                            breed: "",
                            [newFilter as keyof typeof searchParams]:
                              prev[newFilter as keyof typeof searchParams],
                          }));
                        }}
                      >
                        <MenuItem value="name">Nome</MenuItem>
                        <MenuItem value="type">Tipo</MenuItem>
                        <MenuItem value="age">Idade</MenuItem>
                        <MenuItem value="breed">Raça</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label={`Buscar por ${
                        advancedFilter === "name"
                          ? "Nome"
                          : advancedFilter === "type"
                          ? "Tipo"
                          : advancedFilter === "age"
                          ? "Idade"
                          : "Raça"
                      }`}
                      variant="outlined"
                      size="small"
                      fullWidth={isTablet}
                      value={
                        searchParams[
                          advancedFilter as keyof typeof searchParams
                        ]
                      }
                      onChange={handleSearchChange}
                      InputProps={{
                        endAdornment: loading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <SearchIcon />
                        ),
                      }}
                    />
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                  width={isTablet ? "100%" : "auto"}
                  justifyContent={isTablet ? "flex-end" : "flex-start"}
                >
                  <Button
                    variant="outlined"
                    startIcon={<FileDownloadIcon />}
                    disabled
                    sx={{
                      color: "#54270C",
                      borderColor: "#FFA726",
                      backgroundColor: "#ffffff",
                      "&:hover": {
                        borderColor: "#FB8C00",
                        backgroundColor: "rgba(255, 167, 38, 0.04)",
                      },
                    }}
                  >
                    Exportar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateModal}
                    sx={{
                      backgroundColor: "#FFA726",
                      "&:hover": {
                        backgroundColor: "#FB8C00",
                      },
                    }}
                  >
                    Adicionar novo pet
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          )}

          <AnimalTable
            animals={animals}
            onOpenCreateModal={handleOpenCreateModal}
            isMobile={isMobile}
          />

          <AnimalModal
            open={isCreateModalOpen}
            onClose={handleCloseCreateModal}
            animal={null}
            onSave={handleSaveCreate}
            title="Adicionar Novo Animal"
          />
        </Box>
      </Container>
    </Header>
  );
};

export default AnimalManagementPage;
