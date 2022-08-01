import React, { useEffect, useState } from 'react'
import { ColumnAlignStart, ColumnStart, RowBetweenStart, RowStart } from '../../../utils/StyledComponent';
import {
    Text,
    IconImage
} from "../Styled"
import { Badge } from 'antd';
import styled from 'styled-components';
import { bell, copy, storeLogo } from "../../../assets"
import { GlobalStyle } from '../../../utils/themes/themes';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { StoreHeaderProps } from '../../../utils/interfaces';
import Paragraph from '../../Paragraph';
import { toast, ToastContainer } from 'material-react-toastify';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { getSellerNotificationStat, sellerNotificationStat } from '../../../slices/NotificationSlice';

const StoreHeader: React.FC<StoreHeaderProps> = ({ name, slug }) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const sellerNotificationStats = useAppSelector(sellerNotificationStat)



    const isNotificationPresent = sellerNotificationStats?.pendingOrders?.count > 0 || sellerNotificationStats?.completedOrders?.count > 0 || sellerNotificationStats?.paymentReceived?.count > 0 || sellerNotificationStats?.productsOutOfStock?.count > 0

    useEffect(() => {
        dispatch(getSellerNotificationStat())
    }, [])


    return (
        <RowBetweenStart>
            <RowStart>
                <Div>
                    <IconImage
                        src={storeLogo}
                        width={35}
                        height={30}
                    />
                </Div>
                <ColumnAlignStart>
                    <Paragraph text={name} fontSize={GlobalStyle.size.size14} fontWeight="400" />

                    <CopyToClipboard text={`https://bazara.co/store/${slug}`}
                        onCopy={() => toast.success("Link copied successfully")}
                    >
                        <View>
                            <IconImage
                                src={copy}
                            />
                            <Paragraph text='Copy store link' fontSize={GlobalStyle.size.size12} margin="0% 0% 0% 4px" />
                        </View>
                    </CopyToClipboard>

                </ColumnAlignStart>
            </RowStart>
            <ToastContainer />
            <Cont onClick={() => router.push('/notification')}>
                <Badge dot={isNotificationPresent}>
                    <IconImage
                        src={bell}
                        width={20}
                        height={20}
                    />
                </Badge>
            </Cont>
        </RowBetweenStart>
    )
}

export default StoreHeader

const Div = styled.div`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: ${GlobalStyle.color.artBoard};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`

const View = styled.div`
    background-color: ${GlobalStyle.color.artBoard};
    display: flex;
    padding: 5px;
    border-radius: 5px;
    width: 100px;
`

const Cont = styled.div`
    margin-top: 10px;
`

