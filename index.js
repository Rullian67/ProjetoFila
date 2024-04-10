 // Crie uma instância da fila
 let minhaFila = new FilaCircular(5);

 // Função para adicionar um elemento à fila
 function adicionarElemento() {
  const nome = document.getElementById("txtnovoNome").value;
  const cpf = document.getElementById("txtnovoCpf").value;
  if (nome === "" || cpf === "") {
    alert("Preencha todos os campos antes de adicionar à fila!");
    return;
  }
  const novoAtendimento = new Atendimento();
  novoAtendimento.nome = nome;
  novoAtendimento.cpf = cpf;
  novoAtendimento.data = obterDataAtual();
  novoAtendimento.hora = obterHoraAtual();
  console.log(novoAtendimento);

  //enqueue atendimento na fila
  const listaFila = document.getElementById("listFila");
    const novoItemFila = document.createElement("li"); // Criar um novo elemento de lista (li)
    novoItemFila.textContent = novoAtendimento.toString(); // Definir o conteúdo do novo elemento de lista como uma string
    
    // Adicionar o novo elemento de lista à lista de fila
    listaFila.appendChild(novoItemFila);
  if(minhaFila.enqueue(novoAtendimento)=== true){
    document.getElementById("txtnovoNome").value = "";
    document.getElementById("txtnovoCpf").value = "";
    document.getElementById("txtnovoNome").focus();
    atualizarFila();
   //console.log(minhaFila.toString());
} else {
    alert("Fila cheia!");
}
  }
//--------------------------------------------------------------------------------------------
 // Função para remover o primeiro elemento da fila
 function removerElemento() {
  if (minhaFila.isEmpty()) {
    alert("A fila está vazia!");
    return;
  }

  const listaFila = document.getElementById("listFila");
  const primeiroItem = listaFila.firstChild;
  if (primeiroItem) {
    listaFila.removeChild(primeiroItem); // Remove o primeiro item da lista
  }

  const atendimentoRemovido = minhaFila.dequeue();
  mostrarMensagemRemocao(atendimentoRemovido);
}



 //--------------------------------------------------------------------------------
// Função para buscar um CPF na lista de atendimentos
function buscarCpf() {
  const cpfBusca = document.getElementById("txtnovoCpf").value;
  const listaFila = document.getElementById("listFila");

  // Percorrer todos os elementos da lista
  for (let i = 0; i < minhaFila.qtd; i++) {
      const atendimento = minhaFila.elementos[(minhaFila.inicio + i) % minhaFila.elementos.length];

      // Verificar se o CPF do atendimento corresponde ao CPF buscado
      if (atendimento.cpf === cpfBusca) {
          alert(`CPF ${cpfBusca} encontrado na posição ${i + 1} da fila.`);
          return;
      }
  }
  alert(`CPF ${cpfBusca} não encontrado na fila.`);
}

//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao( atendimentoRemovido) {
  if (!atendimentoRemovido) {
    alert("Nenhum atendimento foi removido!");
    return;
  }

  const pessoaAtendida = atendimentoRemovido;
  const tempoEspera = calcularDiferencaHoras(pessoaAtendida.hora, obterHoraAtual()); // Calcula o tempo de espera
  const mensagem = `Chamando para ser Atendido: ${pessoaAtendida.nome}\n`
      + `,Chegou às: ${pessoaAtendida.hora}\n`
      + `Está sendo atendido às: ${obterHoraAtual()}\n`
      + `.Tempo de espera: ${tempoEspera}`;

  const mensagemElement = document.getElementById("mensagem");
  mensagemElement.textContent = mensagem;
  mensagemElement.classList.add("mensagem");
  
    atualizarFila();
}

// Função para atualizar a exibição da fila
function atualizarFila() {
  const listaFila = document.getElementById("listFila");
  listaFila.innerHTML = ""; // Limpa a lista antes de adicionar os novos elementos

  if (minhaFila.isEmpty()) {
    lblPessoasFila.textContent = "Fila Vazia!";
  } else {
    for (let i = 0; i < minhaFila.qtd; i++) {
      const atendimento = minhaFila.elementos[(minhaFila.inicio + i) % minhaFila.elementos.length];
      const novoItemFila = document.createElement("li");
      novoItemFila.textContent = atendimento.toString();
      listaFila.appendChild(novoItemFila);
    }
    lblPessoasFila.textContent = "Pessoas na Fila!";
  }
}





//--------------------------------------------------------------------------------------------
 // funcao data
 function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
    let ano = dataAtual.getFullYear();
    // Formata a data como "dd/mm/aaaa"
    let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);
  
  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
  
  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;
  
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

}