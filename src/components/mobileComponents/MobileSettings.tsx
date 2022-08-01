import React, { useEffect, useState } from 'react'
import { RowBetween, RowCenter } from '../../utils/StyledComponent'
import Button from '../Button'
import MobileTabs from './reusable/MobileTabs'
import { Container } from './Styled'

import styled from 'styled-components'
import { useRouter } from 'next/router'
import Paragraph from '../Paragraph'
import { GlobalStyle } from '../../utils/themes/themes'
import { bank, blueUni, blueUser, groupUser, store, truck } from '../../assets'
import { ArrayOptionType } from '../../utils/types/types'
import ListCard from './reusable/ListCard'
import { Switch } from 'antd'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { getStoreById, storebyId, updateStore } from '../../slices/StoreSlice'
import ResponseModal from '../Modal/ResponseModal'

function MobileSettings() {
  const router = useRouter();
  const dispatch = useAppDispatch()

  const storeInfo = useAppSelector(storebyId)

  const activeId = localStorage.getItem('activeId')

  const [checked, setChecked] = useState<string>(storeInfo?.status)

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')


  const handleModalClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    dispatch(getStoreById(activeId))
  }, [activeId])

  // useEffect(() => {
  //   const loadStatus = () => {
  //     const stat = storeInfo?.status === 'active' ? true : false

  //     setChecked(stat)
  //   }

  //   loadStatus()
  // }, [storeInfo])

  const quickActionArray = [
    {
      id: 1,
      title: "Store Information",
      icon: store,
      route: 'edit-store'
    },
    {
      id: 2,
      title: "User / Staff Management",
      icon: groupUser,
      route: 'staff'
    },
    {
      id: 3,
      title: "Delivery / Shipping Fee",
      icon: truck,
      route: 'delivery'
    },
    {
      id: 4,
      title: "Reviews and Ratings ",
      icon: bank,
      route: 'rating'
    }

  ]


  const personalActionArray = [
    {
      id: 1,
      title: "Profile",
      icon: blueUser,
      route: 'profile'
    },
    {
      id: 2,
      title: "Payout Bank Account",
      icon: blueUni,
      route: 'payout'
    }

  ]

  const onChange = async (checked: boolean) => {
    const payload = {
      id: activeId,
      brandName: storeInfo.brandName,
      description: storeInfo.description,
      imgUrl: storeInfo?.imgUrl,
      address: storeInfo?.location?.street + " " + storeInfo?.location?.city + " " + storeInfo?.location?.state,
      phoneNumber: storeInfo.phoneNumber,
      status: checked ? 'active' : 'inactive',
      location: {
        state: storeInfo?.location?.state,
        city: storeInfo?.location?.city,
        street: storeInfo?.location?.street,
      },
    }
    const resultAction = await dispatch(updateStore(payload))
    if (updateStore.fulfilled.match(resultAction)) {
      setType('Success')
      setTitle('Store updated successfully')
      setVisible(true)
      dispatch(getStoreById(activeId))
    }
    else {
      setType('Error')
      setTitle('Unable to update store')
      setVisible(true)
    }
  };


  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('activeId')
    localStorage.removeItem('activeName')
    return router.push('/')
  }

  return (
    <Container>
      <RowBetween>
        <Paragraph text='Store Information' fontSize={GlobalStyle.size.size18} fontWeight='600' />
        <Div onClick={signOut}>
          <Paragraph text='Log out' color={GlobalStyle.color.bazaraTint} />
        </Div>
      </RowBetween>
      <br />
      {
        quickActionArray?.map((data: ArrayOptionType) => {
          return <ListCard key={data?.id} {...data} />
        })
      }
      <br />
      <Paragraph text='Personal Information' fontSize={GlobalStyle.size.size14} fontWeight='600' />
      {
        personalActionArray?.map((data: ArrayOptionType) => {
          return <ListCard key={data?.id} {...data} />
        })
      }
      <br />
      <RowBetween>
        <Paragraph text='Activate / Deactivate Store' fontSize={GlobalStyle.size.size14} fontWeight='400' />
        <Switch onChange={onChange} defaultChecked={checked === 'active' ? true : false} className='switched' />
      </RowBetween>
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

export default MobileSettings

const Div = styled.div`
  
`
