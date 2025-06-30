export type Sticker = {
    id: string;
    img: string;
    label: string;
};

export type Event = {
    id: string;
    title: string;
    location: string;
    img: string;
    date: Date | string;
    user: User;
    descrption: string;
    participants: User[];
    status: "approved" | "pending" | "rejected";
    approved: boolean | null
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

export type EventApprovalSettings = {
    auto_approve: boolean;
};
