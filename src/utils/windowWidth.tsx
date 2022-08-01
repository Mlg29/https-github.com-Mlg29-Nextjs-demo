import React, {useState, useEffect} from "react"

export const windowWidth = () => {
    const [windowData, setWindowData] = useState<any>()

    useEffect(() => {

        const loadWindow = () => {
          setWindowData(window)
        }
    
        loadWindow()
      }, [])

      return windowData
}


/* Extra small devices (phones, 600px and down) */
//@media only screen and (max-width: 600px) 

/* Small devices (portrait tablets and large phones, 600px and up) */
//@media only screen and (min-width: 600px)

/* Medium devices (landscape tablets, 768px and up) */
//@media only screen and (min-width: 768px)

/* Large devices (laptops/desktops, 992px and up) */
//@media only screen and (min-width: 992px)

/* Extra large devices (large laptops and desktops, 1200px and up) */
//@media only screen and (min-width: 1200px)