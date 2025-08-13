export interface User {
  uid?: string;
  name?: string;
  email: string;
  password: string;
  address?: string;
  role?: string;
  isVerified?: boolean;
  token: any;
  updatedAt: Date;
  createdAt: Date;
}