import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { chevronLeft, staff } from '../../assets'
import SearchInput from '../SearchInput'
import MobileHeader from './Header'
import ButtonPlus from './reusable/ButtonPlus'
import { Container } from './Styled'
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { getStaff, staffsData } from '../../slices/StaffSlice'
import { RowBetween } from '../../utils/StyledComponent'
import styled from 'styled-components'
import { Tag } from 'antd'
import Paragraph from '../Paragraph'
import { GlobalStyle } from '../../utils/themes/themes'
import EmptyState from './reusable/EmptyState'
import StaffSkeleton from '../SkelentonLoader/Mobile/StaffSkleton'



const MobileStaff = () => {
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()
  const staffList = useAppSelector(staffsData)
  const dispatch = useAppDispatch()
  const id = localStorage.getItem("activeId")
  const [stateLoader, setStateLoader] = useState(false)

  const filterStaff = staffList?.filter(data => data?.role.toLowerCase().includes(searchValue.toLowerCase()) || data?.user?.fName.toLowerCase().includes(searchValue.toLowerCase()) || data?.user?.lName.toLowerCase().includes(searchValue.toLowerCase()))


  useEffect(() => {
    setStateLoader(true)
    const loadData = async () => {
      await dispatch(getStaff(id))
      setStateLoader(false)
    }
    loadData()
  }, [id])

  return (
    <Container>
      {
        stateLoader ? <StaffSkeleton />
          :
          <>
            <MobileHeader
              icon={chevronLeft}
              header="All Staff"
            />
            <SearchInput
              label={'Search for staff'}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            {
              filterStaff?.length < 1 && <EmptyState
                icon={staff}
                title="No Staff Added yet"
                header='Staff added will be visible here'
                btn={true}
                route="/add-staff"
                btnText="Add Staff"
              />
            }

            {
              filterStaff?.map((data, i) => {
                return <Contain key={i}>
                  <RowBetween>
                    <Div>
                      <Paragraph text={data?.user?.lName + " " + data?.user?.fName} textTransform='capitalize' />
                      <Paragraph text={data?.user?.email} fontSize={GlobalStyle.size.size12} fontWeight='600' color={GlobalStyle.color.gray} />
                    </Div>
                    <Tag color={data?.role === 'Store Owner' ? GlobalStyle.color.antdGreen : data?.role === 'Store Manager' ? GlobalStyle.color.antdOrange : data?.role === 'Admin' ? GlobalStyle.color.antdGeekBlue : GlobalStyle.color.antdPurple}>
                      <Paragraph text={data?.role} textTransform='capitalize' color={data?.role === 'Store Owner' ? GlobalStyle.color.antdGreen : data?.role === 'Store Manager' ? GlobalStyle.color.antdOrange : data?.role === 'Admin' ? GlobalStyle.color.antdGeekBlue : GlobalStyle.color.antdPurple} />
                    </Tag>
                  </RowBetween>
                </Contain>
              })
            }
            <ButtonPlus handleClick={() => router.push('/add-staff')} />
          </>
      }


    </Container>
  )
}

export default MobileStaff

const Div = styled.div`

`

const Contain = styled.div`
  padding: 10px;
  border-bottom: 0.5px solid ${GlobalStyle.color.lightwhite}
`