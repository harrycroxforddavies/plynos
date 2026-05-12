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
export type ClientStatus = "active" | "paused" | "archived";
export type DevelopmentStage =
  | "kickoff"
  | "discovery"
  | "design"
  | "dev"
  | "staging"
  | "live"
  | "maintenance";
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

export interface Unsubscribe {
  id: string;
  created_at: string;
  email: string;
  source: string | null;
  reason: string | null;
}

export interface Client {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  primary_contact_name: string | null;
  primary_contact_email: string | null;
  primary_contact_phone: string | null;
  country: string | null;
  locale: string | null;
  website_url: string | null;
  status: ClientStatus;
  source_lead_id: string | null;
  source_opportunity_id: string | null;
  notes: string | null;
  archived_at: string | null;
}

export interface Development {
  id: string;
  created_at: string;
  updated_at: string;
  client_id: string;
  title: string;
  stage: DevelopmentStage;
  stage_changed_at: string;
  owner_id: string | null;
  template: string | null;
  tech_stack: string | null;
  domain: string | null;
  repo_url: string | null;
  preview_url: string | null;
  staging_url: string | null;
  live_url: string | null;
  started_at: string | null;
  expected_live_at: string | null;
  actual_live_at: string | null;
  progress_pct: number;
  notes: string | null;
  archived_at: string | null;
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
      unsubscribes: TableDef<Unsubscribe>;
      clients: TableDef<Client>;
      developments: TableDef<Development>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
