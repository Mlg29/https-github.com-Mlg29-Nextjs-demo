import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import MobileSignup from '../../components/mobileComponents/MobileSignup'
import DesktopSignup from '../../components/DesktopComponent/DesktopSignup'

const Signup = () => {
  const window = windowWidth()


  return (
    <div>
      {
        window?.innerWidth >= 641 && <DesktopSignup />
      }

      {
        window?.innerWidth < 640 && <MobileSignup />
      }

    </div>
  )
}

export default Signup