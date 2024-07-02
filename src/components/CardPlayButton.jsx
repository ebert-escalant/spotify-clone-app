import { Pause, Play } from "./Player"
import { usePlayerStore } from "@/store/playerStore"

export function CardPlayButton({ id, size = 'small' }) {
    const { currentMusic, setCurrentMusic, isPlaying, setIsPlaying } = usePlayerStore(state => state)
    
    const isPlayingPlayList = isPlaying && currentMusic?.playlist.id === id

    const handlePlay = () => {
        if(isPlayingPlayList) {
            setIsPlaying(false)
            return
        }

        fetch(`/api/get-info-playlist.json?id=${id}`).then(res => res.json()).then(data => {
            const { songs, playlist } = data

            setIsPlaying(true)
            setCurrentMusic({
                playlist,
                songs,
                song: songs[0]
            })
        })
    }

    const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'

    return (
        <button className="rounded-full bg-emerald-500 hover:scale-105 transition hover:bg-emerald-400 p-2" onClick={handlePlay}>
            {isPlayingPlayList ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
        </button>
    )
}