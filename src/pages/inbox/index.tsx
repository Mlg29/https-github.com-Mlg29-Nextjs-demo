import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileInbox from '../../components/mobileComponents/MobileInbox'

const Inbox = () => {
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
        window?.innerWidth < 640 && <MobileInbox />
      }

    </div>
  )
}

export default Inbox