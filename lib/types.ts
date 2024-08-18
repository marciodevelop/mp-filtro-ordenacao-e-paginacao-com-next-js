export type Order = {
 id: number;
 customer_name: string;
 customer_email: string;
 order_date: Date;
 amount_in_cents: number;
 status: 'completed' | 'pending';
 created_at: Date;
 update_at: Date;
}