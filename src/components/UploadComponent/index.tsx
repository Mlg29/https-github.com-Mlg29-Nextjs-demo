
import React from 'react'

import { plus } from '../../assets'

import { IconImage } from '../mobileComponents/Styled'

const UploadComponent = ({ profileImageChange }) => {
  return (
      <div className="upload-btn-wrapper input-div">
        <IconImage
          src={plus}
        />
        <input
          type="file"
          name="myfile"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => profileImageChange(e)}
        />
      </div>

  )
}

export default UploadComponent

