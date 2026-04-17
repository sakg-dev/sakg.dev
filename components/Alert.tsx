"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP)

const Alert = () => {
    const ghostDivRef = useRef(null)
    const pos = useRef({ top: -16, left: 4 })

    useGSAP(() => {
        if (localStorage.getItem("ghostViewed") || !ghostDivRef.current) return
        const divRef = ghostDivRef.current as HTMLDivElement
        const posVars = pos.current
        const sides = ["top", "bottom", "left", "right"]

        setInterval(() => {
            const randSide = sides[Math.floor(Math.random() * sides.length)]
            console.log(randSide)
            gsap.to(divRef, { top: (posVars.top * 4).toString(), left: (posVars.left * 4).toString() })
        }, 2000)
    }, [])

    return (
        <div ref={ghostDivRef} className='absolute left-4 cursor-pointer rotate-x-180' onClick={() => console.log("Clicked")}>
            <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="transparent" />
                <path d="M10,50 
           Q10,10 50,10 
           Q90,10 90,50 
           L90,90 
           L80,80 L70,90 L60,80 L50,90 L40,80 L30,90 L20,80 L10,90 Z"
                    fill="#1E90FF" />

                <circle cx="35" cy="45" r="10" fill="white" />
                <circle cx="65" cy="45" r="10" fill="white" />
                <circle cx="38" cy="48" r="5" fill="black" />
                <circle cx="68" cy="48" r="5" fill="black" />
            </svg>
        </div>
    )
}

export default Alert