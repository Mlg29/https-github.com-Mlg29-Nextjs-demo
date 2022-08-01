import React, {useEffect} from 'react'
import Button from '../Button';
import styled from 'styled-components';
import {
    Header,
    IconImage,
    Container,
    BottomContainer,
    ColumnContainer,
    SmallTextCenter
} from "./Styled"

import { ColumnCenterGlobal } from "../../utils/StyledComponent"

import { GlobalStyle } from '../../utils/themes/themes';
import { useRouter } from 'next/router';
import { success } from '../../assets';
import Paragraph from '../Paragraph';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { getPersonalStore, myStore } from '../../slices/StoreSlice';

const StoreSuccessContainer = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const myStoreList = useAppSelector(myStore)

    localStorage.setItem('activeId', myStoreList[0]?.id)
    localStorage.setItem('activeName', myStoreList[0]?.brandName)


    useEffect(() => {
        dispatch(getPersonalStore())
    }, )

    return (
        <Container>
            <ColumnContainer>
                <ColumnCenterGlobal>
                    <IconImage
                        src={success}
                        width={150}
                        height={120}
                    />
                    <br/>
                    <br/>
                    <Paragraph text='Great! Store Created' fontSize={GlobalStyle.size.size20} fontWeight='700' />
                    <Div>
                    <Paragraph text='You’re almost there. Now let’s add other items to your store' color={GlobalStyle.color.gray} fontSize={GlobalStyle.size.size14} fontWeight='400' textAlign='center' />
                    </Div>
                </ColumnCenterGlobal>

            </ColumnContainer>

            <BottomContainer>
            <Button children="Continue" handlePress={() => router.push('/my-store')} />
            </BottomContainer>
        </Container>
    )
}

export default StoreSuccessContainer



const Div = styled.div`
 width: 80%;
 margin: 1% auto;
`