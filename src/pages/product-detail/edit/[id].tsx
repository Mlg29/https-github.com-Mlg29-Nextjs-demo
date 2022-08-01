import React from 'react'
import { windowWidth } from '../../../utils/windowWidth'

import MobileEditProduct from '../../../components/mobileComponents/MobileEditProduct'


const EditProduct = () => {
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
        window?.innerWidth < 640 && <MobileEditProduct />
      }

    </div>
  )
}

export default EditProduct