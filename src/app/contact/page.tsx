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

  return (
    <>
      <form name="contact" method="POST" data-netlify="true" hidden>
        <input type="hidden" name="form-name" value="contact" />
        <input type="text" name="fullName" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <select name="subject">
          <option value="school-counselling">School Counselling</option>
          <option value="college-admissions">College Admissions</option>
          <option value="study-abroad">Study Abroad Program</option>
          <option value="psychometric-testing">Psychometric Testing</option>
          <option value="general">General Inquiry</option>
        </select>
        <textarea name="message" />
      </form>
      <ContactClient settings={settings} />
    </>
  )
}
