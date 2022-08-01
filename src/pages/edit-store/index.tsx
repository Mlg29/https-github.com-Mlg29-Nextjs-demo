import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileCreateStore from '../../components/mobileComponents/MobileCreateStore'
import MobileEditStore from '../../components/mobileComponents/MobileEditStore'
import DesktopLayouts from '../../components/DesktopComponent/reusable/DesktopLayouts'
import DesktopStoreInformation from '../../components/DesktopComponent/DesktopStoreInformation'
import TabletStoreInformation from '../../components/TabletComponent/TabletStoreInformation'

const Signup = () => {
  const window = windowWidth()


  return (
    <div>
      {
        window?.innerWidth >= 1008 && <DesktopLayouts><DesktopStoreInformation /></DesktopLayouts>
      }

      {
        window?.innerWidth >= 641 && window?.innerWidth <= 1007 && <DesktopLayouts><TabletStoreInformation /></DesktopLayouts>
      }

      {
        window?.innerWidth < 640 && <MobileEditStore />
      }

    </div>
  )
}

export default Signup