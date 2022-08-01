import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileAddDeliveryFee from '../../components/mobileComponents/MobileAddDeliveryFee'

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
      }
      
      */}

      {
        window?.innerWidth < 640 && <MobileAddDeliveryFee />
      }

    </div>
  )
}

export default Delivery