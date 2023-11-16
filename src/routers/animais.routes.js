import { Router } from "express";
import { buscarAnimaisId, criarAnimal, deletarAnimal, atualizarAnimal, buscarTodosAnimais } from "../controller/animais.controller.js";

const rotaAnimais = Router();

rotaAnimais.get("/", buscarTodosAnimais);
rotaAnimais.get("/:id", buscarAnimaisId);
rotaAnimais.post("/", criarAnimal);
rotaAnimais.delete("/:id", deletarAnimal);
rotaAnimais.put("/:id", atualizarAnimal);

export default rotaAnimais;
