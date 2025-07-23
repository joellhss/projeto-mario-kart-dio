import { regras } from "./database/data.js";

export const gerarPistas = () => {
    const pistas = [];
    const tiposPistas = regras.map(regra => regra.tipoPista);
    
    for (let i = 0; i < 5; i++) {

        const numeroAleatorio = Math.trunc(Math.random() * tiposPistas.length);
        pistas.push(tiposPistas[numeroAleatorio]);
    }
    
    return pistas;
}