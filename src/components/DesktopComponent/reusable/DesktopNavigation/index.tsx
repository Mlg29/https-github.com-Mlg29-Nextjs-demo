import { Badge, Dropdown, Menu, Space, Switch } from 'antd'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { bell, danger, logo, payment, productLogo, profile, square } from '../../../../assets'
import { getProfile, profileInfo } from '../../../../slices/ProfileSlice'
import { RowBetween } from '../../../../utils/StyledComponent'
import { GlobalStyle } from '../../../../utils/themes/themes'
import Paragraph from '../../../Paragraph'
import { useAppDispatch, useAppSelector } from '../../../../app/hook'
import { Container, IconImage } from '../../Styled'
import { useRouter } from 'next/router'
import { getSellerNotificationStat, sellerNotificationStat } from '../../../../slices/NotificationSlice'
import EmptyState from '../../../mobileComponents/reusable/EmptyState'
import NotificationCard from '../../../NotificationCard'
import DesktopNotificationCard from '../../../NotificationCard/DesktopNotificationCard'



const DesktopNavigation = () => {
  const dispatch = useAppDispatch()
  const profileData = useAppSelector(profileInfo)
  const router = useRouter()
  const sellerNotificationStats = useAppSelector(sellerNotificationStat)

  const onChange = async (checked: boolean) => {

  };


  useEffect(() => {
    dispatch(getProfile())
  }, [])

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('activeId')
    localStorage.removeItem('activeName')
    return router.push('/')
  }

  const menu = (
    <Menu
      items={[
        {
          label: (
            <TextDiv onClick={() => signOut()}>
              <Paragraph text='Log out' />
            </TextDiv>
          ),
          key: '0',
        }
      ]}
    />
  )

  useEffect(() => {
    dispatch(getSellerNotificationStat())
  })

  const isNotificationAvailable = sellerNotificationStats?.pendingOrders?.count > 0 || sellerNotificationStats?.completedOrders?.count > 0 || sellerNotificationStats?.productsOutOfStock?.count > 0 || sellerNotificationStats?.paymentReceived?.count > 0 

  const submenu = () => (
    <MenuDiv>

      {
        sellerNotificationStats?.pendingOrders?.count === 0 && sellerNotificationStats?.completedOrders?.count === 0 && sellerNotificationStats?.productsOutOfStock?.count === 0 && sellerNotificationStats?.paymentReceived?.count === 0 ?
          <>
            <br />
            <EmptyState
              icon={bell}
              title="No Notification Yet"
              header='All your notifications will be displayed here'
            />
          </>
          : <>
           {
              sellerNotificationStats?.pendingOrders?.count > 0 && <DesktopNotificationCard icon={productLogo} header={'Pending Order'} duration={sellerNotificationStats?.pendingOrders?.lastCreatedAt} action='orders' />
            }
            <Break />
            {
              sellerNotificationStats?.completedOrders?.count > 0 && <DesktopNotificationCard icon={square} header={'Completed Order'} duration={sellerNotificationStats?.completedOrders?.lastCreatedAt} action='orders' />
            }
            <Break />
            {
              sellerNotificationStats?.productsOutOfStock?.count > 0 && <DesktopNotificationCard icon={danger} header={'Product Out of Stock Order'} duration={sellerNotificationStats?.productsOutOfStock?.lastCreatedAt} action='orders' />
            }
            <Break />
            {
              sellerNotificationStats?.paymentReceived?.count > 0 && <DesktopNotificationCard icon={payment} header={'Payment Received'} duration={sellerNotificationStats?.paymentReceived?.lastCreatedAt} action='payout' /> 
            }
          </>
      }

    </MenuDiv>
  )


  return (
    <Nav>
      <Container>
        <View>
          <Div>
            <>
              <Paragraph text='Switch to Buyer’s mode' fontSize={GlobalStyle.size.size14} fontFamily="600" margin='0% 2%' />
              <Switch onChange={onChange} defaultChecked={true} className='switched' />
            </>
            <BellDiv>
              <Dropdown overlay={submenu()} trigger={['click']}>
                <Badge dot={isNotificationAvailable}>
                  <IconImage
                    src={bell}
                    width={20}
                    height={20}
                  />
                </Badge>
              </Dropdown>
            </BellDiv>

            <DropdownDiv>
              <Dropdown overlay={menu} trigger={['click']}>
                <Space>
                  <IconImage
                    src={profile}
                    width={20}
                    height={20}
                  />
                  <Paragraph text={profileData?.fName} fontSize={GlobalStyle.size.size14} fontFamily="600" margin='0% 2%' />
                </Space>
              </Dropdown>
            </DropdownDiv>

          </Div>
        </View>
      </Container>
    </Nav>
  )
}

export default DesktopNavigation

const Nav = styled.div`
  padding: 0%;
`

const View = styled.div`
display: flex;
justify-content: flex-end;
`

const Div = styled.div`
display: flex;
justify-content: flex-end;
width: 500px;
`

const BellDiv = styled.div`
  padding: 0% 5%;
`

const DropdownDiv = styled.div`
padding: 0% 2%;
cursor: pointer;
`

const TextDiv = styled.div`
cursor: pointer;
`

const MenuDiv = styled(Menu)`
  width: 400px;
  max-height: 350px;
  padding: 20px;
  background:  ${GlobalStyle.color.darkBlack} !important;
`
const Break = styled.hr`
 color: ${GlobalStyle.color.gray};
`