import { X } from "lucide-react"
import { useEffect } from "react"

interface infosRef {
  flipSide: string,
  rotateZ: 0 | 90 | 180 | 270
}

const AlertDialog = ({ infosRef }: { infosRef: infosRef }) => {
  useEffect(() => {
    console.log(infosRef.flipSide)
  }, [])
  return (
    <div style={{ transform: `rotate(-${infosRef.rotateZ}deg)` }} className={`absolute -top-[10vw] w-[25vw] border border-white bg-transparent backdrop-blur-2xl p-5 rounded-2xl`}>
      <button className="absolute top-2 right-2 cursor-pointer"><X /></button>
      <span>This is my temporary website, I had so many ideas so I ended up making this ugly one and will think abt design later :p</span>
    </div>
  )
}

export default AlertDialog