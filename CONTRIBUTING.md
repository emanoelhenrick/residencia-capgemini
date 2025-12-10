# BonVoyage - Sistema de Reservas de Hotel

## 🚀 Sobre a Aplicação

O BonVoyage é um sistema completo para reserva de quartos de hotel desenvolvido por estudantes. A aplicação permite que usuários busquem, visualizem e reservem quartos em diferentes acomodações, oferecendo uma experiência moderna e intuitiva tanto para hóspedes quanto para administradores.

### Funcionalidades Principais
- Busca de acomodações por **localização, preço e comodidades**
- Sistema de reservas com **confirmação instantânea**
- **Autenticação segura** de usuários
- **Interface web** responsiva e amigável
- Dados de demonstração pré-carregados para testes

## 💻 Stack Tecnológica

| Componente | Tecnologia | Versão/Detalhe |
|------------|------------|----------------|
| Backend | Java + Spring Boot | Java 21 |
| Frontend | Angular + TypeScript | Angular 20 |
| Banco de Dados | PostgreSQL | Versão 18.0 (Bitnami) |
| Autenticação | Spring Security | JWT (JSON Web Tokens) |

## ⚙️ Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

| Software | Versão Mínima | Onde Baixar |
|----------|---------------|-------------|
| **Docker** | 24.0+ | [docker.com](https://docker.com) |
| **Docker Compose** | 2.20+ | Incluído no Docker Desktop |
| **Git** | 2.30+ | [git-scm.com](https://git-scm.com) |

**Nota:** Embora o projeto utilize Java, Node.js e Maven, todas essas dependências estão contidas nos containers Docker. Apenas o Docker é necessário para executar o sistema.

### 🚀 Execução Rápida (Recomendada)

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd bonvoyage
   ```

2. **Execute o sistema com Docker Compose:**
   ```bash
   docker compose up --build
   ```

3. **Acesse a aplicação:**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8080
   - Banco de Dados: localhost:5432

### Configuração do Banco de Dados

O Docker Compose configura automaticamente:
- Container PostgreSQL: `bonvoyage-db`
- Credenciais padrão: usuário `docker`, senha `docker`
- Criação automática das tabelas
- Inserção de dados de exemplo

### Variáveis de Ambiente (Opcional)

Para customizações, você pode definir:

```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://bonvoyage-db:5432/bonvoyage
SPRING_DATASOURCE_USERNAME=docker
SPRING_DATASOURCE_PASSWORD=docker
JWT_SECRET=sua-chave-secreta-aqui
```

## 🧑‍💻 Desenvolvimento sem Docker

Caso prefira desenvolver sem Docker, instale:

| Software | Versão |
|----------|--------|
| Java JDK | 21 |
| Node.js | 18.x ou 20.x |
| PostgreSQL | 15+ |
| Maven | 3.8+ |

### Configuração Manual

1. **Banco de Dados:**
   ```sql
   CREATE DATABASE bonvoyage;
   CREATE USER docker WITH PASSWORD 'docker';
   GRANT ALL PRIVILEGES ON DATABASE bonvoyage TO docker;
   ```

2. **Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Frontend:**
   ```bash
   cd frontend
   npm install
   ng serve
   ```

## 📝 Dados de Teste

O sistema inclui automaticamente:

- **10 acomodações** (hotéis, pousadas e resorts)
- **50 quartos** com diferentes capacidades e preços
- **Comodidades**: WiFi, piscina, spa, etc.
- **Vibes**: romântico, familiar, aventura, etc.

## 👥 Equipe de Desenvolvimento

- **Everton Nunes** - Product Owner
- **Gabriela Menezes** - Scrum Master
- **Emanoel Henrick** - Desenvolvedor
- **Davi Lucas** - Desenvolvedor
- **Nicolas Natario** - Desenvolvedor

---

## CONTRIBUTING.md

### Como Contribuir

1. **Faça um Fork** do repositório
2. **Crie uma Branch** para sua feature:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. **Commit** suas alterações:
   ```bash
   git commit -m "feat: adiciona nova funcionalidade"
   ```
4. **Push** para a branch:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. **Abra um Pull Request**

### Padrões de Código

- **Backend**: Siga as convenções do Spring Boot e Java
- **Frontend**: Siga o style guide do Angular
- **Commits**: Use Conventional Commits
- **Documentação**: Mantenha a documentação atualizada

### Testes

- Execute os testes antes de submeter:
  ```bash
  # Backend
  mvn test
  
  # Frontend
  npm test
  ```

### Ambiente Docker para Desenvolvimento

Para desenvolvimento com hot-reload:

```bash
# Modo desenvolvimento
docker compose -f docker-compose.dev.yml up
```

### Issues e Discussões

- Use templates de issue fornecidos
- Documente bugs com passo a passo para reprodução
- Para novas features, discuta primeiro nas issues

### Código de Conduta

Respeite todos os colaboradores. Comportamentos inadequados não serão tolerados.

---

**Nota:** Esta documentação é mantida atualizada. Consulte sempre a versão mais recente no repositório oficial.
