import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  styled,
  MenuItem,
  Menu,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SortIcon from "@mui/icons-material/Sort";
import AnimalModal from "./animalModal";
import { Animal } from "../constants/animalInterface";
import { AnimalModalInterface } from "../constants/animalModelInterface";

interface AnimalTableProps {
  animals: Animal[];
  onOpenCreateModal: () => void;
  isMobile: boolean;
}

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#ffffff",
  "& th": {
    fontWeight: "bold",
    color: "#000000",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#FFCD98",
      color: "#54270C",
    },
    "&:hover": {
      backgroundColor: "#FFF5E9",
      color: "#54270C",
    },
  },
}));

const formatEditedValue = (edited: string | null): string => {
  return edited ?? "Not edited";
};

const AnimalTable = ({ animals, isMobile }: AnimalTableProps) => {
  const [sortedAnimals, setSortedAnimals] = useState<Animal[]>(animals);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Animal;
    direction: "ascending" | "descending";
  } | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAnimalId, setSelectedAnimalId] = useState<number | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    if (sortConfig !== null) {
      const newSortedAnimals = [...animals].sort((a, b) => {
        const key = sortConfig.key;
        const direction = sortConfig.direction;

        if (a[key] === null) return 1;
        if (b[key] === null) return -1;

        const aValue = a[key];
        const bValue = b[key];

        if (aValue < bValue) {
          return direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setSortedAnimals(newSortedAnimals);
    } else {
      setSortedAnimals(animals);
    }
  }, [animals, sortConfig]);

  const handleSort = (column: keyof Animal) => {
    let direction: "ascending" | "descending" = "ascending";

    if (
      sortConfig &&
      sortConfig.key === column &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key: column, direction });
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedAnimalId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedAnimalId(null);
  };

  const handleOpenEditModal = () => {
    if (selectedAnimalId !== null) {
      const animal = animals.find((a) => a.id === selectedAnimalId);
      if (animal) {
        setAnimalToEdit(animal);
        setIsEditModalOpen(true);
      }
      handleCloseMenu();
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setAnimalToEdit(null);
  };

  const handleSaveEdit = (editedAnimal: AnimalModalInterface) => {
    if (animalToEdit) {
      const updatedAnimal: Animal = {
        ...animalToEdit,
        name: editedAnimal.name,
        age: editedAnimal.age,
        type: editedAnimal.type,
        breed: editedAnimal.breed,
        edited: new Date().toISOString().split("T")[0],
      };

      handleCloseEditModal();
    }
  };

  const handleDelete = () => {
    if (selectedAnimalId !== null) {
      handleCloseMenu();
    }
  };

  const MobileCard = ({ animal }: { animal: Animal }) => (
    <Card
      sx={{
        mb: 2,
        backgroundColor: "#ffffff",
        "&:hover": {
          backgroundColor: "#FFF5E9",
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            {animal.name}
          </Typography>
          <IconButton
            aria-label="actions"
            onClick={(event) => handleClick(event, animal.id)}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Typography color="text.secondary">Type: {animal.type}</Typography>
        <Typography color="text.secondary">Breed: {animal.breed}</Typography>
        <Typography color="text.secondary">Age: {animal.age}</Typography>
        {animal.edited && (
          <Typography variant="body2">Last edited: {animal.edited}</Typography>
        )}
      </CardContent>
    </Card>
  );

  const renderSortIcon = (column: keyof Animal) => {
    if (sortConfig && sortConfig.key === column) {
      return (
        <SortIcon
          fontSize="small"
          sx={{
            ml: 0.5,
            transform:
              sortConfig.direction === "ascending"
                ? "rotate(0deg)"
                : "rotate(180deg)",
            transition: "transform 0.2s",
          }}
        />
      );
    }
    return null;
  };

  if (isMobile) {
    return (
      <>
        <Box sx={{ mb: 2 }}>
          {sortedAnimals.map((animal) => (
            <MobileCard key={animal.id} animal={animal} />
          ))}
        </Box>

        <Menu
          id={`animal-menu-${selectedAnimalId}`}
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleOpenEditModal}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>

        {/* Edit Modal */}
        <AnimalModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          animal={animalToEdit}
          onSave={handleSaveEdit}
          title="Edit Animal"
        />
      </>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="animal table">
        <StyledTableHead>
          <TableRow>
            <TableCell onClick={() => handleSort("name")}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Nome {renderSortIcon("name")}
              </Box>
            </TableCell>
            <TableCell onClick={() => handleSort("age")}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Idade {renderSortIcon("age")}
              </Box>
            </TableCell>
            <TableCell onClick={() => handleSort("type")}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Tipo {renderSortIcon("type")}
              </Box>
            </TableCell>
            <TableCell onClick={() => handleSort("breed")}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Raça {renderSortIcon("breed")}
              </Box>
            </TableCell>
            <TableCell onClick={() => handleSort("createdAt")}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Criado {renderSortIcon("createdAt")}
              </Box>
            </TableCell>
            <TableCell onClick={() => handleSort("edited")}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                Editado {renderSortIcon("edited")}
              </Box>
            </TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {sortedAnimals.map((animal, index) => (
            <TableRow
              key={animal.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& td": {
                  padding: "10px",
                },
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#FFF5E9",
                "&:hover": {
                  backgroundColor: "#fcefd9",
                },
              }}
            >
              <TableCell component="th" scope="row">
                {animal.name}
              </TableCell>
              <TableCell>{animal.age}</TableCell>
              <TableCell>{animal.type}</TableCell>
              <TableCell>{animal.breed}</TableCell>
              <TableCell>{formatDate(animal.createdAt)}</TableCell>
              <TableCell>{formatEditedValue(animal.edited)}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="actions"
                  onClick={(event) => handleClick(event, animal.id)}
                >
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Menu
        id={`animal-menu-${selectedAnimalId}`}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenEditModal}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      {/* Edit Modal */}
      <AnimalModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        animal={animalToEdit}
        onSave={handleSaveEdit}
        title="Edit Animal"
      />
    </TableContainer>
  );
};

export default AnimalTable;
