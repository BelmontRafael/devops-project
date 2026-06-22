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