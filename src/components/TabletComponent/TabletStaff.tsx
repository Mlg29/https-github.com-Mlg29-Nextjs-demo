import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { useRouter } from "next/router"
import {Table, Tag, Avatar, Dropdown, Menu, DatePicker } from 'antd';
import { getProduct, updateProduct } from '../../slices/ProductSlice';
import Paragraph from '../Paragraph';
import { GlobalStyle } from '../../utils/themes/themes';
import styled from 'styled-components';
import SearchInput from '../SearchInput';
import Button from '../Button';
import { RowBetween, RowStart } from '../../utils/StyledComponent';
import ImageContainer from '../Image';
import { ProductUpdateFormData } from '../../utils/types';
import ResponseModal from '../Modal/ResponseModal';
import AddStaffModal from '../AddStaffModal';
import { getStaff, staffsData } from '../../slices/StaffSlice';
import EmptyTable from '../EmptyTable';
import { bigStaff } from '../../assets';

function TabletStaff() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const staffList = useAppSelector(staffsData)
  const [staffOpen, setStaffOpen] = useState(false)
  const [status, setStatus] = useState("")
  const [searchValue, setSearchValue] = useState('')


  const filterStaff = status?.length > 1 ? staffList?.filter(data => data?.role.toLowerCase() === status.toLowerCase()) : staffList?.filter(data => data?.role.toLowerCase().includes(searchValue.toLowerCase()) || data?.user?.fName.toLowerCase().includes(searchValue.toLowerCase()) || data?.user?.lName.toLowerCase().includes(searchValue.toLowerCase()) )


  const showAddModal = () => {
    setStaffOpen(true)
  }

  const closeStaffModal = () => {
    setStaffOpen(false)
  }

  const id = localStorage.getItem("activeId")

  useEffect(() => {
    dispatch(getStaff(id))
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


  const handleModalClose = () => {
    setVisible(false)
  }


  const columns = [
    {
      title: 'Users',
      dataIndex: '',
      key: '',
      render: (item) => {
        return <RowBetween>
          <RowStart>
            {
              item?.image?.length < 1 || item?.image === undefined ? <Avatar shape='square' size={50} style={{ backgroundColor: '#f56a00', marginRight: '5px' }}><Paragraph text={item?.name.toUpperCase().substring(0, 1)} /></Avatar>
                : <ImageContainer source={item.image} width={50} height={50} />
            }
            <EmptyDiv></EmptyDiv>
            <Subdiv>
              <Subdiv>
                <Paragraph text={item?.name} fontSize={GlobalStyle.size.size12} fontWeight='600' />
              </Subdiv>

              <RowDiv>
                <Paragraph text={item?.role} fontSize={GlobalStyle.size.size10} fontWeight='400' color={GlobalStyle.color.gray} />
              </RowDiv>
            </Subdiv>
          </RowStart>
          <Tag color={item?.status === 'active' ? GlobalStyle.color.antdGreen : item?.status === 'inactive' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple}>
            {item?.status?.length < 1 || item?.status === undefined ? <Paragraph textTransform='capitalize' text={'N/A'} fontSize={GlobalStyle.size.size12} color={item?.status === 'active' ? GlobalStyle.color.antdGreen : item?.status === 'inactive' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple} /> : <Paragraph textTransform='capitalize' text={item?.status} fontSize={GlobalStyle.size.size12} color={item?.status === 'active' ? GlobalStyle.color.antdGreen : item?.status === 'inactive' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple} />}
          </Tag>
        </RowBetween>
      }
    }

  ];


  const renderData = () => {
    return filterStaff?.map(data => {
      return {
        key: data?.id,
        slug: data?.slug,
        name: data?.user?.fName + " " + data?.user?.lName,
        email: data?.user?.email,
        createdAt: data?.createdAt,
        role: data?.role,
      }
    })
  }

  const subMenu = () => (
    <MenuDiv>
    <Paragraph text="Filter Staff" fontSize={GlobalStyle.size.size16} fontWeight='600' />
    <Paragraph text="By Status" fontSize={GlobalStyle.size.size14} fontWeight='700' margin='10px 0px' />
    <MenuItem>
    <TextDiv style={{ backgroundColor: status === '' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("")}>
        <Paragraph text="All"  fontSize={GlobalStyle.size.size12} fontWeight='600'  />
      </TextDiv>
      <TextDiv style={{ backgroundColor: status === 'Super Admin' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("Super Admin")}>
        <Paragraph text="Super Admin" fontSize={GlobalStyle.size.size12} fontWeight='600' />
      </TextDiv>
      <TextDiv style={{ backgroundColor: status === 'Admin' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("Admin")}>
        <Paragraph text="Admin" fontSize={GlobalStyle.size.size12} fontWeight='600' />
      </TextDiv>
      <TextDiv style={{ backgroundColor: status === 'Store Vetter' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("Store Vetter")}>
        <Paragraph text="Store Vetter" fontSize={GlobalStyle.size.size12} fontWeight='600' />
      </TextDiv>
      <TextDiv style={{ backgroundColor: status === 'Store Owner' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("Store Owner")}>
        <Paragraph text="Store Owner" fontSize={GlobalStyle.size.size12} fontWeight='600' />
      </TextDiv>
      <TextDiv style={{ backgroundColor: status === 'Store Manager' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("Store Manager")}>
        <Paragraph text="Store Manager" fontSize={GlobalStyle.size.size12} fontWeight='600' />
      </TextDiv>
      <TextDiv style={{ backgroundColor: status === 'Store Attendant' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("Store Attendant")}>
        <Paragraph text="Store Attendant" fontSize={GlobalStyle.size.size12} fontWeight='600' />
      </TextDiv>
    </MenuItem>

  </MenuDiv>
  )
  

  return (
    <>
      <Paragraph  text={`Staff Role (${staffList?.length === undefined ? 0 : staffList?.length})`} fontSize={GlobalStyle.size.size24} fontWeight='bold' margin='0% 0% 1% 10px' />
      <View>
        <Div>
          <SearchBox>
            <SearchInput label={'Search user or user role'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
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
            <Button children={'Add Member'} handlePress={() => showAddModal()} />
          </ButtonBox>
        </Div>
      </View>
      <Table 
        columns={columns} 
        size="small" 
        locale={{ emptyText: <EmptyTable 
          icon={bigStaff} 
          header='Staff Role' 
          title='You haven’t added any user to your store. Users you add to your store will be viewed here.' /> 
        }} 
        dataSource={renderData()} 
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

      <AddStaffModal
        staffModalVisible={staffOpen}
        closeModal={closeStaffModal}
      />
    </>
  )
}

export default TabletStaff


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

const TextDiv = styled.div`
  border: 0.5px solid ${GlobalStyle.color.lightwhite};
  min-width: 100px;
  border-radius: 30px; 
  display: flex;
  justify-content: center;
  padding: 5px;
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