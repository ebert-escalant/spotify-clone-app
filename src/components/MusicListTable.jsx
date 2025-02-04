import { usePlayerStore } from "@/store/playerStore"

const TimeIcon = () => (
	<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" ><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" ></path><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z" ></path></svg>
)

const Waveform = () => (
	<section className="waveform">
		<div className="wave0">
		</div>
		<div className="wave1">
		</div>
		<div className="wave2">
		</div>
		<div className="wave3">
		</div>
		<div className="wave4">
		</div>
	</section>
)

export default function MusicListTable({ songs, playlist }) {
	const currentMusic = usePlayerStore(state => state.currentMusic)
	const setCurrentMusic = usePlayerStore(state => state.setCurrentMusic)
	const isPlaying = usePlayerStore(state => state.isPlaying)
	const setIsPlaying = usePlayerStore(state => state.setIsPlaying)

	const handleClick = (song) => {
		if (currentMusic?.song?.id !== song.id || currentMusic?.song?.albumId !== song.albumId) {
			setIsPlaying(false)

			setCurrentMusic({
				playlist,
				songs,
				song: song,
			})

			setIsPlaying(true)
		}
	}

	return (
		<table className="table-auto text-left min-w-full divide-y-2 divide-gray-500/50">
			<thead>
				<tr className="text-zinc-400 text-sm">
					<th className="px-4 py-2 font-light" width="50px">#</th>
					<th className="px-4 py-2 font-light">Título</th>
					<th className="px-4 py-2 font-light hidden md:block">Álbum</th>
					<th className="px-4 py-2 font-light hidden md:block"><TimeIcon /></th>
				</tr>
			</thead>
			<tbody>
				<tr className="h-[16px]"></tr>
				{
					songs.map((song, index) => (
						<tr className="border-spacing-0 text-gray-300 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 cursor-pointer" key={index} onClick={() => handleClick(song)}>
							<td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5">
								{
									currentMusic?.song?.id === song.id && currentMusic?.song?.albumId === song.albumId && isPlaying
									? <Waveform />
									: <span className="text-gray-400">{index + 1}</span>
								}
							</td>
							<td className="px-4 py-2 flex gap-3">
								<picture className="">
									<img
										src={song.image}
										alt={song.title}
										className="w-11 h-11"
									/>
								</picture>
								<div className="flex flex-col">
									<h3 className="text-white text-base font-normal">
										{song.title}
									</h3>
									<span>{song.artists.join(", ")}</span>
								</div>
							</td>
							<td className="px-4 py-2 hidden md:table-cell">{song.album}</td>
							<td className="px-4 py-2 rounded-tr-lg rounded-br-lg hidden md:table-cell">
								{song.duration}
							</td>
						</tr>
					))
				}
			</tbody>
		</table>
	)
}