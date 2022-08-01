import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(7, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export const SignupSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().min(11, ({min}) => `Phone number must be at least ${min} length`).required('Phone is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(7, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
});

export const MerchantSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  mobile: yup.string().min(11, ({min}) => `Phone number must be at least ${min} length`).required('Phone is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(7, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
});

export const MerchantFormSchema = yup.object().shape({
  storeName: yup.string().required('Store name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  street: yup.string().required('Street name is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
})

export const MerchantDescriptionSchema = yup.object().shape({
  description: yup.string().required('Store description is required'),
});

export const ResetSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
});

export const StoreFormSchema = yup.object().shape({
  storeName: yup.string().required('Store name is required'),
  description: yup.string().required('Store description is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  street: yup.string().required('Street name is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
});

export const DeliveryFormSchema = yup.object().shape({  
  state: yup.string().required('State is required'),
  // city: yup.string().required('City is required'),
  price: yup.string().required('Price is required')
});

export const LandmarkFormSchema = yup.object().shape({  
  city: yup.string().required('City is required'),
  price: yup.string().required('Price is required')
});


export const ProductSchema = yup.object().shape({  
 productName: yup.string().required('Product name is required'),
 productDescription: yup.string().required('Product description is required'),
 category: yup.string().required('Category is required')
});

export const EditProductSchema = yup.object().shape({  
  productName: yup.string().required('Product name is required'),
  productDescription: yup.string().required('Product description is required'),
  category: yup.string().required('Category is required')
 });

export const ProductColorSchema = yup.object().shape({  
  description: yup.string().required('Color description is required')
 });
 

export const ProductNoColorSchema = yup.object().shape({  
  price: yup.number().min(500, ({min}) => `Price must be at least ${min}`).required('Price is required')
 });

 export const ProductColorAloneSchema = yup.object().shape({  
  price: yup.number().min(500, ({min}) => `Price must be at least ${min}`).required('Price is required')
 });
 

 
export const ProductSizeSchema = yup.object().shape({  
  price: yup.number().min(500, ({min}) => `Price must be at least ${min}`).required('Price is required'),
  size: yup.string().required('Size is required')
 });


 export const AddStaffSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  role: yup.string().required('Role is required')
 })

 export const AddDesktopStaffSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  role: yup.string().required('Role is required')
 })

 export const PayoutSchema = yup.object().shape({
  bankName: yup.string().required('Bank name is required'),
  bankNumber: yup.string().required('Bank number is required'),

 })

 export const ProfileFormSchema = yup.object().shape({
  lName: yup.string().required('Surname is required'),
  fName: yup.string().required('First name is required'),
  email: yup.string().email().required('Email is required'),
  mobile: yup.string().required('Phone number is required'),
 })

 export const DesktopCreateProductSchema = yup.object().shape({
  productName: yup.string().required('Product name is required'),
  description: yup.string().required('description is required'),
  category: yup.string().email().required('category is required'),

 })