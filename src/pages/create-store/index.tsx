import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileCreateStore from '../../components/mobileComponents/MobileCreateStore'
import DesktopCreateStore from '../../components/DesktopComponent/DesktopCreateStore'

const Signup = () => {
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
        window?.innerWidth < 640 && <MobileCreateStore />
      }

    </div>
  )
}

export default Signup