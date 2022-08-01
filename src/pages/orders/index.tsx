import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileOrder from '../../components/mobileComponents/MobileOrder'
import DesktopLayouts from '../../components/DesktopComponent/reusable/DesktopLayouts'

import Paragraph from '../../components/Paragraph'
import DesktopSellerOrder from '../../components/DesktopComponent/DesktopSellerOrder'
import TabletSellerOrder from '../../components/TabletComponent/TabletSellerOrder'

const Orders = () => {
  const window = windowWidth()

  const hello = () => {
    return <Paragraph text='hello world' />
  }

  return (
    <div>

{
        window?.innerWidth >= 1008 &&<DesktopLayouts><DesktopSellerOrder /></DesktopLayouts>
      }
       {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 &&<DesktopLayouts><TabletSellerOrder /></DesktopLayouts>
      } 
      {
        window?.innerWidth < 640 && <MobileOrder />
      }

    </div>
  )
}

export default Orders