import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileAddStaff from '../../components/mobileComponents/MobileAddStaff'

const CreateUser = () => {
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
        window?.innerWidth < 640 && <MobileAddStaff />
      }

    </div>
  )
}

export default CreateUser