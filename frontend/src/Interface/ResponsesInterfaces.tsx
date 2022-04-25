export type StatusType = 'error' | 'success';

export interface LoginResponseInterface {
    status: StatusType,
    message?: string,
    token?: string,
    username?: string
}

export interface BlogPostResponseInterface {
    status: StatusType,
    message: string
}

export interface BlogInterface {
    id?: number,
    date: string,
    title: string,
    content: string,
    author: string
}
