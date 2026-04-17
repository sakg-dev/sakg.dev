"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP)

const Alert = () => {
    const ghostDivRef = useRef(null)
    const [viewed, setViewed] = useState(true) // default is true so it is hidden
    const [isClicked, setIsClicked] = useState(false)
    const tlRef = useRef<GSAPTimeline>(undefined)
    const intervalRef = useRef<ReturnType<typeof setTimeout>>(undefined)

    useEffect(() => {
        if (!localStorage.getItem("ghostViewed")) setViewed(false)
    }, [])

    useGSAP(() => {
        if (viewed || !ghostDivRef.current) return
        const div = ghostDivRef.current as HTMLDivElement
        const sides = ["top", "bottom", "left", "right"]

        div.style.visibility = "hidden"
        intervalRef.current = setInterval(() => {
            const randSide = sides[Math.floor(Math.random() * sides.length)]
            const oppositeSide = ["top", "bottom"].includes(randSide) ? "left" : "top"
            const randomPercentage = Math.floor(Math.random() * 80 + 10)
            const rotateZ = randSide == "bottom" ? 0 : (randSide == "left" ? 90 : (randSide == "top" ? 180 : 270))

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

            tlRef.current = tl.to(div, {
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

        return () => clearInterval(intervalRef.current)
    }, [viewed])

    const handleClick = () => {
        localStorage.setItem("ghostViewed", "true")
        setIsClicked(true)
        tlRef.current?.pause()
        clearInterval(intervalRef.current)
    }

    if (viewed) return null

    return (
        <div ref={ghostDivRef} className={`fixed ${viewed && "hidden"} cursor-pointer`} onClick={handleClick}>
            {isClicked ?
                <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="transparent" />

                    <path d="M10,50 
           Q10,10 50,10 
           Q90,10 90,50 
           L90,90 
           L80,80 L70,90 L60,80 L50,90 L40,80 L30,90 L20,80 L10,90 Z"
                        fill="#0B3D91" />

                    <ellipse cx="35" cy="45" rx="11" ry="9" fill="white" transform="rotate(-10 35 45)" />
                    <ellipse cx="65" cy="45" rx="11" ry="9" fill="white" transform="rotate(10 65 45)" />

                    <circle cx="40" cy="48" r="5" fill="black" />
                    <circle cx="70" cy="48" r="5" fill="black" />

                    <path d="M25,35 L45,30" stroke="black" strokeWidth="3" />
                    <path d="M55,30 L75,35" stroke="black" strokeWidth="3" />

                    <ellipse cx="50" cy="70" rx="8" ry="12" fill="black" />
                </svg>
                :
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
            }
        </div>
    )
}

export default Alert