export const gerarPistas = () => {
    const pistas = [];
    const tiposPistas = ["RETA", "CURVA", "CONFRONTO"];
    
    for (let i = 0; i < 5; i++) {

        const numeroAleatorio = Math.trunc(Math.random() * tiposPistas.length);
        pistas.push(tiposPistas[numeroAleatorio]);
    }
    
    return pistas;
}