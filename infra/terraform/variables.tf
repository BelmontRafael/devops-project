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