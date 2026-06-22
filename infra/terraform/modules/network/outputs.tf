output "vnet_id" {
  value = azurerm_virtual_network.main.id
}

output "frontend_subnet_id" {
  value = azurerm_subnet.frontend.id
}