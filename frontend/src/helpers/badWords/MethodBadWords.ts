import swal from 'sweetalert'
// Badwords
import BadWords from "./BadWords";

const filterInsults = (arr: Array<string>) => {
    for (let i = 0; i < arr.length; i++) {
        const res = BadWords.filter((el) => {
            return el.toLowerCase() === arr[i].toLowerCase();
        });
        if (res.length > 0) {
            return res[0];
        }
    }
};

const quitarAcentos = (cadena: string) => {
    const acentos: { [index: string]: any } = {
        á: "a",
        é: "e",
        í: "i",
        ó: "o",
        ú: "u",
        Á: "A",
        É: "E",
        Í: "I",
        Ó: "O",
        Ú: "U",
    };
    return cadena
        .split("")
        .map((letra: string) => acentos[letra] || letra)
        .join("")
        .toString();
};

const filteredWord = (message: string) => {
    const msg = quitarAcentos(message);
    const arrMsg = msg.split(" ");
    const validatedMsg = filterInsults(arrMsg);
    if (validatedMsg)
        return swal(
            "Oops!",
            `Palabara ${validatedMsg} no adecuada para el mensaje`,
            "error"
        );
}

export default filteredWord;
