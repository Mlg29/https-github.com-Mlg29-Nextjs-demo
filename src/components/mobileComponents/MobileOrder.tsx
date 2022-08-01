
import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { bigBag, chevronLeft, dotIcon, productLogo } from '../../assets'

import Paragraph from '../Paragraph'

import MobileTabs from './reusable/MobileTabs'
import { Container, IconImage } from './Styled'
import { useRouter } from "next/router"
import { GlobalStyle } from '../../utils/themes/themes'
import { useAppDispatch, useAppSelector } from '../../app/hook'

import { getSellerOrders, orderSearch, searchOrder, sellerOrders } from '../../slices/OrderSlice'
import SearchInput from '../SearchInput'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import OrderCard from '../OrderCard'
import { Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import EmptyState from './reusable/EmptyState'
import debounce from 'lodash.debounce'
import OrderSkeleton from '../SkelentonLoader/Mobile/OrderSkeleton'


function MobileOrders() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const sellerOrderList = useAppSelector(sellerOrders)
    const [searchValue, setSearchValue] = useState('')
    const [status, setStatus] = useState("")
    const [stateLoader, setStateLoader] = useState(false)
    const id = localStorage.getItem("activeId")




    useEffect(() => {
        setStateLoader(true)
        const loadData = async () => {
            const payload = {
                id,
                status
            }
            await dispatch(getSellerOrders(payload))
            setStateLoader(false)
        }
        loadData()
    }, [id, status])

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



    const menu = () => (
        <Menu>
            <Menu.Item>
                <TextDiv onClick={() => setStatus('')}>
                    <Paragraph text="All" />
                </TextDiv>
            </Menu.Item>
            <Menu.Item>
                <TextDiv onClick={() => setStatus('pending')}>
                    <Paragraph text="Pending" />
                </TextDiv>
            </Menu.Item>
            <Menu.Item>
                <TextDiv onClick={() => setStatus('processing')}>
                    <Paragraph text="Processing" />
                </TextDiv>
            </Menu.Item>
            <Menu.Item>
                <TextDiv onClick={() => setStatus('dispatched')}>
                    <Paragraph text="Dispatched" />
                </TextDiv>
            </Menu.Item>
            <Menu.Item>
                <TextDiv onClick={() => setStatus('cancelled')}>
                    <Paragraph text="Cancelled" />
                </TextDiv>
            </Menu.Item>
            <Menu.Item>
                <TextDiv onClick={() => setStatus('rejected')}>
                    <Paragraph text="Rejected" />
                </TextDiv>
            </Menu.Item>
            <Menu.Item>
                <TextDiv onClick={() => setStatus('completed')}>
                    <Paragraph text="Completed" />
                </TextDiv>
            </Menu.Item>
        </Menu>
    )


    const submitSearch = async () => {
        const payload = {
            searchValue: searchValue,
            id
        }
        try {
            const resultAction = await dispatch(orderSearch(payload))
            if (orderSearch.fulfilled.match(resultAction)) {
                console.log({ resultAction })
            }
            else {
                console.log("error")
            }
        }
        catch (e) {
            console.log({ e })
        }
    }
    return (
        <Container>
            {
                stateLoader ? <OrderSkeleton />
                :
                <>
                <Component>
                <RowBetween>
                    <Paragraph text={`Orders (${sellerOrderList?.length})`} fontSize={GlobalStyle.size.size18} fontWeight='600' />
                    <Dropdown overlay={menu} trigger={['click']}>
                        <RowStart>
                            <Paragraph textTransform='capitalize' text={status === '' ? "All" : status} />
                            <DownOutlined style={{ fontSize: 10 }} />
                        </RowStart>
                    </Dropdown>
                </RowBetween>
                <SearchInput
                    label='Search for products'
                    value={searchValue}
                    onChange={(e) => searchOrderData(e.target.value)}
                    handleClick={() => submitSearch()}
                />
            </Component>


            {sellerOrderList?.length < 1 && <EmptyState
                icon={bigBag}
                title="No Orders Yet"
                header='All your store orders will be listed here'

            />

            }

            {
                sellerOrderList?.length >= 1 && sellerOrderList?.map((data, i) => {
                    return <OrderCard
                        key={i}
                        image={data?.orderInfo?.variantImg}
                        name={data?.orderInfo?.name}
                        size={data?.orderInfo?.size}
                        price={data?.orderInfo?.price}
                        delivery={data?.deliveryInfo?.expectedDeliveryDate}
                        orderId={data?.id}
                        status={data?.orderInfo.status}
                        handleClick={() => router.push(`/order-details/${data?.id}`)}
                    />
                })

            }
                </>
            }
            
            <MobileTabs />
        </Container>
    )
}

export default MobileOrders


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

const TextDiv = styled.div`
           
            `

