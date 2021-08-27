import { Tema } from "../interfaces/Tema";

export interface Modulo {
  id_modulo?: number;
  uri_modulo_vimeo?: string;
  titulo?: string;
  id_curso?: string;
  temas?: Tema[];
}
