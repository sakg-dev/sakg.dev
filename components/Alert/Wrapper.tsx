"use client"
import { useEffect, useState } from "react"
import Alert from './Alert'

const AlertWrapper = () => {
    const [alertShown, setAlertShown] = useState(true)

    useEffect(() => {
        const seen = localStorage.getItem("ghostViewed")
        if (!seen) setAlertShown(false)
    }, [])

    return (
        <>
            {!alertShown && <Alert setAlertShown={setAlertShown} />}
        </>
    )
}

export default AlertWrapper