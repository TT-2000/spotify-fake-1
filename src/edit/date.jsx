import { useEffect, useState } from "react"

const Date = (date) => {
    const [dateEdit, setDateEdit] = useState("")

    useEffect(() => {
        if (date) {
            const array = date?.split("-")
            const day = array && array[2] < 10 ? array[2]?.slice(1) : array[2]
            const month = array && array[1] < 10 ? array[1]?.slice(1) : array[1]
            const year = array && array[0]
            setDateEdit(`${day ? day : ""} ${day || month ? "thg" : ""} ${month ? month : ""}${month ? "," : ""} ${year}`)
        }
    }, [date])

    return dateEdit || ""
}

export default Date