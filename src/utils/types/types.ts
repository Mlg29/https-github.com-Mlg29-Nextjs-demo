import { FormikErrors, FormikTouched } from "formik";
import { StaticImageData } from "next/image";
import { ChangeEvent, SetStateAction } from "react";
import { NumberFormatValues, SourceInfo } from "react-number-format";
import { number } from "yup";


export type LoginFormData = {
    email: string;
    password: string;
}

export type SignupType = {
    email: string;
    password: string;
    fName: string;
    lName: string;
    mobile: string;

}
export type OauthAction = {
    authToken: string;
    authType: string;
}


export type LoginState = {
    userData: [];
    loading: boolean;
    error: any
}

export type StoreState = {
    myStore: Array<any>,
    storeRatings: Array<any>,
    allStores: Array<any>,
    storeById: any,
    error: any,
    loading: boolean
}


export type ProductState = {
    products: Array<any>,
    productBySlug: any,
    error: any,
    loading: boolean
}


export type ResetFormData = {
    email: string;
}

export type Header = {
    icon: string,
    header: string
}

export type TextProps = {
    text: string;
    fontSize?: string;
    textAlign?: 'left' | 'right' | 'center' | 'justify';
    color?: string;
    lineHeight?: number;
    fontFamily?: string;
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'initial' | 'inherit';
    fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
    margin?: string
};

export type SignupFormData = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
}

export type StoreFormData = {
    storeName: string;
    description: string;
    phoneNumber: string;
    street: string;
    city: string;
    state: string;
}

export type ProductCreateFormData = {
    id: string,
    name: string,
    description: string,
    categories: string,
    variants: Array<any>,
    isDraft: boolean,
    status: string
}

export type ProductUpdateFormData = {
    id: string,
    name?: string,
    description?: string,
    categories?: string,
    variants?: Array<any>,
    isDraft?: boolean,
    status?: string,
}

export type DeliveryFormData = {
    state: string;
    price: string
}

export type LandmarkFormData = {
    city: string;
    price: string
}

export type StoreCreateFormData = {
    brandName: string,
    description: string,
    imgUrl: string,
    address: string,
    phoneNumber: string,
    location: {
        state: string,
        city: string,
        street: string,
    },
    isDraft?: boolean,
    status?: string
}

export type StoreUpdateFormData = {
    id: string,
    brandName: string,
    description: string,
    imgUrl: string,
    address: string,
    phoneNumber: string,
    status?: string,
    location: {
        state: string,
        city: string,
        street: string,
    },
    isDraft: boolean,
}


export type WelcomeCardProp = {
    id: number,
    header: string,
    type: string,
    title: string
}

export type InputType = {
    label: string,
    value: string,
    errorMsg?: string,
    isMultiline?: boolean,
    isPassword?: boolean,
    disabled?: boolean,
    type?: string,
    required?: boolean,
    handleClick?: (value?: any) => void,
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    handleTextChange?: (value?: any) => void
}

export type NumberType = {
    label: string,
    value: number,
    errorMsg?: string,
    type?: string,
    handleNumChange?: (value: string | ChangeEvent<any>) => void,
    handleOnChange?: (value: number | string) => void
      onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
   // onChange?: (values: NumberFormatValues, sourceInfo: SourceInfo) => void
}


export type locationProp = {
    state: string,
    city: Array<string>,
}

export type ArrayOptionType = {
    id: number,
    title: string,
    icon: StaticImageData
}


export type ButtonType = {
    children: string,
    isLoading?: boolean,
    handlePress?: () => void,
    type?: string,
    disabled?: boolean
}

export type SelectType = {
    onSearch?: (value: string) => void,
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    placeholder: string,
    errorMsg?: string,
    value: string,
    type?: boolean,
    data: Array<any>,
}

export type ModalType = {
    title: string,
    type: string,
    modalVisible: boolean,
    handlePress?: () => void,
    setModalVisible: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export type ProductModalType = {
    visible: boolean,
    action?: () => void,
    handlePress?: () => void,
    setVisible: () => void
}


export type EditProductModalType = {
    visible: boolean,
    action?: () => void,
    handlePress?: () => void,
    setVisible: () => void,
    editData?: any
}


export type ImageType = {
    source: string;
    width?: number;
    height?: number;
    type?: string
}


export type ProductFormData = {
    productName: string;
    productDescription: string;
    category: string;
}


export type EditProductFormData = {
    productName: string;
    productDescription: string;
    category: string;
}

export type ProductColorData = {
    description: '';
}

export type ProductNoColorData = {
    price: number
}

export type ProductSizeData = {
    price: number;
    size: string
}

export type OrdersState = {
    sellerOrders: Array<any>,
    sellerOrderDetails: any,
    outOfStock: any,
    error: any;
    loading: boolean
}

export type AddStaffData = {
    // firstName: string,
    // lastName: string;
    email: string;
    role: string;
}

export type AddDesktopStaffData = {
    // firstName: string,
    // lastName: string;
    email: string;
}

export type PayoutFormData = {
    bankName: string,
    bankNumber: string
}

export type PayoutState = {
    payout: Array<any>,
    loading: any,
    error: any
}

export type PayoutBody = {
    name: string,
    account: string,
    bankCode: string,
    bankName: string,
}

export type ProductColorAloneData = {
    price: number;
}


export type PayoutModalData = {
    visible: boolean,
    setVisible: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    editPayout?: any
}

export type ProfileFormData = {
    lName: string,
    fName: string,
    email: string,
    mobile: string
}

export type ProfileState = {
    profile: any,
    loading: boolean,
    error: any
}

export type StaffState = {
    staffs: any,
    loading: boolean,
    error: any,
    storeRoles: any,
}

export type NotificationCardType = {
    icon: StaticImageData,
    header: string,
    duration: string,
    action: string,
}

export type EmptyStateType = {
    icon: StaticImageData,
    title: string,
    header: string,
    btn?: boolean,
    route?: string,
    btnText?: string,
   }
   

export type NotificationState = {
   notifications: Array<any>,
    sellerStat: any,
    loading: boolean,
    error: any
}

export type MerchantFormData = {
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    password: string,
}

export type DesktopCreateProduct = {
    productName: string,
    description: string,
    category: string,
}