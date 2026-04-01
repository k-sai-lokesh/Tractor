// lib/data.ts — Mock data for TractorLease prototype

export interface Attachment {
  name: string;
  pricePerHour: number;
  icon?: string;
}

export interface Review {
  id: string;
  renter: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Tractor {
  id: string;
  owner: string;
  mobile: string;
  upiId: string;
  bankAccount: string;
  ifscCode: string;
  model: string;
  brand: string;
  numberPlate: string;
  year: number;
  hp: number;
  rating: number;
  reviews: Review[];
  reviewCount: number;
  pricePerHour: number;
  pricePerDay: number;
  availableTime: string;
  attachments: Attachment[];
  availableDays: string[];
  earnings: number;
  location: string;
  image: string;
  images: string[];
  category: string;
  description: string;
  available: boolean;
}

export const tractors: Tractor[] = [
  {
    id: "t1",
    owner: "Rajesh Patil",
    mobile: "9876543210",
    upiId: "rajesh@upi",
    bankAccount: "XXXXXXXXXXXX1234",
    ifscCode: "SBIN0001234",
    model: "575 DI",
    brand: "Mahindra",
    numberPlate: "MH-12-AB-1234",
    year: 2021,
    hp: 45,
    rating: 4.5,
    reviewCount: 28,
    pricePerHour: 350,
    pricePerDay: 2500,
    availableTime: "6:00 AM – 7:00 PM",
    attachments: [
      { name: "Rotavator", pricePerHour: 200 },
      { name: "Trolley", pricePerHour: 150 },
      { name: "Cultivator", pricePerHour: 180 },
    ],
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    earnings: 18500,
    location: "Pune, Maharashtra",
    image: "/tractor1.png",
    images: ["/tractor1.png", "/tractor2.png", "/tractor3.png"],
    category: "Tractor",
    description: "Well-maintained Mahindra 575 DI tractor available for lease. Suitable for all types of farm work including ploughing, rotavating, and transportation. Experienced operator available on request.",
    available: true,
    reviews: [
      { id: "r1", renter: "Suresh Kumar", rating: 5, comment: "Excellent tractor! Owner was very cooperative and the machine was well-maintained.", date: "2024-02-15" },
      { id: "r2", renter: "Priya Sharma", rating: 4, comment: "Good experience. Tractor worked perfectly for our wheat sowing.", date: "2024-01-28" },
      { id: "r3", renter: "Mohan Das", rating: 4, comment: "Reliable service. Will book again during harvest season.", date: "2023-12-10" },
    ],
  },
  {
    id: "t2",
    owner: "Amarjit Singh",
    mobile: "9812345678",
    upiId: "amarjit@paytm",
    bankAccount: "XXXXXXXXXXXX5678",
    ifscCode: "PNB0002345",
    model: "5050D",
    brand: "John Deere",
    numberPlate: "PB-08-CD-5678",
    year: 2022,
    hp: 50,
    rating: 4.8,
    reviewCount: 41,
    pricePerHour: 420,
    pricePerDay: 3200,
    availableTime: "5:30 AM – 6:30 PM",
    attachments: [
      { name: "Rotavator", pricePerHour: 220 },
      { name: "Plough", pricePerHour: 160 },
      { name: "Harrow", pricePerHour: 170 },
      { name: "Sprayer", pricePerHour: 200 },
    ],
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    earnings: 32400,
    location: "Amritsar, Punjab",
    image: "/tractor2.png",
    images: ["/tractor2.png", "/tractor4.png", "/tractor5.png"],
    category: "Tractor",
    description: "Premium John Deere 5050D tractor with GPS guidance and modern hydraulics. Perfect for large-scale farming operations. Air-conditioned cabin available.",
    available: true,
    reviews: [
      { id: "r4", renter: "Harbhajan Gill", rating: 5, comment: "Best tractor in the area! Very powerful and efficient.", date: "2024-03-01" },
      { id: "r5", renter: "Gurpreet Kaur", rating: 5, comment: "Amarjit bhai is very professional. Highly recommended.", date: "2024-02-20" },
    ],
  },
  {
    id: "t3",
    owner: "Venkatesh Reddy",
    mobile: "9945678901",
    upiId: "venky@gpay",
    bankAccount: "XXXXXXXXXXXX9012",
    ifscCode: "ANDH0003456",
    model: "DI 75",
    brand: "Sonalika",
    numberPlate: "AP-22-EF-9012",
    year: 2020,
    hp: 75,
    rating: 4.2,
    reviewCount: 19,
    pricePerHour: 480,
    pricePerDay: 3500,
    availableTime: "6:00 AM – 8:00 PM",
    attachments: [
      { name: "Rotavator", pricePerHour: 240 },
      { name: "Trailer", pricePerHour: 180 },
      { name: "Cultivator", pricePerHour: 190 },
    ],
    availableDays: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    earnings: 24800,
    location: "Guntur, Andhra Pradesh",
    image: "/tractor3.png",
    images: ["/tractor3.png", "/tractor6.png", "/tractor1.png"],
    category: "Tractor",
    description: "High-horsepower Sonalika DI 75 tractor ideal for deep ploughing and heavy-duty farm work. Comes with experienced driver on request.",
    available: false,
    reviews: [
      { id: "r6", renter: "Ramaiah Goud", rating: 4, comment: "Good tractor for heavy soil work. On time delivery.", date: "2024-01-15" },
      { id: "r7", renter: "Lakshmi Naidu", rating: 4, comment: "Power and performance are excellent.", date: "2023-11-22" },
    ],
  },
  {
    id: "t4",
    owner: "Dinesh Patel",
    mobile: "9823456789",
    upiId: "dinesh@phonepe",
    bankAccount: "XXXXXXXXXXXX3456",
    ifscCode: "BARB0004567",
    model: "380",
    brand: "Eicher",
    numberPlate: "GJ-05-GH-3456",
    year: 2019,
    hp: 38,
    rating: 4.3,
    reviewCount: 33,
    pricePerHour: 290,
    pricePerDay: 2200,
    availableTime: "7:00 AM – 6:00 PM",
    attachments: [
      { name: "Rotavator", pricePerHour: 180 },
      { name: "Plough", pricePerHour: 140 },
    ],
    availableDays: ["Mon", "Wed", "Fri", "Sat"],
    earnings: 15600,
    location: "Anand, Gujarat",
    image: "/tractor4.png",
    images: ["/tractor4.png", "/tractor2.png", "/tractor6.png"],
    category: "Tractor",
    description: "Compact and efficient Eicher 380 tractor, perfect for small to medium farms. Fuel-efficient with easy handling. Ideal for orchards and hilly terrain.",
    available: true,
    reviews: [
      { id: "r8", renter: "Bharat Patel", rating: 5, comment: "Very compact and easy to use. Great for our vegetable farm.", date: "2024-02-28" },
      { id: "r9", renter: "Kiran Mehta", rating: 4, comment: "Reasonable rates and good machine.", date: "2024-01-10" },
    ],
  },
  {
    id: "t5",
    owner: "Gurdial Singh",
    mobile: "9867890123",
    upiId: "gurdial@upi",
    bankAccount: "XXXXXXXXXXXX7890",
    ifscCode: "HDFC0005678",
    model: "735 FE",
    brand: "Swaraj",
    numberPlate: "HR-14-IJ-7890",
    year: 2023,
    hp: 35,
    rating: 4.6,
    reviewCount: 22,
    pricePerHour: 320,
    pricePerDay: 2400,
    availableTime: "6:30 AM – 7:30 PM",
    attachments: [
      { name: "Harrow", pricePerHour: 160 },
      { name: "Trailer", pricePerHour: 150 },
      { name: "Sprayer", pricePerHour: 190 },
    ],
    availableDays: ["Mon", "Tue", "Thu", "Fri", "Sun"],
    earnings: 20100,
    location: "Karnal, Haryana",
    image: "/tractor5.png",
    images: ["/tractor5.png", "/tractor3.png", "/tractor4.png"],
    category: "Tractor",
    description: "Brand new Swaraj 735 FE with modern features and low maintenance. Fully serviced and insured. Available with operator for an additional charge.",
    available: true,
    reviews: [
      { id: "r10", renter: "Naresh Kumar", rating: 5, comment: "New tractor with great performance. Owner is very responsive.", date: "2024-03-05" },
      { id: "r11", renter: "Sunita Devi", rating: 4, comment: "Well maintained and on time. Will recommend to others.", date: "2024-02-18" },
    ],
  },
  {
    id: "t6",
    owner: "Suryakant Jadhav",
    mobile: "9734567890",
    upiId: "surya@upi",
    bankAccount: "XXXXXXXXXXXX2345",
    ifscCode: "ICIC0006789",
    model: "MU4501 4WD",
    brand: "Kubota",
    numberPlate: "MH-04-KL-2345",
    year: 2022,
    hp: 45,
    rating: 4.7,
    reviewCount: 36,
    pricePerHour: 400,
    pricePerDay: 2900,
    availableTime: "5:00 AM – 8:00 PM",
    attachments: [
      { name: "Rotavator", pricePerHour: 210 },
      { name: "Cultivator", pricePerHour: 185 },
      { name: "Plough", pricePerHour: 155 },
      { name: "Trailer", pricePerHour: 165 },
    ],
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    earnings: 28700,
    location: "Nagpur, Maharashtra",
    image: "/tractor6.png",
    images: ["/tractor6.png", "/tractor1.png", "/tractor5.png"],
    category: "Tractor",
    description: "Japanese-engineered Kubota MU4501 4WD tractor, known for superior fuel efficiency and precision. Ideal for paddy and cotton farming. Available 7 days a week.",
    available: true,
    reviews: [
      { id: "r12", renter: "Vijay Waghmare", rating: 5, comment: "Outstanding machine! Kubota quality shows clearly. Very fuel efficient.", date: "2024-03-10" },
      { id: "r13", renter: "Meena Bai", rating: 5, comment: "Suryakant bhai is very helpful. Will book again.", date: "2024-02-25" },
      { id: "r14", renter: "Ashok Shinde", rating: 4, comment: "Excellent 4WD traction in our wet fields.", date: "2024-02-01" },
    ],
  },
];

export interface Booking {
  id: string;
  tractorId: string;
  tractorModel: string;
  tractorBrand: string;
  ownerName: string;
  ownerMobile: string;
  renterName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  durationType: "hours" | "days";
  attachments: string[];
  baseRent: number;
  attachmentTotal: number;
  platformFee: number;
  gst: number;
  grandTotal: number;
  status: "paid" | "pending" | "cancelled";
  paymentId: string;
  bookedAt: string;
  location: string;
  image: string;
}

export const mockBookings: Booking[] = [
  {
    id: "TL2024001",
    tractorId: "t1",
    tractorModel: "575 DI",
    tractorBrand: "Mahindra",
    ownerName: "Rajesh Patil",
    ownerMobile: "9876543210",
    renterName: "Suresh Kumar",
    startDate: "2024-04-10",
    endDate: "2024-04-10",
    startTime: "8:00 AM",
    endTime: "4:00 PM",
    duration: 8,
    durationType: "hours",
    attachments: ["Rotavator"],
    baseRent: 2800,
    attachmentTotal: 1600,
    platformFee: 220,
    gst: 792,
    grandTotal: 5412,
    status: "paid",
    paymentId: "pay_RZP12345",
    bookedAt: "2024-04-08",
    location: "Pune, Maharashtra",
    image: "/tractor1.png",
  },
  {
    id: "TL2024002",
    tractorId: "t2",
    tractorModel: "5050D",
    tractorBrand: "John Deere",
    ownerName: "Amarjit Singh",
    ownerMobile: "9812345678",
    renterName: "Suresh Kumar",
    startDate: "2024-04-20",
    endDate: "2024-04-21",
    startTime: "6:00 AM",
    endTime: "6:00 PM",
    duration: 2,
    durationType: "days",
    attachments: ["Plough", "Harrow"],
    baseRent: 6400,
    attachmentTotal: 2640,
    platformFee: 452,
    gst: 1625,
    grandTotal: 11117,
    status: "pending",
    paymentId: "pay_PENDING",
    bookedAt: "2024-04-18",
    location: "Amritsar, Punjab",
    image: "/tractor2.png",
  },
  {
    id: "TL2024003",
    tractorId: "t4",
    tractorModel: "380",
    tractorBrand: "Eicher",
    ownerName: "Dinesh Patel",
    ownerMobile: "9823456789",
    renterName: "Suresh Kumar",
    startDate: "2024-03-05",
    endDate: "2024-03-05",
    startTime: "9:00 AM",
    endTime: "3:00 PM",
    duration: 6,
    durationType: "hours",
    attachments: [],
    baseRent: 1740,
    attachmentTotal: 0,
    platformFee: 87,
    gst: 313,
    grandTotal: 2140,
    status: "cancelled",
    paymentId: "pay_CANCELLED",
    bookedAt: "2024-03-01",
    location: "Anand, Gujarat",
    image: "/tractor4.png",
  },
];

export const ownerBookingRequests = [
  {
    id: "REQ001",
    renterName: "Arjun Sharma",
    renterMobile: "9988776655",
    tractorModel: "575 DI",
    startDate: "2024-04-15",
    endDate: "2024-04-15",
    duration: "6 hours",
    attachments: ["Rotavator", "Trolley"],
    amount: 4200,
    status: "pending" as const,
  },
  {
    id: "REQ002",
    renterName: "Meena Kumari",
    renterMobile: "9876123456",
    tractorModel: "575 DI",
    startDate: "2024-04-18",
    endDate: "2024-04-19",
    duration: "2 days",
    attachments: ["Cultivator"],
    amount: 6280,
    status: "accepted" as const,
  },
  {
    id: "REQ003",
    renterName: "Ratan Yadav",
    renterMobile: "9123456789",
    tractorModel: "575 DI",
    startDate: "2024-04-22",
    endDate: "2024-04-22",
    duration: "4 hours",
    attachments: [],
    amount: 1880,
    status: "pending" as const,
  },
];

export const testimonials = [
  {
    id: "tm1",
    name: "Suresh Kumar",
    location: "Pune, Maharashtra",
    rating: 5,
    comment: "TractorLease made it so easy to find a tractor at the right time. Saved me from buying one! The booking process is seamless and payment is instant.",
    avatar: "SK",
  },
  {
    id: "tm2",
    name: "Gurpreet Singh",
    location: "Ludhiana, Punjab",
    rating: 5,
    comment: "Listed my tractor and started earning within the first week. This platform is a game changer for tractor owners. Got 12 bookings in the first month!",
    avatar: "GS",
  },
  {
    id: "tm3",
    name: "Lakshmi Devi",
    location: "Guntur, Andhra Pradesh",
    rating: 4,
    comment: "As a small farmer, I couldn't afford my own tractor. TractorLease solved that problem completely. The price calculator is very transparent.",
    avatar: "LD",
  },
];
