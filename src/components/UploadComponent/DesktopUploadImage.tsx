
import React from 'react'
import styled from 'styled-components'
import { IconImage } from '../mobileComponents/Styled'

import { UploadInterface } from '../../utils/interfaces'
import { minus } from '../../assets'
import ImageUploadContainer from '../ImageUpload'

const DesktopUploadedImage: React.FC<UploadInterface> = ({index, imageUrl, removeImage }) => {
    return (
        <Div key={index}>
            {
                removeImage && <MinDiv onClick={removeImage}>
                <IconImage src={minus} />
            </MinDiv>
            }
            <MiniDiv>
             <ImageUploadContainer source={imageUrl} width={80} height={150} />
            </MiniDiv>
        </Div>
    )
}

export default DesktopUploadedImage

const Div = styled.div`
width: 80%;
`
const MinDiv = styled.div`
    display: flex;
    justify-content: flex-end;
   margin-bottom: -15px;
    margin-right: 5%;
    cursor: pointer;
`

const MiniDiv = styled.div`
  width: 100%;
`


