// Alt innholdet på siden ligger her. Bytt ut eksempeltekstene med dine egne.
// Prosjektbilder legges i mappen public/prosjekter/ og skrives som '/prosjekter/filnavn.jpg'.
// Står image tomt (''), vises en plassholder. Bildet vises som stående kort (3:4) i hjulet
// og bredt (16:9) på prosjektsiden, så velg et bilde der det viktigste er i midten.
// details er avsnittene på prosjektsiden.

export const profile = {
  name: 'Marius Nguyen',
  intro: 'Jeg bygger gjennomtenkte løsninger, fra database til brukeropplevelse.',
  email: 'bigbangkhiem@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/MariusKhiem' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/marius-nguyen-189544313' },
  ],
}

export const projects = [
  {
    title: 'Prosjekt én',                                               // EKSEMPEL
    description: 'Kort om hva prosjektet er, hvilket problem det løser og hva du gjorde.',
    tags: ['React', 'Three.js'],
    details: [
      'Her forteller du mer om prosjektet: bakgrunnen, hva du lagde og hvilke valg du tok underveis.', // EKSEMPEL
      'Skriv gjerne om hva som var vanskelig, hva du lærte, og hva resultatet ble.',
    ],
    image: '',
    href: 'https://github.com/MariusKhiem',
  },
  {
    title: 'Prosjekt to',                                               // EKSEMPEL
    description: 'Kort om hva prosjektet er, hvilket problem det løser og hva du gjorde.',
    tags: ['C#', '.NET'],
    details: [
      'Her forteller du mer om prosjektet: bakgrunnen, hva du lagde og hvilke valg du tok underveis.', // EKSEMPEL
      'Skriv gjerne om hva som var vanskelig, hva du lærte, og hva resultatet ble.',
    ],
    image: '',
    href: 'https://github.com/MariusKhiem',
  },
  {
    title: 'Prosjekt tre',                                              // EKSEMPEL
    description: 'Kort om hva prosjektet er, hvilket problem det løser og hva du gjorde.',
    tags: ['Figma', 'CSS'],
    details: [
      'Her forteller du mer om prosjektet: bakgrunnen, hva du lagde og hvilke valg du tok underveis.', // EKSEMPEL
      'Skriv gjerne om hva som var vanskelig, hva du lærte, og hva resultatet ble.',
    ],
    image: '',
    href: 'https://github.com/MariusKhiem',
  },
]

// Lenkenavnet til hvert prosjekt, f.eks. «Prosjekt én» → prosjekt-en
export const slugify = (t) =>
  t.toLowerCase()
    .replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const about = {
  text: 'Jeg er fra Kristiansand og tar en bachelor i IT og informasjonssystemer ved UiA. Jeg er opptatt av å bygge fullstack-løsninger med C#, ASP.NET Core og PostgreSQL, med fokus på god brukeropplevelse og smart bruk av AI. Jeg er engasjert, tar initiativ og drar gjerne prosjekter fremover sammen med andre. Jeg er alltid ute etter læring, og utfordrer meg selv til å lære nye ting.',
  skills: ['React', 'JavaScript', 'C# / .NET', 'Three.js', 'HTML og CSS', 'Git og GitHub'], // EKSEMPEL
}
