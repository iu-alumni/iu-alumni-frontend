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
    owner_id?: string
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
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    biography: string;
    stickers: Sticker[];
    events: Event[];
    activities: Activity[];
    isRegistered: boolean;
    isBanned: boolean;
};

export type EventApprovalSettings = {
    auto_approve: boolean;
};
