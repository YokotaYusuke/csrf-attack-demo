package com.example.server

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/todos")
class TodoController(
    private val todoService: TodoService
) {

    @GetMapping
    fun getTodos(): List<String> {
        return todoService.getTodos()
    }

    @PostMapping
    fun saveTodo(@RequestBody todo: String) {
        todoService.saveTodo(todo)
    }

}