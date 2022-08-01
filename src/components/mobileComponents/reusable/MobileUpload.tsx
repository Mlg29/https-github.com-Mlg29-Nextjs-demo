import React from 'react'
import {Upload, UploadProps } from 'antd';
import { imag2, pic } from '../../../assets';
import Paragraph from '../../Paragraph';
import { GlobalStyle } from '../../../utils/themes/themes';
import styled from 'styled-components';
import Image from 'next/image'


const { Dragger } = Upload;

function MobileUpload({ profileImageChange }) {

   

  return (
    <div className="upload-btn-wrapper input-div3">
    <IconImage
      src={imag2}
    />
    <Paragraph text='Click here to upload. 1200 x 1000 recommended image resolution, up to 1MB each' textAlign='center' fontSize={GlobalStyle.size.size14} margin='15px 0%' />
    <input
      type="file"
      name="myfile"
      accept="image/*"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => profileImageChange(e)}
    />

  </div>
  )
}

export default MobileUpload

export const IconImage = styled(Image)`

`