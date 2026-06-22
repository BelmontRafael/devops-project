variable "server_name" {
  type        = string
  description = "Nome do PGSQL"
}

variable "resource_group_name" {
  type        = string
  description = "Nome do Resource Group."
}

variable "location" {
  type        = string
  description = "Regiao Azure."
}

variable "database_name" {
  type        = string
  description = "Nome do database."
}

variable "admin_login" {
  type        = string
  description = "Administrador do PostgreSQL."
}

variable "admin_password" {
  type        = string
  description = "Senha do administrador do PostgreSQL."
  sensitive   = true
}

variable "postgresql_version" {
  type        = string
  description = "Versao do PostgreSQL."
}

variable "sku_name" {
  type        = string
  description = "SKU do PostgreSQL."
}

variable "storage_mb" {
  type        = number
  description = "Armazenamento em MB."
}

variable "firewall_rules" {
  type = map(object({
    start_ip_address = string
    end_ip_address   = string
  }))
  description = "Regras de firewall do PostgreSQL."
  default     = {}
}
