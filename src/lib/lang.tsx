import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const en = {
  gate: { tap: 'Tap to open' },
  hero: { invite: 'You are cordially invited to the wedding of', weds: 'weds', scroll: 'Scroll' },
  invite: {
    eyebrow: 'With the blessings of the Almighty',
    // hosts: ['Mrs. Bhanu Grover', 'Mr. Amit Grover'],
    and: '&',
    request: 'We request the honour of your presence at the wedding of',
    with: 'with',
    closing: 'Your presence and blessings will make our celebration complete.',
    bride: 'Shreya',
    groom: 'Piyush',
    brideLines: [['granddaughter of', 'Mrs. Vinay Grover & Late Shri Harish Grover'], ['daughter of', 'Mrs. Bhanu Grover & Mr. Amit Grover']],
    groomLines: [['grandson of', 'Mrs. Kiran Devi & Late Thakur Jagdish Prasad Verma'], ['son of', 'Mrs. Rekha Verma & Mr. Rakesh Verma']],
  },
  events: {
    eyebrow: 'Save the dates',
    title: 'Wedding Festivities',
    map: 'View on map',
    items: {} as Record<string, { title?: string; eyebrow?: string; date?: string; time?: string }>,
  },
  gallery: { eyebrow: 'A glimpse of us', title: 'Shreya & Piyush' },
  countdown: { eyebrow: 'The auspicious day draws near', title: 'Counting Down', units: ['Days', 'Hours', 'Minutes', 'Seconds'] },
  info: { eyebrow: 'For our guests', title: 'Things to Know', contact: 'Contact', reminder: 'A gentle reminder', reminderBody: 'Please arrive 30 minutes before each celebration. Come comfortable, come festive, come ready to celebrate.' },
  footer: { blessing: '॥ शुभमस्तु ॥', line: 'With love and blessings from the Grover family' },
  music: { play: 'Play wedding music', pause: 'Pause wedding music' },
}

const hi: typeof en = {
  gate: { tap: 'खोलने के लिए छुएं' },
  hero: { invite: 'आप सपरिवार सादर आमंत्रित हैं', weds: 'संग', scroll: 'नीचे देखें' },
  invite: {
    eyebrow: 'ईश्वर की असीम कृपा से',
    // hosts: ['श्रीमती भानु ग्रोवर', 'श्री अमित ग्रोवर'],
    and: 'एवं',
    request: 'अपनी सुपुत्री के शुभ विवाह के मंगल अवसर पर आपको सपरिवार सादर आमंत्रित करते हैं',
    with: 'संग',
    closing: 'आपकी उपस्थिति एवं आशीर्वाद हमारे उत्सव को पूर्ण करेंगे।',
    bride: 'श्रेया',
    groom: 'पीयूष',
    brideLines: [['सुपौत्री', 'श्रीमती विनय ग्रोवर एवं स्व. श्री हरीश ग्रोवर'], ['सुपुत्री', 'श्रीमती भानु ग्रोवर एवं श्री अमित ग्रोवर']],
    groomLines: [['सुपौत्र', 'श्रीमती किरण देवी एवं स्व. ठाकुर जगदीश प्रसाद वर्मा'], ['सुपुत्र', 'श्रीमती रेखा वर्मा एवं श्री राकेश वर्मा']],
  },
  events: {
    eyebrow: 'शुभ तिथियाँ',
    title: 'मांगलिक कार्यक्रम',
    map: 'नक्शा देखें',
    items: {
      engagement: { title: 'सगाई', eyebrow: 'अटूट बंधन की शुरुआत', date: '7 दिसंबर 2026', time: 'सायं 5 बजे से' },
      mehendi: { title: 'मेहंदी', eyebrow: 'रंगों और खुशियों की शाम', date: '10 दिसंबर 2026', time: 'सायं 7 बजे से' },
      wedding: { title: 'शुभ विवाह', eyebrow: 'दो दिल, एक जीवन', date: '11 दिसंबर 2026', time: 'सायं 7 बजे से' },
    },
  },
  gallery: { eyebrow: 'हमारी कुछ यादें', title: 'श्रेया एवं पीयूष' },
  countdown: { eyebrow: 'शुभ घड़ी निकट है', title: 'उलटी गिनती', units: ['दिन', 'घंटे', 'मिनट', 'सेकंड'] },
  info: { eyebrow: 'अतिथियों के लिए', title: 'आवश्यक जानकारी', contact: 'संपर्क', reminder: 'विनम्र निवेदन', reminderBody: 'कृपया प्रत्येक कार्यक्रम में 30 मिनट पूर्व पधारें। सहज रहें, उत्सव के रंग में रंगें।' },
  footer: { blessing: '॥ शुभमस्तु ॥', line: 'ग्रोवर परिवार की ओर से स्नेह एवं आशीर्वाद सहित' },
  music: { play: 'संगीत चलाएं', pause: 'संगीत रोकें' },
}

type Lang = 'en' | 'hi'
const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({ lang: 'en', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  // drives the html[lang=hi] CSS that removes letter-spacing (it breaks Devanagari conjuncts)
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
export const useT = () => (useContext(LangContext).lang === 'hi' ? hi : en)
