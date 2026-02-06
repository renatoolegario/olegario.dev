# Home (Landing Page)

## Descrição
Landing page em estilo Expert/Infoproduto inspirada na linha visual do template SaaSable (MUI), com hero forte, CTAs, blocos de autoridade técnica, stack, projetos, atualização técnica recente e seção de contatos priorizados para portfólio.

## Props utilizadas
- `LandingPageTemplate`
  - `sections`: lista de blocos da landing com estrutura flexível.
- `LandingSection`
  - `section`: objeto com os campos opcionais:
    - `id`
    - `label`
    - `title`
    - `paragraphs`
    - `highlights`
    - `bullets`
    - `groups`
    - `contacts`

## Funções internas
- `useMemo` em `HomePage` para manter estável a estrutura de conteúdo e evitar recriação desnecessária da árvore de dados.

## Resultado esperado
- Hero principal com posicionamento claro de especialista e botões de ação.
- Layout card-based com visual clean inspirado em dashboards/landing da linha Berry/SaaS.
- Conteúdo integral de perfil técnico, projetos, forma de trabalho e contatos em ordem de prioridade.
- Inclusão explícita da atualização técnica sobre `github-breakout` com utilitária, endpoint, testes, commit e PR.
