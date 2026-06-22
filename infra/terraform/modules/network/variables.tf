variable "resource_group_name" {
  type        = string
  description = "Nome do Resource Group."
}

variable "location" {
  type        = string
  description = "Região Azure."
}

variable "vnet_name" {
  type        = string
  description = "Nome da Virtual Network."
}

variable "vnet_address_space" {
  type        = list(string)
  description = "CIDR da Virtual Network."
}

variable "frontend_subnet_name" {
  type        = string
  description = "Nome da subnet do frontend."
}

variable "frontend_subnet_prefixes" {
  type        = list(string)
  description = "CIDR da subnet do frontend."
}