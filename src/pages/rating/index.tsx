import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileRating from '../../components/mobileComponents/MobileRating'
import DesktopLayouts from '../../components/DesktopComponent/reusable/DesktopLayouts'
import DesktopRating from '../../components/DesktopComponent/DesktopRating'
import TabletRating from '../../components/TabletComponent/TabletRating'

const Rating = () => {
  const window = windowWidth()


  return (
    <div>

      {
        window?.innerWidth >= 1008 && <DesktopLayouts><DesktopRating /></DesktopLayouts>
      }
      {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <DesktopLayouts><TabletRating /></DesktopLayouts>
      }
      {
        window?.innerWidth < 640 && <MobileRating />
      }

    </div>
  )
}

export default Rating