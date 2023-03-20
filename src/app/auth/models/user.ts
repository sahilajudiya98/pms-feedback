import { Role } from './role';

// export class User {
//   id: number;
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   avatar: string;
//   role: Role;
//   token?: string;
// }

export interface User {
  _id: string
  first_name: string
  last_name: string
  email: string
  company: string
  password: string
  user_type: number
  status: number
  temp_token: string
  is_account_verify: boolean
  deleted_at: any
  created_at: number
  updated_at: number
  country: string
  address: string
  mobile_number: any
  __v: number
  refresh_tokens: string
  reset_password_token: string
  auth_toekn: string
  role: Role;
  profile_image?: any;
}

