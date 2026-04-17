"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP)

const Alert = () => {
    const ghostDivRef = useRef(null)
    const [viewed, setViwed] = useState(true) // default is true so it is hidden

    useEffect(() => {
        if (!localStorage.getItem("ghostViewed")) setViwed(false)
    }, [])

    useGSAP(() => {
        if (localStorage.getItem("ghostViewed") || !ghostDivRef.current) return
        const div = ghostDivRef.current as HTMLDivElement
        const sides = ["top", "bottom", "left", "right"]

        div.style.visibility = "hidden"
        const interval = setInterval(() => {
            const randSide = sides[Math.floor(Math.random() * sides.length)]
            const oppositeSide = ["top", "bottom"].includes(randSide) ? "left" : "top"
            const randomPercentage = Math.floor(Math.random() * 80 + 10)
            const rotateZ = randSide == "top" ? 0 : (randSide == "right" ? 90 : (randSide == "bottom" ? 180 : 270))

            const tl = gsap.timeline()

            tl.fromTo(div,
                {
                    [randSide]: "-64px",
                    [oppositeSide]: `${randomPercentage}%`,
                    visibility: "visible",
                    rotateZ
                },
                {
                    [randSide]: "0px",
                    duration: 0.5,
                    ease: "bounce.out"
                }
            )

            tl.to(div, {
                [randSide]: "-64px",
                duration: 0.8,
                delay: 0.3,
                ease: "power2.in"
            })

            tl.set(div, {
                clearProps: "all"
            })

            tl.set(div, {
                visibility: "hidden"
            })
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    const handleClick = () => {
        localStorage.setItem("ghostViewed", "true")
    }

    if (typeof window !== "undefined" && localStorage.getItem("ghostViewed")) return null

    return (
        <div ref={ghostDivRef} className={`fixed ${viewed && "hidden"} cursor-pointer rotate-x-180`} onClick={handleClick}>
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