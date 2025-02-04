import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import cn from "clsx"

export const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex touch-none select-none items-center group",
			className
		)}
		{...props}
	>
		<SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-zinc-500 cursor-pointer">
			<SliderPrimitive.Range className="absolute h-full bg-emerald-300" />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="block h-2 w-2 rounded-full border-2 cursor-pointer border-emerald-300 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50" />
	</SliderPrimitive.Root>
))

Slider.displayName = SliderPrimitive.Root.displayName