package com.example.server.entity

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "tasks")
data class TodoRecord(
    @Id
    val id: UUID = UUID.randomUUID(),
    val todo: String
)
