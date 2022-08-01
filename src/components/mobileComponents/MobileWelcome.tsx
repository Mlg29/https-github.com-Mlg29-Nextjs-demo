import React, { useState } from 'react'
import Button from '../Button'
import WelcomeCard from './reusable/WelcomeCard'
import {
    Header,
    SmallText,
    Container,
    BottomContainer,
    ColumnContainer
} from "./Styled"
import { WelcomeCardProp } from "../../utils/types"
import styled from 'styled-components'
import {useRouter} from "next/router"


function MobileWelcome() {
    const router = useRouter()
    const [selected, setSelected] = useState('');


    const handleSubmit = () => {
        return router.push('/create-store')
    }

    const welcomeInfo = [
        {
            id: 1,
            header: 'Continue as a Seller',
            title:
                'I want to create a store where i can add products and sell on Bazara.',
            type: 'Seller',
        },
        {
            id: 2,
            header: 'Continue as a Buyer',
            title: 'I just want to shop and purchase items on Bazara for now.',
            type: 'Buyer',
        },
    ];

    const handleClick = (data: string) => {
        setSelected(data);
    };


    return (
        <Container>
            <ColumnContainer>
                <Div>
                    <Header>Welcome Damilola 🎉</Header>
                    <SmallText>We are happy to have you onboard the Bazara platform.</SmallText>
                    {welcomeInfo?.map((data: WelcomeCardProp) => {
                        return (
                            <WelcomeCard
                                key={data?.id}
                                header={data?.header}
                                title={data?.title}
                                type={data?.type}
                                selected={selected}
                                handleClick={() => handleClick(data?.type)}
                            />
                        );
                    })}
                </Div>
            </ColumnContainer>
            <BottomContainer>
                <Button children="Continue" handlePress={handleSubmit} />
            </BottomContainer>
        </Container>
    )
}

export default MobileWelcome


const Div = styled.div`
    margin-top: 10%;
`