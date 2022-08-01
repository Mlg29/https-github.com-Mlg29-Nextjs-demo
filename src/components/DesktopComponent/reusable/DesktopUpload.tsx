import React from 'react'
import {Upload, UploadProps } from 'antd';
import { IconImage } from '../Styled';
import { pic } from '../../../assets';
import Paragraph from '../../Paragraph';
import { GlobalStyle } from '../../../utils/themes/themes';
const { Dragger } = Upload;

function DesktopUpload({ profileImageChange }) {

   

  return (
    <div className="upload-btn-wrapper input-div2">
    <IconImage
      src={pic}
    />
    <Paragraph text='Drag your images here, or click here to browse
1200 x 1000 recommended image resolution, up to 1MB each' textAlign='center' fontSize={GlobalStyle.size.size14} margin='15px 20px' />
    <input
      type="file"
      name="myfile"
      accept="image/*"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => profileImageChange(e)}
    />

  </div>
  )
}

export default DesktopUpload