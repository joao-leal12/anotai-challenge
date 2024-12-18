export interface QueueService { 
    sendMessage(body: string, attribute: string): void
}