import React from 'react'
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
import { mailFancy } from '../../assets';

const MobileResetContainer = () => {
    const router = useRouter()



    return (
        <Container>
            <ColumnContainer>
                <ColumnCenterGlobal>
                    <IconImage
                        src={mailFancy}
                        width={90}
                        height={80}
                    />
                    <Header>Check your email</Header>
                    <SmallTextCenter>We have sent a password recovery instruction to your email</SmallTextCenter>
                    <Button children="Return to sign in" handlePress={() => router.push('/login')} />
                </ColumnCenterGlobal>

            </ColumnContainer>

            <BottomContainer>

                <View>
                    <SmallTextCenter>Did not receive the email? Check your spam folder or <Span onClick={() => router.push('/reset-password')}>Resend Link </Span></SmallTextCenter>
                </View>

            </BottomContainer>
        </Container>
    )
}

export default MobileResetContainer


const View = styled.div`
 display: flex;
 justify-content: center;
 margin-top: 5%;
`

const Span = styled.span`
 color: ${GlobalStyle.color.bazaraTint}
`