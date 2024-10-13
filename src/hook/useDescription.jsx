import { useEffect, useState } from 'react'

const useDescription = (description) => {
    const [arrayDescription, setArrayDescription] = useState([])


    useEffect(() => {
        if (description && description?.includes("href")) {
            const string = description?.split("và")[1]

            const list = description && description?.split("và")[0]?.split(",").concat("và", string)

            const dataDescription = list && list?.map((item) => {

                const data = item.split('spotify:playlist:')[1]?.split("</a>")

                return {
                    id: data && data[0]?.split(">")[0] || null,
                    name: data && data[0]?.split(">")[1] || item
                }
            })
            setArrayDescription(dataDescription)
        }
    }, [description])

    return arrayDescription
}

export default useDescription