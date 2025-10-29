// assets/js/config/settings.js
const TALENT_DATA = [
  {
    id: 1,
    name: "Jennifer Aniston",
    image: "https://res.cloudinary.com/deojrtlep/image/upload/v1759161967/512px-JenniferAnistonHWoFFeb2012_fpoazc.jpg",
    category: "acting",
    bio: "Academy Award-nominated actress known for her iconic role in Friends and versatile film career spanning decades.",
    featured: true,
    stats: { projects: 67, awards: 23, experience: "30+ years" },
    specialties: ["Television", "Film", "Comedy", "Drama"],
    availability: "Available",
    rate: "Premium"
  },
  {
    id: 2,
    name: "Selena Gomez",
    image: "https://res.cloudinary.com/deojrtlep/image/upload/v1759161967/512px-Selena_Gomez_at_the_2024_Toronto_International_Film_Festival_10__cropped_uek36y.jpg",
    category: "music",
    bio: "Multi-platinum recording artist, actress, and producer with global influence across music, television, and film.",
    featured: true,
    stats: { projects: 45, awards: 18, experience: "15+ years" },
    specialties: ["Music", "Acting", "Production", "Brand Partnerships"],
    availability: "Available",
    rate: "Premium"
  },
  {
    id: 3,
    name: "Olivia Rodrigo",
    image: "https://res.cloudinary.com/deojrtlep/image/upload/v1759161967/olivia-rodrigo-attends-the-2023-mtv-video-music-awards-at-news-photo-1755688933_z6b6px.jpg",
    category: "music",
    bio: "Grammy-winning singer-songwriter and actress with record-breaking album sales and critical acclaim.",
    featured: true,
    stats: { projects: 22, awards: 12, experience: "6+ years" },
    specialties: ["Music", "Songwriting", "Acting", "Youth Marketing"],
    availability: "Available",
    rate: "Premium"
  },
  {
    id: 4,
    name: "Paul Rudd",
    image: "https://res.cloudinary.com/deojrtlep/image/upload/v1759161967/paul-rudd-clips_21522_j9gk9k.jpg",
    category: "acting",
    bio: "Beloved actor known for Marvel's Ant-Man and decades of acclaimed comedic and dramatic performances.",
    featured: true,
    stats: { projects: 89, awards: 15, experience: "30+ years" },
    specialties: ["Film", "Comedy", "Action", "Voice Acting"],
    availability: "Available",
    rate: "Premium"
  },
  {
    id: 5,
    name: "Jason Bateman",
    image: "https://res.cloudinary.com/deojrtlep/image/upload/v1759161968/512px-Jason_Batement_at_the_Air_Premiere__cropped_xzx907.jpg",
    category: "acting",
    bio: "Emmy-winning actor and director known for Ozark and extensive work in television and film.",
    featured: false,
    stats: { projects: 76, awards: 9, experience: "35+ years" },
    specialties: ["Television", "Film", "Directing", "Drama"],
    availability: "Available",
    rate: "Premium"
  },
  {
    id: 6,
    name: "Gwyneth Paltrow",
    image: "https://res.cloudinary.com/deojrtlep/image/upload/v1759161968/512px-GwynethPaltrowByAndreaRaffin2011_op3lgm.jpg",
    category: "lifestyle",
    bio: "Academy Award-winning actress and founder of Goop, revolutionizing wellness and lifestyle branding.",
    featured: true,
    stats: { projects: 52, awards: 28, experience: "30+ years" },
    specialties: ["Lifestyle", "Wellness", "Branding", "Acting"],
    availability: "Available",
    rate: "Premium"
  },
  {
    id: 7,
    name: "Mark Ruffalo",
    image: "https://res.cloudinary.com/deojrtlep/image/upload/v1759161974/512px-Mark_Ruffalo__36201774756___cropped_o1bkbg.jpg",
    category: "acting",
    bio: "Academy Award-nominated actor and environmental activist known for Marvel's Hulk and dramatic roles.",
    featured: false,
    stats: { projects: 71, awards: 17, experience: "25+ years" },
    specialties: ["Film", "Activism", "Drama", "Action"],
    availability: "Available",
    rate: "Premium"
  },
  {
    id: 8,
    name: "Billy Crudup",
    image: "https://res.cloudinary.com/deojrtlep/image/upload/v1759161974/512px-Billy_Crudup_2015_1b_f6gd3i.jpg",
    category: "acting",
    bio: "Tony Award-winning stage and screen actor with extensive credits in film, television, and theater.",
    featured: false,
    stats: { projects: 48, awards: 8, experience: "25+ years" },
    specialties: ["Theater", "Film", "Television", "Drama"],
    availability: "Available",
    rate: "Premium"
  },
  {
    id: 9,
    name: "Laura Linney",
    image: "https://res.cloudinary.com/deojrtlep/image/upload/v1759161995/512px-Laura_Linney_Berlinale_2017_snuwhk.jpg",
    category: "acting",
    bio: "Four-time Emmy Award and Golden Globe-winning actress with acclaimed stage and screen career.",
    featured: true,
    stats: { projects: 65, awards: 24, experience: "30+ years" },
    specialties: ["Television", "Film", "Theater", "Drama"],
    availability: "Available",
    rate: "Premium"
  },
  {
    id: 10,
    name: "H.E.R.",
    image: "https://res.cloudinary.com/deojrtlep/image/upload/v1759161997/1465495-2048x2960-phone-hd-her-background-image_qifi0m.jpg",
    category: "music",
    bio: "Grammy Award-winning singer, songwriter, and multi-instrumentalist known for R&B and soul innovation.",
    featured: false,
    stats: { projects: 35, awards: 14, experience: "10+ years" },
    specialties: ["Music", "Songwriting", "Production", "Live Performance"],
    availability: "Available",
    rate: "Premium"
  },
  {
    id: 11,
    name: "Kathryn Hahn",
    image: "https://res.cloudinary.com/deojrtlep/image/upload/v1759162106/512px-Kathryn_Hahn_Agatha_All_Along_Premiere_01_oskgmq.png",
    category: "acting",
    bio: "Versatile actress known for comedic and dramatic roles across television, film, and streaming.",
    featured: false,
    stats: { projects: 52, awards: 6, experience: "20+ years" },
    specialties: ["Comedy", "Drama", "Television", "Streaming"],
    availability: "Available",
    rate: "Premium"
  },
  {
    id: 12,
    name: "Emily Mortimer",
    image: "https://res.cloudinary.com/deojrtlep/image/upload/v1759162106/512px-Premios_Goya_2018_-_Emily_Mortimer__cropped___cropped_dehkfh.jpg",
    category: "acting",
    bio: "British-American actress, screenwriter, and producer with extensive transatlantic career.",
    featured: false,
    stats: { projects: 44, awards: 5, experience: "25+ years" },
    specialties: ["Film", "Television", "Writing", "Production"],
    availability: "Available",
    rate: "Premium"
  }
];

