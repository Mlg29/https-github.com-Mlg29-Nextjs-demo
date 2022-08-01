import React from 'react'
import { windowWidth } from '../../utils/windowWidth'


import MobileSellerProducts from '../../components/mobileComponents/MobileSellerProducts'
import DesktopLayouts from '../../components/DesktopComponent/reusable/DesktopLayouts'
import DesktopSellerProduct from '../../components/DesktopComponent/DesktopSellerProduct'
import TabletSellerProduct from '../../components/TabletComponent/TabletSellerProduct'


const Products = () => {
  const window = windowWidth()


  return (
    <div>
{
        window?.innerWidth >= 1008 &&<DesktopLayouts><DesktopSellerProduct /></DesktopLayouts>
      }
       {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 &&<DesktopLayouts><TabletSellerProduct /></DesktopLayouts>
      }
      {
        window?.innerWidth < 640 && <MobileSellerProducts />
      }

    </div>
  )
}

export default Products