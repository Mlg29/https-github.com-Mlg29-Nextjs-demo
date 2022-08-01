import React, { useEffect, useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { useRouter } from "next/router"
import { Dropdown, Menu, Space, Table, Tag, Timeline, Button as Btn } from 'antd';
import { changeOrderStatus, getSellerOrders, searchOrder, sellerOrders } from '../../slices/OrderSlice';
import Paragraph from '../Paragraph';
import { GlobalStyle } from '../../utils/themes/themes';
import styled from 'styled-components';
import SearchInput from '../SearchInput';
import Button from '../Button';
import { RowBetween, RowStart } from '../../utils/StyledComponent';
import ImageContainer from '../Image';
import * as CurrencyFormat from 'react-currency-format';
import { IconImage } from './Styled';
import { bigProdLogo, cancel, copy, hori } from '../../assets';
import { Modal, DatePicker } from "antd"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast, ToastContainer } from 'material-react-toastify';
import ResponseModal from '../Modal/ResponseModal';
import OrderActionModal from '../OrderActionModal';
import moment from 'moment';
import EmptyTable from '../EmptyTable';
import type { DatePickerProps } from 'antd';
import debounce from 'lodash.debounce'
import renderHTML from 'react-render-html';




function DesktopSellerOrder() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const sellerOrderList = useAppSelector(sellerOrders)
  const [loader, setLoader] = useState(false)
  const [status, setStatus] = useState("")

  const [modalVisible, setModalVisible] = useState(false)
  const [selectId, setSelectId] = useState('')
  const [responseTitle, setResponseTitle] = useState('')
  const [responseType, setResponseType] = useState('')
  const [responseVisible, setResponseVisible] = useState(false)
  const [action, setAction] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [orderModalVisible, setOrderModalVisible] = useState(false)
  const selectedData = sellerOrderList?.find(data => data.id === selectId)

  const id = typeof window !== 'undefined' ? localStorage.getItem("activeId") : null


    const searchData = useCallback(debounce(query =>
      dispatch(searchOrder(query)),
      500), [])

  const searchOrderData = query => {
      const paylaod = {
          search: query,
          id: id
      }
      const payloadSeller = {
          id,
          status
      }
      setSearchValue(query)
      if (!query) return dispatch(getSellerOrders(payloadSeller))

      const debouncedFilter = debounce(() => {
          searchData(paylaod)

      }, 500)

      debouncedFilter()
  }



  const handleCancel = () => {
    setModalVisible(false);
  };

  const showModal = (id: string) => {
    setModalVisible(true)
    setSelectId(id)
  }

  useEffect(() => {
    const payload = {
      id: id,
      status
    }
    dispatch(getSellerOrders(payload))
  }, [id, status])

  const handleSubmit = async (status) => {
    const payload = {
      orderId: selectId,
      status,
      productId: selectedData?.productId
    }
    setLoader(true)
    try {
      const resultAction = await dispatch(changeOrderStatus(payload))
      if (changeOrderStatus.fulfilled.match(resultAction)) {
        const payloads = {
          id: id,
          status
        }
        dispatch(getSellerOrders(payloads))
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

  const menu = (item) => (
    <Menu>
      <Menu.Item>
        <Subdiv onClick={() => showModal(item)}>
          <Paragraph text={'View Order'} />
        </Subdiv>
      </Menu.Item>
    </Menu>
  )

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
   const bb = moment(date).format('DD MMM YY')
    setDateValue(bb)
  };

  const subMenu = () => (
    <MenuDiv>
      <Paragraph text="Filter Order" fontSize={GlobalStyle.size.size16} fontWeight='600' />
      <Paragraph text="By Status" fontSize={GlobalStyle.size.size14} fontWeight='700' margin='10px 0px' />
      <MenuItem>
        <TextDiv style={{ backgroundColor: status === '' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus('')}>
          <Paragraph text="All" fontSize={GlobalStyle.size.size14} fontWeight='600' />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'pending' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus('pending')}>
          <Paragraph text="Pending" fontSize={GlobalStyle.size.size14} fontWeight='600' />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'processing' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus('processing')}>
          <Paragraph text="Processing" fontSize={GlobalStyle.size.size14} fontWeight='600' />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'dispatched' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus('dispatched')}>
          <Paragraph text="Dispatched" fontSize={GlobalStyle.size.size14} fontWeight='600' />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'cancelled' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus('cancelled')}>
          <Paragraph text="Cancelled" fontSize={GlobalStyle.size.size14} fontWeight='600' />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'rejected' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus('rejected')}>
          <Paragraph text="Rejected" fontSize={GlobalStyle.size.size14} fontWeight='600' />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'completed' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus('completed')}>
          <Paragraph text="Completed" fontSize={GlobalStyle.size.size14} fontWeight='600' />
        </TextDiv>
      </MenuItem>
      {/* <Paragraph text="By Date" fontSize={GlobalStyle.size.size14} fontWeight='700' margin='10px 0px' />

      <DatePick onChange={onChange} /> */}
    </MenuDiv>
  )



  const columns = [
    {
      title: '',
      dataIndex: '',
      key: '',
      width: 100,
      render: (item) => {
        return <RowStart>
          <InactiveBox></InactiveBox>
          <EmptyDiv></EmptyDiv>
          <ImageContainer source={item.image} width={35} height={35} />
        </RowStart>
      }
    },
    {
      title: 'Product Name',
      dataIndex: '',
      key: '',
      render: (item) => <Subdiv onClick={() => showModal(item.key)}><Paragraph text={item.name} fontSize={GlobalStyle.size.size16} /></Subdiv>

    },
    {
      title: 'Order ID',
      dataIndex: 'key',
      key: 'key',
      render: text => <Paragraph text={text.substring(0, 10)} fontSize={GlobalStyle.size.size16} />,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: item => <Paragraph text={moment(item).format("Do MMM YY")} fontSize={GlobalStyle.size.size16} />
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total Price',
      dataIndex: 'price',
      key: 'price',
      render: (item) => {
        return <CurrencyFormat value={item} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size16} fontWeight='700' />} />
      }
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text) => (
        <>
          <Tag color={text === 'pending' ? GlobalStyle.color.antdOrange : text === 'completed' ? GlobalStyle.color.antdGreen : text === 'cancelled' ? GlobalStyle.color.antdRed : text === 'rejected' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple}>
            <Paragraph textTransform='capitalize' text={text} fontSize={GlobalStyle.size.size16} color={text === 'pending' ? GlobalStyle.color.antdOrange : text === 'completed' ? GlobalStyle.color.antdGreen : text === 'cancelled' ? GlobalStyle.color.antdRed : text === 'rejected' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple} />
          </Tag>
        </>
      ),
    },
    {
      title: 'Expected Delivery',
      dataIndex: 'delivery',
      key: 'delivery',
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (item) => (
        <>
          <Dropdown overlay={menu(item?.key)} trigger={['click']}>
            <IconImage
              src={hori}

            />

          </Dropdown>
        </>
      ),
    },
  ];

  const renderData = () => {
    return sellerOrderList?.map(data => {
      return {
        key: data?.id,
        name: data?.product?.name,
        delivery: data?.deliveryInfo?.deliverySchedule,
        status: data?.orderInfo?.status,
        date: data?.createdAt,
        quantity: data?.orderInfo?.quantity,
        price: data?.orderInfo?.price,
        image: data?.orderInfo?.variantImg
      }
    })
  }

  const handleModalClose = () => {
    setResponseVisible(false)
  }



  const handleOrderModalOpen = (item) => {
    setOrderModalVisible(true)
    setAction(item)
  }

  const handleOrderModalClose = () => {
    setOrderModalVisible(false)
    setAction('')
    const payload = {
      id: id,
      status
    }
    dispatch(getSellerOrders(payload))
  }

  return (
    <>
      <Paragraph text='All Orders' fontSize={GlobalStyle.size.size24} fontWeight='bold' margin='0% 0% 1% 10px' />
      <View>
        <Div>
          <SearchBox>
            <SearchInput label={'Search order by Product Name or Order ID'} value={searchValue} onChange={(e) => searchOrderData(e.target.value)} />
          </SearchBox>
          <EmptyDiv></EmptyDiv>
          <ButtonBox>
            <Dropdown overlay={subMenu} trigger={['click']} placement="bottomRight">
              <ButtonFilterText>
                <Paragraph text='Filter' textAlign='center' />
              </ButtonFilterText>
            </Dropdown>

          </ButtonBox>
        </Div>
      </View>
      <Table
        columns={columns}
        size="small"
        dataSource={renderData()}
        locale={{
          emptyText: <EmptyTable
            icon={bigProdLogo}
            header='No Order'
            title='You don’t have any order at the moment. Once you have an order, it will be displayed here.' />
        }}
        pagination={
          { defaultPageSize: 12, pageSizeOptions: ['10', '20', '30'] }
        } />



      <ModalCard
        title={null}
        centered
        visible={modalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        style={{ top: 20 }}
        footer={null}
        closable={false}

      >
        <div>
          <RowBetween>
            <Paragraph text={"Order Details"} fontSize={GlobalStyle.size.size20} fontWeight='700' margin="0px 0px 10px 0px" />
            <div onClick={handleCancel}>
              <IconImage src={cancel} />
            </div>
          </RowBetween>

          <RowStart>
            <ImageContainer
              source={selectedData?.orderInfo?.variantImg}
              width={70}
              height={70}
            />
            <ModalDiv>
              <Paragraph text={selectedData?.product?.name} fontSize={GlobalStyle.size.size16} fontWeight="600" />
              {renderHTML(`<div>${selectedData?.product?.description}</div>`)}
              {/* <Paragraph text={selectedData?.product?.description} fontSize={GlobalStyle.size.size14} fontWeight="500" /> */}
            </ModalDiv>

          </RowStart>
          <br />
          <Container>
            <RowBetween>
              <ContainerDiv>
                <Paragraph text={"Order ID:"} fontSize={GlobalStyle.size.size14} fontWeight="500" />
              </ContainerDiv>
              <ContainerDiv>
              </ContainerDiv>
              <ContainerDiv2>
                <Paragraph text={selectedData?.id.substring(0, 10)} fontSize={GlobalStyle.size.size16} fontWeight="600" />
                <Spaced></Spaced>
                <CopyToClipboard text={selectedData?.id}
                  onCopy={() => toast.success("Id copied successfully")}
                >
                  <IconImage
                    src={copy}
                  />
                </CopyToClipboard>
              </ContainerDiv2>
              <ContainerDiv>
              </ContainerDiv>
            </RowBetween>
          </Container>
          <Container>
            <RowBetween>
              <ContainerDiv>
                <Paragraph text={"Quantity:"} fontSize={GlobalStyle.size.size14} fontWeight="500" />
              </ContainerDiv>
              <ContainerDiv>
              </ContainerDiv>
              <ContainerDiv2>
                <Paragraph text={selectedData?.orderInfo.quantity} fontSize={GlobalStyle.size.size16} fontWeight="600" />
              </ContainerDiv2>
              <ContainerDiv>
              </ContainerDiv>
            </RowBetween>
          </Container>
          <Container>
            <RowBetween>
              <ContainerDiv>
                <Paragraph text={"Price:"} fontSize={GlobalStyle.size.size14} fontWeight="500" />
              </ContainerDiv>
              <ContainerDiv>
              </ContainerDiv>
              <ContainerDiv2>
                <CurrencyFormat value={selectedData?.orderInfo.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size14} fontWeight='700' />} />
              </ContainerDiv2>
              <ContainerDiv>
              </ContainerDiv>
            </RowBetween>
          </Container>
          <Container>
            <RowBetween>
              <ContainerDiv>
                <Paragraph text={"Color:"} fontSize={GlobalStyle.size.size14} fontWeight="500" />
              </ContainerDiv>
              <ContainerDiv>
              </ContainerDiv>
              <ContainerDiv2>
                <Paragraph text={"N/A"} fontSize={GlobalStyle.size.size16} fontWeight="600" />
              </ContainerDiv2>
              <ContainerDiv>
              </ContainerDiv>
            </RowBetween>
          </Container>

          <Container>
            <RowBetween>
              <ContainerDiv>
                <Paragraph text={"Size:"} />
              </ContainerDiv>
              <ContainerDiv>
              </ContainerDiv>
              <ContainerDiv2>
                <Paragraph text={selectedData?.orderInfo.size} />
              </ContainerDiv2>
              <ContainerDiv>
              </ContainerDiv>
            </RowBetween>
          </Container>
          <Container>
            <RowBetween>
              <ContainerDiv>
                <Paragraph text={"Order Date:"} fontSize={GlobalStyle.size.size14} fontWeight="500" />
              </ContainerDiv>
              <ContainerDiv>
              </ContainerDiv>
              <ContainerDiv2>
                <Paragraph text={moment(selectedData?.createdAt).format("Do MMM YY")} fontSize={GlobalStyle.size.size16} fontWeight="600" />
              </ContainerDiv2>
              <ContainerDiv>
              </ContainerDiv>
            </RowBetween>
          </Container>

          <br />
          <Container>
            {
              selectedData?.orderInfo.status === 'pending' ?
                <Button isLoading={loader} children={"Mark as processing"} handlePress={() => handleSubmit('processing')} />
                : selectedData?.orderInfo.status === 'processing' ?
                  <Button isLoading={loader} children={"Mark as dispatched"} handlePress={() => handleSubmit('dispatched')} />
                  : null
            }
            <br />
            <br />
            {
              selectedData?.orderInfo.status === "pending" || selectedData?.orderInfo.status === 'processing' ?
                <RowBetween>
                  <ContainerDiv3></ContainerDiv3>
                  <Paragraph text='Message Buyer' />

                  {
                    selectedData?.orderInfo.status === 'pending' ?
                      <Cont onClick={() => handleOrderModalOpen('reject')}>
                        <Paragraph text='Reject Order' color={GlobalStyle.color.red} />
                      </Cont>
                      : selectedData?.orderInfo.status === 'processing' ?
                        <Cont onClick={() => handleOrderModalOpen('cancel')}>
                          <Paragraph text='Cancel Order' color={GlobalStyle.color.red} />
                        </Cont>
                        : null
                  }
                  <ContainerDiv3></ContainerDiv3>
                </RowBetween>
                :
                <ContDiv>
                  <Paragraph text='Message Buyer' />
                </ContDiv>
            }
          </Container>

        </div>
      </ModalCard>

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
        orderId={selectId}
      />

      <ToastContainer />
    </>

  )
}

export default DesktopSellerOrder

const View = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Div = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 500px;
`
const EmptyDiv = styled.div`
    width: 20px;
`
const SearchBox = styled.div`
    width: 100%;
`

const ButtonBox = styled.div`
    width: 160px;
`
const ActiveBox = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    background: ${GlobalStyle.color.bazaraTint};
    border-radius: 5px;
`

const InactiveBox = styled.div`
width: 20px;
height: 20px;
background: ${GlobalStyle.color.darkBlack};
border: 1px solid ${GlobalStyle.color.white};
border-radius: 5px;
`

const ModalCard = styled(Modal)`
    
`

const Subdiv = styled.div`
  cursor: pointer;
`

const ModalDiv = styled.div`
  margin-left: 15px;
`

const ContainerDiv = styled.div`
  width: 200px;
`
const ContainerDiv3 = styled.div`
  width: 100px;
`
const Container = styled.div`
  padding: 10px 0%;
`

const ContainerDiv2 = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const Spaced = styled.div`
  width: 10px;
`
const Cont = styled.div`
    cursor: pointer
`
const ContDiv = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
`

const TextDiv = styled.div`
  border: 0.5px solid ${GlobalStyle.color.lightwhite};
  width: 100px;
  border-radius: 30px; 
  display: flex;
  justify-content: center;
  padding: 5px;
  cursor: pointer;

`

const ButtonFilterText = styled.div`
    background: ${GlobalStyle.color.bazaraTint};
    border: 1px solid ${GlobalStyle.color.bazaraTint};
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: ${GlobalStyle.color.white};
    border-radius: 10px;
    cursor: pointer;
`

const MenuDiv = styled(Menu)`
  background: ${GlobalStyle.color.primaryBg} !important;
  width: 350px !important;
  padding: 10px 15px;
`

const MenuItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  margin-top: 10px;
`

const DatePick = styled(DatePicker)`
  width: 100%;
  background: ${GlobalStyle.color.primaryBg};
  padding: 10px;
  border: 0.5px solid ${GlobalStyle.color.lightwhite};
  border-color: none !important;
`