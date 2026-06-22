variable "resource_group_name" {
  type        = string
  description = "Nome do Resource Group."
}

variable "location" {
  type        = string
  description = "Região Azure."
}

variable "vm_name" {
  type        = string
  description = "Nome da VM."
}

variable "vm_size" {
  type        = string
  description = "Tamanho da VM."
}

variable "admin_username" {
  type        = string
  description = "Usuário administrador da VM."
}

variable "ssh_public_key_path" {
  type        = string
  description = "Caminho da chave pública SSH."
}

variable "subnet_id" {
  type        = string
  description = "ID da subnet da VM."
}