import type { Sticker, User, Event, Activity } from "~/types";
import StickerImage from '@/assets/icons/test/sticker.svg'

export const testStickers: Sticker[] = [
  {
    id: '001',
    img: StickerImage,
    label: 'Cup',
  },
  {
    id: '002',
    img: StickerImage,
    label: 'Cup',
  },
  {
    id: '003',
    img: StickerImage,
    label: 'Platinum',
  },
]

export const testEvents: Event[] = [
  {
    id: '001',
    title: 'Adakov\'s lecture',
    location: 'UAE, Dubai',
    img: '',
    date: '23:59 01.01.2024',
    owner_id: '001',
    user: {
      id: '001',
      name: 'Boris Adakov',
      email: 'b.adakov@innopolis.university',
      avatar: '',
      biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tortor ipsum, sed vestibulum mauris sodales nec.',
      stickers: testStickers,
      events: [],
      activities: [],
      isRegistered: true,
      isBanned: false,
      first_name: "",
      last_name: ""
    },
    descrption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tortor ipsum, sed vestibulum mauris sodales nec.',
    participants: [
      {
        id: '002',
        name: 'Boris Adakovich',
        email: 'b.adakov@innopolis.university',
        avatar: '',
        biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tortor ipsum, sed vestibulum mauris sodales nec.',
        stickers: testStickers,
        events: [],
        activities: [],
        isRegistered: true,
        isBanned: false,
        first_name: "",
        last_name: ""
      },
      {
        id: '003',
        name: 'Boris Adakovish',
        email: 'b.adakov@innopolis.university',
        avatar: '',
        biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tortor ipsum, sed vestibulum mauris sodales nec.',
        stickers: testStickers,
        events: [],
        activities: [],
        isRegistered: true,
        isBanned: false,
        first_name: "",
        last_name: ""
      },
    ],
    status: 'approved',
    approved: null
  },
  {
    id: '002',
    title: 'Adakov\'s lecture №2',
    location: 'UAE, Dubai',
    img: '',
    date: '23:59 01.01.2024',
    owner_id: '001',
    user: {
      id: '001',
      name: 'Boris Adakov',
      email: 'b.adakov@innopolis.university',
      avatar: '',
      biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tortor ipsum, sed vestibulum mauris sodales nec.',
      stickers: testStickers,
      events: [],
      activities: [],
      isRegistered: true,
      isBanned: false,
      first_name: "",
      last_name: ""
    },
    descrption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tortor ipsum, sed vestibulum mauris sodales nec.',
    participants: [
      {
        id: '002',
        name: 'Boris Adakovich',
        email: 'b.adakov@innopolis.university',
        avatar: '',
        biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tortor ipsum, sed vestibulum mauris sodales nec.',
        stickers: testStickers,
        events: [],
        activities: [],
        isRegistered: true,
        isBanned: false,
        first_name: "",
        last_name: ""
      },
    ],
    status: 'pending',
    approved: null
  },
]

export const testActivities: Activity[] = [
  {
    id: '001',
    color: '',
    score: 100,
    name: 'Activity',
  },
  {
    id: '002',
    color: '',
    score: 100,
    name: 'Activity',
  },
  {
    id: '003',
    color: '',
    score: 100,
    name: 'Activity',
  },
  {
    id: '004',
    color: '',
    score: 100,
    name: 'Activity',
  },
  {
    id: '005',
    color: '',
    score: 100,
    name: 'Activity',
  },
  {
    id: '006',
    color: '',
    score: 100,
    name: 'Activity',
  },
]

export const testUsers: User[] = [
  {
    id: '001',
    name: 'Boris Adakov',
    first_name: 'Boris',
    last_name: 'Adakov',
    email: 'b.adakov@innopolis.university',
    avatar: '',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tortor ipsum, sed vestibulum mauris sodales nec.',
    stickers: testStickers,
    events: testEvents,
    activities: testActivities,
    isRegistered: true,
    isBanned: false,
  },
  {
    id: '002',
    name: 'Boris Adakovich',
    email: 'b.adakov@innopolis.university',
    avatar: '',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tortor ipsum, sed vestibulum mauris sodales nec.',
    stickers: testStickers,
    events: [],
    activities: [],
    isRegistered: true,
    isBanned: false,
    first_name: "",
    last_name: ""
  },
  {
    id: '003',
    name: 'Boris Adakovish',
    email: 'b.adakov@innopolis.university',
    avatar: '',
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tortor ipsum, sed vestibulum mauris sodales nec.',
    stickers: testStickers,
    events: [],
    activities: [],
    isRegistered: true,
    isBanned: false,
    first_name: "",
    last_name: ""
  },
]