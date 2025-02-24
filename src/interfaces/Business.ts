export interface Business {
    id: string;
    name: string;
    description?: string;
    socialMedia?: {
      facebook: string;
      instagram: string;
    }
    category: string;
    rating: number;
    address: string;
    whatsapp: string;
    telephone: string;
    photos: string[];
    plan: string;
  }