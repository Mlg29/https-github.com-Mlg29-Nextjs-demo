import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Paragraph from '../Paragraph'

import { useRouter } from 'next/router'
import { GlobalStyle } from '../../utils/themes/themes'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { getPayouts, payouts, deletePayout, updatePayout, addPayouts } from '../../slices/PayoutSlice'
import PayoutModal from '../PayoutModal'
import { RowBetween } from '../../utils/StyledComponent'
import { IconImage } from './Styled'
import Button from '../Button'
import { bank } from '../../assets'
import EmptyState from '../mobileComponents/reusable/EmptyState'

function DesktopPayout() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [visible, setVisible] = useState(false)
  const payout = useAppSelector(payouts)
  const [editPayout, setEditPayout] = useState(null)


  useEffect(() => {
    dispatch(getPayouts())
  }, [])

  const showModal = (data?: any) => {
    setVisible(true)
    setEditPayout(data)
  }

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

  return (
    <ContainerBox>
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
          <Paragraph text={`Payments`} fontSize={GlobalStyle.size.size24} fontWeight='bold' margin='0% 0% 1% 10px' />
          <Card onClick={() => showModal(payout?.payouts[0])}>
            <Paragraph text={payout?.payouts[0].name} textAlign='center' fontSize={GlobalStyle.size.size14} fontFamily='600' />
            <Paragraph text={`${payout?.payouts[0].account} - ${payout?.payouts[0].bankName}`} textAlign='center' fontSize={GlobalStyle.size.size11} fontFamily='600' margin='2% 0%' />
          </Card>
          <br />
          <RowBetween>
            <Paragraph text='Transaction' />
            <Paragraph text='Filter' />
          </RowBetween>
          <br/>
          <EmptyState 
            icon={bank} 
            title={'No Transactions at the moment'} 
            header={'Your transactions info will appear here as soon as its available'}          
          />
        </>
      }

      {/* <Sub onClick={() => deletePayouts(payout?.payouts[0]._id)}>
                <Paragraph text='Delete' fontSize={GlobalStyle.size.size16} fontWeight='600' textAlign='center' />
            </Sub>  */}

      <PayoutModal
        visible={visible}
        setVisible={() => setVisible(false)}
        editPayout={editPayout}
      />
    </ContainerBox>
  )
}

export default DesktopPayout

const ContainerBox = styled.div`
    width: 600px;
    margin-left: 10px;
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
    height: 130px;
    width: 319px;
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }
`

const Div = styled.div`
 width: 90%;
 margin: 4% auto;
`

const ColumnGlobal = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 70vh;
width: 70%;
margin: 0 auto;
`

const Sub = styled.div`
    cursor: pointer
`