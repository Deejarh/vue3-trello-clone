export interface Card {
    id: string;
    title: string;
    task: Task[];
}

export interface Task {
    id: string;
    title: string;
    createdAt: Date;

}