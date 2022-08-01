import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { bags, bank, Bg, bigProfile, chevronRight, groupUser, lock, ordd, productLogo, shoppingCart, store, truck, unlock } from '../../assets';
import { RowBetween, RowStart } from '../../utils/StyledComponent';
import { GlobalStyle } from '../../utils/themes/themes';
import {
    IconImage,
    Container,
    SmallText,
    Header
} from "./Styled"
import StoreHeader from './reusable/StoreHeader';
import Slider from "react-slick";
import { ArrayOptionType } from "../../utils/types"
import ListCard from './reusable/ListCard';
import MobileTabs from './reusable/MobileTabs';
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { useRouter } from "next/router"
import { getPersonalStore, getStoreById, myStore, storebyId } from '../../slices/StoreSlice';
import * as CurrencyFormat from 'react-currency-format';
import Paragraph from '../Paragraph';

import { wrapper } from '../../app/store';
import { getSellerOrders, sellerOrders } from '../../slices/OrderSlice';
import { getProduct, products } from '../../slices/ProductSlice';
import { getStaff, staffsData } from '../../slices/StaffSlice';
import { getPayouts, payouts } from '../../slices/PayoutSlice';
import { Col, Row } from 'react-bootstrap';
import ChartComponent from '../Charts';
import { Timeline } from 'antd';
import DashboardSkeleton from '../SkelentonLoader/Mobile/DashboardSkeleton';



function MobileStorePage() {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const storebyIdData = useAppSelector(storebyId)
    const sellerOrderList = useAppSelector(sellerOrders)
    const payout = useAppSelector(payouts)
    const productList = useAppSelector(products)
    const staffList = useAppSelector(staffsData)
    const id = localStorage.getItem("activeId")
    const [stateLoader, setStateLoader] = useState(false)



    useEffect(() => {
        setStateLoader(true)
        const loadData = async () => {
            const payload = {
                id: id,
                status: ''
            }

            dispatch(getSellerOrders(payload))
            dispatch(getStoreById(id))
            dispatch(getProduct(id))
            dispatch(getStaff(id))
           await dispatch(getPayouts())
           setStateLoader(false)
        }

        loadData()
    }, [id])

    const settings = {
        className: "slider variable-width",
        dots: false,
        infinite: false,
        centerMode: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false
    };

    const quickActionArray = [
        {
            id: 1,
            title: "Add your first product",
            icon: productLogo,
            route: 'add-product',
            isActive: productList?.length > 0 ? true : false
        },
        {
            id: 2,
            title: "Add users / staff to your store",
            icon: groupUser,
            route: 'add-staff',
            isActive: staffList?.length > 0 ? true : false
        },
        {
            id: 4,
            title: "Add payout bank account",
            icon: bank,
            route: 'payout',
            isActive: payout?.payouts?.length > 0 ? true : false
        }

    ]

    return (
        <Container>
        {
            stateLoader ? <DashboardSkeleton />
            :
            <>
            <StoreHeader name={storebyIdData?.brandName} slug={storebyIdData?.slug} />

            {
                productList?.length < 1 && <>
                    <Break />
                    <Break />
                    <Paragraph text='Quick Actions' fontSize={GlobalStyle.size.size14} fontWeight='600' />

                    {quickActionArray?.map((data: ArrayOptionType) => {
                        return <ListCard key={data?.id} {...data} />
                    })
                    }
                </>
            }
            {
                productList?.length > 0 && <>
                    <CardOne>
                        <Paragraph text='Analytics' fontSize={GlobalStyle.size.size14} fontWeight='bold' margin='0% 0% 10px 0%' />
                        <Row>
                            <Col sm={12}>
                                <CardBox>
                                    <IconImage src={lock} />
                                    <Paragraph text='Expected Earning' fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0% 0% 10px 0%' />
                                    <CurrencyFormat value={storebyIdData?.wallet?.escrow} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size20} fontWeight='700' />} />
                                </CardBox>
                            </Col>

                            <Col sm={12}>
                                <CardBox>
                                    <IconImage src={unlock} />
                                    <Paragraph text='Store Balance' fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0% 0% 10px 0%' />
                                    <CurrencyFormat value={storebyIdData?.wallet?.balance} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size20} fontWeight='700' />} />
                                </CardBox>
                            </Col>
                        </Row>
                    </CardOne>
                    <SliderDiv {...settings}>
                        <CardTwo>
                            <RowStart>
                                <IconImage src={Bg} />
                                <Paragraph text='Product' fontSize={GlobalStyle.size.size16} margin='0% 0px 0% 15px' />
                            </RowStart>
                            <Paragraph text={productList?.length} fontSize={GlobalStyle.size.size30} fontWeight='700' margin='0px 0px 0px 0px' />
                        </CardTwo>
                        <CardTwo>
                            <RowStart>
                                <IconImage src={bigProfile} />
                                <Paragraph text='Staff' fontSize={GlobalStyle.size.size16} margin='0% 0px 0% 15px' />
                            </RowStart>
                            <Paragraph text={staffList?.length} fontSize={GlobalStyle.size.size30} fontWeight='700' margin='0px 0px 0px 0px' />
                        </CardTwo>
                        <CardTwo>
                            <RowStart>
                                <IconImage src={ordd} />
                                <Paragraph text='Orders' fontSize={GlobalStyle.size.size16} margin='0% 0px 0% 15px' />
                            </RowStart>
                            <Paragraph text={sellerOrderList?.length} fontSize={GlobalStyle.size.size30} fontWeight='700' margin='0px 0px 0px 0px' />
                        </CardTwo>
                    </SliderDiv>
                    <CardOne>
                        <Row>
                            <Col sm={12}>
                                <BigDiv>
                                    <RowBetween>
                                        <Paragraph text={'Total Sales'} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                                    </RowBetween>
                                    <Div>
                                        <ChartComponent type={'line'} />
                                    </Div>
                                </BigDiv>
                            </Col>
                        </Row>
                    </CardOne>

                    <CardOne>
                        <BigDiv>
                            <RowBetween>
                                <Paragraph text={'Store Views'} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                            </RowBetween>
                            <Div>
                                <ChartComponent type={'bar-chart'} />
                            </Div>
                        </BigDiv>
                    </CardOne>

                    <CardOne>
                        <BigDiv>
                            <RowBetween>
                                <Paragraph text={'Activities'} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                            </RowBetween>
                            <br />
                            <Div2>
                                <Timeline>
                                    <Timeline.Item color={GlobalStyle.color.bazaraTint}>
                                        <Paragraph text={'Your earning has been approved.'} fontSize={GlobalStyle.size.size16} fontWeight='500' />
                                        <Paragraph text={'11 JUL 8:10 PM'} fontSize={GlobalStyle.size.size14} fontWeight='700' color={GlobalStyle.color.gray} />
                                    </Timeline.Item>
                                    <Timeline.Item color={GlobalStyle.color.bazaraTint}>
                                        <Paragraph text={'Product Title approved.'} fontSize={GlobalStyle.size.size16} fontWeight='500' />
                                        <Paragraph text={'11 JUL 8:10 PM'} fontSize={GlobalStyle.size.size14} fontWeight='700' color={GlobalStyle.color.gray} />
                                    </Timeline.Item>
                                    <Timeline.Item color={GlobalStyle.color.bazaraTint}>
                                        <Paragraph text={'Product Title approved.'} fontSize={GlobalStyle.size.size16} fontWeight='500' />
                                        <Paragraph text={'11 JUL 8:10 PM'} fontSize={GlobalStyle.size.size14} fontWeight='700' color={GlobalStyle.color.gray} />
                                    </Timeline.Item>
                                </Timeline>
                            </Div2>
                        </BigDiv>
                    </CardOne>
                </>
            }

            <MobileTabs />
        </>
        }
        </Container>
    )
}

export default MobileStorePage

const Card = styled.div`
background-image: url('https://res.cloudinary.com/doouwbecx/image/upload/v1656948136/card1_u0k5qx.svg');
background-size: cover;
width: 100%;
height: 110px;
padding: 20px;
border-radius: 10px;
`
const InactiveCard = styled.div`
background-image: url('https://res.cloudinary.com/doouwbecx/image/upload/v1656948136/card3_ycbxmz.svg');
background-size: cover;
width: 250px;
height: 110px;
padding: 20px;
border-radius: 10px;
`

const Break = styled.br`

`
const CardOne = styled.div`
  background: ${GlobalStyle.color.darkBlack};
  padding: 20px;
  border-radius: 5px;
  // width: 73%;
  margin-top: 10px;
`
const CardBox = styled.div`
  background: ${GlobalStyle.color.primaryBg};
  padding: 20px;
  border-radius: 5px;
  width: 100%;
    margin-bottom: 10px;
  
`

const CardTwo = styled.div`
  background: ${GlobalStyle.color.darkBlack};
  padding: 20px;
  border-radius: 5px;
  width: 150px !important;

`
const SliderDiv = styled(Slider)`

`
const BigDiv = styled.div`
background: ${GlobalStyle.color.darkBlack};
padding: 5px 3px;
`

const Div = styled.div`
 background: ${GlobalStyle.color.darkBlack};
 width: 100%;
 height: 250px;
 padding: 5px 0px;
`
const Div2 = styled.div`
 background: ${GlobalStyle.color.darkBlack};
 width: 100%;
 padding: 5px 0px;
`