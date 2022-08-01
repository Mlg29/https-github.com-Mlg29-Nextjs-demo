import React, { useState } from 'react'
import { Modal } from "antd"
import { ModalType } from '../../utils/types'
import { ColumnCenterGlobal, MobileHeaderMedium, MobileParagraphMedium, RowStart } from '../../utils/StyledComponent'
import Image from "../Image"
import Button from '../Button'
import styled from "styled-components"
import { Container, IconImage } from '../mobileComponents/Styled'
import { GlobalStyle } from '../../utils/themes/themes'
import Paragraph from '../Paragraph'
import { checkbox } from '../../assets'
import TextInput from '../TextInput'
import { useAppDispatch } from '../../app/hook'
import { rejectAndCancelOrder } from '../../slices/OrderSlice'


const OrderActionModal = ({ action, modalVisible, setModalVisible, orderId}) => {
    const [selected, setSelected] = useState('')
    const [other, setOther] = useState('')
    const [loader, setLoader] = useState(false)

    const dispatch = useAppDispatch()


    const handleModalSubmit = async () => {
        setLoader(true)

        const payload = {
            status: action === 'reject' ? 'rejected' : 'cancelled',
            orderId,
            body:  {
                actionReason: selected === "Others" ? other : selected
            }
        }
      
        try {
            const resultAction = await dispatch(rejectAndCancelOrder(payload))
            if (rejectAndCancelOrder.fulfilled.match(resultAction)) {
               setModalVisible()
                setLoader(false)
            } else {
                if (resultAction.payload) {
                    setLoader(false)
                    console.log('error1', `Update failed: ${resultAction.error.message}`)
                } else {
                    setLoader(false)
                    console.log('error', `Updated failed: ${resultAction.error.message}`)
                }
            }
        }
        catch(e) {
            console.log(e)
        }
    }


    return (
        <ModalCard
            title={null}
            centered
            style={{ top: 20 }}
            visible={modalVisible}
            onOk={setModalVisible}
            onCancel={setModalVisible}
            footer={null}
            closable={false}

        >
            <ContainerDiv>
                <Paragraph textTransform='capitalize' margin='2% 0%' text={`${action} order`} fontSize={GlobalStyle.size.size16} fontWeight='700' />
                <Paragraph text={`Why do you want to ${action} this order?`} fontSize={GlobalStyle.size.size14} fontWeight='400' color={GlobalStyle.color.gray} />
                <Div>
                    <Span>
                        <RowStart>
                            {
                                selected === 'Product out of stock' ? <ActiveBox onClick={() => setSelected('Product out of stock')}><IconImage src={checkbox} /></ActiveBox> : <InactiveBox onClick={() => setSelected('Product out of stock')}></InactiveBox>
                            }
                            <Paragraph text="Product out of stock" fontSize={GlobalStyle.size.size14} fontWeight='400' margin='0% 2%' />
                        </RowStart>
                    </Span>
                    <Span>
                        <RowStart>
                            {
                                selected === 'Seller currently unavailable' ? <ActiveBox onClick={() => setSelected('Seller currently unavailable')}><IconImage src={checkbox} /></ActiveBox> : <InactiveBox onClick={() => setSelected('Seller currently unavailable')}></InactiveBox>
                            }
                            <Paragraph text="Seller currently unavailable" fontSize={GlobalStyle.size.size14} fontWeight='400' margin='0% 2%' />
                        </RowStart>
                    </Span>

                    <Span>
                        <RowStart>
                            {
                                selected === 'Others' ? <ActiveBox onClick={() => setSelected('Others')}><IconImage src={checkbox} /></ActiveBox> : <InactiveBox onClick={() => setSelected('Others')}></InactiveBox>
                            }
                            <Paragraph text="Others" fontSize={GlobalStyle.size.size14} fontWeight='400' margin='0% 2%' />
                        </RowStart>

                    </Span>
                    <RowStart>
                        {
                            selected === 'Others' &&
                            <ContainerDiv>
                                <TextInput
                                        label={`Tell us why you want to ${action} this order`}
                                        required
                                        isMultiline={true}
                                        value={other}
                                        onChange={(e) => setOther(e.target.value)}
                                />
                            </ContainerDiv>

                        }
                    </RowStart>
                </Div>
                <Button isLoading={loader} children={"Submit"} handlePress={handleModalSubmit} />
            </ContainerDiv>
        </ModalCard>
    )
}

export default OrderActionModal


const ContainerDiv = styled.div`
 width: 100%;
`

const ModalCard = styled(Modal)`
    
`

const Div = styled.div`
    padding: 5px 0%;
`

const ActiveBox = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    background: ${GlobalStyle.color.bazaraTint};
    border-radius: 50%;
`

const InactiveBox = styled.div`
width: 20px;
height: 20px;
background: ${GlobalStyle.color.darkBlack};
border: 1px solid ${GlobalStyle.color.white};
border-radius: 50%;
`

const Span = styled.div`
    padding: 10px 0%;
`