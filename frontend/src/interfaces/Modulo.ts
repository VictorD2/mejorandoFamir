import { Tema } from "../interfaces/Tema";

export interface Modulo {
  id_modulo?: number;
  titulo?: string;
  id_curso?: string;
  temas?: Tema[];
}
