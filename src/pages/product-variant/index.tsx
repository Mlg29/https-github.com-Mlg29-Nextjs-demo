import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileProductColor from '../../components/mobileComponents/MobileProductColor'
import DesktopLayouts from '../../components/DesktopComponent/reusable/DesktopLayouts'
import DesktopProductVariant from '../../components/DesktopComponent/DesktopProductVariant'
import TabletProductVariant from '../../components/TabletComponent/TabletProductVariant'

const ProductColor = () => {
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
        window?.innerWidth >= 1008 && <DesktopLayouts><DesktopProductVariant /></DesktopLayouts>
      } 
      {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <DesktopLayouts><TabletProductVariant /></DesktopLayouts>
      } 
      {
        window?.innerWidth < 640 && <MobileProductColor />
      }

    </div>
  )
}

export default ProductColor