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
import { arrowLeft, greaterThan, hori, horiThan, noProd } from '../../assets';
import { DownOutlined } from '@ant-design/icons';
import { ProductUpdateFormData } from '../../utils/types';
import ResponseModal from '../Modal/ResponseModal';
import moment from 'moment';
import EmptyTable from '../EmptyTable';
import ProductModal from '../ProductModal';
import EditProductModal from '../EditProductModal';
import debounce from 'lodash.debounce'



function DesktopSellerProduct() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const productList = useAppSelector(products)
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [variants, setVariants] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const id = localStorage.getItem("activeId")
  const [status, setStatus] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editData, setEditData] = useState(null)

 

  useEffect(() => {
    dispatch(getProduct(id))
  }, [id])

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


  const routeForEdit = (item) => {
    localStorage.setItem('slug', item)
    // return router.push(`/add-product`)
  }

  const handleExpand = (record, e, onExpand) => {
    onExpand(record, e)
    setVariants(record?.variants)
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


  const menu = (item) => (
    <Menu>
      <Menu.Item>
        <SubDiv onClick={() => showEditModalVisible(item)}>
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


  const columns = [
    {
      title: '',
      dataIndex: '',
      key: '',
      width: 10,
      render: (item) => {
        return <InactiveBox></InactiveBox>
      }
    },
    {
      title: 'Product',
      dataIndex: '',
      key: '',
      width: 400,
      render: (item) => {
        return <RowStart>
          <ImageContainer source={item.image} width={35} height={35} />
          <EmptyDiv></EmptyDiv>
          <Paragraph text={item.name} fontSize={GlobalStyle.size.size16} />
        </RowStart>
      }
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: item => <Paragraph text={moment(item).format("Do MMM YY")} fontSize={GlobalStyle.size.size16} />,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 200,
      render: item => <SubDiv>
        <CurrencyFormat value={item} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value?.length > 1 ? value : '---'}`} fontSize={GlobalStyle.size.size16} fontWeight='700' />} />
      </SubDiv>
    },
    {
      title: 'Quanity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: item => <Paragraph text={item ? item : '---'} fontSize={GlobalStyle.size.size16} />,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text) => (
        <>
          <Tag color={text === 'active' ? GlobalStyle.color.antdGreen : text === 'inactive' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple}>
            <Paragraph textTransform='capitalize' text={text} fontSize={GlobalStyle.size.size16} color={text === 'active' ? GlobalStyle.color.antdGreen : text === 'inactive' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdGeekBlue} />
          </Tag>
        </>
      ),
    },
    {
      title: 'Action',
      key: '',
      dataIndex: '',
      width: 200,
      render: (item) => (
        <>
          <Dropdown overlay={menu(item)}>
            <BtnText>
              <Space>
                Action
                <DownOutlined />
              </Space>
            </BtnText>
          </Dropdown>
          {/* <IconImage
            src={hori}

          /> */}

        </>
      ),
    }
  ];

  // const subColumns = [
  //   {
  //     title: '',
  //     dataIndex: '',
  //     key: '',
  //     width: 50,
  //     render: (item) => {
  //       return null
  //     }
  //   },
  //   {
  //     title: 'Product',
  //     dataIndex: '',
  //     key: '',
  //     width: 400,
  //     render: (item) => {
  //       return <RowStart>
  //         <ImageContainer source={item.image} width={35} height={35} />
  //         <EmptyDiv></EmptyDiv>
  //         <Paragraph text={item.name} fontSize={GlobalStyle.size.size12} />
  //       </RowStart>
  //     }
  //   },
  //   {
  //     title: 'Created At',
  //     dataIndex: 'createdAt',
  //     key: 'createdAt',
  //     width: 200,
  //     render: item => <Paragraph text={moment(item).format("Do MMM YY")} fontSize={GlobalStyle.size.size12} />,
  //   },
  //   {
  //     title: 'Price',
  //     dataIndex: 'price',
  //     key: 'price',
  //     width: 200,
  //     render: item => <SubDiv>
  //       <CurrencyFormat value={item} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={`${value}`} fontSize={GlobalStyle.size.size14} fontWeight='700' />} />
  //     </SubDiv>
  //   },
  //   {
  //     title: 'Quanity',
  //     dataIndex: 'quantity',
  //     key: 'quantity',
  //     render: item => <Paragraph text={item} fontSize={GlobalStyle.size.size12} />,
  //   },
  //   {
  //     title: 'Status',
  //     key: 'status',
  //     dataIndex: 'status',
  //     render: (text) => (
  //       <>
  //         <Tag color={text === 'active' ? GlobalStyle.color.green : text === 'inactive' ? GlobalStyle.color.red : GlobalStyle.color.purple}>
  //           <Paragraph textTransform='capitalize' text={text} fontSize={GlobalStyle.size.size12} />
  //         </Tag>
  //       </>
  //     ),
  //   },
  //   {
  //     title: 'Action',
  //     key: '',
  //     dataIndex: '',
  //     width: 200,
  //     render: (item) => (
  //       <>
  //         <Dropdown overlay={menu(item)}>
  //           <Btn>
  //             <Space>
  //               Action
  //               <DownOutlined />
  //             </Space>
  //           </Btn>
  //         </Dropdown>
  //         {/* <IconImage
  //           src={hori}

  //         /> */}

  //       </>
  //     ),
  //   }
  // ];



  // const renderVariants = () => {
  //   return variants?.map(data => {
  //     return {
  //       key: data?.id,
  //       slug: data?.slug,
  //       name: data?.name,
  //       createdAt: data?.createdAt,
  //       price: data?.variants[0]?.spec[0]?.price,
  //       quantity: data?.variants[0]?.spec[0]?.quantity,
  //       status: data?.status,
  //       image: data?.variants[0]?.variantImg[0],
  //       variants: data?.variants
  //     }
  //   })
  // }


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
            <SearchInput label={'Search product by name'} value={searchValue} onChange={(e) => searchProductData(e.target.value)} />
          </SearchBox>
          <EmptyDiv></EmptyDiv>
          <ButtonBox>
            <Dropdown overlay={subMenu} trigger={['click']} placement="bottomRight">
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
      <Table columns={columns} rowClassName='table-row' size='middle' locale={{
        emptyText: <EmptyTable
          icon={noProd}
          header='No Product'
          title='You haven’t added any product to your store. Products you add to your store will be viewed here.' />
      }} dataSource={renderData()} expandable={{
        // expandedRowRender: item => <Table columns={subColumns} pagination={false} dataSource={renderData()} />,

        // rowExpandable: record => record.variants?.length > 1,
        // expandIcon: ({ expanded, onExpand, record }) =>
        //   record.variants?.length > 1 ?
        //     expanded ? (
        //       <Exp onClick={e => handleExpand(record, e, onExpand)}>
        //         <IconImage src={horiThan} />
        //       </Exp>
        //     ) : (
        //       <Exp onClick={e => handleExpand(record, e, onExpand)}>
        //         <IconImage src={greaterThan} />
        //       </Exp>
        //     )
        //     : null
      }
      }
        pagination={
          { defaultPageSize: 12 }}
      />


      <ResponseModal
        title={title}
        type={type}
        modalVisible={visible}
        setModalVisible={handleModalClose}
        handlePress={handleModalClose}
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
    </>
  )
}

export default DesktopSellerProduct


const View = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Div = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 700px;
`
const EmptyDiv = styled.div`
    width: 20px;
`
const Empty = styled.div`
    width: 100px;
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

const Exp = styled.div`

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


const BtnText = styled(Btn)`
  border: 0.5px solid ${GlobalStyle.color.lightwhite};
`