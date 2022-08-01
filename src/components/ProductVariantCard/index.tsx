import { Divider } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { deleteIcon, editIcon } from '../../assets'
import { ProductVariantCardInterface } from '../../utils/interfaces'
import { RowStart } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
import ImageContainer from '../Image'
import { IconImage } from '../mobileComponents/Styled'
import Paragraph from '../Paragraph'
import * as CurrencyFormat from 'react-currency-format';



const ProductVariantCard: React.FC<ProductVariantCardInterface> = ({image, name, price, edit,handleDeleteClick, handleEditClick}) => {
  return (
   <View>
        <RowStart>
            <ImageContainer source={image} width={40} height={40} />
            <Div>
                <Paragraph text={name} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value =>  <Paragraph color={GlobalStyle.color.gray} text={`Price: ${value}`} fontSize={GlobalStyle.size.size12} fontWeight='600' />} />
            </Div>
            {
                edit &&  <SubDiv>
                <IconImage src={editIcon} onClick={handleEditClick} />
                <IconImage src={deleteIcon} onClick={handleDeleteClick} />
            </SubDiv>
            }
        </RowStart>
        <Break></Break>
   </View>
  )
}

export default ProductVariantCard


const Break = styled(Divider)`
    background: ${GlobalStyle.color.lightwhite};
    margin: 10px 0% !important;
`

const View = styled.div`
    width: 100%;
`

const Div = styled.div`
    flex: 1;
    margin-left: 10px;
`

const SubDiv = styled.div`
    display: flex;
    width: 60px;
    justify-content: space-around;
`