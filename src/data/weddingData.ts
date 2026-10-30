import imageOne from './IMG_1494.jpeg'
import imageTwo from './IMG_1691.jpeg'
import imageThree from './Snapchat-268013077.jpg'

export type WeddingEvent = {
  id: string
  title: string
  eyebrow: string
  date: string
  time: string
  venue: string
  address: string
  description: string
  dressCode: string
  locationLink?: string
}

export type CoupleImage = {
  src: string
  alt: string
  position?: string
}

export type FamilySide = { role: string; name: string; lines: string[] }

export const weddingData = {
  couple: { groom: 'Piyush', bride: 'Shreya', full: 'Shreya & Piyush' },
  monogram: { bride: 'S', groom: 'P' },
  dateISO: '2026-12-11T19:00:00+05:30',
  dateLabel: '11 December 2026',
  city: 'Pitampura, Delhi',
  families: 'Together with their families',
  hashtag: '#ShreyaWedsPiyush',
  blessing: 'By the grace of God and with the blessings of their elders, two hearts begin their journey of forever.',
  invitation: 'to join them as they celebrate love, laughter, and a lifetime together.',
  lineage: [
    { role: 'The Bride', name: 'Shreya', lines: ['Granddaughter of Mrs. Vinay Grover and Late Shri Harish Grover', 'Daughter of Mrs. Bhanu Grover and Mr. Amit Grover'] },
    { role: 'The Groom', name: 'Piyush', lines: ['Grandson of Mrs. Kiran Devi and Late Thakur Jagdish Prasad Verma', 'Son of Mrs. Rekha Verma and Mr. Rakesh Verma'] },
  ] as FamilySide[],
  locationLink: 'https://www.google.com/maps/dir/?api=1&destination=Golden+Apple+Mansion+Road+No+43+Pitampura+Delhi+110034',
  contactLink: 'tel:+919650017141',
  mapEmbedUrl: 'https://www.google.com/maps?q=Golden%20Apple%20Mansion%20Road%20No%2043%20Pitampura%20Delhi%20110034&output=embed',
  events: [
    { id: 'engagement', title: 'Engagement', eyebrow: 'The beginning of forever', date: '7th December 2026', time: '5:00 PM onwards', venue: 'Utsav Sadan', address: 'Kingsway Camp, Delhi', description: 'Join us as we celebrate the promise of a beautiful life together.', dressCode: 'Festive / formal', locationLink: 'https://maps.app.goo.gl/y3T3uKEx9L4Dj4pX6' },
    { id: 'mehendi', title: 'Mehendi', eyebrow: 'A little colour, a lot of joy', date: '10th December 2026', time: '7:00 PM onwards', venue: 'Hotel Ornate Inn', address: 'Community Center, Plot No. 06, Adjoining JIMS College, Sector 3, Rohini, Delhi 110085', description: 'An evening of henna, marigolds, music and easy laughter with our favourite people.', dressCode: 'Festive florals', locationLink: 'https://www.google.com/maps/search/?api=1&query=Hotel+Ornate+Inn+Sector+3+Rohini+Delhi+110085' },
    { id: 'wedding', title: 'Wedding', eyebrow: 'Two hearts, one forever', date: '11th December 2026', time: '7:00 PM onwards', venue: 'Golden Apple Mansion', address: 'Road No. 43, Near Hotel LA, Pitampura, Delhi 110034', description: 'The pheras, the vows and the celebration of a lifetime — we would love for you to be there.', dressCode: 'Traditional finery', locationLink: 'https://maps.app.goo.gl/vgS2ECLfFJZhjhKm7' },
  ] as WeddingEvent[],
  coupleImages: [
    { src: imageOne, alt: 'Couple photo 1', position: 'center 28%' },
    { src: imageTwo, alt: 'Couple photo 2', position: 'center 20%' },
    { src: imageThree, alt: 'Couple photo 3', position: 'center 32%' },
  ] as CoupleImage[],
  thingsToKnow: [
    { title: 'Contact', body: '7428027321 · 9582503161', link: 'tel:7428027321'},
    { title: 'A gentle reminder', body: 'Please arrive 30 minutes before each celebration. Come comfortable, come festive, come ready to celebrate.' },
  ],
}
