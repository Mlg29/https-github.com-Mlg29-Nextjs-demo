import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'

import { useRouter } from "next/router"
import { changeOrderStatus, getSellerOrderDetail, sellerOrderDetails, orderLoader, resetData } from '../../slices/OrderSlice'
import { Container, IconImage } from '../../components/mobileComponents/Styled'
import { RowStart, RowAlignStart, RowBetween } from '../../utils/StyledComponent'
import { calender, chevronLeft, pin } from '../../assets'
import Paragraph from '../../components/Paragraph'
import styled from 'styled-components'
import { Tag, Divider } from "antd"
import { GlobalStyle } from '../../utils/themes/themes'
import ImageContainer from '../../components/Image'
import * as CurrencyFormat from "react-currency-format"
import Button from '../../components/Button'
import ResponseModal from '../../components/Modal/ResponseModal'
import OrderActionModal from '../../components/OrderActionModal'
import OrderDetailSkeleton from '../../components/SkelentonLoader/Mobile/OrderDetailSkeleton'

function OrderDetails() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const sellerOrderDetail = useAppSelector(sellerOrderDetails)
    const orderLoaderState = useAppSelector(orderLoader)
    const [loader, setLoader] = useState(false)
    const [responseTitle, setResponseTitle] = useState('')
    const [responseType, setResponseType] = useState('')
    const [responseVisible, setResponseVisible] = useState(false)

    const [action, setAction] = useState('')
    const [orderModalVisible, setOrderModalVisible] = useState(false)
    const [stateLoader, setStateLoader] = useState(false)




    const orderId = router?.query?.id

    const id = typeof window !== "undefined" ? localStorage?.getItem("activeId") : null

    const statusUpdate = sellerOrderDetail?.orderInfo.status === 'pending' ? 'This order is pending' : sellerOrderDetail?.orderInfo.status === 'processing' ? 'This order is been processed' : sellerOrderDetail?.orderInfo.status === 'dispatched' ? 'This order is been dispatched' : sellerOrderDetail?.orderInfo.status === 'completed' ? 'This order is completed' : `This order has been ${sellerOrderDetail?.orderInfo.status}`


    useEffect(() => {
        setStateLoader(true)
        const loadData = async () => {
            const payload = {
                id,
                orderId
            }
            // await dispatch(resetData())
            await dispatch(getSellerOrderDetail(payload))
            setStateLoader(false)
        }
        loadData()
    }, [orderId, id])


    const handleModalClose = () => {
        setResponseVisible(false)
    }



    const handleOrderModalOpen = (item) => {
        setOrderModalVisible(true)
        setAction(item)
    }

    const handleOrderModalClose = () => {

        const payload = {
            id,
            orderId
        }
        setOrderModalVisible(false)
        dispatch(getSellerOrderDetail(payload))
    }


    const handleSubmit = async (status) => {
        const payload = {
            orderId,
            status,
            productId: sellerOrderDetail?.productId
        }
        setLoader(true)
        try {
            const resultAction = await dispatch(changeOrderStatus(payload))
            if (changeOrderStatus.fulfilled.match(resultAction)) {
                const payload = {
                    id,
                    orderId
                }
                dispatch(getSellerOrderDetail(payload))
                setLoader(false)
            } else {
                if (resultAction.payload) {
                    setLoader(false)
                    setResponseVisible(true)
                    setResponseType('Error')
                    setResponseTitle("Error updating order")
                    console.log('error1', `Update failed: ${resultAction.error.message}`)
                } else {
                    setLoader(false)
                    setResponseVisible(true)
                    setResponseType('Error')
                    setResponseTitle("Error updating order")
                    console.log('error', `Updated failed: ${resultAction.error.message}`)
                }
            }
        }
        catch (e) {
            console.log({ e })
        }
    }


    return (
        <Container>
            {
                stateLoader ? <OrderDetailSkeleton />
                    :
                    <>
                        <RowStart>
                            <IconImage src={chevronLeft} onClick={() => router.back()} />
                            <Paragraph text='Order Details' fontSize={GlobalStyle.size.size16} fontWeight='400' margin='0% 2%' />
                        </RowStart>

                        <Div color={sellerOrderDetail?.orderInfo.status === 'pending' ? GlobalStyle.color.orange : sellerOrderDetail?.orderInfo.status === 'processing' ? GlobalStyle.color.pink : sellerOrderDetail?.orderInfo.status === 'dispatched' ? GlobalStyle.color.purple : sellerOrderDetail?.orderInfo.status === 'completed' ? GlobalStyle.color.green : GlobalStyle.color.red}>
                            <Paragraph textTransform='capitalize' textAlign='center' text={statusUpdate} fontSize={GlobalStyle.size.size12} />
                        </Div>

                        <View>
                            <RowStart>
                                <ImageContainer source={sellerOrderDetail?.orderInfo?.variantImg} width={40} height={40} />
                                <MinDiv>
                                    <Paragraph text={sellerOrderDetail?.orderInfo?.name} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                                    <Subdiv>
                                        <Paragraph text='Size -' fontSize={GlobalStyle.size.size10} fontWeight='400' />
                                        <Paragraph text={sellerOrderDetail?.orderInfo?.size} color={GlobalStyle.color.bazaraTint} margin='2px 0% 0% 5px' fontSize={GlobalStyle.size.size10} fontWeight='400' />
                                    </Subdiv>
                                </MinDiv>
                            </RowStart>
                            <Break></Break>
                            <RowAlignStart>
                                <IconImage src={pin} />
                                <MinDiv>
                                    <Paragraph text='Delivery Details' fontSize={GlobalStyle.size.size12} fontWeight='600' color={GlobalStyle.color.gray} />
                                    <Paragraph text={sellerOrderDetail?.deliveryInfo?.deliveryAddress} fontSize={GlobalStyle.size.size12} fontWeight='600' />

                                </MinDiv>
                            </RowAlignStart>
                            <Break></Break>
                            <RowAlignStart>
                                <IconImage src={calender} />
                                <MinDiv>
                                    <Paragraph text='Estimated Delivery Date' fontSize={GlobalStyle.size.size12} fontWeight='600' color={GlobalStyle.color.gray} />
                                    <Paragraph text={new Date(sellerOrderDetail?.deliveryInfo?.expectedDeliveryDate).toDateString()} fontSize={GlobalStyle.size.size12} fontWeight='600' />

                                </MinDiv>
                            </RowAlignStart>
                        </View>

                        <View>
                            <RowBetween>
                                <Paragraph text="Items Total" fontSize={GlobalStyle.size.size12} fontWeight='400' />
                                <CurrencyFormat value={sellerOrderDetail?.orderInfo?.totalAmount} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={value} fontSize={GlobalStyle.size.size12} fontWeight='600' />} />
                            </RowBetween>
                            <Break></Break>
                            <RowBetween>
                                <Paragraph text="Quantity" fontSize={GlobalStyle.size.size12} fontWeight='400' />
                                <Paragraph text={sellerOrderDetail?.orderInfo?.quantity} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                            </RowBetween>
                            <Break></Break>
                            <RowBetween>
                                <Paragraph text="Delivery Fee" fontSize={GlobalStyle.size.size12} fontWeight='400' />
                                <Paragraph text="N/A" fontSize={GlobalStyle.size.size12} fontWeight='400' />
                            </RowBetween>
                        </View>

                        <View>
                            <RowBetween>
                                <Paragraph text="Order ID" fontSize={GlobalStyle.size.size12} fontWeight='400' />
                                <Paragraph text={sellerOrderDetail?.id} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                            </RowBetween>
                            <Break></Break>
                            <RowBetween>
                                <Paragraph text="Order Date" fontSize={GlobalStyle.size.size12} fontWeight='400' />
                                <Paragraph text={new Date(sellerOrderDetail?.createdAt).toDateString()} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                            </RowBetween>
                            <Break></Break>
                            <RowBetween>
                                <Paragraph text="Buyer’s Name" fontSize={GlobalStyle.size.size12} fontWeight='400' />
                                <Paragraph text="N/A" fontSize={GlobalStyle.size.size12} fontWeight='400' />
                            </RowBetween>
                        </View>
                        <Break></Break>
                        {
                            sellerOrderDetail?.orderInfo.status === 'pending' ?
                                <Button isLoading={loader} children={"Mark as processing"} handlePress={() => handleSubmit('processing')} />
                                : sellerOrderDetail?.orderInfo.status === 'processing' ?
                                    <Button isLoading={loader} children={"Mark as dispatched"} handlePress={() => handleSubmit('dispatched')} />
                                    : null
                        }
                        <Break></Break>
                        {
                            sellerOrderDetail?.orderInfo.status === "pending" || sellerOrderDetail?.orderInfo.status === 'processing' ?
                                <RowBetween>
                                    <Paragraph text='Message Buyer' />

                                    {
                                        sellerOrderDetail?.orderInfo.status === 'pending' ?
                                            <Cont onClick={() => handleOrderModalOpen('reject')}>
                                                <Paragraph text='Reject Order' color={GlobalStyle.color.red} />
                                            </Cont>
                                            : sellerOrderDetail?.orderInfo.status === 'processing' ?
                                                <Cont onClick={() => handleOrderModalOpen('cancel')}>
                                                    <Paragraph text='Cancel Order' color={GlobalStyle.color.red} />
                                                </Cont>
                                                : null
                                    }
                                </RowBetween>
                                :
                                <ContDiv>
                                    <Paragraph text='Message Buyer' />
                                </ContDiv>
                        }


                        <ResponseModal
                            title={responseTitle}
                            type={responseType}
                            modalVisible={responseVisible}
                            setModalVisible={handleModalClose}
                            handlePress={handleModalClose}
                        />

                        <OrderActionModal
                            action={action}
                            modalVisible={orderModalVisible}
                            setModalVisible={handleOrderModalClose}
                            orderId={orderId}
                        />
                    </>
            }


        </Container>

    )
}

export default OrderDetails

const Div = styled(Tag)`
    margin: 5% 0% 2% 0%;
    padding: 5px;
    border-radius: 5px 5px 0px 0px;
`

const View = styled.div`
    padding: 10px;
    background: ${GlobalStyle.color.darkBlack};
    border-radius: 5px;
    margin-bottom: 3%;
`


const MinDiv = styled.div`
    margin-left: 3%;
`

const Subdiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const Break = styled(Divider)`
    color: ${GlobalStyle.color.lightwhite};
    margin: 10px 0% !important;
`

const Cont = styled.div`
    cursor: pointer
`

const ContDiv = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
`