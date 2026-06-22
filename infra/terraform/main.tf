resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

module "acr" {
  source = "./modules/container_registry"

  name                = var.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
}

module "network" {
  source = "./modules/network"

  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  vnet_name                = var.vnet_name
  vnet_address_space       = var.vnet_address_space
  frontend_subnet_name     = var.frontend_subnet_name
  frontend_subnet_prefixes = var.frontend_subnet_prefixes
}

module "frontend_vm" {
  source = "./modules/compute"

  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  vm_name             = var.frontend_vm_name
  vm_size             = var.frontend_vm_size
  admin_username      = var.admin_username
  ssh_public_key_path = var.ssh_public_key_path
  subnet_id           = module.network.frontend_subnet_id
}