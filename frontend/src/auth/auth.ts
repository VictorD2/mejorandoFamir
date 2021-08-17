interface Auth {
  loged: boolean;
  rango?: number;
}

class Auth {
  constructor() {
    this.loged = false;
    this.rango = 2;
  }
  sigIn() {
    this.loged = true;
  }
  logOut() {
    this.loged = false;
  }
  isAuth() {
    return this.loged;
  }
  getRango() {
    return this.rango;
  }
  setRango(rango: number | undefined) {
    this.rango = rango;
  }
}

export default new Auth();
