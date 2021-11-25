const exprRegular = {
  // usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ.\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // name@example.com
  telefono: /^[0-9-+\s]{9,14}$/, // 9 a 14 numeros.
  rut: /^[0-9-]{8,10}$/,
  precio: /^[0-9.]+$/,
  digitos: /^[0-9]+$/,
  url: /^(ftp|http|https):\/\/[^ "]+$/
};

export default exprRegular;