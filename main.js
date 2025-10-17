let linhas = '';
const imgAprovado = '<img src="./imagens/aprovado.png" alt="Emogi comemorando" />';
const imgReprovado = '<img src="./imagens/reprovado.png" alt="Emogi decepcionado" />';

const atividades = [];
const notas = [];
// CORREÇÃO: sapanAprovado alterado para spanAprovado
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'; 
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
// Manter o prompt() para obter a nota mínima (embora não seja ideal para UX)
const notaMinima = parseFloat(prompt("Digite a nota mínima"));

const form = document.getElementById("form-atividade");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    adicionarLinha();
    // CORREÇÃO: Chamada para a função que atualiza a tabela (agora definida)
    atualizarTabela(); 
    atualizarMediaFinal();
});

function adicionarLinha() {
    const inputNomeAtividade = document.getElementById("nome-atividade");
    const inputNotaAtividade = document.getElementById("nota-atividade");
    
    const notaValor = parseFloat(inputNotaAtividade.value); 

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(notaValor); 

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${notaValor} </td>`; 
        linha += `<td>${notaValor >= notaMinima ? imgAprovado : imgReprovado} </td>`;
        linha += '</tr>';

        linhas += linha;
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizarTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizarMediaFinal() {
    const mediaFinal = calcularMediaFinal();
    
    document.getElementById("media-final-valor").innerHTML = mediaFinal.toFixed(2);
   
    document.getElementById("media-final-resultado").innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calcularMediaFinal() {
    let somaDasNotas = 0;
    for (let i = 0; i < notas.length; i++) {
       
        somaDasNotas += notas[i]; 
    }
    // Adiciona verificação para evitar divisão por zero se o array estiver vazio
    return notas.length > 0 ? somaDasNotas / notas.length : 0;
}







