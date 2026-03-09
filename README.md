# Olegario.dev

Landing page em Next.js focada na apresentação de serviços, projetos e stack técnica.

## Stack

- Next.js
- React
- Tailwind CSS
- lucide-react
- react-icons

## Estrutura ativa

```bash
components/
  atomic/Button.jsx
  molecules/
    GithubContribCalendar.jsx
    ProjectCard.jsx
    TechBadge.jsx
  organisms/
    Header.jsx
    Hero.jsx
    DifferentialSection.jsx
    ProjectsSection.jsx
    TechStack.jsx
    Footer.jsx

pages/
  _app.jsx
  index.jsx
  api/github/contributions.js
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Variaveis de ambiente

- `GITHUB_TOKEN` (opcional): usado no endpoint `/api/github/contributions`.
  - Sem token, a API retorna dados de fallback para a landing continuar funcionando.
