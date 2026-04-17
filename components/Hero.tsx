"use client"
import { useMemo } from 'react'
import { TypeAnimation } from 'react-type-animation';
import { personalityToNumber, shuffleArr } from "@/lib/tools"

const Hero = () => {
    const personalities = useMemo(() => [
        "fast learner who struggles to finish",
        "early starter who builds inconsistently",
        "solid coder with a weak routine",
        "person who focuses in bursts but gets distracted most days",
        "person who knows the path but avoids walking it",
        "builder who leaves projects half-done",
        "deep thinker who applies things shallowly",
        "person with potential but lacking follow-through",
        "hard worker who rarely chooses to grind",
        "time-aware but still wastes it",
        "planner who acts too late",
        "someone balancing growth and comfort, but comfort often wins"
    ], [])

    return (
        <div className='min-h-screen bg-linear-to-r from-purple-900 to-indigo-900 flex flex-col justify-center items-center gap-8 text-white'>
            <p className='font-bold text-5xl'>Heya!</p>
            <div className='font-semibold text-xl flex flex-col min-w-screen text-center'>
                <span className='text-2xl'>I am Sak G, a..</span>
                <TypeAnimation
                    sequence={personalityToNumber(shuffleArr(personalities), 500)}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                />
            </div>
            <span>This is my temporary website, I had so many ideas so I ended up making this ugly one and will think abt design later :p</span>  {/* make it like in a dialog kinda? */}
        </div>
    )
}

export default Hero