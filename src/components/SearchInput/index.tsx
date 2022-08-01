import React, { useState, useEffect } from 'react'
// import TextField from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput';
import styled from "styled-components"
import { InputType } from '../../utils/types'
import { GlobalStyle } from '../../utils/themes/themes'
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { NextPage } from 'next'

import { Input } from 'antd';

const SearchInput: NextPage<InputType> = ({ label, onChange, handleClick, value, errorMsg, isPassword, isMultiline }) => {
    const [showPassword, setShowPassword] = useState(true)


    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <InputContainer>
            <Inputs
                id={"outlined-adornment-weight"}
                aria-describedby="outlined-weight-helper-text"
                value={value}
                placeholder={label}
                onChange={onChange}
                size='large'
                prefix={<SearchIcon onClick={handleClick} style={{ color: 'white' }} />}

            />
            {errorMsg !== undefined ? (
                <div>
                    <Text>{errorMsg}</Text>
                </div>
            ) : null}
        </InputContainer>
    )
}

export default SearchInput

const InputContainer = styled.div`
margin: 10px 0%;
background: ${GlobalStyle.color.darkBlack}
`

const Inputs = styled(Input)`
  width: 100%;
  background: transparent;
  border: none !important;
  padding: 10px;
`

const Text = styled.p`
  font-size: 12px;
  color: red;
`