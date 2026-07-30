export type Sticker = {
    id: string;
    img: string;
    label: string;
};

export type Event = {
    id: string;
    owner_id: string;
    participants_ids: string[];
    title: string;
    description: string;
    location: string;
    datetime: Date | string;
    cost: number;
    is_online: boolean;
    cover: string | null;
    approved: boolean | null;
};

/** Event type returned by the admin list endpoint — includes cover for thumbnails. */
export type EventListItem = {
    id: string;
    owner_id: string;
    participants_ids: string[];
    title: string;
    description: string;
    location: string;
    datetime: Date | string;
    cost: number;
    is_online: boolean;
    cover: string | null;
    approved: boolean | null;
};

export type EventParticipant = {
    id: string;
    email: string;
    hashed_password: string | null;
    first_name: string;
    last_name: string;
    graduation_year: string;
    location: string | null;
    biography: string | null;
    show_location: boolean;
    is_verified: boolean;
    is_banned: boolean;
};

export type Activity = {
    id: string;
    color: string;
    score: number;
    name: string;
};

/** Wire values for the two supported alumni roles. */
export type AlumniRole = "alumni" | "alumni_friend";

export type User = {
    id: string;
    email: string;
    hashed_password: string;
    first_name: string;
    last_name: string;
    /** Null for Alumni Friends — the UI shows an "Alumni Friend" chip instead. */
    graduation_year: string | null;
    /** Defaults to "alumni" for pre-role rows. */
    role: AlumniRole;
    location: string;
    biography: string;
    show_location: boolean;
    is_verified: boolean;
    is_banned: boolean;
    // Computed properties
    name?: string;
    avatar?: string;
    stickers?: Sticker[];
    events?: Event[];
    activities?: Activity[];
    isRegistered?: boolean;
};

/** Slim user type returned by list endpoints — no avatar image. */
export type UserListItem = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    graduation_year: string | null;
    role: AlumniRole;
    location: string | null;
    biography: string | null;
    show_location: boolean;
    is_verified: boolean;
    is_banned: boolean;
    // Computed properties
    name?: string;
    isBanned?: boolean;
    isVerified?: boolean;
};

export type UserProfile = {
    id: string;
    first_name: string;
    last_name: string;
    graduation_year: string | null;
    role: AlumniRole;
    location: string | null;
    biography: string | null;
    show_location: boolean;
    telegram_alias: string | null;
    avatar: string | null;
};

export type EventApprovalSettings = {
    auto_approve: boolean;
};

/** Generic paginated response returned by all list endpoints. */
export type Paginated<T> = {
    items: T[];
    next_cursor: string | null;
};

// ─── Badges ────────────────────────────────────────────────────────────────

export type BadgeCatalogItem = {
    code: string;
    name: string;
    description: string;
    tier: 'gold' | 'silver' | 'bronze' | 'special';
    icon_key: string;
    strategy: string;
    criteria_summary: string;
    earned_by_count: number;
};

export type BadgeAward = {
    alumni_id: string;
    first_name: string;
    last_name: string;
    email: string;
    awarded_at: string | null;
    awarded_by: string | null;
    extra: Record<string, unknown>;
};

export type BadgeAwardsResponse = {
    code: string;
    name: string;
    awards: BadgeAward[];
};

/**
 * Project — an alumnus-proposed cause / campaign that other alumni
 * "contribute" to (v1 is a click, no money — see FR24 in docs).
 */
export type Project = {
    id: string;
    owner_id: string;
    contributors_ids: string[];
    title: string;
    description: string;
    cover: string | null;
    donation_link: string | null;
    /** Whole-ruble fundraising target the owner set. Null = no target. */
    goal_amount: number | null;
    /** Whole rubles raised so far (self-reported by donors). */
    raised_amount: number;
    approved: boolean | null;
    created_at: string;
};

export type ProjectListItem = Project;

export type ProjectStatusFilter = "pending" | "approved" | "declined" | "all";
