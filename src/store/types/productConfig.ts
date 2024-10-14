export interface ProductDataEntity {
    key : string
    auth_type : string
    logo_image: string
    signup_allowed : boolean
  }
  
export interface ProductData {
    productData : ProductDataEntity
  }
  
export interface productConfigState {
    key : string
    auth_type : string
    logo_image: string
    signup_allowed : boolean
  }
  