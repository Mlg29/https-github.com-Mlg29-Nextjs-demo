import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileAddProduct from '../../components/mobileComponents/MobileAddProduct'
import DesktopLayouts from '../../components/DesktopComponent/reusable/DesktopLayouts'
import DesktopAddProduct from '../../components/DesktopComponent/DesktopAddProduct'
import TabletAddProduct from '../../components/TabletComponent/TabletAddProduct'

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
        window?.innerWidth >= 1008 && <DesktopLayouts><DesktopAddProduct /></DesktopLayouts>
      }

{
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <DesktopLayouts><TabletAddProduct /></DesktopLayouts>
      } 


      {
        window?.innerWidth < 640 && <MobileAddProduct />
      }

    </div>
  )
}

export default Delivery