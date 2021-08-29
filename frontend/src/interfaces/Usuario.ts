export interface Usuario {
  id_usuario?: string;
  id_pais_nacimiento?: string;
  id_pais_residencia?: string;
  id_rango?: number;
  nombre?: string;
  apellido?: string;
  profesion?: string;
  correo?: string;
  telefono?: string;
  habilitado_u?: number;
  rut?: string;
  url_foto_usuario?: string;
  url_foto_residencia?: string;
  url_foto_nacimiento?: string;
  nombre_pais_nacimiento?: string;
  nombre_pais_residencia?: string;
  authenticate?: boolean;
  url_foto_profesor?: File[];
}
