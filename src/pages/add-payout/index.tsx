import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileAddPayout from '../../components/mobileComponents/MobileAddPayout'

const AddPayout = () => {
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
        window?.innerWidth < 640 && <MobileAddPayout />
      }

    </div>
  )
}

export default AddPayout