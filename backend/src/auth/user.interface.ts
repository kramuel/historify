// src/users/user.interface.ts

export interface BaseUser {
    username: string;
    token: string;
    currentTopArtist: string // Artist[]
}

export interface User extends BaseUser {
    id: number
}