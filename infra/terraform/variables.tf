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