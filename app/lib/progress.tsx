
export interface Progress{
    current: number
    all: number
}

export const progresses: Map<string, Progress> = new Map();