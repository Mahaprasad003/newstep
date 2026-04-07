'use client'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeading from '@/components/ui/SectionHeading'

const philosophyCards = [
  {
    sanskrit:          'Bhagavad Gita · भगवद गीता',
    title:             'Inspired from the Gita’s wisdom',
    description:       "Align with individual's inherent nature drawing from the Bhagvad Gita's teaching of Gunas (Sattva, Rajas, Tamas).",
    accentClass:       'bg-brand-blue',
    sanskritColorClass:'text-brand-blue',
  },
    {
    sanskrit:          'Panchakosha · पञ्चकोश',
    title:             'Modernisation of Upanishadic wisdom',
    description:       'Modern career counselling nurtures holistic growth - aligning body, energy, mind, intellect and inner purpose, as taught by the Panchakosha system of the Upanishads.',
    accentClass:       'bg-brand-navy',
    sanskritColorClass:'text-brand-navy',
  },
  {
    sanskrit:          'Charaka Samhita · चरक संहिता',
    title:             'Test before you guide',
    description:       'Like Charaka\'s student evaluation, our psychometric testing comes first — every recommendation follows from evidence.',
    accentClass:       'bg-brand-green',
    sanskritColorClass:'text-brand-green',
  },
  {
    sanskrit:          'Ātmajñāna · आत्मज्ञान',
    title:             'Self knowledge',
    description:       'Newstep empowers confident, future-ready decisions through a multi-dimensional assessment of personality, interests, emotional intelligence, learning style, motivation, skills, and abilities.',
    accentClass:       'bg-[#C4922A]',
    sanskritColorClass:'text-[#C4922A]',
  },
]

export default function PhilosophySection({
  heading = "5,000 years of Indian wisdom, applied to your child's future.",
  body = "Long before modern career counselling existed, our ancient teachers understood something profound — that every human being is a layered, complex whole. Charaka, the father of Ayurveda, evaluated his students not by a single test but by observing their temperament, intellect, and values before deciding how to teach them. The Panchakosha system of the Upanishads taught us that a person is five sheaths deep — physical, energetic, mental, intellectual, and spiritual — and that decisions made without understanding all five layers are incomplete. We have built our entire counselling methodology on these foundations. At Newstep Careers, we don't hand you a brochure of colleges. We first understand who your child truly is — then we find where they belong.",
}: {
  heading?: string
  body?: string
}) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Text block ── */}
        <AnimatedSection>
          <SectionHeading
            title="Our Philosophy"
            align="center"
          />
          <h2 className="font-heading font-semibold text-3xl md:text-4xl text-neutral-900 leading-tight mb-6 text-center mx-auto max-w-2xl">
            {heading}
          </h2>
          <p className="font-body text-base leading-relaxed text-neutral-600 max-w-3xl mb-14 text-center mx-auto">
            {body}
          </p>
        </AnimatedSection>

        {/* ── 4-card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {philosophyCards.map((card, i) => (
            <AnimatedSection key={card.sanskrit} delay={i * 0.1}>
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 relative overflow-hidden h-full">
                {/* Coloured top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] ${card.accentClass}`} />
                {/* Sanskrit label */}
                <p className={`text-xs font-medium tracking-wider italic mb-3 ${card.sanskritColorClass}`}>
                  {card.sanskrit}
                </p>
                {/* English title */}
                <p className="font-heading font-semibold text-base text-neutral-900 mb-3 leading-snug">
                  {card.title}
                </p>
                {/* Description */}
                <p className="font-body text-sm leading-relaxed text-neutral-500">
                  {card.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}
