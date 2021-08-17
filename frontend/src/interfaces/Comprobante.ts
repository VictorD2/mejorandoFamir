export interface Comprobante {
  id_comprobante?: number;
  id_usuario: string;
  id_curso: string;
  url_foto_comprobante: string;
  comprobateFoto?: File[];
  nombre?: string;
  apellido?: string;
  estado: string;
  nombre_curso?: string;
  fecha_enviado: string;
}
