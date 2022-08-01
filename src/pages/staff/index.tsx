import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileSignup from '../../components/mobileComponents/MobileSignup'
import DesktopSignup from '../../components/DesktopComponent/DesktopSignup'
import MobileStaff from '../../components/mobileComponents/MobileStaff'
import DesktopLayouts from '../../components/DesktopComponent/reusable/DesktopLayouts'
import DesktopStaff from '../../components/DesktopComponent/DesktopStaff'
import TabletStaff from '../../components/TabletComponent/TabletStaff'

const Staff = () => {
  const window = windowWidth()


  return (
    <div>
{
        window?.innerWidth >= 1008 &&<DesktopLayouts><DesktopStaff /></DesktopLayouts>
      }
       {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 &&<DesktopLayouts><TabletStaff /></DesktopLayouts>
      }
      {
        window?.innerWidth < 640 && <MobileStaff />
      }

    </div>
  )
}

export default Staff