import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import { GlobalStyle } from '../../../utils/themes/themes';

function DashboardSkeleton() {
    return (
        <Stack spacing={1}>
            <Div>
                <Skeleton variant="circular" width={50} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                <Skeleton variant="rectangular" width={"90%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}`, marginLeft: '5px' }} />
            </Div>
            <Skeleton variant="rectangular" width={"100%"} height={118} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            <Skeleton variant="rectangular" width={"100%"} height={118} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            <SubDiv>
                <Skeleton variant="rectangular" width={"30%"} height={118} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                <Skeleton variant="rectangular" width={"30%"} height={118} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                <Skeleton variant="rectangular" width={"30%"} height={118} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            </SubDiv>
            <Skeleton variant="rectangular" width={"100%"} height={118} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            <Skeleton variant="rectangular" width={"100%"} height={118} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            <Skeleton variant="rectangular" width={"100%"} height={118} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
        </Stack>
    )
}

export default DashboardSkeleton

const Div = styled.div`
    display: flex;
`

const SubDiv = styled.div`
    display: flex;
    justify-content: space-between;
`