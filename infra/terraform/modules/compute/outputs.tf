output "public_ip" {
  value = azurerm_public_ip.vm.ip_address
}

output "vm_name" {
  value = azurerm_linux_virtual_machine.vm.name
}

output "principal_id" {
  value = azurerm_linux_virtual_machine.vm.identity[0].principal_id
}
