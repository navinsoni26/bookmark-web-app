export interface Message {
    id?: string;
    type: MessageType;
    text: string
}

export enum MessageType {
    Success,
    Error,
    Warning,
    Info
}