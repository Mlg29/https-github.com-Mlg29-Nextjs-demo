import React, { useEffect, useState } from 'react'
import { } from "./Styled"
import { windowWidth } from '../../utils/windowWidth'
import MobileLogin from '../../components/mobileComponents/MobileLogin'
import DesktopLogin from '../../components/DesktopComponent/DesktopLogin'

const Login = () => {
  const window = windowWidth()


  return (
    <div>
      {
        window?.innerWidth >= 641 && <DesktopLogin />
      }

      {
        window?.innerWidth < 640 && <MobileLogin />
      }
    </div>
  )
}

export default Login