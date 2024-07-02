import { allPlaylists, songs } from "@/lib/data";

export async function GET({ params, request }) {
    //1. get the id from the url
    const { url } = request

    const urlObject = new URL(url)

    const id = urlObject.searchParams.get('id')

    //2. get the playlist with the id
    const playlist = allPlaylists.find(playlist => playlist.id === id)

    //3. get the songs of the playlist
    const playlistSongs = songs.filter(song => song.albumId === playlist?.albumId)

    //4. return the playlist and the songs
    return new Response(JSON.stringify({ playlist, songs: playlistSongs }), {
        headers: {
            "Content-Type": "application/json",
        },
    })
}