
import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { chevronLeft, dotIcon, productLogo } from '../../assets'
import Button from '../Button'
import Paragraph from '../Paragraph'
import MobileHeader from './Header'
import MobileTabs from './reusable/MobileTabs'
import { Container, IconImage } from './Styled'
import { useRouter } from "next/router"
import { GlobalStyle } from '../../utils/themes/themes'
import { useAppDispatch, useAppSelector } from '../../app/hook'

import { getProduct, products, searchProduct, updateProduct } from '../../slices/ProductSlice'
import SearchInput from '../SearchInput'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import ImageContainer from '../Image'
import * as CurrencyFormat from 'react-currency-format';
import ButtonPlus from './reusable/ButtonPlus'
import { Dropdown, Menu, Space } from 'antd';
import { ProductUpdateFormData } from '../../utils/types'
import ResponseModal from '../Modal/ResponseModal'
import ProductCard from '../ProductCard'
import EmptyState from './reusable/EmptyState'
import debounce from 'lodash.debounce'
import ProductListSkeleton from '../SkelentonLoader/Mobile/ProductListSkeleton'



function MobileSellerProducts() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const productList = useAppSelector(products)
  const [searchValue, setSearchValue] = useState("")
  const [stateLoader, setStateLoader] = useState(false)
  const id = localStorage.getItem("activeId")
  const activeName = localStorage.getItem("activeName")


  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }


  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')


  const handleModalClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    setStateLoader(true)
    const loadData = async () => {
      await dispatch(getProduct(id))
      setStateLoader(false)
    }

    loadData()

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
      id: data?._id,
      name: data?.name,
      description: data?.description,
      categories: data?.categories,
      variants: data?.variants,
      isDraft: false,
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

  const menu = (data) => (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <View onClick={() => router.push(`/product-detail/${data.slug}`)}>
              <Paragraph text='Edit' />
            </View>
          ),
        },
        {
          key: '2',
          label: (
            <View onClick={() => updateProductStatus(data)}>
              <Paragraph text={data?.status === 'active' ? 'Deactivate' : 'Activate'} />
            </View>
          )
        }
      ]}
    />
  );

  return (
    <Container>
      {
        stateLoader ? <ProductListSkeleton />
          :
          <>
            <Component>
              <Paragraph text={`${activeName} (${productList?.length})`} fontSize={GlobalStyle.size.size18} fontWeight='600' />
              <SearchInput
                label='Search for products'
                value={searchValue}
                onChange={(e) => searchProductData(e.target.value)}
              />
            </Component>

            {productList?.length < 1 && <EmptyState
              icon={productLogo}
              title="No Products Yet"
              header='Add products to your store to start selling'
              btn={true}
              route="/add-product"
              btnText="Add Product"
            />
            }

            {
              productList?.length >= 1 && <>
                {
                  productList?.map((data, i) => {
                    return <ProductCard key={i} data={data} setTitle={setTitle} setType={setType} setVisible={setVisible} />
                  })
                }

                <ButtonPlus handleClick={() => router.push('/add-product')} />
              </>
            }
          </>
      }


      <MobileTabs />

      <ResponseModal
        title={title}
        type={type}
        modalVisible={visible}
        setModalVisible={handleModalClose}
        handlePress={handleModalClose}
      />
    </Container>
  )
}

export default MobileSellerProducts


const Component = styled.div`

`

const Div = styled.div`
 width: 80%;
 margin: 1% auto;
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

const View = styled.div`

`