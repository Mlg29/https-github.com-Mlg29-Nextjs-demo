import React from 'react'
import DesktopResetPassword from '../../components/DesktopComponent/DesktopResetPassword'
import MobileResetPassword from '../../components/mobileComponents/MobileResetPassword'

import { windowWidth } from '../../utils/windowWidth'

function ResetPassword() {
    const window = windowWidth()


  return (
    <div>
 {
        window?.innerWidth >= 641 && <DesktopResetPassword />
      }


      {
        window?.innerWidth < 640 && <MobileResetPassword />
      }
    </div>
  )
}

export default ResetPassword