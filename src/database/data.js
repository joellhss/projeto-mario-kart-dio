export const personagens = [
    { nome: 'Mario', velocidade: 4, manobrabilidade: 3, poder: 3 },
    { nome: 'Luigi', velocidade: 3, manobrabilidade: 4, poder: 4 },
    { nome: 'Peach', velocidade: 3, manobrabilidade: 4, poder: 2 },
    { nome: 'Bowser', velocidade: 5, manobrabilidade: 2, poder: 5 },
    { nome: 'Yoshi', velocidade: 2, manobrabilidade: 4, poder: 3 },
    { nome: 'Donkey Kong', velocidade: 2, manobrabilidade: 2, poder: 5 }
];

export const regras = [
    { tipoPista: "RETA", habilidade: "velocidade",giraDado: true, ganhaPonto: true, perdePonto: false },
    { tipoPista: "CURVA", habilidade: "manobrabilidade", giraDado: true, ganhaPonto: true, perdePonto: false },
    { tipoPista: "CONFRONTO", habilidade: "poder", giraDado: true, ganhaPonto: true, perdePonto: true, tipoDeArma: {casco: 1, bomba: 2}},
]