import React, { useEffect } from 'react'
import Paragraph from '../Paragraph'
import { useRouter } from 'next/router'
import MobileHeader from './Header';
import { chevronLeft } from '../../assets';
import { Container } from './Styled';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { getOutofStocks, getSellerOrders, outOfStocks, sellerOrders } from '../../slices/OrderSlice';
import OrderCard from '../OrderCard';
import OutofStockCard from '../OutofStockCard';

const MobileNotificationDetail = () => {
    const router = useRouter();
    const dispatch = useAppDispatch()

    const id = localStorage.getItem('activeId')


    const sellerOrder = useAppSelector(sellerOrders)

    const outOfStockData = useAppSelector(outOfStocks)

    const actionName = router?.query?.actions


    useEffect(() => {
        const payload = {
            id: id,
            status: actionName
        }
        if (actionName === 'out of stock') {
            dispatch(getOutofStocks(id))
        }
        else {
            dispatch(getSellerOrders(payload))
        }

    }, [actionName, id])

    return (
        <Container>
            <MobileHeader
                icon={chevronLeft}
                header={`${actionName}`}
            />

            {
                actionName !== 'out of stock' && sellerOrder?.map((data, i) => {
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

            {
                actionName === 'out of stock' && outOfStockData?.map((data, i) => {
                    return <OutofStockCard
                        key={i}
                        image={data?.variantImg[0]}
                        name={data?.name}
                        price={data?.price}
                        productId={data?.productId}
                        status={data?.productStatus}
                        slug={data?.slug}
                    />
                })
            }
        </Container>

    )
}

export default MobileNotificationDetail