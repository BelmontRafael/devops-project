variable "cluster_name" {
  type        = string
  description = "Nome do cluster AKS."
}

variable "dns_prefix" {
  type        = string
  description = "Prefixo DNS do AKS."
}

variable "resource_group_name" {
  type        = string
  description = "Nome do Resource Group."
}

variable "location" {
  type        = string
  description = "Regiao Azure."
}

variable "node_count" {
  type        = number
  description = "Quantidade de worker nodes."
}

variable "node_vm_size" {
  type        = string
  description = "Tamanho das VMs dos worker nodes."
}

variable "acr_id" {
  type        = string
  description = "ID do Azure Container Registry usado pelo AKS."
}
