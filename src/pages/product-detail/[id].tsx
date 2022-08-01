import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileProductDetail from '../../components/mobileComponents/MobileProductDetail'


const ProductInfo = () => {
  const window = windowWidth()


  return (
    <div>
{/* 
      {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007
      } 

      {
        window?.innerWidth >= 1008 && <DesktopMyStore />
      }*/}

      {
        window?.innerWidth < 640 && <MobileProductDetail />
      }

    </div>
  )
}

export default ProductInfo