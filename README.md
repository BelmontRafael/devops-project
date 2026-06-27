# Casa Church Infra

Este repositorio contem a entrega final da disciplina de Gerencia de Configuração. O projeto original foi recebido em dois componentes, `backend` e `frontend`, e o objetivo deste trabalho foi adicionar a camada de infraestrutura, automacao, seguranca e deploy ao redor da aplicacao, sem substituir a regra de negocio original.

## Repositorios Originais

```text
Backend original:  
Frontend original: 
```

## Visao Geral

O projeto foi publicado em ambiente cloud real na Azure, usando:

```text
Terraform   -> provisionamento da infraestrutura
Docker      -> empacotamento do backend e frontend
ACR         -> registry privado das imagens
AKS         -> execucao da API backend em Kubernetes
VM Linux    -> execucao do frontend Docker e do Nginx Gateway
Nginx       -> API Gateway e ponto unico de entrada externo
Ansible     -> automacao de deploy
GitHub Actions -> pipeline CI/CD
SonarQube   -> analise de qualidade com Quality Gate
Trivy       -> SAST/scan da imagem Docker
OWASP ZAP   -> DAST contra o gateway
PostgreSQL  -> banco principal na Azure e cluster demonstrativo no AKS
```

A arquitetura final ficou organizada assim:

```text
Usuario
  |
  v
IP publico da VM Azure
Nginx Gateway
  |
  +-- /        -> frontend React em container Docker na VM
  |
  +-- /api/   -> Ingress Nginx no AKS -> Service -> pods backend NestJS

Backend NestJS
  |
  v
Azure Database for PostgreSQL Flexible Server

AKS tambem executa um cluster PostgreSQL demonstrativo:
  - 1 StatefulSet primario
  - 1 StatefulSet de leitura com 2 replicas
```

## Aplicacoes Principais

O projeto possui dois componentes principais, mantidos conforme recebidos originalmente.

| Componente | Stack | Publicacao | Responsabilidade |
|---|---|---|---|
| Backend | Node.js, NestJS, Sequelize, PostgreSQL | AKS | API principal da aplicacao Casa Church. Expoe rotas REST para usuarios, autenticacao, eventos, posts, comentarios, cursos, curtidas, doacoes e demais recursos. |
| Frontend | React, Vite, Axios | VM Linux com Docker | Interface web da aplicacao. Consome a API pelo gateway usando o prefixo `/api`. |

O frontend foi publicado como a primeira aplicacao containerizada em Docker na VM, enquanto o backend foi publicado como a segunda aplicacao no Kubernetes.

## Rotas Principais

O acesso externo deve ser feito somente pelo gateway:

```text
http://<IP_PUBLICO_DA_VM>/
http://<IP_PUBLICO_DA_VM>/api/health
http://<IP_PUBLICO_DA_VM>/api/docs
```

O backend possui, entre outras, as seguintes rotas:

| Grupo | Rotas |
|---|---|
| Health check | `GET /health` |
| Autenticacao | `POST /auth/login` |
| Usuarios | `POST /users`, `GET /users`, `GET /users/:id`, `PATCH /users/:id`, `DELETE /users/:id` |
| Posts | `POST /posts`, `GET /posts`, `GET /posts/:id`, `DELETE /posts/:id` |
| Comentarios | `POST /comments`, `GET /comments`, `GET /comments/:id`, `DELETE /comments/:id` |
| Curtidas | `POST /likes`, `GET /likes`, `GET /likes/:id`, `DELETE /likes/:id` |
| Eventos | `POST /events`, `GET /events`, `GET /events/:id`, `PATCH /events/:id`, `DELETE /events/:id` |
| Inscricoes | `POST /registrations`, `GET /registrations`, `GET /registrations/:id`, `PATCH /registrations/:id`, `DELETE /registrations/:id` |
| Aulas | `POST /lessons`, `GET /lessons`, `GET /lessons/:id`, `PATCH /lessons/:id`, `DELETE /lessons/:id` |
| Progresso de aulas | `POST /lesson-progress`, `GET /lesson-progress`, `PATCH /lesson-progress/:lessonId`, `DELETE /lesson-progress/:lessonId` |
| Sermoes | `POST /sermons`, `GET /sermons`, `GET /sermons/:id`, `PATCH /sermons/:id`, `DELETE /sermons/:id` |
| Locais | `POST /locations`, `GET /locations`, `GET /locations/:id`, `PATCH /locations/:id`, `DELETE /locations/:id` |
| Mensagens de contato | `POST /contact-messages`, `GET /contact-messages`, `GET /contact-messages/:id`, `PATCH /contact-messages/:id`, `DELETE /contact-messages/:id` |
| Doacoes | `POST /donations`, `GET /donations`, `GET /donations/:id`, `PATCH /donations/:id`, `DELETE /donations/:id` |
| Atividade de usuario | `POST /user-activity`, `GET /user-activity`, `GET /user-activity/:id`, `DELETE /user-activity/:id` |

No gateway, todas as rotas do backend recebem o prefixo externo `/api`. Por exemplo:

```text
GET  /api/health
POST /api/auth/login
GET  /api/posts
GET  /api/docs
```

## API Gateway

O gateway foi implementado com Nginx instalado na VM Linux da Azure. A configuracao fica em:

```text
infra/gateway/nginx.conf.j2
```

Rotas configuradas:

```text
/      -> frontend Docker rodando localmente na VM em 127.0.0.1:8080
/api/  -> Ingress Nginx do AKS, que encaminha para o Service da API backend
```

Exemplo simplificado:

```nginx
location /api/ {
    proxy_pass http://<INGRESS_AKS>/;
}

location / {
    proxy_pass http://127.0.0.1:8080;
}
```

O gateway e o unico ponto de entrada externo esperado para a aplicacao. Para reforcar isso, o LoadBalancer do Ingress Controller do AKS foi restringido para aceitar trafego apenas do IP publico da VM:

```bash
kubectl patch svc ingress-nginx-controller -n ingress-nginx --type merge \
  -p '{"spec":{"loadBalancerSourceRanges":["<IP_PUBLICO_DA_VM>/32"]}}'
```

Assim, o usuario acessa apenas:

```text
http://<IP_PUBLICO_DA_VM>
```

e nao acessa diretamente:

```text
http://<IP_PUBLICO_DO_INGRESS_AKS>
```

## Docker

O backend e o frontend possuem Dockerfiles proprios com multi-stage build.

### Backend

Arquivo:

```text
backend/Dockerfile
```

Caracteristicas:

```text
Imagem base: node:22-alpine
Build stage: instala dependencias e compila o NestJS
Runtime stage: instala apenas dependencias de producao
Porta: 3000
Comando: node dist/main
```

Imagem publicada no ACR:

```text
<ACR_LOGIN_SERVER>/casa-church-backend:dev
```

### Frontend

Arquivo:

```text
frontend/Dockerfile
```

Caracteristicas:

```text
Build stage: Node.js + Vite
Runtime stage: Nginx
Build arg: VITE_API_URL=/api
Porta: 80
```

Imagem publicada no ACR:

```text
<ACR_LOGIN_SERVER>/casa-church-frontend:dev
```

## Kubernetes

O backend roda no AKS dentro do namespace:

```text
casa-church
```

Arquivos principais:

```text
infra/kubernetes/namespace.yaml
infra/kubernetes/deployment.yaml
infra/kubernetes/service.yaml
infra/kubernetes/ingress.yaml
infra/kubernetes/hpa.yaml
infra/kubernetes/resource-quota.yaml
infra/kubernetes/limit-range.yaml
infra/kubernetes/configmap.yaml
infra/kubernetes/secret.example.yaml
```

Recursos implementados:

| Recurso | Descricao |
|---|---|
| Namespace | Isola os recursos do projeto em `casa-church`. |
| Deployment | Executa a API backend com 2 replicas. |
| RollingUpdate | Atualizacao com `maxUnavailable: 1` e `maxSurge: 1`. |
| Service | Expoe a API internamente no cluster. |
| Ingress | Roteia chamadas do Ingress Controller para o Service da API. |
| HPA | Escala a API com base em CPU, alvo de 60%. |
| ResourceQuota | Limita CPU, memoria e quantidade de pods no namespace. |
| LimitRange | Define requests/limits padrao para containers. |
| Liveness probe | Valida disponibilidade do container em `/health`. |
| Readiness probe | Valida se o pod pode receber trafego em `/health`. |

O HPA esta configurado em:

```yaml
minReplicas: 2
maxReplicas: 4
averageUtilization: 60
```

O Deployment usa:

```yaml
replicas: 2
strategy:
  type: RollingUpdate
```

## Banco De Dados

O projeto utiliza duas camadas de banco por decisao academica, cobrindo os dois requisitos solicitados.

### Banco Principal Da Aplicacao

O banco real usado pelo backend e:

```text
Azure Database for PostgreSQL Flexible Server
```

Ele e provisionado pelo Terraform no modulo:

```text
infra/terraform/modules/database
```

O backend aponta para esse banco por meio do ConfigMap e Secret:

```text
PGHOST      -> FQDN do PostgreSQL Azure
PGDATABASE  -> casa_church
PGUSER      -> casachurchadmin
PGPASSWORD  -> criado pela pipeline a partir do DEPLOY_ENV
PGSSLMODE   -> require
```

O schema da aplicacao e criado automaticamente pelo backend na inicializacao:

```sql
CREATE SCHEMA IF NOT EXISTS "casa-church";
```

### Cluster PostgreSQL Demonstrativo No Kubernetes

Para atender ao requisito de cluster de leitura no Kubernetes, foi criado um cluster PostgreSQL dentro do AKS com StatefulSet:

```text
infra/kubernetes/database/secret.yaml
infra/kubernetes/database/services.yaml
infra/kubernetes/database/statefulset-primary.yaml
infra/kubernetes/database/statefulset-read.yaml
```

Recursos criados:

| Recurso | Quantidade | Funcao |
|---|---:|---|
| `casa-church-postgres-primary` | 1 pod | Instancia primaria do PostgreSQL. |
| `casa-church-postgres-read` | 2 pods | Replicas de leitura. |
| `casa-church-postgres-primary` Service | 1 | Service interno para escrita. |
| `casa-church-postgres-read` Service | 1 | Service interno para leitura. |
| PVCs | 3 | Volume persistente para cada pod. |

A validacao da replica pode ser feita com:

```powershell
kubectl run pg-read-test -n default --rm -it --image=postgres:16 --restart=Never -- `
  psql "host=casa-church-postgres-read.casa-church.svc.cluster.local port=5432 dbname=casa_church user=casachurchadmin password=postgres sslmode=disable" -P pager=off -c "select pg_is_in_recovery();"
```

Resultado esperado:

```text
pg_is_in_recovery
-------------------
t
```

Esse resultado indica que a conexao foi feita em uma replica de leitura.

## Terraform

O Terraform provisiona a infraestrutura na Azure.

Diretorio:

```text
infra/terraform
```

Modulos:

| Modulo | Responsabilidade |
|---|---|
| `container_registry` | Cria o Azure Container Registry privado. |
| `network` | Cria a rede virtual e subnet da VM. |
| `compute` | Cria a VM Linux do frontend/gateway com IP publico e identidade gerenciada. |
| `database` | Cria o Azure Database for PostgreSQL Flexible Server. |
| `aks` | Cria o cluster AKS com 2 worker nodes e associacao com o ACR. |

Principais recursos provisionados:

```text
Resource Group
Azure Container Registry
Virtual Network
Subnet
Network Security Group
Linux Virtual Machine
Azure PostgreSQL Flexible Server
AKS com 2 worker nodes
Role assignment para pull de imagens do ACR
```

Comandos principais:

```powershell
cd infra/terraform

terraform init
terraform plan
terraform apply
```

Outputs importantes:

```powershell
terraform output -raw resource_group_name
terraform output -raw acr_name
terraform output -raw acr_login_server
terraform output -raw frontend_vm_public_ip
terraform output -raw postgresql_fqdn
terraform output -raw aks_cluster_name
```

## Ansible

O deploy e automatizado por Ansible.

Diretorio:

```text
infra/ansible
```

Playbooks:

| Playbook | Funcao |
|---|---|
| `deploy-k8s.yml` | Aplica manifests Kubernetes, instala Ingress Controller, restringe o Ingress ao IP da VM gateway, aplica PostgreSQL StatefulSet, aplica API, HPA, Service e Ingress. |
| `deploy-docker.yml` | Acessa a VM por SSH, instala dependencias, faz login no ACR, baixa imagem do frontend, reinicia o container Docker e configura o Nginx Gateway. |

O playbook do Kubernetes e executado localmente pelo runner do GitHub Actions usando o `kubeconfig` do AKS:

```bash
ansible-playbook infra/ansible/playbooks/deploy-k8s.yml \
  -e "gateway_public_ip=$FRONTEND_VM_PUBLIC_IP"
```

O playbook da VM usa SSH:

```bash
ansible-playbook \
  -i infra/ansible/hosts.ini \
  infra/ansible/playbooks/deploy-docker.yml \
  -e "acr_name=$ACR_NAME acr_login_server=$ACR_LOGIN_SERVER api_backend_url=http://$INGRESS_IP"
```

## Pipeline CI/CD

Workflow:

```text
.github/workflows/deploy-automation.yml
```

O workflow esta configurado com acionamento manual:

```yaml
on:
  workflow_dispatch:
```

Essa decisao evita deploys desnecessarios em ambiente cloud pago. Cada execucao da pipeline pode reconstruir imagens, publicar no ACR, reiniciar pods no AKS, atualizar a VM e executar DAST.

Etapas da pipeline:

| Job | Descricao |
|---|---|
| `tests` | Executa testes unitarios do backend e frontend. |
| `sonar` | Sobe SonarQube em container Docker, executa scan e valida Quality Gate. |
| `build_push` | Builda imagens Docker, executa Trivy e publica imagens no ACR. |
| `deploy` | Executa deploy do AKS e da VM com Ansible. |
| `dast` | Executa OWASP ZAP baseline contra o gateway. |
| `notify` | Exibe resumo final da pipeline via `echo`. |

Fluxo:

```text
tests -> sonar -> build_push -> deploy -> dast -> notify
```

### Testes Unitarios

Backend:

```bash
cd backend
npm ci
npm test -- --runInBand --cacheDirectory ./.jest-cache
```

Frontend:

```bash
cd frontend
npm ci
npm test
npm run build
```

### SonarQube

O SonarQube e executado em container no proprio ambiente de CI:

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community
```

A pipeline cria um token temporario, executa o scan e valida o Quality Gate. Se o Quality Gate falhar, a pipeline tambem falha.

Configuracao do scanner:

```text
sonar-project.properties
```

### SAST Com Trivy

O Trivy faz scan da imagem Docker do backend:

```yaml
image-ref: casa-church-backend:${{ github.sha }}
severity: CRITICAL,HIGH
exit-code: 1
```

Assim, vulnerabilidades `HIGH` ou `CRITICAL` quebram a pipeline.

### DAST Com OWASP ZAP

O OWASP ZAP roda em modo baseline contra o gateway:

```yaml
target: ${{ secrets.GATEWAY_HOM_URL }}
```

O alvo deve ser:

```text
http://<IP_PUBLICO_DA_VM>
```

## Secrets Do GitHub Actions

Secrets esperadas:

```text
ACR_USERNAME
ACR_PASSWORD
DEPLOY_ENV
FRONTEND_VM_SSH_PRIVATE_KEY
GATEWAY_HOM_URL
KUBE_CONFIG_DATA
```

### DEPLOY_ENV

Modelo:

```env
ACR_NAME=<nome-do-acr>
ACR_LOGIN_SERVER=<login-server-do-acr>
FRONTEND_VM_PUBLIC_IP=<ip-publico-da-vm>
FRONTEND_VM_USER=azureuser
BACKEND_IMAGE_NAME=casa-church-backend
FRONTEND_IMAGE_NAME=casa-church-frontend
IMAGE_TAG=dev
POSTGRESQL_ADMIN_PASSWORD=<senha-do-postgresql-azure>
JWT_SECRET=<jwt-secret-da-api>
```

### KUBE_CONFIG_DATA

Gerado a partir do kubeconfig local:

```powershell
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((Get-Content "$env:USERPROFILE\.kube\config" -Raw))) | Set-Clipboard
```

### GATEWAY_HOM_URL

Formato:

```text
http://<IP_PUBLICO_DA_VM>
```

## Como Recriar O Ambiente

Ha um guia operacional detalhado em:

```text
COMANDOS_RECRIAR_AMBIENTE_E_PIPELINE.md
```

Resumo:

```powershell
cd infra/terraform
terraform init
terraform apply

az aks get-credentials `
  --resource-group <RESOURCE_GROUP> `
  --name <AKS_NAME> `
  --overwrite-existing
```

Depois e necessario atualizar as secrets do GitHub Actions, principalmente:

```text
KUBE_CONFIG_DATA
DEPLOY_ENV
ACR_USERNAME
ACR_PASSWORD
GATEWAY_HOM_URL
```

## Validacoes

### Gateway

```powershell
Invoke-RestMethod http://<IP_PUBLICO_DA_VM>/api/health
```

Esperado:

```text
status  service
------  ----------------
ok      casa-church-api
```

### Bloqueio Do Ingress Direto

```powershell
$INGRESS_IP = kubectl get svc ingress-nginx-controller -n ingress-nginx -o jsonpath="{.status.loadBalancer.ingress[0].ip}"
Invoke-RestMethod "http://$INGRESS_IP/health"
```

Esperado fora da VM:

```text
Falha de conexao ou timeout
```

### Kubernetes

```powershell
kubectl get nodes
kubectl get pods -n casa-church
kubectl get svc -n casa-church
kubectl get ingress -n casa-church
kubectl get hpa -n casa-church
kubectl get resourcequota -n casa-church
kubectl get limitrange -n casa-church
```

### Banco PostgreSQL No Kubernetes

```powershell
kubectl get statefulset -n casa-church
kubectl get pods -n casa-church -l app=casa-church-postgres
kubectl get svc -n casa-church | Select-String postgres
kubectl get pvc -n casa-church
```

Esperado:

```text
casa-church-postgres-primary   1/1
casa-church-postgres-read      2/2
```

### Banco Principal Azure

Verificar o host configurado na API:

```powershell
kubectl get configmap casa-church-api-config -n casa-church -o yaml
```

Comparar com:

```powershell
cd infra/terraform
terraform output -raw postgresql_fqdn
```
