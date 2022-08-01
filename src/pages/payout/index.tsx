import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobilePayout from '../../components/mobileComponents/MobilePayout'
import DesktopLayouts from '../../components/DesktopComponent/reusable/DesktopLayouts'
import DesktopPayout from '../../components/DesktopComponent/DesktopPayout'
import TabletPayout from '../../components/TabletComponent/TabletPayout'

const Payout = () => {
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
        window?.innerWidth >= 1008 && <DesktopLayouts><DesktopPayout /></DesktopLayouts>
      }
      {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <DesktopLayouts><TabletPayout /></DesktopLayouts>
      } 
      {
        window?.innerWidth < 640 && <MobilePayout />
      }

    </div>
  )
}

export default Payout