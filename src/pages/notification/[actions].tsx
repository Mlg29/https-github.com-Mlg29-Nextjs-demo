import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileNotificationDetail from '../../components/mobileComponents/MobileNotificationDetail'


const NotificationDetail = () => {
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
        window?.innerWidth < 640 && <MobileNotificationDetail />
      }

    </div>
  )
}

export default NotificationDetail