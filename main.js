let linhas = '';
const imgAprovado = '<img src="./imagens/aprovado.png" alt="Emogi comemorando" />';
const imgReprovado = '<img src="./imagens/reprovado.png" alt="Emogi decepcionado" />';

const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'; // CORREÇÃO: sapanAprovado alterado para spanAprovado
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima"));

const form = document.getElementById("form-atividade");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    adicionarLinha();
    atualizarTabela(); // CORREÇÃO: Chamada para a função que atualiza a tabela (agora definida)
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
        // ALTERAÇÃO/CORREÇÃO: Aplicar toFixed(2) para forçar a exibição com duas casas decimais
        linha += `<td>${notaValor.toFixed(2)} </td>`; 
        linha += `<td>${notaValor >= notaMinima ? imgAprovado : imgReprovado} </td>`;
        linha += '</tr>';

        linhas += linha;
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizarTabela() { // CORREÇÃO: Implementação da função que insere o conteúdo no <tbody>
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizarMediaFinal() {
    const mediaFinal = calcularMediaFinal();
    
    // CORREÇÃO: O HTML precisa ter os IDs "media-final-valor" e "media-final-resultado"
    document.getElementById("media-final-valor").innerHTML = mediaFinal.toFixed(2);
    document.getElementById("media-final-resultado").innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calcularMediaFinal() {
    let somaDasNotas = 0;
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i]; 
    }
    // CORREÇÃO: Adiciona verificação para evitar divisão por zero se o array estiver vazio
    return notas.length > 0 ? somaDasNotas / notas.length : 0;
}







