export interface Reviews {
    id: string;
    business_id: string;
    user_id: string;
    rating: number;
    comment: string;
    created_at: string;
    users: {
      nome: string;
    };
  }
  