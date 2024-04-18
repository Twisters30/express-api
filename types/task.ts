export type Task = {
    queueNumber: number;
    timer: Date,
    timerOnPause: number,
    id: string;
    title: string;
    pomodoroCount: number;
    done: boolean;
    statistics?:{
        weeks:[]
    }
}