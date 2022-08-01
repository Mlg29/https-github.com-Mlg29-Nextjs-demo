import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styled from 'styled-components';

const antIcon = <LoadingOutlined style={{ fontSize: 18 }} spin />;

const LoadingState = () => {
  return (
    <View>
        <Spin indicator={antIcon} />
    </View>
  )
}

export default LoadingState 

const View = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`