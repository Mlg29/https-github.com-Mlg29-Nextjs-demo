import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { bank, card1, chevronLeft, truck } from '../../assets'
import Button from '../Button'
import Paragraph from '../Paragraph'
import MobileHeader from './Header'
import { Container, Header, IconImage, RowJustifyAlignBetween } from './Styled'
import { useRouter } from 'next/router'
import { GlobalStyle } from '../../utils/themes/themes'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { getPayouts, payouts, deletePayout, updatePayout, addPayouts } from '../../slices/PayoutSlice'

import PayoutModal from '../PayoutModal'

const MobilePayout = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [visible, setVisible] = useState(false)
    const payout = useAppSelector(payouts)
    const [editPayout, setEditPayout] = useState(null)

    useEffect(() => {
        dispatch(getPayouts())
    }, [])



    const deletePayouts = async (data: string) => {

        try {
            var resultAction = await dispatch(deletePayout(data))
            if (deletePayout.fulfilled.match(resultAction)) {
                return dispatch(getPayouts())
            }
            else {

                console.log('error', `Update failed`)
            }

        }
        catch (e) {
            console.log({ e })
        }
    }


    const showModal = (data?: any) => {
        setVisible(true)
        setEditPayout(data)
    }


    return (
        <Container>
            <RowJustifyAlignBetween>
                <DivSub onClick={() => router.back()}>
                    <IconImage
                        src={chevronLeft}
                        width={24}
                        height={24}
                    />
                </DivSub>
                <Paragraph text={'Payment'} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                <Sub onClick={() => showModal(payout?.payouts[0])}>
                    {
                        payout?.payouts?.length > 0 && <Paragraph text={'Edit'} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                    }
                   
                </Sub>

            </RowJustifyAlignBetween>
            <Column>
                {
                    payout?.payouts?.length < 1 && <ColumnGlobal>
                        <IconImage
                            src={bank}
                            width={100}
                            height={100}
                        />
                        <Paragraph text='No Account Details Added' fontSize={GlobalStyle.size.size16} fontWeight='600' textAlign='center' />
                        <Div>
                            <Paragraph text='You can’t see any transaction until you add a payment account' color={GlobalStyle.color.gray} fontSize={GlobalStyle.size.size14} fontWeight='400' textAlign='center' />
                        </Div>
                        <br />
                        <Button children="Add account details" handlePress={() => showModal()} />
                    </ColumnGlobal>
                }

                {
                    payout?.payouts?.length > 0 &&
                    <>
                        <Card>
                            <Paragraph text={payout?.payouts[0].name} textAlign='center' fontSize={GlobalStyle.size.size14} fontFamily='600' />
                            <Paragraph text={`${payout?.payouts[0].account} - ${payout?.payouts[0].bankName}`} textAlign='center' fontSize={GlobalStyle.size.size11} fontFamily='600' margin='2% 0%' />
                        </Card>
                        <Paragraph text='Transactions' margin='5% 0%' />

                        <CardDiv>
                            <IconImage
                                src={bank}
                                width={70}
                                height={70}
                            />
                            <Paragraph text='No Transactions at the moment' fontSize={GlobalStyle.size.size16} fontWeight='600' textAlign='center' />
                        </CardDiv>
                    </>
                }



            </Column>
            
            {/* <Sub onClick={() => deletePayouts(payout?.payouts[0]._id)}>
                <Paragraph text='Delete' fontSize={GlobalStyle.size.size16} fontWeight='600' textAlign='center' />
            </Sub>  */}

            <PayoutModal
                visible={visible}
                setVisible={() => setVisible(false)}
                editPayout={editPayout}
            />
        </Container>
    )
}

export default MobilePayout

const Div = styled.div`
 width: 90%;
 margin: 4% auto;
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

const Card = styled.div`
    margin-top: 3%;
    background-image: url('https://res.cloudinary.com/doouwbecx/image/upload/v1656948136/card2_ovsn3v.svg');
    background-size: cover;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
`

const CardDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Sub = styled.div`
    cursor: pointer
`

const DivSub = styled.div`

`