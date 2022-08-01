import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { bank, bigBag, bigBank, bigP, blueUni, chat, chatInactive, home, home_active, hori, logo, order, order_active, productInactiveLogo, productLogo, settings, settingsInactive, singleUser, store, storeInactiveLogo, users } from '../../../../assets'
import Paragraph from '../../../Paragraph'
import { useRouter } from 'next/router'
import { GlobalStyle } from '../../../../utils/themes/themes'
import { BottomContainer, ColumnContainer } from '../../../mobileComponents/Styled'
import { useAppDispatch, useAppSelector } from '../../../../app/hook'
import { getPersonalStore, getStoreById, myStore, storebyId } from '../../../../slices/StoreSlice'
import { Divider, Dropdown, Menu, Space } from 'antd';
import Image from 'next/image'
import { DownOutlined } from '@ant-design/icons'
import { getSellerOrders } from '../../../../slices/OrderSlice'
import { getProduct } from '../../../../slices/ProductSlice'
import { getStaff } from '../../../../slices/StaffSlice'
import ImageContainer from '../../../Image'


const DesktopSidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const myStoreList = useAppSelector(myStore)
  const storeData = useAppSelector(storebyId)
  const [open, setOpen] = useState(false)



  const pathName = router?.pathname

  const id = localStorage.getItem('activeId')
  const brandName = localStorage.getItem('activeName')

  const changeStore = (item) => {
    localStorage.setItem('activeId', item?.id)
    localStorage.setItem('activeName', item?.brandName)
    const payload = {
      id: id,
      status: ''
    }
    dispatch(getSellerOrders(payload))
    dispatch(getStaff(id))
    dispatch(getProduct(id))
    dispatch(getPersonalStore())
    dispatch(getStoreById(id))
  }

  const choosenList = myStoreList?.filter((aa, i) => i < 3)

  const menu = (
    <MenuDiv>
      <Paragraph text="Your Store" />
      {
        choosenList?.map((data, i) => {
          return <View2 key={i} onClick={() => changeStore(data)}>
            <ImageContainer source={data?.imgUrl} type='round' width={20} height={20} />
            {data?.id === id && <ActiveBox></ActiveBox>}
            <ImageDiv2></ImageDiv2>
            <Paragraph text={data?.brandName} fontSize={GlobalStyle.size.size12} fontFamily='600' margin='0% 5%' />
          </View2>
        })
      }
      {
        choosenList?.length < 3 && <Menu.Item onClick={() => router.push('/merchant-store-creation/0')}><Paragraph text={"Add Store"} color={GlobalStyle.color.bazaraTint} /></Menu.Item>
      }
    </MenuDiv>

  );

  const handleRoute = (route) => {
    return router.push(route)
  }

  const handleRoute2 = () => {
    setOpen(!open)
  }

  useEffect(() => {
    dispatch(getPersonalStore())
    dispatch(getStoreById(id))
  }, [id])

  return (
    <Div>
      <MainDiv>
        <IconImage src={logo} />
      </MainDiv>
      <br />
      <ColumnContainer>
        <Subdiv onClick={() => handleRoute('/my-store')}>
          <div className={pathName === '/my-store' ? 'act' : 'inact'}>
            <ImageDiv>
              <IconImage src={pathName === '/my-store' ? home_active : home} />
            </ImageDiv>
            <ActParag text='Home' color={pathName === '/my-store' ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='0% 5%' />
          </div>
        </Subdiv>
        <Subdiv onClick={() => handleRoute('/orders')}>
          <div className={pathName === '/orders' ? 'act' : 'inact'}>
            <ImageDiv>
              <IconImage src={pathName === '/orders' ? order_active : order} />
            </ImageDiv>

            <ActParag text='All Orders' color={pathName === '/orders' ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='0% 5%' />
          </div>
        </Subdiv>
        <Subdiv onClick={() => handleRoute('/products')}>
          <div className={pathName.includes('/products') || pathName.includes('/add-product') || pathName.includes('/product-variant') ? 'act' : 'inact'}>
            <ImageDiv>
              <IconImage src={pathName.includes('/products') || pathName.includes('/add-product') || pathName.includes('/product-variant') ? productLogo : productInactiveLogo} />
            </ImageDiv>

            <ActParag text='All Products' color={pathName.includes('/products') || pathName.includes('/add-product') || pathName.includes('/product-variant') ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='0% 5%' />
          </div>
        </Subdiv>
        <Subdiv onClick={() => handleRoute('/inbox')}>
          <div className={pathName === '/inbox' ? 'act' : 'inact'}>
            <ImageDiv>
              <IconImage src={pathName === '/inbox' ? chat : chatInactive} />
            </ImageDiv>

            <ActParag text='Messages' color={pathName === '/inbox' ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='0% 5%' />
          </div>
        </Subdiv>
        <Subdiv onClick={() => handleRoute('/staff')}>
          <div className={pathName === '/staff' ? 'act' : 'inact'}>
            <ImageDiv>
              <IconImage src={pathName === '/staff' ? users : users} />
            </ImageDiv>

            <ActParag text='Users / Staffs' color={pathName === '/staff' ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='0% 5%' />
          </div>
        </Subdiv>
        {/* <Subdiv onClick={() => handleRoute('/settings')}>
          <div className={pathName === '/settings' ? 'act' : 'inact'}>
            <ImageDiv>
              <IconImage src={pathName === '/settings' ? settings : settingsInactive} />
            </ImageDiv>

            <ActParag text='Settings' color={pathName === '/settings' ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='0% 5%' />
          </div>
        </Subdiv> */}
        <Subdiv onClick={() => handleRoute2()}>
          <div className={pathName.includes('/profile') || pathName.includes('/edit-store') || pathName.includes('/rating') || pathName.includes('/payout') ? 'act' : 'inact'} style={{ alignItems: 'center' }}>
            <ImageDiv>
              <IconImage src={pathName.includes('/profile') || pathName.includes('/edit-store') || pathName.includes('/rating') || pathName.includes('/payout') ? bigP : bigP} />
            </ImageDiv>

            <ActParag text='Account' color={pathName.includes('/profile') || pathName.includes('/edit-store') || pathName.includes('/rating') || pathName.includes('/payout') ? GlobalStyle.color.bazaraTint : GlobalStyle.color.white} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='-2px 5% 0px 5%' />
            <DownOutlined style={{ fontSize: '10px' }} />
          </div>
        </Subdiv>
        {
          open && <>
            <Subdiv onClick={() => handleRoute('/edit-store')}>
              <div className={pathName === '/edit-store' ? 'act' : 'inact'} style={{ alignItems: 'center' }}>
                <ImageDiv3>
                  <IconImage src={pathName === '/edit-store' ? store : storeInactiveLogo} />
                </ImageDiv3>
                <ActParag2 text='Store Information' color={pathName === '/edit-store' ? GlobalStyle.color.bazaraTint : GlobalStyle.color.gray} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='-2px 5% 0px 5%' />
              </div>
            </Subdiv>
            <Subdiv onClick={() => handleRoute('/rating')}>
              <div className={pathName === '/rating' ? 'act' : 'inact'} style={{ alignItems: 'center' }}>
                <ImageDiv3>
                  <IconImage src={pathName === '/rating' ? bigBank : bigBank} />
                </ImageDiv3>
                <ActParag2 text='Rating and Review' color={pathName === '/rating' ? GlobalStyle.color.bazaraTint : GlobalStyle.color.gray} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='-2px 5% 0px 5%' />
              </div>
            </Subdiv>
            <Subdiv onClick={() => handleRoute('/payout')}>
              <div className={pathName === '/payout' ? 'act' : 'inact'} style={{ alignItems: 'center' }}>
                <ImageDiv3>
                  <IconImage src={pathName === '/payout' ? blueUni : blueUni} />
                </ImageDiv3>
                <ActParag2 text='Transaction' color={pathName === '/payout' ? GlobalStyle.color.bazaraTint : GlobalStyle.color.gray} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='-2px 5% 0px 5%' />
              </div>
            </Subdiv>
            <Subdiv onClick={() => handleRoute('/profile')}>
              <div className={pathName === '/profile' ? 'act' : 'inact'} style={{ alignItems: 'center' }}>
                <ImageDiv3>
                  <IconImage src={pathName === '/profile' ? singleUser : singleUser} />
                </ImageDiv3>
                <ActParag2 text='Profile' color={pathName === '/profile' ? GlobalStyle.color.bazaraTint : GlobalStyle.color.gray} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='-2px 5% 0px 5%' />
              </div>
            </Subdiv>
          </>
        }
      </ColumnContainer>
      <BottomContainer>
        <Dropdown overlay={menu} trigger={['click']} placement="topRight">
          <View>
            <ImageContainer source={storeData?.imgUrl} type='round' width={20} height={20} />
            <ImageDiv2></ImageDiv2>
            <ActParag text={brandName} fontSize={GlobalStyle.size.size14} fontFamily='600' margin='0% 5%' />
            <IconImage
              src={hori}

            />
          </View>
        </Dropdown>

      </BottomContainer>
    </Div>
  )
}

export default DesktopSidebar

const MainDiv = styled.div`

`

const ImageDiv = styled.div`
  width: 30px;
`
const ImageDiv2 = styled.div`
  width: 10px;
`
const ImageDiv3 = styled.div`
  width: 10px;

  @media screen and (min-width: 660px) {
    display: none;
  }
`

const Div = styled.div`
    display: flex;
    flex-direction: column;
    // width: 21%;
    width: 300px;
    border-right: 1px solid ${GlobalStyle.color.lightwhite};
    height: 100vh;

    @media screen and (min-width: 661px) and (max-width: 900px) {
      width: 25%;
    }

    @media screen and (min-width: 901px) and (max-width: 1007px) {
      width: 300px;
    }

    @media screen and (min-width: 640px) and (max-width: 660px) {
      display: flex;
      justify-content: center;
      align-items: center;
     }
    
`

const Subdiv = styled.div`
    display: flex;
    padding: 0%;
    cursor: pointer;
    // margin-bottom: 5px;
`

const View = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
`

const View2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    padding: 10px;
`

const ActParag = styled(Paragraph)`


@media screen and (min-width: 640px) and (max-width: 660px) {
  display: none;
 }

@media screen and (min-width: 650px) and (max-width: 1007px) {
 font-size: 11px !important;
}
`

const ActParag2 = styled(Paragraph)`


@media screen and (min-width: 640px) and (max-width: 660px) {
  display: none;
 }

@media screen and (min-width: 650px) and (max-width: 1007px) {
 font-size: 11px !important;
}
`

const IconImage = styled(Image)`
width: 30px;
height: 30px;
`

const MenuDiv = styled(Menu)`
  background: ${GlobalStyle.color.primaryBg} !important;
  width: 200px !important;
  padding: 10px 15px;
`

const MenuItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  margin-top: 10px;
`

const ActiveBox = styled.div`
    width: 10px;
    height: 10px;
    display: flex;
    align-items: center;
    background: ${GlobalStyle.color.bazaraTint};
    border-radius: 50px;
    margin-top: 5px;
    margin-left: -5px;
`