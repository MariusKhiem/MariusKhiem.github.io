// Alt innholdet på siden ligger her. Bytt ut eksempeltekstene med dine egne.
// Prosjektbilder legges i mappen public/prosjekter/ og skrives som '/prosjekter/filnavn.jpg'.
// Står image tomt (''), vises en plassholder.

export const profile = {
  name: 'Marius Nguyen',
  role: 'Utvikler',                                                     // EKSEMPEL
  intro: 'Jeg bygger digitale produkter som er raske, enkle og gjennomtenkte.', // EKSEMPEL
  location: 'Norge',
  available: 'Åpen for nye prosjekter',                                 // EKSEMPEL
  email: 'din@epost.no',                                                // BYTT UT
  links: [
    { label: 'GitHub', href: 'https://github.com/MariusKhiem' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },           // BYTT UT
  ],
}

export const projects = [
  {
    title: 'Prosjekt én',                                               // EKSEMPEL
    year: '2026',
    role: 'Design og utvikling',
    description: 'Kort om hva prosjektet er, hvilket problem det løser og hva du gjorde.',
    tags: ['React', 'Three.js'],
    image: '',
    href: 'https://github.com/MariusKhiem',
  },
  {
    title: 'Prosjekt to',                                               // EKSEMPEL
    year: '2025',
    role: 'Utvikling',
    description: 'Kort om hva prosjektet er, hvilket problem det løser og hva du gjorde.',
    tags: ['C#', '.NET'],
    image: '',
    href: 'https://github.com/MariusKhiem',
  },
  {
    title: 'Prosjekt tre',                                              // EKSEMPEL
    year: '2025',
    role: 'Design',
    description: 'Kort om hva prosjektet er, hvilket problem det løser og hva du gjorde.',
    tags: ['Figma', 'CSS'],
    image: '',
    href: 'https://github.com/MariusKhiem',
  },
]

export const about = {
  // EKSEMPEL
  text: 'Jeg er en utvikler som liker å gjøre kompliserte ting enkle. Jeg jobber helst i skjæringspunktet mellom design og kode, der små detaljer gjør stor forskjell.',
  skills: ['React', 'JavaScript', 'C# / .NET', 'Three.js', 'HTML og CSS', 'Git og GitHub'], // EKSEMPEL
}
