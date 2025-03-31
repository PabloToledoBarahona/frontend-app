export interface User {
    username: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    email: string;
    password: string;
    confirm_password?: string;
  }