import React from 'react'
import styled from 'styled-components'
import { chevronRight } from '../../../assets'
import { ListCardProps } from '../../../utils/interfaces'
import { RowBetween, RowStart } from '../../../utils/StyledComponent'
import { GlobalStyle } from '../../../utils/themes/themes'
import Paragraph from '../../Paragraph'
import { useRouter } from 'next/router'
import {
    IconImage,
    HeaderMedium
} from "../Styled"


const ListCard: React.FC<ListCardProps> = ({ title, icon, route, isActive }) => {
    const router = useRouter()

    const handleClick = (route) => {
        return router.push(`/${route}`)
    }


    return (
        <>
            {
                !isActive &&  <Div onClick={() => handleClick(route)}>
                <RowBetween>
                    <RowStart>
                        <View>
                            <IconImage
                                src={icon}
                            />
                        </View>
                        <Paragraph text={title} fontSize={GlobalStyle.size.size14} fontWeight='400' margin='-5% 0% 0% 0%' color={GlobalStyle.color.gray} />
                    </RowStart>
                    <IconImage
                        src={chevronRight}
                        width={16}
                        height={16}
                    />
                </RowBetween>
            </Div>
            }
        </>
       
    )
}

export default ListCard

const Div = styled.div`
    padding: 15px 0px;
    border-bottom: 1px solid ${GlobalStyle.color.lightGray};

`

const View = styled.div`
    margin-right: 10px;

`