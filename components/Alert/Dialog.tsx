import { X } from "lucide-react"
import { createPortal } from "react-dom"

interface AlertDialogProps {
  rect: DOMRect
  side: string
  onClose: () => void
}

const DIALOG_W = 240
const DIALOG_H = 120
const GAP = 12

const AlertDialog = ({ rect, side, onClose }: AlertDialogProps) => { // here side is flipside of our element
  let top = 0
  let left = 0

  const spaceAbove = rect.top
  const spaceBelow = window.innerHeight - rect.bottom // rect.bottom means space from top to bottom of the element.
  const spaceLeft = rect.left
  const spaceRight = window.innerWidth - rect.right

  if (side === "top" || side === "bottom") {
    top = spaceBelow >= spaceAbove ? rect.bottom + GAP : rect.top  - DIALOG_H - GAP - 60 // idk why but need extra 60px
    left = rect.left + rect.width / 2 - DIALOG_W / 2 // in center
  } else if (side === "left" || side === "right") {
    top = rect.top + rect.height / 2 - DIALOG_H / 2
    left = spaceRight >= spaceLeft ? rect.right + GAP : rect.left - DIALOG_W - GAP
  }

  return createPortal(
    <div
      style={{
        position: "fixed",
        top,
        left,
        width: `${DIALOG_W}px`,
        zIndex: 500,
      }}
      className="border border-white bg-transparent backdrop-blur-2xl p-5 rounded-2xl"
    >
      <button onClick={onClose} className="absolute top-2 right-2 cursor-pointer">
        <X />
      </button>
      <span>This is my temporary website, I had so many ideas so I ended up making this ugly one and will think abt design later :p</span>
    </div>,
    document.body
  )
}

export default AlertDialog