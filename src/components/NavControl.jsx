const Prev = () => (
	<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" aria-hidden="true" viewBox="0 0 320 512" fill="currentColor"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
)

const Next = () => (
	<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" aria-hidden="true" viewBox="0 0 320 512" fill="currentColor"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
)

export default function NavControl() {
	return (
		<div className="flex items-center gap-5">
			<a href="/" className="p-2 rounded-full bg-zinc-800 text-gray-200 hover:text-gray-100">
				<Prev />
			</a>
		</div>
	)
}