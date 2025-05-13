## Arquitetura do Projeto

```
adotai-pets-frontend
├────docs
├───public
│   └───assets
└───src
    ├───auth
    │   ├───organization
    │   │   ├───constants
    │   │   ├───login
    │   │   │   └───services
    │   │   └───register
    │   │       └───services
    │   └───user
    │       ├───constants
    │       ├───login
    │       │   └───services
    │       └───register
    │           └───services
    ├───components
    │   └───decorations
    │       └───svg
    ├───constants
    ├───contexts
    ├───pages
    │   ├───animalManagement
    │   │   ├───components
    │   │   ├───constants
    │   │   └───services
    │   └───home
    │       └───constants
    ├───routers
    ├───services
    │   └───axios-config
    │       └───interceptors
    ├───theme
    └───types
```

---

## Descrições dos Diretórios

### `docs`

Diretório destinado a documentação do projeto.

### `public`

Contém arquivos estáticos que são servidos diretamente pelo servidor web.

#### `public/assets`

Arquivos estáticos como imagens, logos e outros recursos visuais públicos.

### `src`

Diretório principal onde reside todo o código-fonte da aplicação React.

#### `src/auth`

Módulo responsável pela funcionalidade de autenticação, separado por tipo de usuário.

- `src/auth/organization`: Lógica de autenticação para organizações.
  - `src/auth/organization/constants`: Constantes específicas para autenticação de organizações.
  - `src/auth/organization/login/services`: Serviços relacionados ao login de organizações.
  - `src/auth/organization/register/services`: Serviços relacionados ao registro de organizações.
- `src/auth/user`: Lógica de autenticação para usuários.
  - `src/auth/user/constants`: Constantes específicas para autenticação de usuários.
  - `src/auth/user/login/services`: Serviços relacionados ao login de usuários.
  - `src/auth/user/register/services`: Serviços relacionados ao registro de usuários.

#### `src/components`

Contém componentes de UI reutilizáveis.

- `src/components/decorations/svg`: Componentes SVG utilizados para decoração ou ícones.

#### `src/constants`

Constantes globais utilizadas em toda a aplicação (chaves de API, mensagens, enums, etc.).

#### `src/contexts`

Gerenciamento de estado global através do Context API do React (autenticação, tema, etc.).

#### `src/pages`

Componentes que representam as diferentes páginas da aplicação.

- `src/pages/animalManagement`: Funcionalidades relacionadas ao gerenciamento de animais.
  - `src/src/pages/animalManagement/components`: Componentes específicos da página de gerenciamento de animais.
  - `src/src/pages/animalManagement/constants`: Constantes específicas para a página de gerenciamento de animais.
  - `src/src/pages/animalManagement/services`: Serviços de API relacionados ao gerenciamento de animais.
- `src/pages/home`: Página inicial da aplicação.
  - `src/pages/home/constants`: Constantes específicas da página inicial.

#### `src/routers`

Configuração e gerenciamento das rotas da aplicação (rotas públicas, privadas, etc.).

#### `src/services`

Serviços utilitários para comunicação com APIs e outras lógicas de negócio.

- `src/services/axios-config`: Configuração base da biblioteca Axios para requisições HTTP.
  - `src/services/axios-config/interceptors`: Interceptadores do Axios para tratamento de requisições e respostas (autenticação, erros, etc.).

#### `src/theme`

Definições de estilo visual da aplicação (cores, tipografia, espaçamento, etc.).

#### `src/types`

Definições de tipos TypeScript (interfaces, tipos genéricos, etc.) para garantir a tipagem estática em toda a aplicação.
