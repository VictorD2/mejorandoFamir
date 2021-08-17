export interface Comentario {
  id_comentario?: number;
  comentario: string;
  fecha: string;
  id_usuario: number;
  id_rango: number;
  id_curso?: number;
  id_tema?: number;
  nombre?: string;
  apellido?: string;
  url_foto_usuario?: string;
}
