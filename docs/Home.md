# Home (Landing Page)

## Descrição
Página principal em formato de landing page completa, com todo o conteúdo renderizado em seções contínuas na mesma página (sem modal), focada em apresentar posicionamento, stack, projetos, IA, automação/trading e canais de contato.

## Props utilizadas
- `LandingPageTemplate`
  - `sections`: array de seções com `id`, `title`, `emoji`, `paragraphs`, `bullets`, `badges`, `groups` e `contacts`.
- `LandingSection`
  - `section`: objeto da seção que será renderizada em bloco.

## Funções internas
- `useMemo` em `HomePage` para manter estável a estrutura de dados das seções.

## Resultado esperado
- Hero com `H1`, logotipo e imagem pessoal.
- Conteúdo integral do briefing na ordem correta.
- Layout claro e organizado no padrão Atomic Design.
- Sem modais suspensos: tudo acontece na mesma página.
