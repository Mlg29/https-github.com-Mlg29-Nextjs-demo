import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import { GlobalStyle } from '../../../utils/themes/themes';

function ProductListSkeleton() {
    return (
        <Stack spacing={1}>
            <Skeleton variant="text" width={"100%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            <Skeleton variant="rectangular" width={"100%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            <Div>
                <Skeleton variant="rectangular" width={"20%"} height={70} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            <Div>
                <Skeleton variant="rectangular" width={"20%"} height={70} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            <Div>
                <Skeleton variant="rectangular" width={"20%"} height={70} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            <Div>
                <Skeleton variant="rectangular" width={"20%"} height={70} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            <Div>
                <Skeleton variant="rectangular" width={"20%"} height={70} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            <Div>
                <Skeleton variant="rectangular" width={"20%"} height={70} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            <Div>
                <Skeleton variant="rectangular" width={"20%"} height={70} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            <Div>
                <Skeleton variant="rectangular" width={"20%"} height={70} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            
        </Stack>
    )
}

export default ProductListSkeleton

const Div = styled.div`
    display: flex;
`

const SubDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
`