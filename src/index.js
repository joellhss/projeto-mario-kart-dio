import inquirer from 'inquirer';
import { gerarPistas } from './gerarPistas.js';
import { rodarJogo } from './rodarJogo.js';

const jogadores = [];

const personagens = [
    { nome: 'Mario', velocidade: 4, manobrabilidade: 3, poder: 3 },
    { nome: 'Luigi', velocidade: 3, manobrabilidade: 4, poder: 4 },
    { nome: 'Peach', velocidade: 3, manobrabilidade: 4, poder: 2 },
    { nome: 'Bowser', velocidade: 5, manobrabilidade: 2, poder: 5 },
    { nome: 'Yoshi', velocidade: 2, manobrabilidade: 4, poder: 3 },
    { nome: 'Donkey Kong', velocidade: 2, manobrabilidade: 2, poder: 5 }
];



async function iniciarJogo() {
    let personagemTemporario = personagens;
    const { respostaQuantidadeDeJogadores } = await inquirer.prompt([
        {
            type: 'list',
            name: 'respostaQuantidadeDeJogadores',
            message: 'Quantos jogadores irão participar da corrida?',
            choices: ['1', '2']
        }
    ])

    const numeroDeJogadores = await parseInt(respostaQuantidadeDeJogadores);

    for (let i = 0; i < parseInt(numeroDeJogadores); i++) {
    const resposta = await inquirer.prompt([
            {
                type: 'input',
                name: "nome",
                message: 'Qual é o nome do jogador ' + (i + 1) + '?'
        }])
        jogadores.push({nome: resposta["nome"]});
        console.log(`Jogador ${i + 1} adicionado: ${jogadores[i].nome}`);

    const personagemEscolhido = await inquirer.prompt([
            {
                type: 'list',
                name: 'personagem',
                message: `Olá, ${jogadores[i].nome}! Escolha seu personagem:`,
                choices: personagemTemporario.map(p => p.nome)
            }
        ]);
        jogadores[i].personagem = personagemEscolhido.personagem;
        personagemTemporario = personagemTemporario.filter(p => p.nome !== personagemEscolhido.personagem);
        console.log(`Jogador ${jogadores[i].nome} escolheu o personagem ${personagemEscolhido.personagem}`);    
    }

    const pistas = gerarPistas();
    
    rodarJogo(jogadores, pistas);

}

iniciarJogo();