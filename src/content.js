// Alt innholdet på siden ligger her. Bytt ut eksempeltekstene med dine egne.
// Prosjektbilder legges i mappen public/prosjekter/ og skrives som '/prosjekter/filnavn.jpg'.
// Står image tomt (''), vises en plassholder. Bildene vises som stående kort (3:4).

export const profile = {
  name: 'Marius Nguyen',
  intro: 'Jeg bygger gjennomtenkte løsninger, fra database til brukeropplevelse.',
  email: 'din@epost.no',                                                // BYTT UT
  links: [
    { label: 'GitHub', href: 'https://github.com/MariusKhiem' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },           // BYTT UT
  ],
}

export const projects = [
  {
    title: 'Prosjekt én',                                               // EKSEMPEL
    description: 'Kort om hva prosjektet er, hvilket problem det løser og hva du gjorde.',
    tags: ['React', 'Three.js'],
    image: '',
    href: 'https://github.com/MariusKhiem',
  },
  {
    title: 'Prosjekt to',                                               // EKSEMPEL
    description: 'Kort om hva prosjektet er, hvilket problem det løser og hva du gjorde.',
    tags: ['C#', '.NET'],
    image: '',
    href: 'https://github.com/MariusKhiem',
  },
  {
    title: 'Prosjekt tre',                                              // EKSEMPEL
    description: 'Kort om hva prosjektet er, hvilket problem det løser og hva du gjorde.',
    tags: ['Figma', 'CSS'],
    image: '',
    href: 'https://github.com/MariusKhiem',
  },
]

export const about = {
  text: 'Jeg er fra Kristiansand og tar en bachelor i IT ved UiA. Jeg liker å bygge fullstack-løsninger med C#, ASP.NET Core og PostgreSQL, med fokus på god brukeropplevelse og smart bruk av AI. Jeg er engasjert, tar initiativ og liker å dra prosjekter fremover sammen med andre.',
  skills: ['React', 'JavaScript', 'C# / .NET', 'Three.js', 'HTML og CSS', 'Git og GitHub'], // EKSEMPEL
}
