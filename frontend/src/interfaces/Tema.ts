import { MaterialClase } from "./MaterialClase";

export interface Tema {
  id_tema?: number;
  id_modulo?: string;
  titulo: string;
  descripcion: string;
  video?: File[];
  url_video: string;
  material_clase?: MaterialClase[];
}
