output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "acr_name" {
  value = module.acr.name
}

output "acr_login_server" {
  value = module.acr.login_server
}

output "frontend_vm_public_ip" {
  value = module.frontend_vm.public_ip
}

output "frontend_vm_name" {
  value = module.frontend_vm.vm_name
}

output "frontend_vm_principal_id" {
  value = module.frontend_vm.principal_id
}

output "postgresql_server_name" {
  value = module.database.server_name
}

output "postgresql_fqdn" {
  value = module.database.fqdn
}

output "postgresql_database_name" {
  value = module.database.database_name
}

output "postgresql_admin_login" {
  value = module.database.admin_login
}

output "aks_cluster_name" {
  value = module.aks.cluster_name
}

output "aks_kubelet_identity_object_id" {
  value = module.aks.kubelet_identity_object_id
}
