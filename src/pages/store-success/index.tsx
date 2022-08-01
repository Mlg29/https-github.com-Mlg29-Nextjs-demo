import React from 'react'
import { windowWidth } from '../../utils/windowWidth'

import StoreSuccessContainer from '../../components/mobileComponents/StoreSuccessContainer'

const Signup = () => {
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
                window?.innerWidth < 640 && <StoreSuccessContainer />
            }

        </div>
    )
}

export default Signup