import React, {useEffect} from 'react'
import styled from 'styled-components'
import Paragraph from '../Paragraph'
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import { GlobalStyle } from '../../utils/themes/themes';
import { RowBetween, RowStart } from '../../utils/StyledComponent';
import { IconImage } from './Styled';
import { bag, bags, lock, ord, staff, unlock } from '../../assets';
import * as CurrencyFormat from 'react-currency-format';
import ChartComponent from '../Charts';
import { Col, Container, Row } from 'react-bootstrap';
import { MyStoreTable } from '../../utils/interfaces';
import { Space, Table, Tag, Timeline } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { useRouter } from "next/router"
import { getPersonalStore, getStoreById, myStore, storebyId } from '../../slices/StoreSlice';
import { getSellerOrders, sellerOrders } from '../../slices/OrderSlice';
import { getProduct, products } from '../../slices/ProductSlice';




const MyStoreTablet = () => {
  const dispatch = useAppDispatch()
  const productList = useAppSelector(products)
  const sellerOrderList = useAppSelector(sellerOrders)
  const storebyIdData = useAppSelector(storebyId)

  const id = localStorage.getItem("activeId")


  const activeProduct = productList?.filter(data => data?.status === 'active')
  const draftProduct = productList?.filter(data => data?.status === 'draft')
  const inactiveProduct = productList?.filter(data => data?.status === 'inactive')
  const pendingOrders = sellerOrderList?.filter(data => data?.orderInfo.status === 'pending')
  const processingOrders = sellerOrderList?.filter(data => data?.orderInfo.status === 'processing')
  const dispatchOrders = sellerOrderList?.filter(data => data?.orderInfo.status === 'dispatched')
  const rejectedOrders = sellerOrderList?.filter(data => data?.orderInfo.status === 'rejected')
  const cancelOrders = sellerOrderList?.filter(data => data?.orderInfo.status === 'cancelled')




  useEffect(() => {
      dispatch(getPersonalStore())
     
  }, [])

  useEffect(() => {
    dispatch(getStoreById(id))
    dispatch(getProduct(id))
}, [id])

  useEffect(() => {
      const payload = {
          id: id,
          status: ''
      }
      dispatch(getSellerOrders(payload))
  }, [id])

  const columns: ColumnsType<MyStoreTable> = [
    {
      title: 'Order ID',
      dataIndex: 'key',
      key: 'key',
      render: text => <Paragraph text={text.substring(0, 10)} fontSize={GlobalStyle.size.size12} />,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'EDD',
      dataIndex: 'edd',
      key: 'edd',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text) => (
        <>
          <Tag color={text === 'pending' ? GlobalStyle.color.antdOrange : text === 'completed' ? GlobalStyle.color.antdGreen : text === 'cancelled' ? GlobalStyle.color.antdRed : text === 'rejected' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdGeekBlue }>
            <Paragraph textTransform='capitalize' text={text} fontSize={GlobalStyle.size.size12} color={text === 'pending' ? GlobalStyle.color.antdOrange : text === 'completed' ? GlobalStyle.color.antdGreen : text === 'cancelled' ? GlobalStyle.color.antdRed : text === 'rejected' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdGeekBlue } />
          </Tag>
        </>
      ),
    }
  ];

  const renderData = () => {
    return sellerOrderList?.filter((a, i) => i < 4).map(data => {
      return {
        key: data?.id,
        name: data?.product?.name,
        edd: data?.deliveryInfo?.deliverySchedule,
        status: data?.orderInfo?.status,
      }
    })
  }
  


  return (
    <>
      <Paragraph text='Home' fontSize={GlobalStyle.size.size24} fontWeight='bold' margin='0% 0% 1% 10px' />
      <View>
        <Container fluid >
          <Row>
            <Col lg={12}>
              <CardOne>
                <Paragraph text='Analytics' fontSize={GlobalStyle.size.size14} fontWeight='bold' margin='0% 0% 10px 0%' />
                <RowStart>
                  <CardBox>
                    <IconImage src={lock} />
                    <Paragraph text='Expected Earning' fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0% 0% 10px 0%' />
                    <CurrencyFormat value={storebyIdData?.wallet?.escrow} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size20} fontWeight='700' />} />
                  </CardBox>
                  <MinDiv></MinDiv>
                  <CardBox>
                    <IconImage src={unlock} />
                    <Paragraph text='Store Balance' fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0% 0% 10px 0%' />
                    <CurrencyFormat value={storebyIdData?.wallet?.balance} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size20} fontWeight='700' />} />
                  </CardBox>
                </RowStart>
              </CardOne>
            </Col>
            </Row>
        </Container>

      </View>

      <View>
        <Container fluid>
        <Row>
            <Col xs={4}>
              <CardTwo>
                <RowStart>
                  <IconImage src={bags} />
                  <Paragraph text='Product' margin='0% 0px 0% 15px' />
                </RowStart>
                <Paragraph text={productList?.length} fontSize={GlobalStyle.size.size25} fontWeight='700' margin='12px 0px 24px 0px' />
              </CardTwo>
            </Col>

            <Col xs={4}>
              <RowStart>
                <Card>
                  <RowStart>
                    <IconImage src={staff} />
                    <Paragraph text='Staff' margin='0% 0px 0% 15px' />
                  </RowStart>
                  <Paragraph text={'200'} fontSize={GlobalStyle.size.size25} fontWeight='700' margin='12px 0px 24px 0px' />
                </Card>
              </RowStart>
            </Col>

            <Col xs={4}>
              <RowStart>
                <Card>
                  <RowStart>
                    <IconImage src={ord} />
                    <Paragraph text='Orders' margin='0% 0px 0% 15px' />
                  </RowStart>
                  <Paragraph text={sellerOrderList?.length} fontSize={GlobalStyle.size.size25} fontWeight='700' margin='12px 0px 24px 0px' />
                </Card>
              </RowStart>
            </Col>
          </Row>
        </Container>
      </View>

      <View>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <BigDiv>
                <RowBetween>
                  <Paragraph text={'Total Sales'} fontSize={GlobalStyle.size.size16} fontWeight='700' />
                </RowBetween>
                <Div>
                  <ChartComponent type={'line'} />
                </Div>
              </BigDiv>

            </Col>
          </Row>
        </Container>
      </View>

      <View>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <BigDiv>
                <RowBetween>
                  <Paragraph text={'Store Views'} fontSize={GlobalStyle.size.size16} fontWeight='700' />
                </RowBetween>
                <Div>
                  <ChartComponent type={'bar-chart'} />
                </Div>
              </BigDiv>
            </Col>
          </Row>
        </Container>
      </View>

      <View>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <BigDiv>
                <RowBetween>
                  <Paragraph text={'Order Status'} fontSize={GlobalStyle.size.size16} fontWeight='700' />
                  <Paragraph text={'View all'} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                </RowBetween>
                <SubDiv>
                  <Table columns={columns} dataSource={renderData()} pagination={false} />
                </SubDiv>
                <br/>
              </BigDiv>

            </Col>
          </Row>
        </Container>
      </View>

      <View>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <BigDiv>
                <RowBetween>
                  <Paragraph text={'Activities'} fontSize={GlobalStyle.size.size16} fontWeight='700' />
                </RowBetween>
                <br/>
                <Div>
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
                </Div>
              </BigDiv>
            </Col>
          </Row>
        </Container>
      </View>
    </>


  )
}

export default MyStoreTablet


const View = styled.div`
  margin-bottom: 2%;
`

const Div = styled.div`
 background: ${GlobalStyle.color.darkBlack};
 width: 100%;
 height: 250px;
 padding: 5px 0px;
`

const SubDiv = styled.div`
 background: ${GlobalStyle.color.darkBlack};
 width: 100%;
 height: 250px;
 padding: 5px 0px;
 overflow-y: scroll;
 ms-overflow-style: none;
  scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none;
    }
`

const CardOne = styled.div`
  background: ${GlobalStyle.color.darkBlack};
  padding: 20px;
  border-radius: 5px;
  // width: 73%;
  height: 220px;
`

const CardTwo = styled.div`
  background: ${GlobalStyle.color.darkBlack};
  padding: 20px;
  border-radius: 5px;
  // width: 23%;
  height: 120px;

`

const Card = styled.div`
  background: ${GlobalStyle.color.darkBlack};
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  height: 120px;

`

const CardBox = styled.div`
  background: ${GlobalStyle.color.primaryBg};
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  height: 140px;
  
`

const MinDiv = styled.div`
  width: 50px;
`

const BigDiv = styled.div`
background: ${GlobalStyle.color.darkBlack};
padding: 5px 15px;
`