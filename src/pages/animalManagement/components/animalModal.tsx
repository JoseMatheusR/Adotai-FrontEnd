import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AnimalModalInterface } from "../constants/animalModelInterface";

interface LocalAnimalState {
  name: string;
  age: string;
  type: string;
  breed: string;
  edited: string | null;
}

interface AnimalModalProps {
  open: boolean;
  onClose: () => void;
  animal: AnimalModalInterface | null;
  onSave: (animalData: AnimalModalInterface) => void;
  title: string;
}

const styledModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #EFC7A9",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const AnimalModal: React.FC<AnimalModalProps> = ({
  open,
  onClose,
  animal,
  onSave,
  title,
}) => {
  const [localAnimal, setLocalAnimal] = useState<LocalAnimalState>({
    name: "",
    age: "",
    type: "",
    breed: "",
    edited: null,
  });

  React.useEffect(() => {
    if (animal) {
      setLocalAnimal({
        name: animal.name,
        age: animal.age,
        type: animal.type,
        breed: animal.breed,
        edited: animal.edited,
      });
    } else {
      setLocalAnimal({ name: "", age: "", type: "", breed: "", edited: null });
    }
  }, [animal]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLocalAnimal((prevAnimal) => ({ ...prevAnimal, [name]: value }));
  };

  const handleSave = () => {
    if (localAnimal) {
      const dataToSave: AnimalModalInterface = { ...localAnimal };
      if (animal?.id) {
        dataToSave.id = animal.id;
      }
      onSave(dataToSave);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styledModal}>
        <IconButton
          aria-label="fechar"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h5" id="modal-modal-title">
            {title}
          </Typography>
        </Box>

        {localAnimal && (
          <>
            <TextField
              label="Nome"
              name="name"
              value={localAnimal.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Idade"
              name="age"
              value={localAnimal.age}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tipo"
              name="type"
              value={localAnimal.type}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Raça"
              name="breed"
              value={localAnimal.breed}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button onClick={handleSave} variant="contained" color="primary">
                Salvar
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AnimalModal;
