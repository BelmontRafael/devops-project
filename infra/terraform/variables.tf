variable "location" {
  type        = string
  description = "A localização dos recursos."
  default     = "canadacentral"
}

variable "resource_group_name" {
  type        = string
  description = "Nome do RG."
  default     = "rg-casa-church-devops"
}

variable "acr_name" {
  type        = string
  description = "Nome Azure Container Registry."
}

variable "vnet_name" {
  type        = string
  description = "Nome da Virtual Network."
  default     = "vnet-casa-church"
}

variable "vnet_address_space" {
  type        = list(string)
  description = "CIDR da Virtual Network."
  default     = ["10.10.0.0/16"]
}

variable "frontend_subnet_name" {
  type        = string
  description = "Nome da subnet da VM do frontend."
  default     = "snet-frontend"
}

variable "frontend_subnet_prefixes" {
  type        = list(string)
  description = "CIDR da subnet da VM do frontend."
  default     = ["10.10.1.0/24"]
}

variable "frontend_vm_name" {
  type        = string
  description = "Nome da VM Linux do frontend."
  default     = "vm-casa-church-frontend"
}

variable "frontend_vm_size" {
  type        = string
  description = "Tamanho da VM Linux."
  default     = "Standard_D2as_v4"
}

variable "admin_username" {
  type        = string
  description = "Usuário administrador da VM."
  default     = "azureuser"
}

variable "ssh_public_key_path" {
  type        = string
  description = "Caminho da chave pública SSH."
  default     = "~/.ssh/id_rsa.pub"
}

variable "postgresql_server_name" {
  type        = string
  description = "Nome globalmente unico do Azure Database for PostgreSQL Flexible Server."
}

variable "postgresql_database_name" {
  type        = string
  description = "Nome do banco de dados da aplicacao."
  default     = "casa_church"
}

variable "postgresql_admin_login" {
  type        = string
  description = "Usuario administrador do PostgreSQL."
  default     = "casachurchadmin"
}

variable "postgresql_admin_password" {
  type        = string
  description = "Senha do usuario administrador do PostgreSQL."
  sensitive   = true

  validation {
    condition     = length(var.postgresql_admin_password) >= 12
    error_message = "A senha do PostgreSQL deve ter pelo menos 12 caracteres."
  }
}

variable "postgresql_version" {
  type        = string
  description = "Versao do PostgreSQL Flexible Server."
  default     = "16"
}

variable "postgresql_sku_name" {
  type        = string
  description = "SKU do PostgreSQL Flexible Server."
  default     = "B_Standard_B1ms"
}

variable "postgresql_storage_mb" {
  type        = number
  description = "Armazenamento do PostgreSQL Flexible Server em MB."
  default     = 32768
}

variable "postgresql_firewall_rules" {
  type = map(object({
    start_ip_address = string
    end_ip_address   = string
  }))
  description = "Regras de firewall para acesso publico ao PostgreSQL."
  default     = {}
}
