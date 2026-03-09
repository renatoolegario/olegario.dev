# AGENTS.md - Diretriz Genérica para Landing Page

## Objetivo
Implementar e evoluir a landing page do projeto `{{NOME_PROJETO}}` com visual premium, responsivo e dados reais da operação.

## Referências Visuais (Obrigatório)
Use os sites abaixo como referência de linguagem visual, animações e interações:
- `{{SITE_REFERENCIA_1}}`
- `{{SITE_REFERENCIA_2_OPCIONAL}}`

Regras:
- Usar referência de estilo/comportamento, não copiar conteúdo textual.
- Adaptar identidade visual e textos para o projeto atual.

## Stack e Escopo
- Framework: `{{FRAMEWORK}}` (ex.: Next.js)
- Padrão de UI: seguir convenções já existentes no projeto
- Não adicionar bibliotecas de animação sem necessidade
- Preferir componentes e estilo nativos da base (ex.: CSS Modules)

## Direção de Design
- Layout moderno, limpo, com contraste forte e legibilidade alta
- Hierarquia tipográfica clara
- Cards com acabamento premium (borda, sombra, gradiente sutil)
- Consistência visual entre seções

## Interações Obrigatórias
1. Hover de cards:
- Elevação suave + leve tilt
- Destaque de borda e sombra no hover
- Efeito shimmer opcional (recomendado)

2. Entrada em scroll:
- Variações de reveal (lift/rise/fade)
- Blur + deslocamento inicial + transição suave
- Delays progressivos entre cards

3. Modal:
- Backdrop com fade-in
- Painel com animação de entrada (subida + scale)
- Fechar com clique fora e tecla ESC
- Travar scroll do body enquanto modal estiver aberto

4. Acessibilidade e motion:
- Respeitar `prefers-reduced-motion`
- Usar `aria-label`, `role="dialog"`, `aria-modal` quando aplicável

## Dados Reais (Obrigatório)
Não usar mock em produção para métricas da landing.

Regra:
- Criar ou usar endpoint(s) nas pastas de API do projeto (ex.: `{{PASTA_API_1}}`, `{{PASTA_API_2}}`)
- Endpoint(s) devem executar contagens (`COUNT`) das tabelas reais que alimentam o sistema
- Retornar payload padronizado para a landing consumir
- Normalizar valores categóricos (acentos, caixa alta/baixa, espaços) antes de agrupar
- Tratar ausência de tabela/coluna sem quebrar a página
- Exibir fallback amigável enquanto carrega ou quando falhar

Formato recomendado da API:
- `data.counts.<chave_metrica>`
- `data.updated_at`

## Conteúdo
- Idioma: `{{IDIOMA}}` (ex.: pt-BR)
- Texto claro e objetivo
- Padronizar singular/plural em toda a página
- Frases de métricas devem seguir um único padrão por seção

## Restrições
- Não quebrar rotas, âncoras e estrutura existente
- Não usar seletor global inválido em CSS Module
- Evitar regressão visual em componentes já aprovados

## Definição de Pronto
- Build sem erro
- Layout responsivo (desktop/mobile)
- Hover/entrada/modal funcionando
- Métricas vindas de endpoint real com contagem de banco
- Sem mocks ativos para indicadores de produção

## Placeholders Rápidos
- `{{NOME_PROJETO}}`: nome do projeto alvo
- `{{SITE_REFERENCIA_1}}`: URL de referência principal
- `{{SITE_REFERENCIA_2_OPCIONAL}}`: segunda referência (se houver)
- `{{FRAMEWORK}}`: stack principal
- `{{PASTA_API_1}}`: primeira pasta de API
- `{{PASTA_API_2}}`: segunda pasta de API (opcional)
- `{{IDIOMA}}`: idioma dos textos
