<div align="center">

# 🛡️ Segurança Digital para Você

### Um guia interativo que ensina qualquer pessoa a reconhecer golpes digitais em poucos minutos

[![Acessar o site](https://img.shields.io/badge/🌐_Acessar_o_site-2C5F5A?style=for-the-badge)](https://marceladrumond.github.io/seguranca-digital/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Sem build step](https://img.shields.io/badge/build-nenhum-brightgreen?style=flat-square)
![Custo](https://img.shields.io/badge/custo-R%240-success?style=flat-square)

</div>

---

## 📖 Sobre o projeto

Golpes de Pix, clonagem de WhatsApp, links falsos e investimentos "milagrosos" fazem
milhares de vítimas todos os anos — e não escolhem idade, profissão ou classe social.
Quase todo mundo conhece alguém que já caiu em um. Este projeto existe para mudar isso
de um jeito simples: sem cadastro, sem letra miúda, sem jargão técnico.

Pensado para ser acessado por QR Code (em informativos impressos, murais e espaços de
convivência da comunidade), o site ensina em poucos minutos a reconhecer os golpes mais
comuns hoje no Brasil, testa o que a pessoa aprendeu num quiz com feedback imediato e,
se ela cair em um golpe, mostra o que fazer logo em seguida. Também dá para ouvir o
conteúdo em voz alta, aumentar o contraste e o tamanho do texto, ou levar um guia
impresso para casa.

Um **Projeto de Extensão** do curso de Análise e Desenvolvimento de Sistemas (ADS) da
**Universidade Anhembi Morumbi**, feito para pessoas de todas as idades.

## ✨ Funcionalidades

**Conteúdo educativo**
- **8 golpes mais comuns**, cada um com explicação curta e uma "Regra de ouro": Pix,
  WhatsApp clonado (com alerta sobre voz imitada por Inteligência Artificial), SMS,
  e-mails e links falsos, falsa central ou falso suporte, falsa vaga de emprego,
  investimento milagroso, compras e vendas falsas, perfis falsos e golpe do amor
- **Sinais que se repetem em quase todo golpe** — pressa, pedido de algo sensível, ganho
  fácil demais, contato inesperado e pedido de segredo — fechando com a regra "Pare.
  Respire. Confirme por outro caminho."
- **Quiz de 6 perguntas** com feedback específico para cada resposta errada — sem punir
  quem erra, só explicando o porquê
- Toque em outra alternativa para tentar de novo, na hora, sem botões extras
- **"Caí em um golpe. E agora?"** — seção sempre visível, em tom acolhedor e sem culpa,
  com os passos práticos: ligar para o banco, trocar senhas, registrar boletim de
  ocorrência, avisar contatos e guardar provas
- **Relato anônimo** ("Conhece alguém que já caiu em um golpe?") — formulário opcional
  para contar como o golpe chegou, sem nenhum dado pessoal (veja [Configuração](#️-configuração))

**Acessibilidade em primeiro lugar**
- Alto contraste e tipografia grande desde o início — não é um "modo especial", é o
  padrão da página
- Botão de acessibilidade ("Aa") que aumenta o texto e o contraste ainda mais, com a
  preferência salva entre visitas
- Botão "Ouvir" em cada pergunta e explicação, usando a Web Speech API do navegador
- Navegação completa por teclado, com foco bem gerenciado a cada transição de tela

**Para levar consigo**
- Guia em PDF compacto, de até **2 páginas A4** (os 8 golpes em duas colunas, os sinais e
  os passos de "Caí em um golpe"), com impressão otimizada e sem depender de nenhuma
  biblioteca externa
- Exportação dos resultados do quiz em CSV
- Compartilhamento direto com um familiar ou amigo pelo WhatsApp

**Para quem organiza o projeto**
- Contador de visitas opcional no rodapé, contagem anônima de quizzes concluídos e de
  acertos por pergunta, e acessos pelo QR separados dos demais, com o
  [GoatCounter](https://www.goatcounter.com) — sem cookies e sem dados pessoais (veja
  [Configuração](#️-configuração) e [Indicadores](#-indicadores-do-projeto))

Tudo isso rodando **100% no navegador** — sem servidor, sem banco de dados, sem custo
de hospedagem. As estatísticas do GoatCounter são opcionais: sem configurá-las, a página
não carrega nenhum script externo além das fontes.

## 🔗 Acesse

**[marceladrumond.github.io/seguranca-digital](https://marceladrumond.github.io/seguranca-digital/)**

## 🛠️ Tecnologias

Propositalmente simples — sem framework, sem build step, sem `npm install`:

| | |
|---|---|
| **Estrutura** | HTML5 semântico |
| **Estilo** | CSS puro — variáveis CSS, zero dependência de CDN de framework |
| **Interatividade** | JavaScript puro (vanilla, ES2017+) |
| **Fontes** | Google Fonts (Inter + Manrope) |
| **Voz** | Web Speech API, nativa do navegador |
| **Estatísticas** | GoatCounter, opcional e sem cookies |
| **Hospedagem** | GitHub Pages |

## 🚀 Rodando localmente

Não precisa instalar nada:

```bash
git clone https://github.com/MarcelaDrumond/seguranca-digital.git
cd seguranca-digital
python -m http.server 8000
```

Acesse `http://localhost:8000` — ou simplesmente abra o `index.html` direto no
navegador.

## 📁 Estrutura do projeto

```
seguranca-digital/
├── index.html      # conteúdo e estrutura da página
├── style.css       # design tokens, utilitários e CSS de impressão
├── script.js       # lógica do quiz e das funcionalidades extras
├── assets/         # imagens (hero + logo)
└── README.md
```

## ⚙️ Configuração

O site usa dois formulários do Google Forms, embutidos via iframe, e, opcionalmente, o
GoatCounter para estatísticas. Tudo é controlado por constantes no topo do `script.js`:

| Constante | Para que serve | Estado padrão |
|---|---|---|
| `GOOGLE_FORM_URL` | Feedback pós-quiz ("Isso te ajudou?"), exibido depois do resultado | **Configurado e ativo** |
| `GOOGLE_FORM_RELATO_URL` | Relato anônimo ("Conhece alguém que já caiu em um golpe?") | Vazio — a seção fica oculta |
| `GOATCOUNTER_CODE` | Contador de visitas, quizzes concluídos e acertos por pergunta | **Configurado e ativo** (`seguranca-digital`). Vazio, nada é carregado nem exibido |

Para usar o seu próprio formulário, abra-o no Google Forms → **Enviar** → aba `<>` →
copie a URL do atributo `src` (ela termina em `/viewform?embedded=true`) e cole na
constante correspondente. Links curtos `forms.gle` não funcionam no iframe: abra-os no
navegador e use a URL completa. Se a constante ficar vazia, a seção correspondente some
automaticamente — nada quebra.

### O formulário de relato precisa ser anônimo

O site **nunca coleta dados pessoais** e o relato só é útil se quem conta se sentir
seguro. Ao criar o formulário do relato:

- Não peça nome, e-mail, telefone, CPF nem qualquer dado de contato
- Em **Configurações → Respostas**, deixe desligadas as opções de coletar e-mails e
  "Limitar a 1 resposta" (que exige login no Google)
- Evite perguntas com upload de arquivo (também exigem login)
- Prefira perguntas simples: como o golpe chegou (WhatsApp, SMS, ligação, anúncio…) e o
  que a pessoa fez

A página já exibe, acima do formulário, o aviso: *"Não escreva nomes, telefones, CPF,
números de conta ou senhas; conte só como o golpe chegou e o que a pessoa fez."*

### Visitas e quizzes concluídos (GoatCounter, opcional)

O [GoatCounter](https://www.goatcounter.com) é um serviço gratuito de estatísticas que
não usa cookies e não guarda dados pessoais nem o IP completo. Para ativar:

1. Crie uma conta em goatcounter.com e escolha o **código do site**, o trecho que vem
   antes de `.goatcounter.com` (por exemplo, `meusite` para `meusite.goatcounter.com`).
2. Cole esse código na constante `GOATCOUNTER_CODE` do `script.js`.
3. Nas configurações do site no GoatCounter (**Settings**), ative **Allow adding visitor
   counts on your website**. Essa opção vem desligada; sem ela o número não aparece no
   rodapé.

O que passa a acontecer:

- Cada visita é contada, e o rodapé mostra "N visitas ao site". O número não é em tempo
  real: o GoatCounter guarda a resposta em cache por algumas horas. Se o contador falhar
  (ou ainda não houver visitas), o rodapé simplesmente não mostra nada.
- Cada quiz concluído (`quiz-concluido`) e cada primeira resposta (`pergunta-N-acerto` ou
  `pergunta-N-erro`) viram eventos anônimos. O painel do GoatCounter mostra só os totais:
  não mostra quem respondeu nem a pontuação de cada pessoa.
- As respostas dos formulários não passam pelo GoatCounter: você as vê na aba
  **Respostas** de cada Google Form.

Se a constante ficar vazia, nenhum script externo é carregado e o rodapé não muda.

## 📊 Indicadores do projeto

Nem tudo precisa passar pelo site. O que acontece em campo fica numa planilha; o que
acontece no site vem do GoatCounter e do formulário de feedback:

| Indicador | Onde medir | Como |
|---|---|---|
| Entrevistas | Planilha | Uma linha por entrevista (data, local, perfil, resumo) |
| Informativos instalados | Planilha | Uma linha por informativo (código, local, data de instalação) |
| Visitas ao site | GoatCounter | Total de visitas no painel (e no rodapé da página) |
| Acessos pelo QR | GoatCounter | O QR aponta para um endereço marcado (abaixo) |
| Quizzes concluídos | GoatCounter | Evento `quiz-concluido` |
| Acertos no quiz | GoatCounter | Eventos `pergunta-N-acerto` e `pergunta-N-erro` (abaixo) |
| "Aprendi algo novo" | Formulário de feedback | Pergunta no Google Forms (abaixo) |

### O QR Code

O QR deve apontar para o endereço do site com a marcação do informativo:

```
https://marceladrumond.github.io/seguranca-digital/?utm_campaign=informativo&utm_source=qr
```

No painel do GoatCounter, o acesso aparece na campanha **informativo** (widget
**Campaigns**) e com a origem **QR** (widget **Top referrers**). Assim os acessos pelo QR
ficam separados dos que chegam pelo link do WhatsApp ou digitando o endereço. Se mais
tarde houver QR diferentes (um por local, por exemplo), basta trocar `informativo` por um
nome para cada um.

- **Defina o endereço antes de imprimir.** Um QR já impresso com o endereço simples não
  dá para separar depois.
- O painel pode levar alguns segundos para mostrar um acesso novo.
- O botão de WhatsApp sempre compartilha o endereço **sem** esses parâmetros, para que
  quem entra pelo link compartilhado não seja contado como acesso de QR.
- O site registra todas as visitas na mesma página, com ou sem parâmetros, então o
  contador do rodapé soma também os acessos por QR.

### Acertos no quiz

Só a **primeira tentativa** de cada pergunta é registrada: quem erra e refaz já aprendeu
com o feedback, e a nova resposta não mede o que a pessoa sabia antes. A pontuação mostrada
na tela continua contando o acerto final.

A taxa de acerto de uma pergunta é `acertos ÷ (acertos + erros)`. Os eventos aparecem na
lista de eventos do painel do GoatCounter, com o tema da pergunta como título.

### "Aprendi algo novo"

O formulário de feedback é editado direto no Google Forms, não no site. Uma sugestão de
perguntas, mantendo-o anônimo:

1. "Você aprendeu algo novo?": Sim / Mais ou menos / Não
2. "Quer receber mais informativos?": Sim / Não
3. Opcional, texto livre: "O que você aprendeu?" (com o aviso de não escrever nomes nem
   dados pessoais)

### Planilha de campo

Sugestão de planilha **privada** (ela guarda dados de campo, então não faz parte deste
repositório), com as abas: *Entrevistas*, *Informativos* (código, local, datas e status),
*Quiz por pergunta* e *Resumo mensal*. Não registre nome, telefone nem CPF de
entrevistados.

## 🤖 Construção e desenvolvimento

Este projeto foi construído em parceria com o
**[Claude Code](https://claude.com/claude-code)**, da Anthropic — do design inicial até
os últimos ajustes de acessibilidade, incluindo a ampliação do público para toda a
comunidade. O processo incluiu:

- Levantamento de requisitos e definição de paleta/tipografia antes de escrever
  qualquer linha de código
- Implementação iterativa, com verificação real no navegador a cada mudança
- Uma auditoria de segurança completa antes da publicação — sem chaves ou segredos
  expostos, sem vulnerabilidades de XSS, histórico do Git limpo
- Revisão de acessibilidade em cada etapa: contraste, navegação por teclado, leitura em
  voz alta, tamanho das áreas de toque

A ideia não foi só gerar código, mas usar a IA como parceira real de desenvolvimento —
testando, revisando e refinando até o resultado ficar pronto pra uso de verdade por
pessoas de verdade.

## 👥 Créditos

Projeto de Extensão ADS — **Universidade Anhembi Morumbi**

## 📄 Licença

Distribuído sob a [Licença MIT](LICENSE). Projeto de uso educativo e gratuito:
sinta-se livre para adaptar para a sua própria instituição ou iniciativa social.
