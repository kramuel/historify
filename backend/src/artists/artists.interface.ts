import { Artist } from "./artist.interface";

export interface Artists {
    [key: number]: Artist;
    //Record<number, Artist> 
}