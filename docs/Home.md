# Home (Landing Page)

## Descrição
Página principal em formato de landing page para apresentação profissional do Olegário, com navegação por blocos e abertura de modais para leitura detalhada de cada tema (stack, posicionamento, projetos, IA, contatos e diferenciais).

## Props utilizadas
- `LandingPageTemplate`
  - `sections`: array de seções renderizadas na grade.
  - `onSelectSection`: callback para abrir modal com a seção selecionada.
- `SectionModal`
  - `open`: estado de abertura do modal.
  - `onClose`: callback de fechamento.
  - `section`: dados da seção ativa (título, subtítulo e conteúdos).

## Funções internas
- `useMemo` para manter estrutura de seções estável.
- `useState` para controlar `selectedIndex` e abertura do modal.

## Resultado esperado
- Hero claro com logotipo e foto pessoal.
- Layout organizado no padrão Atomic Design (`atomic`, `molecules`, `organisms`, `template`).
- Modais com conteúdo completo do briefing, sem reaproveitamento de textos antigos.
- Lista de contatos na ordem de portfólio técnico definida no briefing.
