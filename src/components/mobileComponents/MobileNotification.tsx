import React, { useEffect } from 'react'
import { bell, chevronLeft, danger, payment, productLogo, square } from '../../assets'
import MobileHeader from './Header'
import { Container } from './Styled'

import { useAppDispatch, useAppSelector } from "../../app/hook"
import { getSellerNotificationStat, notification, sellerNotificationStat } from '../../slices/NotificationSlice'
import NotificationCard from '../NotificationCard'
import styled from 'styled-components'
import { GlobalStyle } from '../../utils/themes/themes'
import EmptyState from './reusable/EmptyState'

function MobileNotification() {
  const dispatch = useAppDispatch()
  const sellerNotificationStats = useAppSelector(sellerNotificationStat)


  useEffect(() => {
    dispatch(getSellerNotificationStat())
  }, [])


  return (
    <Container>
      <MobileHeader
        icon={chevronLeft}
        header="Notifications"
      />
      <br />
      {
        sellerNotificationStats?.pendingOrders?.count === 0 && sellerNotificationStats?.completedOrders?.count === 0 && sellerNotificationStats?.productsOutOfStock?.count === 0 && sellerNotificationStats?.paymentReceived?.count === 0 ?
        <EmptyState
        icon={bell}
        title="No Notification Yet"
        header='All your notifications will be displayed here'
      />
        : <>
        {
          sellerNotificationStats?.pendingOrders?.count > 0 && <NotificationCard icon={productLogo} header={'Pending Order'} duration={sellerNotificationStats?.pendingOrders?.lastCreatedAt} action='pending' />
        }
        <Break />
        {
          sellerNotificationStats?.completedOrders?.count > 0 && <NotificationCard icon={square} header={'Completed Order'} duration={sellerNotificationStats?.completedOrders?.lastCreatedAt} action='completed' />
        }
        <Break />
        {
          sellerNotificationStats?.productsOutOfStock?.count > 0 && <NotificationCard icon={danger} header={'Product Out of Stock Order'} duration={sellerNotificationStats?.productsOutOfStock?.lastCreatedAt} action='out of stock' />
        }
        <Break />
        {
          sellerNotificationStats?.paymentReceived?.count > 0 && <NotificationCard icon={payment} header={'Payment Received'} duration={sellerNotificationStats?.paymentReceived?.lastCreatedAt} action='payment' />
        }
      </>
      }
      
    </Container>
  )
}

export default MobileNotification

const Break = styled.hr`
 color: ${GlobalStyle.color.gray};
`