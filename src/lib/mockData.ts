export type BlogPost = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  thumbnail: string
  content?: string
}

const dummyHTML = `
  <p>Making career decisions can be an incredibly daunting task, especially when you are standing at the crossroads of your academic journey. This comprehensive guide will help you unpack the noise and focus on what truly matters.</p>
  
  <h2 id="understanding-your-strengths">Understanding Your Core Strengths</h2>
  <p>The first step in any major academic decision is to objectively evaluate what you are naturally good at. We utilize proprietary psychometric analysis engines to break down your logical, linguistic, and spatial capabilities. It's not just about marks—it's about how your brain naturally processes complex information.</p>
  <ul>
    <li>Identify subjects where you lose track of time</li>
    <li>Distinguish between hobbies and sustainable career skills</li>
    <li>Consult industry professionals</li>
  </ul>

  <h2 id="evaluating-market-trends">Evaluating Market Trends</h2>
  <p>Beyond personal interest, one must pragmatically look at the economic landscape. The world is pivoting rapidly towards automation, AI, and sustainable energy. However, traditional roles in finance, law, and medicine are simultaneously evolving, requiring hybrid skill sets.</p>
  <blockquote>"Passion without pragmatism leads to frustration. Always map your interests to emerging economic demands." — Lead Counsellor</blockquote>

  <h2 id="building-a-long-term-roadmap">Building a Long-Term Roadmap</h2>
  <p>Don't just choose a stream; envision a 10-year trajectory. If you pick Commerce today, are you aiming for a CPA, or are you looking to dive into quantitative finance? These downstream choices dictate your immediate academic priorities.</p>
  <p>Through our exclusive one-on-one sessions, we help families construct these exact roadmaps—ensuring that students enter their classrooms with overwhelming clarity and deeply rooted motivation.</p>
`

export const allPosts: BlogPost[] = [
  {
    slug: 'how-to-choose-the-right-stream',
    title: 'How to Choose the Right Stream After Class 10',
    date: '2025-03-15',
    category: 'School Counselling',
    excerpt: 'The choice between Science, Commerce and Arts is one of the most important decisions you will make. Here is how to navigate it.',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    content: dummyHTML,
  },
  {
    slug: 'aces-the-college-interview',
    title: 'Top 10 Tips to Ace Your College Admission Interview',
    date: '2025-02-28',
    category: 'College Admissions',
    excerpt: 'Interviews can be daunting, but with the right preparation and mindset, you can present your best self to any college board.',
    thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    content: dummyHTML,
  },
  {
    slug: 'career-assessments-importance',
    title: 'Why Psychometric Career Assessments Matter',
    date: '2025-02-10',
    category: 'Career Assessments',
    excerpt: 'Uncover how scientifically validated psychometric tests can reveal your hidden strengths and drastically align your career path.',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    content: dummyHTML,
  },
  {
    slug: 'resume-building-for-freshers',
    title: 'Resume Building: A Compelling Narrative for Freshers',
    date: '2025-01-22',
    category: 'Resume & LinkedIn',
    excerpt: 'A clean structured summary of your academic achievements can stand out heavily if structured with correct priority.',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    content: dummyHTML,
  },
  {
    slug: 'navigating-study-abroad',
    title: 'Navigating Universities Abroad: The Early Steps',
    date: '2025-01-05',
    category: 'Study Abroad',
    excerpt: 'Begin your global education journey by narrowing down locations, tuitions, and standard language prerequisites early on.',
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    content: dummyHTML,
  },
  {
    slug: 'handling-interview-anxiety',
    title: 'Conquering Interview Anxiety Like a Professional',
    date: '2024-12-14',
    category: 'Interview Tips',
    excerpt: 'Anxiety is natural before a big jump. We map out scientifically backed strategies to regulate emotional spikes during panels.',
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    content: dummyHTML,
  },
  {
    slug: 'school-counselling-parents',
    title: 'How Parents Can Support Career Exploration',
    date: '2024-12-01',
    category: 'School Counselling',
    excerpt: 'Career choices should be a family conversation, not a family requirement. Navigate conversations about futures with empathy.',
    thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800',
    content: dummyHTML,
  }
]

export type GalleryImage = {
  id: string
  src: string
  alt: string
  category: string
  aspectRatio: 'portrait' | 'landscape' | 'square'
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1523580494112-071d384e2047?auto=format&fit=crop&q=80&w=1200',
    alt: 'Counselling Seminar 2024',
    category: 'Events',
    aspectRatio: 'landscape'
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    alt: 'Student Group Discussion',
    category: 'Workshops',
    aspectRatio: 'portrait'
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200',
    alt: 'Interactive Career Fair',
    category: 'Events',
    aspectRatio: 'landscape'
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
    alt: 'One-on-One Psychometric Analysis',
    category: 'Workshops',
    aspectRatio: 'portrait'
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000',
    alt: 'Graduation Ceremony Highlights',
    category: 'Achievements',
    aspectRatio: 'landscape'
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    alt: 'Parent-Teacher Career Sync',
    category: 'Events',
    aspectRatio: 'square'
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    alt: 'Aptitude Test Workshop',
    category: 'Workshops',
    aspectRatio: 'portrait'
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
    alt: 'Ivy League Admissions Seminar',
    category: 'Events',
    aspectRatio: 'landscape'
  }
]
