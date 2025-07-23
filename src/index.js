import inquirer from 'inquirer';
import { gerarPistas } from './gerarPistas.js';
import { rodarJogo } from './rodarJogo.js';
import { personagens } from './database/data.js';

const jogadores = [];

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
        if (resposta["nome"] !== "") {
            jogadores.push({ nome: resposta["nome"] });
        }
        else {
            jogadores.push({ nome: "Anônimo" })
        }
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

    console.log("Jogadores:", jogadores);

    if (jogadores.length === 1) {

        function escolherPersonagemComputador() {
            const personagemAleatorio = personagens[Math.floor(Math.random() * personagens.length)];
            
            if (jogadores[0].personagem !== personagemAleatorio.nome) {
                return personagemAleatorio.nome;
            }

            escolherPersonagemComputador();
        }

        jogadores.push({
            nome: 'Computador',
            personagem: escolherPersonagemComputador()
        })

        console.log(`O computador escolheu o personagem ${jogadores[1].personagem}!`);
    }
    
    rodarJogo(jogadores, pistas);

}

iniciarJogo();