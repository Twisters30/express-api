export const createTaskSchema = {
    title: {
        notEmpty: true,
    },
    queueNumber: {
        isInt: true,
        notEmpty: false,
    },
    pomodoroCount: {
        isInt: true,
        notEmpty: true,
    },
    timer: {
        notEmpty: true,
        isString: true
    }
}

export const deleteTaskSchema = {
    id: {

    },
}