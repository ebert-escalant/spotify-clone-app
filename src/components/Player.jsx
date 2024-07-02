import { usePlayerStore } from "@/store/playerStore"
import { useEffect, useRef, useState } from "react"
import { Slider } from "./Slider"

export const Pause = ({ className }) => (
	<svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
)

export const Play = ({ className }) => (
	<svg className={className} role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path></svg>
)

export const VolumeSilence = () => (
	<svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen apagado" viewBox="0 0 16 16" ><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>
)

export const Volume = () => (
	<svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen alto" id="volume-icon" viewBox="0 0 16 16"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>
)

export const Prev = () => (
	<svg fill="currentColor" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path></svg>
)
export const Next = () => (
	<svg fill="currentColor" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path></svg>
)

const CurrentSong = ({ image, title, artists }) => {
	return (
		<div className="flex items-center gap-5 relative overflow-hidden">
			<picture className="w-14 h-14 bg-zinc-800 rounded-md shadow-lg overflow-hidden hidden md:block">
				<img src={image} alt={title} />
			</picture>

			<div className="flex flex-col">
				<h3 className="font-semibold text-sm block">
					{title}
				</h3>
				<span className="text-xs opacity-80 hidden md:block">
					{artists?.join(', ')}
				</span>
			</div>

		</div>
	)
}

const SongControl = ({ audio }) => {
	const [currentTime, setCurrentTime] = useState(0)

	useEffect(() => {
		audio.current.addEventListener('timeupdate', handleTimeUpdate)

		return () => audio.current.removeEventListener('timeupdate', handleTimeUpdate)
	}, [])

	const handleTimeUpdate = (e) => {
		setCurrentTime(audio.current.currentTime)
	}

	const formatTime = (time) => {
		if (isNaN(time) || time == null) return '0:00'
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)

		return `${minutes}:${seconds.toString().padStart(2, '0')}`
	}

	const duration = audio?.current?.duration ?? 0

	return (
		<div className="flex items-center gap-x-3 pt-2">
			<span className="text-xs opacity-50 w-10 text-right">{formatTime(currentTime)}</span>
			<Slider
				defaultValue={[0]}
				min={0}
				max={audio?.current?.duration ?? 0}
				value={[currentTime]}
				className="w-[200px] sm:w-[250px] md:w-[350px]"
				onValueChange={([newTime]) => {
					audio.current.currentTime = newTime
				}}
			/>
			<span className="text-xs opacity-50 w-10">{formatTime(duration)}</span>
		</div>
	)
}

const VolumeControl = () => {
	const volume = usePlayerStore(state => state.volume)
	const setVolume = usePlayerStore(state => state.setVolume)
	const previousVolumeRef = useRef(volume)

	const isVolumeSilenced = volume < 0.1

	const handleClickVolumen = () => {
		if (isVolumeSilenced) {
			setVolume(previousVolumeRef.current)
		} else {
			previousVolumeRef.current = volume
			setVolume(0)
		}
	}

	return (
		<div className="flex justify-center gap-x-2">
			<button className="opacity-70 hover:opacity-100 transition" onClick={handleClickVolumen}>
				{isVolumeSilenced ? <VolumeSilence /> : <Volume />}
			</button>

			<Slider
				defaultValue={[50]}
				min={0}
				max={100}
				value={[volume * 100]}
				className="w-[95px]"
				onValueChange={([newVolume]) => {
					const volumeValue = newVolume / 100
					setVolume(volumeValue)
				}}
			/>
		</div>
	)
}

export function Player() {
	const { currentMusic, volume, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)
	const audioRef = useRef()

	useEffect(() => {
		if (!currentMusic?.song) return
		isPlaying ? audioRef.current.play() : audioRef.current.pause()
	}, [isPlaying])

	useEffect(() => {
		if (!currentMusic?.song) return

		audioRef.current.volume = volume
	}, [volume])

	useEffect(() => {
		const { song, playlist, songs } = currentMusic

		if (!song || !playlist) return

		const src = `/music/${playlist?.id}/0${song.id}.mp3`
		audioRef.current.src = src
		audioRef.current.volume = volume
		audioRef.current.play()
	}, [currentMusic])

	const handlePlay = () => {
		setIsPlaying(!isPlaying)
	}

	const handleNext = () => {
		const { song, songs } = currentMusic
		const currentIndex = songs.findIndex(s => s.id === song.id)
		const nextSong = songs[currentIndex + 1]

		if (!nextSong) return

		setIsPlaying(false)
		setCurrentMusic({ ...currentMusic, song: nextSong })
		setIsPlaying(true)
	}

	const handlePrev = () => {
		const { song, songs } = currentMusic
		const currentIndex = songs.findIndex(s => s.id === song.id)
		const prevSong = songs[currentIndex - 1]

		if (!prevSong) return

		setIsPlaying(false)
		setCurrentMusic({ ...currentMusic, song: prevSong })
		setIsPlaying(true)
	}

	return (
		<>
			{
				currentMusic?.song && (
					<div className="flex flex-col md:flex-row justify-between items-center w-full px-4 z-50">
						<div>
							<CurrentSong {...currentMusic.song} />
						</div>
						<div className="grid place-content-center gap-4 flex-1 mt-6 md:mt-0">
							<div className="flex flex-col justify-center items-center">
								<div className="flex items-center justify-center gap-8">
									<button className="text-zinc-400 hover:text-gray-300 disabled:pointer-events-none" disabled={currentMusic.song.id === currentMusic.songs[0].id} onClick={handlePrev}>
										<Prev />
									</button>
									<button className="p-2 rounded-full bg-gray-200" onClick={handlePlay}>
										{isPlaying ? <Pause className="text-gray-500" /> : <Play className="text-gray-500" />}
									</button>
									<button className="text-zinc-400 hover:text-gray-300 disabled:pointer-events-none" disabled={currentMusic.song.id === currentMusic.songs[currentMusic.songs.length - 1].id} onClick={handleNext}>
										<Next />
									</button>
								</div>
								<SongControl audio={audioRef} />
								<audio ref={audioRef} />
							</div>
						</div>
						<div className="grid place-content-cente mt-6 md:mt-0">
							<VolumeControl />
						</div>
					</div>
				)
			}
		</>
	)
}