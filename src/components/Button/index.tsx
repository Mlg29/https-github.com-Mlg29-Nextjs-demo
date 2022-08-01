import React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../../utils/themes/themes'
import { ButtonType } from "../../utils/types"
import { LoadingOutlined } from "@ant-design/icons"

const Button: React.FC<ButtonType> = ({ handlePress, children, isLoading, type, disabled }) => {
  return (
    <>
      {
        type === 'cancel' ?
          <ButtonErrorText
            type='button'
            onClick={handlePress}
            disabled={disabled}
          >{isLoading ? <LoadingOutlined /> : children}</ButtonErrorText>
          : type === 'filter' ?
            <ButtonFilterText
              type='button'
              onClick={handlePress}
              disabled={disabled}
            >{isLoading ? <LoadingOutlined /> : children}</ButtonFilterText>
            :
            <ButtonText
              type='button'
              onClick={handlePress}
              disabled={disabled}
            >{isLoading ? <LoadingOutlined /> : children}</ButtonText>

      }

    </>
  )
}

export default Button


const ButtonText = styled.button`
    background: ${GlobalStyle.color.bazaraTint};
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: ${GlobalStyle.color.white};
    border: none;
    border-radius: 10px;
    cursor: pointer;
`

const ButtonFilterText = styled.button`
    background: transparent;
    border: 1px solid ${GlobalStyle.color.bazaraTint};
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: ${GlobalStyle.color.bazaraTint};
    border-radius: 10px;
    cursor: pointer;
`

const ButtonErrorText = styled.button`
    background: ${GlobalStyle.color.artBoard};
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: ${GlobalStyle.color.white};
    border: none;
    border-radius: 10px;
    cursor: pointer;
`