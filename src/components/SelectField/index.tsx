import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import styled from "styled-components"
import { SelectType } from '../../utils/types'
import { GlobalStyle } from '../../utils/themes/themes'
import { Select } from 'antd';


const SelectField: React.FC<SelectType> = ({ data, onChange, onSearch, value, placeholder, errorMsg, type }) => {

    const { Option } = Select


    return (
        <InputContainer>
            <SelectInput
                value={value ? value : placeholder}
                showSearch
                placeholder={placeholder}
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                dropdownClassName="drop"
                dropdownStyle={{backgroundColor: GlobalStyle.color.black, color: GlobalStyle.color.white}}
                filterOption={(input, option) =>
                    (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                }
            >
                {
                    type ? data?.map((data: any, i: number) => {
                        return <Option key={data.id} value={data.type}>{data.type}</Option>
                    })
                    :
                    data?.map((data: any, i: number) => {
                        return <Option key={i} value={data}>{data}</Option>
                    })
                }

            </SelectInput>

            {errorMsg !== undefined ? (
                <div>
                    <Text>{errorMsg}</Text>
                </div>
            ) : null}
        </InputContainer>
    )
}

export default SelectField

const InputContainer = styled.div`
margin: 10px 0%;
`

const Text = styled.p`
  font-size: 12px;
  color: red;
`


const SelectInput = styled(Select)`
  width: 100%;
}
`