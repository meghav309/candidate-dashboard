// src/utils/api.js
// Axios instance + API fetch functions for the Candidate Management Dashboard

import axios from "axios";

// ---------------------------------------------------------------------------
// Axios instance — add auth headers / interceptors here as needed
// ---------------------------------------------------------------------------
const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------------------------------------
// Helper maps — used to deterministically assign realistic values to API users
// ---------------------------------------------------------------------------

const COLLEGES = [
  "IIT Delhi",
  "IIT Bombay",
  "NIT Trichy",
  "BITS Pilani",
  "VIT Vellore",
  "IIIT Hyderabad",
  "Jadavpur University",
  "DTU Delhi",
  "Amity University",
  "Manipal Institute of Technology",
];

const SKILLS_POOL = [
  ["React", "JavaScript", "Tailwind CSS", "Git"],
  ["Python", "Django", "REST APIs", "PostgreSQL"],
  ["Java", "Spring Boot", "Microservices", "Docker"],
  ["Angular", "TypeScript", "RxJS", "Jest"],
  ["Node.js", "Express", "MongoDB", "Redis"],
  ["Vue.js", "Nuxt.js", "SCSS", "Figma"],
  ["Go", "gRPC", "Kafka", "PostgreSQL"],
  ["Flutter", "Dart", "Firebase", "UI/UX Design"],
  ["Data Science", "Python", "Pandas", "Tableau"],
  ["DevOps", "Kubernetes", "Terraform", "AWS"],
];

const STATUSES = ["Applied", "Interviewing", "Selected", "Rejected"];

const BIOS = [
  "Passionate developer with a strong foundation in modern web technologies and a love for clean, maintainable code.",
  "Backend engineer focused on building scalable APIs and distributed systems with a microservices-first mindset.",
  "Full-stack developer who enjoys bridging design and engineering. Open-source contributor in spare time.",
  "Data-driven engineer with expertise in building real-time analytics pipelines and visualisation dashboards.",
  "Cloud-native developer specializing in containerisation, CI/CD, and infrastructure-as-code practices.",
  "Mobile-first developer with experience shipping cross-platform apps to both the App Store and Google Play.",
  "Frontend specialist with a designer's eye for pixel-perfect UIs and a knack for smooth micro-animations.",
  "DevOps engineer passionate about automating everything and maintaining high-availability production systems.",
  "ML engineer with hands-on experience training and deploying NLP models in production environments.",
  "Recent graduate with strong computer science fundamentals, eager to grow in a collaborative engineering team.",
];

// ---------------------------------------------------------------------------
// fetchCandidatesFromAPI
// Fetches 10 users from dummyjson and maps them to the candidate object shape
// ---------------------------------------------------------------------------

/**
 * Fetches 10 candidates from the DummyJSON API and normalises the response
 * into the app's candidate object shape.
 *
 * @returns {Promise<Array>} Array of candidate objects
 */
export async function fetchCandidatesFromAPI() {
  const response = await axiosInstance.get("/users?limit=10");
  const users = response.data.users;

  const candidates = users.map((user, index) => {
    // Deterministic but varied assignments based on user index
    const college = COLLEGES[index % COLLEGES.length];
    const skills = SKILLS_POOL[index % SKILLS_POOL.length];
    const status = STATUSES[index % STATUSES.length];
    const bio = BIOS[index % BIOS.length];

    // Build a plausible appliedDate within the last 60 days
    const daysAgo = (index + 1) * 5; // 5, 10, 15 … 50 days ago
    const appliedDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      college,
      location: `${user.address?.city ?? "Unknown"}, ${user.address?.state ?? ""}`.trim(),
      experience: Math.floor(user.age / 10) - 1, // derive 0-5 yrs from age
      skills,
      status,
      appliedDate,
      bio,
    };
  });

  return candidates;
}

export default axiosInstance;
