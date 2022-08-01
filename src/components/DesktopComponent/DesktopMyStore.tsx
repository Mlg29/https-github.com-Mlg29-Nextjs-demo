import React, { useEffect } from 'react'
import styled from 'styled-components'
import Paragraph from '../Paragraph'
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
import { getAssignedStoresRole, getStaff, staffsData, storeRolesList } from '../../slices/StaffSlice';




const DesktopMyStore = () => {
  const dispatch = useAppDispatch()
  const productList = useAppSelector(products)
  const sellerOrderList = useAppSelector(sellerOrders)
  const storebyIdData = useAppSelector(storebyId)
  const staffList = useAppSelector(staffsData)
  const storeRoles = useAppSelector(storeRolesList)
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
    dispatch(getAssignedStoresRole())
  }, [])

  useEffect(() => {
    dispatch(getStoreById(id))
    dispatch(getProduct(id))
    dispatch(getStaff(id))
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
          <Tag color={text === 'pending' ? GlobalStyle.color.antdOrange : text === 'completed' ? GlobalStyle.color.antdGreen : text === 'cancelled' ? GlobalStyle.color.antdRed : text === 'rejected' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple}>
            <Paragraph textTransform='capitalize' text={text} fontSize={GlobalStyle.size.size12} color={text === 'pending' ? GlobalStyle.color.antdOrange : text === 'completed' ? GlobalStyle.color.antdGreen : text === 'cancelled' ? GlobalStyle.color.antdRed : text === 'rejected' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple} />
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
            <Col lg={4}>
              <CardOne>
                <Paragraph text='Analytics' fontSize={GlobalStyle.size.size16} fontWeight='bold' margin='0% 0% 10px 0%' />
                <RowStart>
                  <CardBox>
                    <IconImage src={lock} />
                    <Paragraph text='Expected Earning' fontSize={GlobalStyle.size.size16} fontFamily='400' margin='0% 0% 10px 0%' />
                    <CurrencyFormat value={storebyIdData?.wallet?.escrow} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size20} fontWeight='700' />} />
                  </CardBox>
                  <MinDiv></MinDiv>
                  <CardBox>
                    <IconImage src={unlock} />
                    <Paragraph text='Store Balance' fontSize={GlobalStyle.size.size16} fontFamily='400' margin='0% 0% 10px 0%' />
                    <CurrencyFormat value={storebyIdData?.wallet?.balance} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size20} fontWeight='700' />} />
                  </CardBox>
                </RowStart>
              </CardOne>
            </Col>
            <Col lg={3}>
              <CardTwo>
                <RowStart>
                  <IconImage src={bags} />
                  <Paragraph text='Product' margin='0% 0px 0% 15px' />
                </RowStart>                  
                <Paragraph text={productList?.length} fontSize={GlobalStyle.size.size30} fontWeight='700' margin='12px 0px 24px 0px' />
                <ScrollDiv>
                  <Paragraph text={`${activeProduct?.length} active products`} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                  <Paragraph text={`${draftProduct?.length} drafts products`} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                  <Paragraph text={`${inactiveProduct?.length} In-Progress products`} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                </ScrollDiv>
              </CardTwo>
            </Col>

            <Col lg={5}>
              <RowStart>
                <Card>
                  <RowStart>
                    <IconImage src={staff} />
                    <Paragraph text='Staff' margin='0% 0px 0% 15px' />
                  </RowStart>
                  <Paragraph text={staffList?.length} fontSize={GlobalStyle.size.size30} fontWeight='700' margin='12px 0px 24px 0px' />
                  <ScrollDiv>
                    <Paragraph text={'10 active'} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                    <Paragraph text={'10 pending request'} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                  </ScrollDiv>
                </Card>
                <MinDiv></MinDiv>
                <Card>
                  <RowStart>
                    <IconImage src={ord} />
                    <Paragraph text='Orders' margin='0% 0px 0% 15px' />
                  </RowStart>  
                  <Paragraph text={sellerOrderList?.length} fontSize={GlobalStyle.size.size30} fontWeight='700' margin='12px 0px 24px 0px' />
                  <ScrollDiv>
                    <Paragraph text={`${pendingOrders?.length} pending orders`} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                    <Paragraph text={`${processingOrders?.length} processing orders`} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                    <Paragraph text={`${dispatchOrders?.length} dispatched orders`} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                    <Paragraph text={`${rejectedOrders?.length} rejected orders`} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                    <Paragraph text={`${cancelOrders?.length} cancelled orders`} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                  </ScrollDiv>

                </Card>
              </RowStart>
            </Col>
          </Row>
        </Container>
      </View>

      <View>
        <Container fluid>
          <Row>
            <Col lg={7}>
              <BigDiv>
                <RowBetween>
                  <Paragraph text={'Total Sales'} fontSize={GlobalStyle.size.size20} fontWeight='700' />
                </RowBetween>
                <Div>
                  <ChartComponent type={'line'} />
                </Div>
              </BigDiv>

            </Col>

            <Col lg={5}>
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
            <Col lg={7}>
              <BigDiv>
                <RowBetween>
                  <Paragraph text={'Order Status'} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                  <Paragraph text={'View all'} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                </RowBetween>
                <SubDiv>
                  <Table 
                    columns={columns} 
                    dataSource={renderData()} 
                    pagination={false} 
                  />
                </SubDiv>
                <br />
              </BigDiv>

            </Col>

            <Col lg={5}>
              <BigDiv>
                <RowBetween>
                  <Paragraph text={'Activities'} fontSize={GlobalStyle.size.size14} fontWeight='700' />
                </RowBetween>
                <br />
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

export default DesktopMyStore


const View = styled.div`
  margin-bottom: 1%;
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
  height: 220px;

`

const Card = styled.div`
  background: ${GlobalStyle.color.darkBlack};
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  height: 220px;

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

const ScrollDiv = styled.div`
    height: 100px;
    overflow-y: scroll;
    margin-top: -10px;

    ::-webkit-scrollbar {
        display: none;
      }
`