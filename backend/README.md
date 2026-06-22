## Descrição

Um sistema web completo para gerenciamento da igreja, oferecendo funcionalidades para administração de eventos, sermões, doações, usuários e muito mais. A plataforma é construída para facilitar a organização interna da igreja e melhorar a experiência dos membros.

## 🛠 Funcionalidades

O sistema contempla diversas funcionalidades, incluindo:

- **Eventos:** Criação e gerenciamento de eventos da igreja (events, event_feedbacks, registrations).
- **Sermões:** Gerenciamento de sermões (sermons) para membros acompanharem conteúdos espirituais.
- **Conteúdos de Aprendizado:** Lições e progresso dos membros em estudos (lessons, lesson_progress).
- **Engajamento Social:** Curtidas e comentários em posts (posts, likes, comments).
- **Doações e Mensagens:** Registro de doações e mensagens de contato (donations, contact_messages).
- **Localizações:** Gerenciamento de locais de culto e eventos (locations).
- **Gerenciamento de Usuários:** Controle completo de membros e permissões (users).
- **Atividades de Usuário:** Registro automático de ações realizadas na aplicação (user_activity).
- **Regras de Negócio em Inscrições:** Controle de capacidade de locais e eventos, impedindo inscrições acima do limite.
- **Tarefas Automáticas:** Cancelamento automático de inscrições para eventos passados via cron job.

## 📥 Como Rodar o Projeto

#### 1. Clone o repositório:

```
$ git clone https://github.com/mendeslian/casa-church-server.git
$ cd casa-church-server
```

#### 2. Instale as dependências:

```
$ npm install
```

#### 3. Configure seu arquivo `.env` com as credenciais do banco de dados.

#### 4. Execute o projeto:

- Modo desenvolvimento:

```
$ npm run start
```

- Modo desenvolvimento com watch:

```
$ npm run start:dev
```

- Modo produção:

```
$ npm run start:prod
```

#### 5. Acesse a aplicação no navegador: `http://localhost:3000`


## ⚡ Tecnologias Utilizadas

- **Backend:** NestJS, Node.js, TypeScript  
- **Banco de Dados:** PostgreSQL / Sequelize  
- **Validação e Documentação:** class-validator, class-transformer, Swagger  
- **Agendamento de Tarefas:** @nestjs/schedule e cron  

## 📚 Detalhes do Sistema

- Permissões de roles (admin/user)
- Fluxo de autenticação JWT
- Registro de atividades de usuário (UserActivity)
- Regras de capacidade e cancelamento automático em eventos
- Exemplos práticos de uso da API
- Proteção de rotas e autorização
- Swagger integrado com URL de acesso
- Principais endpoints organizados por módulo
- Padrões utilizados (Repository, DTO, Guards, Interceptors, etc.)
- Estrutura de módulos padronizada
- Estratégias de cache e validação

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

