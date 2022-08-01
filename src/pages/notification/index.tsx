import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileNotification from '../../components/mobileComponents/MobileNotification'

const Notification = () => {
  const window = windowWidth()


  return (
    <div>
{/* 
      {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007
      } 

      {
        window?.innerWidth >= 1008 && <DesktopMyStore />
      }*/}

      {
        window?.innerWidth < 640 && <MobileNotification />
      }

    </div>
  )
}

export default Notification