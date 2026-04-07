import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/tina'
import ContactClient from '@/components/contact/ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Book a free career counselling session. Get in touch with Newstep Careers today.',
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return <ContactClient settings={settings} />
}
