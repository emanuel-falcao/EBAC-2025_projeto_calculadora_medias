let linhas = '';
const imgAprovado = '<img src="./imagens/aprovado.png" alt="Emogi comemorando" />';
const imgReprovado = '<img src="./imagens/reprovado.png" alt="Emogi decepcionado" />';

const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'; // CORREÇÃO: sapanAprovado para spanAprovado
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima")); // Manter para fins de execução

const form = document.getElementById("form-atividade");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    adicionarLinha();
    atualizarTabela();
    atualizarMediaFinal();
});

function adicionarLinha() {
    const inputNomeAtividade = document.getElementById("nome-atividade");
    const inputNotaAtividade = document.getElementById("nota-atividade");

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value} </td>`;
        linha += `<td>${parseFloat(inputNotaAtividade.value) >= notaMinima ? imgAprovado : imgReprovado} </td>`;
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
    // evitar divisão por zero (retorna 0)
    return notas.length > 0 ? somaDasNotas / notas.length : 0; 
}





