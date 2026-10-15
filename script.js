'use strict';

const prefereReducaoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Rola até um elemento após esconder/mostrar seções na mesma chamada. O
// requestAnimationFrame duplo evita que o navegador calcule o destino usando o layout de
// antes da troca (elemento ainda escondido). A correção final (setTimeout) existe porque,
// nesta página, mostrar o resultado também injeta o iframe do Google Forms — se o layout
// ainda se ajustar durante a animação suave, a rolagem pode parar num ponto errado; esse
// ajuste silencioso (sem animação, por isso imperceptível se já estiver no lugar certo)
// garante a posição final correta.
function rolarPara(elemento, elementoParaFocar) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      elemento.scrollIntoView({ behavior: prefereReducaoMovimento ? 'auto' : 'smooth', block: 'start' });
      if (elementoParaFocar) elementoParaFocar.focus();
      setTimeout(() => {
        elemento.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 500);
    });
  });
}

// Cada pergunta: `correta` é o índice da alternativa certa (0 = a, 1 = b, ...) e
// `feedbackAlternativas` tem uma explicação específica para cada alternativa errada
// (null na posição da certa). A posição da certa varia de propósito entre as perguntas.
const quizQuestions = [
  {
    tema: 'Golpe do Pix',
    enunciado: 'Você recebe uma mensagem: "Seu Pix foi bloqueado, clique no link para desbloquear". O que fazer?',
    alternativas: [
      'Clicar no link e seguir as instruções.',
      'Ligar direto para o banco pelo número oficial no cartão.',
      'Responder pedindo mais informações.',
      'Encaminhar para a família decidir.'
    ],
    correta: 1,
    feedback: 'O banco nunca manda links por SMS ou WhatsApp pedindo para desbloquear contas. Na dúvida, sempre use o número que está no verso do seu cartão físico!',
    feedbackAlternativas: [
      "Cuidado! Os bancos oficiais nunca enviam links de 'desbloqueio' por mensagem de texto ou WhatsApp. Clicar nesse link leva a um site falso que rouba seus dados e senhas.",
      null,
      'Responder ao golpista confirma que seu número está ativo e chama mais atenção deles. O correto é nunca interagir com números desconhecidos.',
      'Embora pedir ajuda seja bom, repassar a mensagem para outras pessoas pode acabar expondo sua família ao mesmo risco de clique acidental. O ideal é apagar e bloquear.'
    ]
  },
  {
    tema: 'WhatsApp clonado',
    enunciado: 'Um "parente" te chama no WhatsApp pedindo dinheiro urgente de um número novo. O que fazer primeiro?',
    alternativas: [
      'Fazer o Pix rápido, pois é urgência.',
      'Perguntar por mensagem se é ele mesmo.',
      'Ignorar e apagar a conversa.',
      'Ligar para o parente no número antigo para confirmar.'
    ],
    correta: 3,
    feedback: 'Os golpistas usam a urgência para você não pensar. Sempre faça uma ligação normal (não pelo WhatsApp) para o número antigo da pessoa para confirmar a história.',
    feedbackAlternativas: [
      'Perigo! Os golpistas usam a falsa urgência para fazer você agir sem pensar. Nunca transfira dinheiro sem confirmar por ligação de voz.',
      'Não adianta perguntar por mensagem, pois o golpista que roubou a conta vai fingir ser o seu familiar e continuar mentindo. A única prova real é ouvir a voz da pessoa.',
      'Apagar ajuda a evitar o golpe, mas se o seu parente teve a conta clonada de verdade, ele precisa saber disso para avisar os outros contatos.',
      null
    ]
  },
  {
    tema: 'Links falsos',
    enunciado: 'Você ganhou um "prêmio" inesperado e recebeu um link para "resgatar". O que isso geralmente indica?',
    alternativas: [
      'Golpe para roubar dados pessoais ou bancários.',
      'Promoção verdadeira de loja conhecida.',
      'Mensagem de cobrança.',
      'Atualização do aplicativo.'
    ],
    correta: 0,
    feedback: 'Se você não se inscreveu em nada, não existe prêmio! Golpistas enviam links falsos prometendo brindes para roubar suas senhas e dinheiro. Nunca clique.',
    feedbackAlternativas: [
      null,
      'Infelizmente não! Se você não se inscreveu em nenhum sorteio oficial, prêmios inesperados na internet são sempre iscas para roubar dados.',
      "Não é cobrança, é uma técnica clássica de engenharia social chamada 'falsa promessa' para atrair a curiosidade da vítima.",
      'Atualizações de aplicativos legítimos nunca são enviadas por links de brindes ou prêmios. Elas são feitas direto pela loja oficial de aplicativos do celular.'
    ]
  },
  {
    tema: 'Falsa central',
    enunciado: 'Alguém liga dizendo ser do seu banco e pede o código que acabou de chegar por SMS. O que fazer?',
    alternativas: [
      'Passar o código, para resolver logo o problema.',
      'Pedir para a pessoa confirmar o seu CPF antes.',
      'Desligar e ligar você mesmo para o número oficial do banco.',
      'Dizer que vai pensar e ligar de volta no número que ela passar.'
    ],
    correta: 2,
    feedback: 'Banco de verdade nunca pede senha, código nem transferência por telefone. Na dúvida, desligue e ligue você mesmo para o número oficial, o que está no verso do seu cartão.',
    feedbackAlternativas: [
      'Nunca passe esse código! Com ele, o golpista entra na sua conta ou faz transferências em seu nome. Banco de verdade jamais pede código por telefone.',
      'Esse tipo de golpista já tem seus dados (nome, CPF, às vezes até o endereço), então conferir isso não prova nada. Quem liga nunca é a prova: a prova é o número oficial que você mesmo disca.',
      null,
      'O número que ela passa é do próprio golpista, e quem atender vai continuar fingindo ser do banco. Ligue sempre para o número do verso do seu cartão ou do aplicativo oficial.'
    ]
  },
  {
    tema: 'Investimento milagroso',
    enunciado: 'Chega uma mensagem: "Invista R$ 500 e receba R$ 1.500 em uma semana, lucro garantido!". O que isso provavelmente é?',
    alternativas: [
      'Uma ótima oportunidade, pois o lucro é garantido.',
      'Um investimento seguro se for só um valor pequeno.',
      'Uma promoção real, se aparecer um famoso recomendando.',
      'Um golpe: lucro alto e garantido não existe.'
    ],
    correta: 3,
    feedback: 'Todo investimento de verdade tem risco, e ninguém consegue prometer ganho certo. Na dúvida, não deposite nada e converse com alguém de confiança antes de decidir.',
    feedbackAlternativas: [
      'Cuidado! Quando alguém garante lucro alto, quase sempre é golpe. Todo investimento de verdade tem risco, e ninguém consegue prometer ganho certo.',
      'O valor pequeno é só a isca: o golpista deixa você "lucrar" no começo para ganhar confiança e depois pedir quantias bem maiores. O problema não é o tamanho do valor, é a promessa.',
      'Vídeos e fotos de famosos recomendando investimento muitas vezes são falsos, criados com inteligência artificial. Famoso falando não é garantia de nada.',
      null
    ]
  },
  {
    tema: 'Compras e vendas falsas',
    enunciado: 'Você vendeu um produto e o comprador manda um comprovante de Pix, pedindo para você enviar logo. O que fazer?',
    alternativas: [
      'Conferir no aplicativo do seu banco se o dinheiro entrou.',
      'Enviar o produto, pois o comprovante prova que ele pagou.',
      'Enviar rápido, para o comprador não desistir.',
      'Pedir um segundo comprovante para garantir.'
    ],
    correta: 0,
    feedback: 'Comprovante é só uma imagem, e pode ser falso. Só entregue o produto depois de ver o dinheiro na sua conta, no aplicativo do banco.',
    feedbackAlternativas: [
      null,
      'Comprovante pode ser falso ou editado em segundos. O que vale como prova é o dinheiro aparecendo na sua conta, no aplicativo do banco.',
      'A pressa é uma armadilha clássica: quem quer enganar sempre apressa. Uma compra de verdade espera o tempo que for preciso para você conferir.',
      'Um segundo comprovante pode ser tão falso quanto o primeiro. O único jeito de ter certeza é ver o dinheiro na sua conta.'
    ]
  }
];

// Links de incorporação do Google Forms (Forms → Enviar → aba <> → copiar o src do iframe).
// Se ficar vazio, a seção correspondente permanece escondida.
// Feedback "Isso te ajudou?", exibido depois do resultado do quiz:
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScNQ84nR5Y7m5ts7Rpbnsi8Mkkp4A6e2KvmHRF_ASExPvfwgw/viewform?embedded=true';
// Relato anônimo "Conhece alguém que já caiu em um golpe?", sempre visível quando preenchido.
// O formulário deve ser ANÔNIMO (sem coletar e-mail e sem exigir login do Google).
const GOOGLE_FORM_RELATO_URL = '';

// Estatísticas anônimas com o GoatCounter (opcional): cole só o CÓDIGO do site, o trecho antes de
// ".goatcounter.com" (ex.: 'meusite' para meusite.goatcounter.com). Não usa cookies nem guarda dados
// pessoais. Se ficar vazio, nenhum script externo é carregado e o contador de visitas fica escondido.
// Para o número aparecer no rodapé, ative "Allow adding visitor counts on your website" nas
// configurações do site no GoatCounter.
const GOATCOUNTER_CODE = '';

let perguntaAtual = 0;
let pontuacao = 0;
let alternativaSelecionada = null;
let respondida = false;
let historicoRespostas = [];

function isRespostaCorreta(perguntaIndex, alternativaIndex) {
  return quizQuestions[perguntaIndex].correta === alternativaIndex;
}

function renderPergunta() {
  const pergunta = quizQuestions[perguntaAtual];
  alternativaSelecionada = null;
  respondida = false;

  document.getElementById('quiz-progresso').textContent =
    `Pergunta ${perguntaAtual + 1} de ${quizQuestions.length}`;
  document.getElementById('quiz-enunciado').textContent = pergunta.enunciado;

  const container = document.getElementById('quiz-alternativas');
  container.innerHTML = '';
  pergunta.alternativas.forEach((texto, index) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'tap-target text-left rounded-xl border-2 px-5 py-4 text-lg';
    botao.style.borderColor = '#2C5F5A';
    botao.setAttribute('role', 'radio');
    botao.setAttribute('aria-checked', 'false');
    botao.dataset.index = String(index);
    botao.textContent = `${String.fromCharCode(97 + index)}) ${texto}`;
    botao.addEventListener('click', () => selecionarAlternativa(index));
    container.appendChild(botao);
  });

  const feedback = document.getElementById('quiz-feedback');
  feedback.classList.add('hidden');
  document.getElementById('quiz-feedback-texto').textContent = '';
  document.getElementById('quiz-feedback-dica').classList.add('hidden');

  const botaoAcao = document.getElementById('quiz-botao-acao');
  botaoAcao.textContent = 'Confirmar Resposta';
  botaoAcao.disabled = true;
}

function selecionarAlternativa(index) {
  const pergunta = quizQuestions[perguntaAtual];

  // Já acertou: a pergunta está travada, não dá mais para trocar.
  if (respondida && alternativaSelecionada === pergunta.correta) return;
  // Clicou de novo na mesma alternativa errada: nada muda.
  if (respondida && index === alternativaSelecionada) return;

  const trocandoResposta = respondida;
  alternativaSelecionada = index;

  if (trocandoResposta) {
    // Já tinha errado antes: troca e reavalia na hora, sem precisar de outro clique.
    historicoRespostas.pop();
    avaliarResposta();
    return;
  }

  const botoes = document.querySelectorAll('#quiz-alternativas button');
  botoes.forEach((botao, i) => {
    const selecionado = i === index;
    botao.setAttribute('aria-checked', String(selecionado));
    botao.style.backgroundColor = selecionado ? '#2C5F5A' : '';
    botao.style.color = selecionado ? '#FFFFFF' : '';
  });

  document.getElementById('quiz-botao-acao').disabled = false;
}

function avaliarResposta() {
  respondida = true;

  const pergunta = quizQuestions[perguntaAtual];
  const correta = isRespostaCorreta(perguntaAtual, alternativaSelecionada);
  if (correta) pontuacao++;

  historicoRespostas.push({
    tema: pergunta.tema,
    correta: pergunta.alternativas[pergunta.correta],
    suaResposta: pergunta.alternativas[alternativaSelecionada],
    acertou: correta
  });

  const botoes = document.querySelectorAll('#quiz-alternativas button');
  botoes.forEach((botao, i) => {
    const letra = String.fromCharCode(97 + i);
    let texto = `${letra}) ${pergunta.alternativas[i]}`;
    botao.style.backgroundColor = '';
    botao.style.color = '';
    botao.setAttribute('aria-checked', 'false');
    botao.setAttribute('aria-disabled', String(correta));

    if (correta && i === pergunta.correta) {
      // Só revela qual é a certa quando a própria pessoa acerta — errando, ela
      // continua podendo tentar as outras alternativas sem a resposta já aparecer.
      botao.style.backgroundColor = '#2C5F5A';
      botao.style.color = '#FFFFFF';
      texto += ' — Resposta correta';
    } else if (!correta && i === alternativaSelecionada) {
      botao.style.backgroundColor = '#B04A2A';
      botao.style.color = '#FFFFFF';
      texto += ' — Sua resposta';
    }
    botao.textContent = texto;
  });

  const feedback = document.getElementById('quiz-feedback');
  feedback.classList.remove('hidden');
  feedback.style.backgroundColor = correta ? '#EAF1F0' : '#F6E7E1';
  document.getElementById('quiz-feedback-texto').textContent = correta
    ? 'Certo! ' + pergunta.feedback
    : pergunta.feedbackAlternativas[alternativaSelecionada];
  document.getElementById('quiz-feedback-dica').classList.toggle('hidden', correta);

  const botaoAcao = document.getElementById('quiz-botao-acao');
  botaoAcao.textContent = perguntaAtual < quizQuestions.length - 1
    ? 'Próxima Pergunta'
    : 'Ver Meu Resultado';
  botaoAcao.disabled = false;

  feedback.focus();
}

function confirmarResposta() {
  if (alternativaSelecionada === null || respondida) return;
  avaliarResposta();
}

document.getElementById('quiz-botao-acao').addEventListener('click', () => {
  if (!respondida) {
    confirmarResposta();
  } else if (perguntaAtual < quizQuestions.length - 1) {
    perguntaAtual++;
    renderPergunta();
    rolarPara(document.getElementById('quiz-progresso'), document.getElementById('quiz-enunciado'));
  } else {
    mostrarResultado();
  }
});

function getMensagemResultado(score) {
  return score === quizQuestions.length
    ? 'Parabéns! Você está super protegido contra golpes digitais. Compartilhe esse conhecimento!'
    : 'Parabéns por concluir! Estar informado é a sua maior proteção. Lembre-se: os golpistas têm pressa, mas você tem o controle. Na dúvida, respire, não clique e peça ajuda a alguém de confiança.';
}

function salvarResultadoLocalStorage() {
  const registro = {
    data: new Date().toISOString(),
    pontuacao: pontuacao,
    total: quizQuestions.length,
    respostas: historicoRespostas
  };
  try {
    localStorage.setItem('golpes-quiz-resultado', JSON.stringify(registro));
  } catch (e) {}
}

// Monta o iframe de um Google Form dentro de `containerId` e mostra a seção `secaoId`.
// Se a URL estiver vazia, não faz nada: a seção continua escondida.
function mostrarFormulario(secaoId, containerId, url, titulo) {
  if (!url || !url.trim()) return;
  if (!url.startsWith('https://docs.google.com/forms/')) {
    console.warn('A URL do formulário deveria ser o link de incorporação do Google Forms (https://docs.google.com/forms/...). Recebido:', url);
  }
  const secao = document.getElementById(secaoId);
  const container = document.getElementById(containerId);
  if (container.childElementCount === 0) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.title = titulo;
    iframe.width = '100%';
    iframe.height = '520';
    iframe.loading = 'lazy';
    iframe.style.border = '0';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    // Defesa em profundidade: só as permissões que o Google Forms
    // realmente precisa pra carregar e enviar a resposta.
    iframe.sandbox = 'allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox';
    container.appendChild(iframe);
  }
  secao.hidden = false;
}

// Carrega o GoatCounter e, quando ele estiver pronto, mostra o número de visitas no rodapé.
// Se a constante estiver vazia ou inválida, não faz nada.
function iniciarEstatisticas(codigo) {
  codigo = (codigo || '').trim();
  if (!codigo) return;
  if (!/^[a-z0-9-]+$/i.test(codigo)) {
    console.warn('GOATCOUNTER_CODE deve ter só letras, números e hífen (o trecho antes de ".goatcounter.com"). Recebido:', codigo);
    return;
  }
  const base = `https://${codigo}.goatcounter.com`;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = `${base}/count`;
  script.addEventListener('load', () => mostrarContadorVisitas(base));
  document.head.appendChild(script);
}

// Usa o contador da própria página (e não o "TOTAL" do site, que também soma os eventos do quiz).
// Qualquer falha (contador desativado, sem rede, página ainda sem visitas) mantém o rodapé como está.
async function mostrarContadorVisitas(base) {
  try {
    const dados = window.goatcounter && window.goatcounter.get_data ? window.goatcounter.get_data() : null;
    const caminho = (dados && dados.p) || window.location.pathname;
    const resposta = await fetch(`${base}/counter/${encodeURIComponent(caminho)}.json`);
    if (!resposta.ok) return;
    const { count } = await resposta.json();
    if (!count) return;
    const contador = document.getElementById('contador-visitas');
    contador.textContent = `${count} ${count === '1' ? 'visita' : 'visitas'} ao site`;
    contador.hidden = false;
  } catch (e) {}
}

// Conta, de forma anônima (só +1, sem pontuação nem dados da pessoa), quantos quizzes foram concluídos.
function contarQuizConcluido() {
  if (window.goatcounter && typeof window.goatcounter.count === 'function') {
    window.goatcounter.count({ path: 'quiz-concluido', title: 'Quiz concluído', event: true });
  }
}

function mostrarResultado() {
  document.getElementById('quiz').hidden = true;
  const resultado = document.getElementById('resultado');
  resultado.hidden = false;
  document.getElementById('resultado-mensagem').textContent = getMensagemResultado(pontuacao);
  salvarResultadoLocalStorage();
  contarQuizConcluido();
  mostrarFormulario('feedback', 'feedback-iframe-container', GOOGLE_FORM_URL, 'Formulário de feedback');
  rolarPara(resultado, document.querySelector('#resultado h2'));
}

function reiniciarQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  historicoRespostas = [];
  document.getElementById('resultado').hidden = true;
  document.getElementById('feedback').hidden = true;
  document.getElementById('quiz').hidden = false;
  renderPergunta();
  rolarPara(document.getElementById('quiz-progresso'));
}

document.getElementById('quiz-refazer').addEventListener('click', reiniciarQuiz);

document.getElementById('quiz-total-perguntas').textContent = quizQuestions.length;
renderPergunta();
mostrarFormulario('relato', 'relato-iframe-container', GOOGLE_FORM_RELATO_URL, 'Formulário anônimo para relatar um golpe');
iniciarEstatisticas(GOATCOUNTER_CODE);

// Modo acessibilidade (texto grande + alto contraste)
const toggleAcessibilidade = document.getElementById('toggle-acessibilidade');

function atualizarBotaoAcessibilidade() {
  const ativo = document.documentElement.classList.contains('modo-acessivel');
  toggleAcessibilidade.setAttribute('aria-pressed', String(ativo));
}

toggleAcessibilidade.addEventListener('click', () => {
  document.documentElement.classList.toggle('modo-acessivel');
  const ativo = document.documentElement.classList.contains('modo-acessivel');
  try {
    localStorage.setItem('acessibilidade-ativa', String(ativo));
  } catch (e) {}
  atualizarBotaoAcessibilidade();
});

atualizarBotaoAcessibilidade();

// Botão "Ouvir" (Web Speech API)
function falar(texto) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'pt-BR';
  window.speechSynthesis.speak(utterance);
}

if (!('speechSynthesis' in window)) {
  document.querySelectorAll('.btn-ouvir').forEach((botao) => {
    botao.hidden = true;
  });
} else {
  document.getElementById('quiz-ouvir-pergunta').addEventListener('click', () => {
    const pergunta = quizQuestions[perguntaAtual];
    const alternativasFaladas = pergunta.alternativas
      .map((texto, i) => `${String.fromCharCode(97 + i)}, ${texto}`)
      .join('. ');
    falar(`${pergunta.enunciado}. ${alternativasFaladas}`);
  });

  document.getElementById('quiz-ouvir-feedback').addEventListener('click', () => {
    falar(document.getElementById('quiz-feedback-texto').textContent);
  });
}

// Exportar resultados em CSV
function gerarCSV() {
  const registroBruto = localStorage.getItem('golpes-quiz-resultado');
  if (!registroBruto) return null;

  const registro = JSON.parse(registroBruto);
  const dataFormatada = new Date(registro.data).toLocaleString('pt-BR');
  const linhas = [['Data', 'Pontuação', 'Tema', 'Resposta Certa', 'Sua Resposta', 'Acertou']];

  registro.respostas.forEach((r) => {
    linhas.push([
      dataFormatada,
      `${registro.pontuacao}/${registro.total}`,
      r.tema,
      r.correta,
      r.suaResposta,
      r.acertou ? 'Sim' : 'Não'
    ]);
  });

  const escapar = (campo) => `"${String(campo).replace(/"/g, '""')}"`;
  return '﻿' + linhas.map((linha) => linha.map(escapar).join(',')).join('\r\n');
}

document.getElementById('quiz-exportar').addEventListener('click', () => {
  const csv = gerarCSV();
  if (!csv) return;

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resultado-quiz-seguranca-digital.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

// Baixar guia em PDF (imprimir / salvar como PDF pelo navegador)
document.getElementById('btn-imprimir').addEventListener('click', () => {
  window.print();
});

// Compartilhar no WhatsApp
const linkCompartilhar = document.getElementById('whatsapp-compartilhar');
const mensagemCompartilhar = 'Olha esse guia rápido para reconhecer os golpes digitais mais comuns e não cair neles:';
linkCompartilhar.href = `https://wa.me/?text=${encodeURIComponent(mensagemCompartilhar + ' ' + window.location.href)}`;
