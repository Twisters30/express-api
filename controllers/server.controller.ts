
import { Request, Response } from 'express';
import { Task } from "../types/task";
import {validationResult} from "express-validator";
import { open, close, createWriteStream, readFileSync } from 'node:fs';
import { uuid } from 'uuidv4';

export const getTasks = async (req: Request, res: Response) => {
    open('./mock/data.txt', 'r', (err, fd) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('./mock/data.txt does not exist');
                return;
            }

            throw err;
        }

        try {
            const tasks = readFileSync('./mock/data.txt', "utf-8")
            res.status(200).json(tasks ? JSON.parse(tasks) : []);
        } finally {
            close(fd, (err) => {
                if (err) throw err;
            });
        }
    });
}
export const createTask = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() })
    }
    const newTask: Task = {
        queueNumber: req.body.queueNumber,
        timer: req.body.timer,
        timerOnPause: 0,
        id: uuid(),
        title: req.body.title,
        pomodoroCount: req.body.pomodoroCount,
        done: false
    }
    open('./mock/data.txt', (err, fd) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('data.txt does not exist');
                return;
            }
            throw err;
        }
        try {
            const tasksJson = readFileSync('./mock/data.txt', "utf-8");
            let tasks: Task[] = !tasksJson ? [] : JSON.parse(tasksJson);
            tasks.push(newTask)
            const writer = createWriteStream('./mock/data.txt')
            writer.write(JSON.stringify(tasks));
            res.json(tasks)
        } finally {
            close(fd, (err) => {
                if (err) throw err;
            });
        }
    })
}
export const deleteTask = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    open('./mock/data.txt', (err, fd) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('data.txt does not exist');
                return;
            }
            throw err;
        }
        try {
            const tasksJson = readFileSync('./mock/data.txt', "utf-8");
            let tasks: Task[] = !tasksJson ? [] : JSON.parse(tasksJson);
            const taskId = req.params.id;
            if (tasks.length === 0) {
                res.json(tasks)
            }
            if (!taskId) res.status(400).json('require param id');
            const filteredTasks = tasks.filter((task) => task.id !== taskId)
            const writer = createWriteStream('./mock/data.txt')
            writer.write(JSON.stringify(filteredTasks));
            res.json(filteredTasks)
        } finally {
            close(fd, (err) => {
                if (err) throw err;
            });
        }
    })
}