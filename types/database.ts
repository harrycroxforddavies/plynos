export type LeadStatus =
  | "new"
  | "contacted"
  | "replied"
  | "call_booked"
  | "proposal_sent"
  | "won"
  | "lost"
  | "unsubscribed";

export type LeadSource =
  | "website"
  | "resend"
  | "fiverr"
  | "referral"
  | "cold_call"
  | "whatsapp"
  | "other";

export type NicheDecision = "testing" | "narrow" | "kill" | "keep";
export type OpportunityStatus = "open" | "won" | "lost";
export type OpportunityPaymentStatus = "unpaid" | "deposit" | "paid" | "refunded";
export type ContentType = "blog" | "news" | "portfolio" | "testimonial";

export interface Profile {
  id: string;
  email: string | null;
  role: string;
  created_at: string;
}

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  website_url: string | null;
  niche: string | null;
  goal: string | null;
  deadline: string | null;
  source: LeadSource | null;
  status: LeadStatus;
  notes: string | null;
}

export interface Niche {
  id: string;
  created_at: string;
  name: string;
  hypothesis: string | null;
  status: string | null;
  score: number | null;
  start_date: string | null;
  end_date: string | null;
  decision: NicheDecision | null;
  decision_notes: string | null;
}

export interface Campaign {
  id: string;
  created_at: string;
  name: string;
  niche_id: string | null;
  channel: string | null;
  subject: string | null;
  variant: string | null;
  sent: number;
  replies: number;
  bounces: number;
  unsubscribes: number;
  booked_calls: number;
  wins: number;
}

export interface Touchpoint {
  id: string;
  created_at: string;
  lead_id: string;
  channel: string | null;
  direction: string | null;
  summary: string | null;
  next_action_at: string | null;
}

export interface Opportunity {
  id: string;
  created_at: string;
  lead_id: string | null;
  value_eur: number | null;
  status: OpportunityStatus;
  payment_status: OpportunityPaymentStatus;
  assets_received: boolean;
  build_started: boolean;
  review_sent: boolean;
  launched: boolean;
  handover_complete: boolean;
  deadline: string | null;
  final_url: string | null;
  notes: string | null;
}

export interface ContentPost {
  id: string;
  created_at: string;
  type: ContentType;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  cover_url: string | null;
  published: boolean;
}

export interface Unsubscribe {
  id: string;
  created_at: string;
  email: string;
  source: string | null;
  reason: string | null;
}

type TableDef<TRow, TInsert = Partial<TRow>, TUpdate = Partial<TRow>> = {
  Row: TRow;
  Insert: TInsert;
  Update: TUpdate;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      profiles: TableDef<Profile>;
      leads: TableDef<Lead>;
      niches: TableDef<Niche>;
      campaigns: TableDef<Campaign>;
      touchpoints: TableDef<Touchpoint>;
      opportunities: TableDef<Opportunity>;
      content_posts: TableDef<ContentPost>;
      unsubscribes: TableDef<Unsubscribe>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
