import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileDelivery from '../../components/mobileComponents/MobileDelivery'

const Delivery = () => {
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
        window?.innerWidth < 640 && <MobileDelivery />
      }

    </div>
  )
}

export default Delivery