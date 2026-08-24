export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Gaming", href: "#gaming" },
  { label: "Menu", href: "#menu" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
];

export const FLOATING_TAGS = ["24/7 VIBES", "HIGH-END PCs", "CRAFT COFFEE", "FRESH FOOD"];

export const STATS = [
  { value: 50, suffix: "+", label: "Gaming Stations" },
  { value: 240, suffix: "Hz", label: "Peak Refresh Rate" },
  { value: 10000, suffix: "+", label: "Games Played" },
  { value: 0, suffix: "∞", label: "Good Times", isInfinity: true },
];

export const GAMING_STATIONS = [
  {
    id: "pc",
    name: "PRO GAMING PC",
    category: "PC GAMING",
    specs: ["RTX 4070", "240Hz Display", "Mechanical Keyboard", "Premium Headset"],
    price: 149,
    available: true,
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "ps5",
    name: "PLAYSTATION SUITE",
    category: "PLAYSTATION",
    specs: ["PS5 Pro", "4K HDR OLED", "DualSense Edge", "Surround Audio"],
    price: 129,
    available: true,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "xbox",
    name: "XBOX ARENA",
    category: "XBOX",
    specs: ["Series X", "120fps Support", "Elite Controller", "Dolby Atmos"],
    price: 129,
    available: false,
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "racing",
    name: "RACING SIMULATOR",
    category: "RACING SIM",
    specs: ["Direct-Drive Wheel", "Triple Monitor", "Motion Rig", "Full Pedal Set"],
    price: 249,
    available: true,
    image: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "vip",
    name: "VIP GAME ROOM",
    category: "VIP ROOM",
    specs: ["Private Suite", "4x PCs", "Personal Server", "Dedicated Host"],
    price: 899,
    available: true,
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "console",
    name: "CONSOLE ZONE",
    category: "CONSOLE ZONE",
    specs: ["Switch OLED", "Retro Cabinet", "4-Player Couch", "Party Mode"],
    price: 99,
    available: true,
    image: "https://images.unsplash.com/photo-1583225214464-9296029427aa?q=80&w=1200&auto=format&fit=crop",
  },
];

export const MENU_CATEGORIES = ["COFFEE", "STARTERS", "BURGERS", "PIZZA", "PASTA", "MOCKTAILS", "DESSERTS"];

export const MENU_ITEMS = [
  { name: "Signature Cortado", category: "COFFEE", price: 149, desc: "Double ristretto shot cut with warm steamed milk, served in glass.", tags: ["Bestseller"], veg: true, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop" },
  { name: "Iced Affogato", category: "COFFEE", price: 189, desc: "Vanilla bean gelato drowned in a fresh double espresso shot.", tags: ["Chef's Pick"], veg: true, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop" },
  { name: "Truffle Fries", category: "STARTERS", price: 219, desc: "Hand-cut fries tossed in truffle oil, parmesan and rosemary salt.", tags: ["Bestseller"], veg: true, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop" },
  { name: "Korean Fire Wings", category: "STARTERS", price: 289, desc: "Crispy wings glazed in gochujang caramel, sesame and spring onion.", tags: ["Spicy"], veg: false, image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=800&auto=format&fit=crop" },
  { name: "Signature Smash Burger", category: "BURGERS", price: 299, desc: "Smoky grilled patty, caramelized onions, house sauce and crispy fries.", tags: ["Bestseller"], veg: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" },
  { name: "Halloumi Stack Burger", category: "BURGERS", price: 279, desc: "Grilled halloumi, roasted peppers, rocket and chipotle mayo.", tags: ["Chef's Pick"], veg: true, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop" },
  { name: "Late Night Pepperoni", category: "PIZZA", price: 349, desc: "Wood-fired sourdough base, double pepperoni, hot honey drizzle.", tags: ["Bestseller", "Spicy"], veg: false, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop" },
  { name: "Wild Mushroom Pizza", category: "PIZZA", price: 329, desc: "Truffle cream base, wild mushrooms, taleggio and thyme.", tags: ["Chef's Pick"], veg: true, image: "https://images.unsplash.com/photo-1548365328-9f547fb0953b?q=80&w=800&auto=format&fit=crop" },
  { name: "Smoky Arrabbiata", category: "PASTA", price: 289, desc: "Fresh penne, charred tomato, chilli, garlic confit and basil oil.", tags: ["Spicy"], veg: true, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=800&auto=format&fit=crop" },
  { name: "Cloud Blue Mocktail", category: "MOCKTAILS", price: 219, desc: "Butterfly pea, lychee, mint and soda over hand-cut ice.", tags: ["Bestseller"], veg: true, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800&auto=format&fit=crop" },
  { name: "Spiced Guava Fizz", category: "MOCKTAILS", price: 199, desc: "Muddled guava, chilli salt rim, fresh lime and ginger ale.", tags: ["Spicy"], veg: true, image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop" },
  { name: "Molten Choco Lava", category: "DESSERTS", price: 229, desc: "Warm dark chocolate cake, oozing centre, vanilla bean gelato.", tags: ["Bestseller"], veg: true, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800&auto=format&fit=crop" },
];

export const COMBOS = [
  { id: "duo", name: "DUO NIGHT", items: ["2 Hours Gaming", "2 Signature Burgers", "2 Craft Drinks"], price: 699, popular: false },
  { id: "squad", name: "SQUAD MODE", items: ["4 Hours Gaming", "4 Loaded Snacks", "4 Craft Drinks"], price: 1299, popular: true },
  { id: "owl", name: "NIGHT OWL", items: ["Late Night Gaming", "Signature Pizza", "Bottomless Coffee"], price: 999, popular: false },
];

export const MEMBERSHIPS = [
  { tier: "STARTER", price: 499, perks: ["10% Gaming Discount", "5% Food Discount", "Standard Booking", "Member Newsletter"] },
  { tier: "PRO", price: 999, perks: ["20% Gaming Discount", "10% Food Discount", "Priority Booking", "Tournament Access"], featured: true },
  { tier: "ELITE", price: 1799, perks: ["35% Gaming Discount", "20% Food Discount", "VIP Room Priority", "Free Birthday Suite", "Member-Only Events"] },
];

export const EVENTS = [
  { day: "SAT", date: "28 AUG", name: "VALORANT NIGHT", entry: 499, prize: "10,000", players: "32 Players", game: "Valorant" },
  { day: "SUN", date: "29 AUG", name: "FC 26 TOURNAMENT", entry: 349, prize: "6,000", players: "24 Players", game: "FC 26" },
  { day: "FRI", date: "04 SEP", name: "BGMI SQUAD NIGHT", entry: 599, prize: "15,000", players: "40 Players", game: "BGMI" },
  { day: "SAT", date: "05 SEP", name: "TEKKEN BATTLE", entry: 299, prize: "5,000", players: "16 Players", game: "Tekken 8" },
];

export const NEXT_EVENT_DATE = new Date();
NEXT_EVENT_DATE.setDate(NEXT_EVENT_DATE.getDate() + 2);
NEXT_EVENT_DATE.setHours(NEXT_EVENT_DATE.getHours() + 6);

export const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop", caption: "FRIDAY NIGHT", tag: "COMMUNITY • GAMING", size: "tall" },
  { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=900&auto=format&fit=crop", caption: "MORNING BREW", tag: "CAFÉ", size: "small" },
  { src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=900&auto=format&fit=crop", caption: "SQUAD UP", tag: "GAMING", size: "small" },
  { src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop", caption: "TOURNAMENT FINALS", tag: "EVENTS", size: "wide" },
  { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=900&auto=format&fit=crop", caption: "PLATED FRESH", tag: "FOOD", size: "small" },
  { src: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1200&auto=format&fit=crop", caption: "NIGHT ATMOSPHERE", tag: "INTERIOR", size: "tall" },
  { src: "https://images.unsplash.com/photo-1586182987320-4f17e36a0170?q=80&w=900&auto=format&fit=crop", caption: "RGB SETUP", tag: "GAMING", size: "small" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop", caption: "GOLDEN HOUR", tag: "INTERIOR", size: "wide" },
];

export const COMMUNITY_TAGS = ["GAMERS", "FOOD LOVERS", "CREATORS", "STUDENTS", "FRIENDS", "COMPETITORS", "NIGHT OWLS", "SQUAD LEADERS"];

export const TESTIMONIALS = [
  { name: "Rahul Mehta", type: "Gaming Night", rating: 5, quote: "The gaming setup is unreal, but the food genuinely surprised us more. Didn't expect a smash burger this good at a gaming café." },
  { name: "Ananya Rao", type: "Café Regular", rating: 5, quote: "I come for the cortado and stay for the vibe. It's the only place in town that doesn't feel like a template gaming zone." },
  { name: "Karan Sethi", type: "Tournament Player", rating: 5, quote: "Played the Valorant night here — 240Hz monitors, zero input lag, and the crowd energy was straight up nightlife-level." },
  { name: "Ishita Verma", type: "Squad Booking", rating: 4, quote: "Booked the VIP room for six of us. Private server, our own host, pizza on the table. We stayed till 2am." },
  { name: "Dev Malhotra", type: "First Timer", rating: 5, quote: "Walked in for coffee, left three hours later having played racing sim twice. This place is dangerously good." },
];

export const SOCIAL_POSTS = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586182987320-4f17e36a0170?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop",
];

export const HOURS = [
  { days: "MON — THU", time: "11:00 AM — 11:00 PM" },
  { days: "FRI — SUN", time: "11:00 AM — 1:00 AM" },
];