package com.example.server

import com.example.server.entity.TodoRecord
import org.springframework.stereotype.Service

interface TodoService {
    fun getTodos(): List<String>
    fun saveTodo(todo: String)
}

@Service
class DefaultTodoService(
    private val todoRepository: TodoRepository
): TodoService {
    override fun getTodos(): List<String> {
        val todoRecord = todoRepository.findAll()
        return todoRecord.map { it.todo }
    }

    override fun saveTodo(todo: String) {
        todoRepository.save(TodoRecord(todo = todo))
    }

}