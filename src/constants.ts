export const OPEN_API_PATH = <any>["/auth/adminLogin", '/staticcontent/:id'];

export const ROLE_ENUM = <any>{

  admin: 1,
  subAdmin: 2,
  
};

export const STATUS = <any>{
  active: 1,
  inactive: 2,
  delete: 3
};

export const ISACTIVE = <any> {
  true: 1,
  false: 0
}

// export const START_DATE = Number(Math.floor(new Date('2000.01.01').getTime()));

export const S3_FILE_PATH = {
  pdfFile: "static_content",
  userProfile: "user_profile",
};

export enum TOTAL_PERMISSIONS {
  total_subadmin_permissions= 3
}


export const NUMBER = <any>{
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  oneday: 86400000,
  
}

export const STATICCONTENT = <any> {
  TermsAndCondtion : 1,
  PrivacyPolicy: 2,
  AboutUs: 3,
  ContactUs: 4
}
export const START_DATE ='2021-01-01 00:00:00';
