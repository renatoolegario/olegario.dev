# Painel interno do app

## Rotas criadas

- `/app`: entrada principal com autenticação por senha.
- `/app/tasks`: lista hardcoded de objetivos.
- `/app/tasks/youtube`: detalhe da frente de YouTube.
- `/app/tasks/instagram`: detalhe da frente de Instagram.
- `/app/tasks/uaistack`: detalhe da frente de UaiStack.
- `/app/tasks/estrategias`: detalhe da frente de Estratégias.

## Autenticação

- O login valida a senha definida no ambiente do projeto.
- A sessão é armazenada em cookie `HttpOnly`.
- Quando o usuário não está autenticado, as páginas internas redirecionam para `/app`.

## Observação

- Configure a senha no `.env` com `PASSWORD=sua_senha`.
