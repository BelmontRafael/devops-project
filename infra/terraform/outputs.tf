output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "acr_name" {
  value = module.acr.name
}

output "acr_login_server" {
  value = module.acr.login_server
}