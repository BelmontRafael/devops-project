output "server_name" {
  value = azurerm_postgresql_flexible_server.postgres.name
}

output "fqdn" {
  value = azurerm_postgresql_flexible_server.postgres.fqdn
}

output "database_name" {
  value = azurerm_postgresql_flexible_server_database.app.name
}

output "admin_login" {
  value = azurerm_postgresql_flexible_server.postgres.administrator_login
}

output "server_id" {
  value = azurerm_postgresql_flexible_server.postgres.id
}
