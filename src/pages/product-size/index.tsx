import React from 'react'
import { windowWidth } from '../../utils/windowWidth'


import MobileProductSize from '../../components/mobileComponents/MobileProductSize'

const ProductSize = () => {
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
        window?.innerWidth < 640 && <MobileProductSize />
      }

    </div>
  )
}

export default ProductSize