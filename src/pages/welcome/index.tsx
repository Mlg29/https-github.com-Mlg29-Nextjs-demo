import React from 'react'
import MobileWelcome from '../../components/mobileComponents/MobileWelcome'
import { windowWidth } from '../../utils/windowWidth'


const Welcome = () => {
    const window = windowWidth()


    return (
        <div>
            {/* 
     {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007
      } 

      {
        window?.innerWidth >= 1008 && <DesktopMyStore />
      } */}

            {
                window?.innerWidth < 640 && <MobileWelcome />
            }

        </div>
    )
}

export default Welcome