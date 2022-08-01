import React, {useState} from 'react'
import {Modal} from "antd"
import { ModalType } from '../../utils/types'
import {ColumnCenterGlobal, MobileHeaderMedium, MobileParagraphMedium } from '../../utils/StyledComponent'
import Image from "../Image"
import Button from '../Button'
import styled from "styled-components"

const ResponseModal: React.FC<ModalType> = ({title, type, modalVisible, setModalVisible, handlePress}) => {

  return (
    <ModalCard
        title={null}
        centered
        style={{ top: 20 }}
        visible={modalVisible}
        onOk={setModalVisible}
        onCancel={setModalVisible}
        footer={null}
        width={400}    
        closable={false}
        
      >
       <ColumnCenterGlobal>
            <Image source={type === 'Error' ? "https://res.cloudinary.com/doouwbecx/image/upload/v1647515309/Alert_Icon3_e8ixyn.png" : "https://res.cloudinary.com/doouwbecx/image/upload/v1647515309/Alert_Icon_x6jpoo.png"} width={50} height={50} />
            <MobileHeaderMedium>{type}</MobileHeaderMedium>
            <MobileParagraphMedium>{title}</MobileParagraphMedium>
            <Button handlePress={handlePress}>Dismiss</Button>
       </ColumnCenterGlobal>
      </ModalCard>
  )
}

export default ResponseModal


const ModalCard = styled(Modal)`
    
`