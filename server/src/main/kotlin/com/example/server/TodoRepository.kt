package com.example.server

import com.example.server.entity.TodoRecord
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
@Transactional
interface TodoRepository: JpaRepository<TodoRecord, UUID> {
}