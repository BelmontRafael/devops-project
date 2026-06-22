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