/**
 * Data Model Interfaces
 */

import { Artist } from "./artist.interface";
import { Artists } from "./artists.interface";

/**
 * In-Memory Store (INSTEAD OF DATABASE)
 */
let artists: Artists = {
    1: {
        name: "Bob Marley",
        image: "https://url.com/1",
        index: 1,
        imageSize: 320
    },
    2: {
        name: "Bob Dylan",
        image: "https://url.com/2",
        index: 2,
        imageSize: 320
    },
    3: {
        name: "Byggare Bob",
        image: "https://url.com/3",
        index: 3,
        imageSize: 320
    }
}

/**
 * Service Methods (SHOULD FETCH FROM DATABASE INSTEAD)
 */

export const findAll = async (): Promise<Artist[]> => Object.values(artists);

export const find = async (id: number): Promise<Artist> => artists[id];

// use this for creating something ( an artist/user/whatever perhaps) 
// to be saved in database!! not this key-value-pair-list

export const create = async (newArtist: Artist): Promise<Artist> => {
    const id = new Date().valueOf();

    artists[id] = {
        // id, // if i would have used BaseItem etc
        ...newArtist,
    };

    return artists[id];
};


// same shit but for update ( CRUD )

// UPDATE

// export const update = async (
//     id: number,
//     itemUpdate: BaseItem
//   ): Promise<Item | null> => {
//     const item = await find(id);
  
//     if (!item) {
//       return null;
//     }
  
//     items[id] = { id, ...itemUpdate };
  
//     return items[id];
//   };

// DELETE

// export const remove = async (id: number): Promise<null | void> => {
//     const item = await find(id);
  
//     if (!item) {
//       return null;
//     }
  
//     delete items[id];
//   };