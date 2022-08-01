import { StaticImageData } from "next/image";


export interface Headers {
    icon: StaticImageData,
    header: string
}

export interface WelcomeCardInterface {
    header: string;
    title: string;
    type: string;
    selected: string;
    handleClick?: () => void;
  };
  

  export interface ListCardProps {
    id: number,
    title: string,
    icon: StaticImageData,
    route?: string,
    isActive?: boolean
}

export interface StoreHeaderProps {
   name: string,
   slug: string,
}


export interface UploadInterface {
 imageUrl?: string;
 index?: number;
 removeImage?: () => void
}

export interface MultipleUploadInterface {
  imageUrl: Array<string>;
  index?: number;
  removeImage: () => void
 }



export interface ProductVariantCardInterface {
  image: string;
  name: string;
  price: number;
  edit?: boolean;
  handleEditClick?: () => void;
  handleDeleteClick?: () => void
}


export interface MyStoreTable {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}