
import React from 'react'
import styled from 'styled-components'
import { IconImage } from '../mobileComponents/Styled'

import { UploadInterface } from '../../utils/interfaces'
import { minus } from '../../assets'
import ImageUploadContainer from '../ImageUpload'

const MultipleUploadedImage: React.FC<UploadInterface> = ({index, imageUrl, removeImage }) => {
    return (
        <Div key={index}>
            <MinDiv onClick={removeImage}>
                <IconImage src={minus} />
            </MinDiv>
            <MiniDiv>
             <ImageUploadContainer source={imageUrl} width={90} height={90} />
            </MiniDiv>
        </Div>
    )
}

export default MultipleUploadedImage

const Div = styled.div`

`
const MinDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: -20%;
    margin-right: 5%;
    cursor: pointer;
`

const MiniDiv = styled.div`
  width: 100%;
`


