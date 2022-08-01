import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileProfile from '../../components/mobileComponents/MobileProfile'
import DesktopLayouts from '../../components/DesktopComponent/reusable/DesktopLayouts'
import DesktopProfile from '../../components/DesktopComponent/DesktopProfile'
import TabletProfile from '../../components/TabletComponent/TabletProfile'

const Profile = () => {
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
        window?.innerWidth >= 1008 && <DesktopLayouts><DesktopProfile /></DesktopLayouts>
      }
      {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <DesktopLayouts><TabletProfile /></DesktopLayouts>
      } 
      {
        window?.innerWidth < 640 && <MobileProfile />
      }

    </div>
  )
}

export default Profile