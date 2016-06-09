interface Invitation {
  _id?: string;
  company?: string;
  name?: string;
  last_name?: string;
  email: string;
  role?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  token?:string;
  invitation_date?: string;
  message?: {
    subject: string;
    text: string;
  };
  invited_by?: any;
}