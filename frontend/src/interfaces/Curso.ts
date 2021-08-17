export interface Curso {
  id_curso?: number;
  nombre_curso: string;
  descripcion: string;
  calificacion?: number;
  url_foto_curso: string;
  foto_curso?: File[];
  capacidad?: number;
  tipo?: string;
  precio: number;
  horario: string;
  enlace: string;
  favorito?: number;
  duracion?: number;
  modalidad?: string;
  habilitado?: number;
  id_usuario?: number;
  nombre?: string;
  apellido?: string;
  correo?: string;
  profesion?: string;
  telefono?: string;
  rut?: string;
  url_foto_usuario?: string;
}
