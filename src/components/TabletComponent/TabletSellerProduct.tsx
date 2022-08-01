import React, { useEffect, useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { useRouter } from "next/router"
import { Dropdown, Menu, Space, Table, Tag, Timeline, Button as Btn, DatePicker } from 'antd';
import { getProduct, products, searchProduct, updateProduct } from '../../slices/ProductSlice';
import Paragraph from '../Paragraph';
import { GlobalStyle } from '../../utils/themes/themes';
import * as CurrencyFormat from 'react-currency-format';
import styled from 'styled-components';
import SearchInput from '../SearchInput';
import Button from '../Button';
import { RowBetween, RowStart } from '../../utils/StyledComponent';
import ImageContainer from '../Image';
import { IconImage } from './Styled';
import { hori, noProd } from '../../assets';
import { DownOutlined } from '@ant-design/icons';
import { ProductUpdateFormData } from '../../utils/types';
import ResponseModal from '../Modal/ResponseModal';
import EmptyTable from '../EmptyTable';
import ProductModal from '../ProductModal';
import EditProductModal from '../EditProductModal';
import debounce from 'lodash.debounce'



function TabletSellerProduct() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const productList = useAppSelector(products)
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')

  const id = localStorage.getItem("activeId")
  const [searchValue, setSearchValue] = useState('')
  const [status, setStatus] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editData, setEditData] = useState(null)

  // const filterProduct = status?.length > 1 ? productList?.filter(data => data?.status.toLowerCase() === status.toLowerCase()) : productList?.filter(data => data?.name.toLowerCase().includes(searchValue.toLowerCase()))



  useEffect(() => {
    dispatch(getProduct(id))
  }, [id])

  const searchData = useCallback(debounce(query =>
    dispatch(searchProduct(query)),
    500), [])

  const searchProductData = query => {
    const paylaod = {
      search: query,
      id: id
    }
    setSearchValue(query)
    if (!query) return dispatch(getProduct(id))

    const debouncedFilter = debounce(() => {
      searchData(paylaod)

    }, 500)

    debouncedFilter()
  }


  const updateProductStatus = async (data) => {
    const payload: ProductUpdateFormData = {
      id: data?.key,
      status: data?.status === 'active' ? 'inactive' : 'active'
    }

    const resultAction = await dispatch(updateProduct(payload))
    if (updateProduct.fulfilled.match(resultAction)) {
      setType('Success')
      setTitle('Product status updated successfully')
      setVisible(true)
      dispatch(getProduct(id))
    }
    else {
      setType('Error')
      setTitle('Unable to update product status')
      setVisible(true)
    }
  }

  const menu = (item) => (
    <Menu>
      <Menu.Item>
        <SubDiv onClick={() => router.push(`/product-detail/${item?.slug}`)}>
          <Paragraph text={'Edit Product'} fontSize={GlobalStyle.size.size12} />
        </SubDiv>
      </Menu.Item>

      {
        item?.status !== 'in-review' ?
          <>
            <Menu.Item>
              <SubDiv onClick={() => updateProductStatus(item)}>
                <Paragraph text={item?.status === 'active' ? 'Deactivate' : 'Activate'} fontSize={GlobalStyle.size.size12} />
              </SubDiv>
            </Menu.Item>
          </>
          : null
      }

    </Menu>
  );

  const handleModalClose = () => {
    setVisible(false)
  }

  
  const showModalVisible = () => {
    setModalVisible(true)
  }

  const closeModalVisible = () => {
    setModalVisible(false)
  }

  const showEditModalVisible = (data: any) => {
    setEditModalVisible(true)
    setEditData(data)
  }

  const closeEditModalVisible = () => {
    setEditModalVisible(false)
    setEditData(null)
  }


  const columns = [
    {
      title: 'Products',
      dataIndex: '',
      key: '',
      render: (item) => {
        return <RowBetween>
          <RowStart onClick={() => showEditModalVisible(item)}>
            <ImageContainer source={item.image} width={50} height={50} />
            <EmptyDiv></EmptyDiv>
            <Subdiv>
              <Subdiv>
                <Paragraph text={item?.name} fontSize={GlobalStyle.size.size12} fontWeight='600' />
              </Subdiv>

              <RowDiv>
                <CurrencyFormat value={item?.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size10} fontWeight='400' color={GlobalStyle.color.gray} />} />
              </RowDiv>
            </Subdiv>
          </RowStart>

          <Tag color={item?.status === 'active' ? GlobalStyle.color.antdGreen : item?.status === 'inactive' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple}>
            <Paragraph textTransform='capitalize' text={item?.status} fontSize={GlobalStyle.size.size14} color={item?.status === 'active' ? GlobalStyle.color.antdGreen : item?.status === 'inactive' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple} />
          </Tag>
        </RowBetween>
      }
    }

  ];


  const renderData = () => {
    return productList?.map(data => {
      return {
        key: data?.id,
        slug: data?.slug,
        name: data?.name,
        createdAt: data?.createdAt,
        price: data?.variants[0]?.spec[0]?.price,
        quantity: data?.variants[0]?.spec[0]?.quantity,
        status: data?.status,
        image: data?.variants[0]?.variantImg[0],
        variants: data?.variants,
        ...data
      }
    })
  }


  const subMenu = () => (
    <MenuDiv>
      <Paragraph text="Filter Product" fontSize={GlobalStyle.size.size16} fontWeight='600' />
      <Paragraph text="By Status" fontSize={GlobalStyle.size.size14} fontWeight='700' margin='10px 0px' />
      <MenuItem>
        <TextDiv style={{ backgroundColor: status === '' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus('')}>
          <Paragraph text="All" />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'active' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus('active')}>
          <Paragraph text="Active" />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'inactive' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus('inactive')}>
          <Paragraph text="In Active" />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'draft' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus('draft')}>
          <Paragraph text="Draft" />
        </TextDiv>
      </MenuItem>
      {/* <Paragraph text="By Date" fontSize={GlobalStyle.size.size14} fontWeight='700' margin='10px 0px' />

     <DatePick onChange={onChange} /> */}
    </MenuDiv>
  )


  return (
    <>
      <Paragraph text='All Products' fontSize={GlobalStyle.size.size24} fontWeight='bold' margin='0% 0% 1% 10px' />
      <View>
        <Div>
          <SearchBox>
            <SearchInput label={'Search user or user role'} value={searchValue} onChange={(e) => searchProductData(e.target.value)} />
          </SearchBox>
          <EmptyDiv></EmptyDiv>
          <ButtonBox>
            <Dropdown overlay={subMenu} trigger={['click']} placement="bottomLeft">
              <ButtonFilterText>
                <Paragraph text='Filter' textAlign='center' />
              </ButtonFilterText>
            </Dropdown>
          </ButtonBox>
          <EmptyDiv></EmptyDiv>
          <ButtonBox>
            <Button children={'Add Product'} handlePress={() => showModalVisible()} />
          </ButtonBox>
        </Div>
      </View>
      <Table
        columns={columns}
        size="small"
        locale={{
          emptyText: <EmptyTable
            icon={noProd}
            header='No Product'
            title='You haven’t added any product to your store. Products you add to your store will be viewed here.' />
        }}
        dataSource={renderData()}
        pagination={
          { defaultPageSize: 12 }}
      />


<ProductModal
        visible={modalVisible}
        setVisible={() => closeModalVisible()}
        handlePress={() => closeModalVisible()}
        action={() => dispatch(getProduct(id))}
      />

      <EditProductModal
        visible={editModalVisible}
        setVisible={() => closeEditModalVisible()}
        handlePress={() => closeEditModalVisible()}
        action={() => dispatch(getProduct(id))}
        editData={editData}
      />

      <ResponseModal
        title={title}
        type={type}
        modalVisible={visible}
        setModalVisible={handleModalClose}
        handlePress={handleModalClose}
      />
    </>
  )
}

export default TabletSellerProduct


const View = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Div = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const EmptyDiv = styled.div`
    width: 20px;
`
const SearchBox = styled.div`
    width: 80%;
`

const ButtonBox = styled.div`
    width: 200px;
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

const SubDiv = styled.div`

`

const Min = styled.div`
width: 5px;
`
const Subdiv = styled.div`
  cursor: pointer;
`
const RowDiv = styled.div`
    display: flex;
    align-items: center;
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
    background: transparent;
    border: 1px solid ${GlobalStyle.color.bazaraTint};
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: ${GlobalStyle.color.bazaraTint};
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