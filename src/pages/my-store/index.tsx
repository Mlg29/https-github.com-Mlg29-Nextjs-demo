import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileStorePage from '../../components/mobileComponents/MobileStorePage'
import DesktopMyStore from '../../components/DesktopComponent/DesktopMyStore'
import DesktopLayouts from '../../components/DesktopComponent/reusable/DesktopLayouts'
import MyStoreTablet from '../../components/TabletComponent/MyStoreTablet'

const MyStore = () => {
  const window = windowWidth()


  return (
    <div>
{/* 

      {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007
      } */}

{
        window?.innerWidth >= 1200 && <DesktopLayouts><DesktopMyStore /></DesktopLayouts>
      }

{
        window?.innerWidth >= 640 && window?.innerWidth < 1200 && <DesktopLayouts><MyStoreTablet /></DesktopLayouts>
      }

      {
        window?.innerWidth < 640 && <MobileStorePage />
      }

    </div>
  )
}

export default MyStore