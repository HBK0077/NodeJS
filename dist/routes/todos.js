"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    return res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        todotext: body.text
    };
    console.log(newTodo);
    todos.push(newTodo);
    return res.json({ msg: "Todo Added", todo: newTodo, todos: todos });
});
router.put("/todo/:todoId", (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndexs = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndexs >= 0) {
        todos[todoIndexs] = { id: todos[todoIndexs].id,
            todotext: req.body.text
        };
        return res.status(200).json({ msg: "Successfull" });
    }
    res.status(404).json({ message: "cannot find todo" });
});
router.delete("/todo/:todoId", (req, res, next) => {
    todos = todos.filter(todoItem => todoItem.id !== req.params.todoId);
    return res.json({ msg: "Deletd" }).status(200);
});
exports.default = router;