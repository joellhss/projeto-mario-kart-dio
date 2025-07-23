import {regras, personagens} from './database/data.js';

export const rodarJogo = (jogadores, pistas) => {

    let pontosVencedor = 0;
    let validaEmpate = false;
    let vencedorDaCorrida = [];

    jogadores.forEach(jogador => {
        jogador.pontos = 0;
        jogador.pontosPorPista = 0;
       
    });

    pistas.forEach((pista, index) => {
        const regrasDaPista = regras.filter(regra => regra.tipoPista === pista)[0];
        
        let maisPontos = 0;
        let vencedor = [];
        let empateNaPista = false;
        
        console.log(`\n\n🚦🚦🚦--- Pista ${index + 1}: ${pista} --- 🚦🚦🚦\n\n`);

       
        jogadores.forEach(jogador => {
            const personagem = personagens.find(p => p.nome === jogador.personagem);
            
            if (regrasDaPista.giraDado) {
                console.log(`O Jogador: ${jogador.nome} vai jogar o dado:`);
                const dado = Math.floor(Math.random() * 6) + 1;
                console.log(`Dado rolado: ${dado}`);
                jogador.pontosPorPista += dado + personagem[regrasDaPista.habilidade];
            } else {
                jogador.pontosPorPista += personagem[regrasDaPista.habilidade];
            }
        });
        
        if (regrasDaPista.ganhaPonto) {
            jogadores.forEach(jogador => {
                if (jogador.pontosPorPista > maisPontos) {
                    maisPontos = jogador.pontosPorPista;
                    vencedor = [jogador.nome];
                    empateNaPista = false;
                } else if (jogador.pontosPorPista === maisPontos) {
                    empateNaPista = true;
                    vencedor.push(jogador.nome);
                }
            });

            if (empateNaPista) {
                console.log(`Houve um empate na pista ${pista} entre os jogadores: ${vencedor.join(', ')}!`);
            }
            else {
                console.log(`O vencedor da pista ${pista} é: ${vencedor[0]}!`);
            }

            if (vencedor.length > 0) {
                vencedor.forEach(v => {
                    jogadores.find(j => j.nome === v).pontos += 1;
                });
            }
        }
       

        if (regrasDaPista.perdePonto) {
            if(empateNaPista) {
                console.log(`Todos os jogadores perderam 1 ponto na pista ${pista} devido ao empate!`);
                jogadores.forEach(jogador => {
                    if (jogador.pontos > 0) {
                        jogador.pontos -= 1;
                    }
                });
            }
            
            else if (regrasDaPista.tipoDeArma !== undefined) {
                const arma = Math.floor(Math.random() * Object.keys(regrasDaPista.tipoDeArma).length);
                console.log(`⚔️ O jogador ${vencedor[0]} recebeu a arma ${Object.keys(regrasDaPista.tipoDeArma)[arma]}! ⚔️`);
                
                
                jogadores.forEach(jogador => {
                    if (jogador.nome !== vencedor[0]) {
                        const dano = Object.values(regrasDaPista.tipoDeArma)[arma];
                        if (jogador.pontos > dano) {
                            jogador.pontos -= dano;
                        } else {
                            jogador.pontos = 0;
                        }
                        console.log(`Jogador: ${jogador.personagem}, perdeu ${dano} pontos!`);
                    }
                });
            } else {
                jogadores.forEach(jogador => {
                    if(jogador.nome !== vencedor[0]) {
                        if (jogador.pontos > 0) {
                            jogador.pontos -= 1;
                        }
                        console.log(`Jogador: ${jogador.nome}, perdeu 1 ponto!`); 
                    }
                });
            }
        }

        jogadores.forEach(jogador => {
            jogador.pontosPorPista = 0;
            console.log(`🚩🚩🚩Jogador: ${jogador.nome}, ficou com ${jogador.pontos} pontos!`);
        });
    });

    console.log(`\n\n🏁🏁🏁 --- FIM DA CORRIDA! --- 🏁🏁🏁\n\n`);

    jogadores.forEach(jogador => {
        console.log(`📊 Jogador: ${jogador.nome}, Total de pontos: ${jogador.pontos}`);
        if (jogador.pontos > pontosVencedor) {
            pontosVencedor = jogador.pontos;
            vencedorDaCorrida = [jogador.nome];
            validaEmpate = false;
        } else if (jogador.pontos === pontosVencedor) {
            validaEmpate = true;
            vencedorDaCorrida.push(jogador.nome);
        }
    })

    if (validaEmpate) {
        console.log(`\nHouve um empate entre os jogadores: ${vencedorDaCorrida.filter(j => j !== undefined).join(', ')}!`);
    } else {
        console.log(`\n🏆🏆🏆 O vencedor do jogo é: ${vencedorDaCorrida.filter(j => j !== undefined)[0]}! 🏆🏆🏆`);
    }
}