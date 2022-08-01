import React from 'react'
import styled from "styled-components"
import { ImageType } from '../../utils/types'

const ImageUploadContainer: React.FC<ImageType> = ({ source, width, height, type }) => {
  return (
    <>
      {
        type === 'round' ? <RoundImage
          src={source}
          width={width}
          height={height}
        />
          :
          <Image
            src={source}
            width={width}
            height={height}
           
          />
      }
    </>
  )
}


export default ImageUploadContainer


const RoundImage = styled.img`
    border-radius: 50%;
`

const Image = styled.img`
border-radius: 5px;
width: 100%
`