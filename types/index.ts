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
    approved: boolean;
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

export type User = {
    id: string;
    email: string;
    hashed_password: string;
    first_name: string;
    last_name: string;
    graduation_year: string;
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

export type UserProfile = {
    id: string;
    first_name: string;
    last_name: string;
    graduation_year: string;
    location: string | null;
    biography: string | null;
    show_location: boolean;
    telegram_alias: string | null;
    avatar: string | null;
};

export type EventApprovalSettings = {
    auto_approve: boolean;
};
