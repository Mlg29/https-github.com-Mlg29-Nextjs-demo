import React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../../../utils/themes/themes'
import Button from '../../Button'
import Paragraph from '../../Paragraph'
import { IconImage } from '../Styled'
import { useRouter } from "next/router"
import { EmptyStateType } from '../../../utils/types'

const EmptyState: React.FC<EmptyStateType> = ({ icon, title, header, btn, route, btnText }) => {
    const router = useRouter()


    return (
        <Column>
            <ColumnGlobal>
                <IconImage
                    src={icon}
                    width={100}
                    height={80}
                />
                <Paragraph text={title} fontSize={GlobalStyle.size.size18} fontWeight='600' />
                <Div>
                    <Paragraph text={header} color={GlobalStyle.color.gray} fontSize={GlobalStyle.size.size14} fontWeight='400' textAlign='center' />
                </Div>
                {
                    btn && <>
                        <br />
                        <Button children={btnText} handlePress={() => router.push(route)} />
                    </>
                }
            </ColumnGlobal>

        </Column>
    )
}

export default EmptyState

const Div = styled.div`
            width: 80%;
            margin: 1% auto;
            `

const Column = styled.div`
            flex: 1;
            `

const ColumnGlobal = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 80%;
            width: 70%;
            margin: 0 auto;
            `
