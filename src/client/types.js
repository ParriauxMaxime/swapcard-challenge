// @flow
import type { AlbumState } from "./reducers/album";
import type { ArtistState } from "./reducers/artist";
import type { SpotifyState } from "./reducers/spotify";
import type { SearchState } from "./reducers/search";
import type { TrackState } from "./reducers/track";

type url = string;

export type external_urls = {
    spotify: url
}

export type image = {
    width: number,
    height: number,
    url: url
};

export type NormalizedStore<T> = {
    byIds: {
        [key: string]: T
    }, 
    allIds: Array<string>
}

export type styles = { classes: Object };
export type action = { type: string, data: any };

export type store = {
    album: AlbumState,
    artist: ArtistState,
    track: TrackState,
    search: SearchState,
    spotify: SpotifyState
}