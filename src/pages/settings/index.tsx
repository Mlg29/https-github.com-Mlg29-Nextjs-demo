import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileSettings from '../../components/mobileComponents/MobileSettings'

const Settings = () => {
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
        window?.innerWidth < 640 && <MobileSettings />
      }

    </div>
  )
}

export default Settings