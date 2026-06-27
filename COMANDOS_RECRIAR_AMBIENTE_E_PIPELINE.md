# Guia Para Recriar O Ambiente E Rodar A Pipeline

Este guia deve ser usado para recriar corretamente a infraestrutura do projeto.

Ele concentra os comandos necessarios para:

- obter os novos outputs do Terraform;
- atualizar as secrets do GitHub Actions;
- validar o acesso ao AKS;
- rodar novamente a pipeline `Casa Church CI/CD`;
- testar gateway, AKS, PostgreSQL Azure e PostgreSQL demonstrativo no Kubernetes.

## 1. Subir A Infraestrutura Com Terraform

No PowerShell:

```powershell
cd infra/terraform

terraform init
terraform plan
terraform apply
```

Ao final, confirme se os recursos foram criados na Azure:

- Resource Group
- Azure Container Registry
- VM Linux
- Azure PostgreSQL Flexible Server
- AKS

## 2. Capturar Outputs Principais

Ainda em `infra/terraform`, rode:

```powershell
$RG = terraform output -raw resource_group_name
$AKS = terraform output -raw aks_cluster_name
$ACR_NAME = terraform output -raw acr_name
$ACR_LOGIN_SERVER = terraform output -raw acr_login_server
$VM_IP = terraform output -raw frontend_vm_public_ip
$PGHOST = terraform output -raw postgresql_fqdn
$PGDATABASE = terraform output -raw postgresql_database_name
$PGUSER = terraform output -raw postgresql_admin_login

terraform output
```

Essas variaveis ajudam a montar as secrets que a pipeline usa.

## 3. Configurar Acesso Local Ao AKS

```powershell
az aks get-credentials `
  --resource-group $RG `
  --name $AKS `
  --overwrite-existing
```

Valide:

```powershell
kubectl get nodes
```

Resultado esperado:

```text
2 nodes em estado Ready
```

## 4. Atualizar A Secret `KUBE_CONFIG_DATA`

O GitHub Actions precisa acessar o AKS. Para isso, salve o kubeconfig em base64.

PowerShell:

```powershell
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes((Get-Content "$env:USERPROFILE\.kube\config" -Raw))) | Set-Clipboard
```

No GitHub:

```text
Settings
Secrets and variables
Actions
Repository secrets
```

Atualize ou crie:

```text
KUBE_CONFIG_DATA
```

Cole o valor que ficou no clipboard.

## 5. Atualizar Credenciais Do ACR

A pipeline faz `docker login` no Azure Container Registry usando:

```text
ACR_USERNAME
ACR_PASSWORD
```

Depois de recriar o ACR, gere novamente essas credenciais.

PowerShell:

```powershell
az acr update --name $ACR_NAME --admin-enabled true

az acr credential show --name $ACR_NAME --query username -o tsv
az acr credential show --name $ACR_NAME --query "passwords[0].value" -o tsv
```

No GitHub, atualize ou crie:

```text
ACR_USERNAME
ACR_PASSWORD
```

## 6. Atualizar A Secret `DEPLOY_ENV`

A secret `DEPLOY_ENV` e um bloco `.env` usado pela pipeline.

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

Comando para montar um modelo com os valores conhecidos:

```powershell
@"
ACR_NAME=$ACR_NAME
ACR_LOGIN_SERVER=$ACR_LOGIN_SERVER
FRONTEND_VM_PUBLIC_IP=$VM_IP
FRONTEND_VM_USER=azureuser
BACKEND_IMAGE_NAME=casa-church-backend
FRONTEND_IMAGE_NAME=casa-church-frontend
IMAGE_TAG=dev
POSTGRESQL_ADMIN_PASSWORD=<coloque-a-senha-do-postgresql-azure>
JWT_SECRET=<coloque-o-jwt-secret>
"@ | Set-Clipboard
```

No GitHub, atualize:

```text
DEPLOY_ENV
```

Depois de colar o conteudo, substitua:

```text
<coloque-a-senha-do-postgresql-azure>
<coloque-o-jwt-secret>
```

### Atencao Com A Senha Do PostgreSQL

Se a API entrar em `CrashLoopBackOff` e o log mostrar:

```text
password authentication failed for user "casachurchadmin"
```

o problema provavelmente esta em:

```text
POSTGRESQL_ADMIN_PASSWORD
```

Essa senha precisa ser exatamente a mesma usada no PostgreSQL criado pelo Terraform.

## 7. Conferir A Secret `FRONTEND_VM_SSH_PRIVATE_KEY`

Normalmente essa secret nao muda se a VM nova foi criada usando a mesma chave publica configurada no Terraform.

Mesmo assim, confira se existe:

```text
FRONTEND_VM_SSH_PRIVATE_KEY
```

Ela deve conter a chave privada inteira:

```text
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

Para copiar sua chave local:

```powershell
Get-Content "$env:USERPROFILE\.ssh\id_rsa" -Raw | Set-Clipboard
```

Se a chave tiver outro nome, ajuste o caminho.

## 8. Atualizar A Secret `GATEWAY_HOM_URL`

Essa secret e usada pelo OWASP ZAP no DAST.

Formato:

```text
http://<ip-publico-da-vm>
```

Comando:

```powershell
"http://$VM_IP" | Set-Clipboard
```

No GitHub, atualize ou crie:

```text
GATEWAY_HOM_URL
```

## 9. Lista Final De Secrets

As secrets esperadas no GitHub Actions sao:

```text
ACR_USERNAME
ACR_PASSWORD
DEPLOY_ENV
FRONTEND_VM_SSH_PRIVATE_KEY
GATEWAY_HOM_URL
KUBE_CONFIG_DATA
```

Nao e necessario criar secret para SonarQube. A pipeline sobe o SonarQube em container e cria um token temporario durante o job.

Nao e necessario criar secret para o PostgreSQL demonstrativo no Kubernetes. Ele usa os manifests em:

```text
infra/kubernetes/database
```

## 10. Rodar A Pipeline

No GitHub:

```text
Actions
Casa Church CI/CD
Run workflow
```

Ordem esperada:

```text
1. Testes unitarios
2. SonarQube Quality Gate
3. Build, Trivy e push das imagens
4. Deploy no AKS, frontend e gateway
5. DAST com OWASP ZAP
6. Notificacao
```

## 11. Validacoes Depois Da Pipeline

### AKS

```powershell
kubectl get nodes
kubectl get pods -n casa-church
kubectl get svc -n casa-church
kubectl get ingress -n casa-church
kubectl get hpa -n casa-church
kubectl get statefulset -n casa-church
kubectl get pvc -n casa-church
```

### Gateway

```powershell
Invoke-RestMethod "http://$VM_IP/api/health"
```

Resultado esperado:

```text
status = ok
service = casa-church-api
```

### Bloqueio Do Ingress Direto

```powershell
$INGRESS_IP = kubectl get svc ingress-nginx-controller -n ingress-nginx -o jsonpath="{.status.loadBalancer.ingress[0].ip}"
Invoke-RestMethod "http://$INGRESS_IP/health"
```

Resultado esperado fora da VM:

```text
Falha de conexao ou timeout
```

Isso confirma que o gateway Nginx da VM e o ponto unico de entrada externo.

## 12. Validar PostgreSQL Demonstrativo No Kubernetes

```powershell
kubectl get statefulset -n casa-church
kubectl get pods -n casa-church -l app=casa-church-postgres
kubectl get svc -n casa-church | Select-String postgres
kubectl get pvc -n casa-church
```

Resultado esperado:

```text
casa-church-postgres-primary   1/1
casa-church-postgres-read      2/2
```

Testar replica de leitura:

```powershell
kubectl run pg-read-test -n default --rm -it --image=postgres:16 --restart=Never -- `
  psql "host=casa-church-postgres-read.casa-church.svc.cluster.local port=5432 dbname=casa_church user=casachurchadmin password=postgres sslmode=disable" -P pager=off -c "select pg_is_in_recovery();"
```

Resultado esperado:

```text
pg_is_in_recovery = t
```

## 13. Validar Que O Backend Usa O PostgreSQL Azure

Ver ConfigMap da API:

```powershell
kubectl get configmap casa-church-api-config -n casa-church -o yaml
```

Ver variavel `PGHOST` dentro de um pod:

```powershell
$POD = kubectl get pods -n casa-church -l app=casa-church-api -o jsonpath="{.items[0].metadata.name}"
kubectl exec -n casa-church $POD -- printenv PGHOST
```

Comparar com o output do Terraform:

```powershell
cd infra/terraform
terraform output -raw postgresql_fqdn
```

Os dois valores devem ser iguais.

## 14. Problemas Comuns

### SonarQube Falhou Por Timeout

O container pode ter demorado mais para subir.

Solucao:

```text
Aumentar sleep 120 para sleep 180 no job SonarQube.
```

### SSH Falhou Com `error in libcrypto`

Conferir:

```text
FRONTEND_VM_SSH_PRIVATE_KEY
```

A chave precisa conter `BEGIN`, `END` e as quebras de linha originais.

### Deploy Da VM Falhou Por IP Antigo

Atualizar:

```text
FRONTEND_VM_PUBLIC_IP dentro de DEPLOY_ENV
GATEWAY_HOM_URL
```

### Kubernetes Falhou Por Kubeconfig Antigo

Rodar novamente:

```powershell
az aks get-credentials `
  --resource-group $RG `
  --name $AKS `
  --overwrite-existing
```

Depois atualizar:

```text
KUBE_CONFIG_DATA
```

### Docker Login No ACR Falhou

Conferir:

```text
ACR_USERNAME
ACR_PASSWORD
```

Tambem confira se o admin user do ACR esta habilitado:

```powershell
az acr update --name $ACR_NAME --admin-enabled true
```

### API Em `CrashLoopBackOff`

Ver logs:

```powershell
kubectl get pods -n casa-church -l app=casa-church-api

$POD = kubectl get pods -n casa-church -l app=casa-church-api -o jsonpath="{.items[0].metadata.name}"
kubectl logs -n casa-church $POD --previous --tail=100
```

Se aparecer:

```text
password authentication failed for user "casachurchadmin"
```

corrigir a senha:

```text
POSTGRESQL_ADMIN_PASSWORD dentro de DEPLOY_ENV
```

## 15. Observacao Sobre `terraform destroy`

Depois de `terraform destroy`:

- o ACR e removido, entao as imagens antigas somem;
- a VM recebe um novo IP publico;
- o AKS precisa de um novo `KUBE_CONFIG_DATA`;
- o PostgreSQL pode exigir nova validacao da senha;
- a pipeline faz novo build e push das imagens, entao nao e necessario fazer push manual se ela passar.

Por isso, depois de recriar a infraestrutura, sempre revise:

```text
DEPLOY_ENV
KUBE_CONFIG_DATA
GATEWAY_HOM_URL
ACR_USERNAME
ACR_PASSWORD
```
