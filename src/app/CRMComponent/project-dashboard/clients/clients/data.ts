export type UserType = {
  name: string
  username: string
  avatar: string
  flag: string
}

export type ContactType = {
  email: string
  phone: string
}

export type ClientType = {
  theme: string
  user: UserType
  pre_project: string
  description: string
  contact: ContactType
  score_title: string
  score: number
  initial: string
}
export const ClientsData: ClientType[] = [
  {
    theme: 'Mannat Themes',
    user: {
      name: 'Andriambelo Eric',
      username: '@Eric',
      avatar: 'assets/images/users/avatar-1.jpg',
      flag: 'assets/images/flags/baha_flag.jpg',
    },
    pre_project: 'Chef projet',
    description:
      'docker,trello',
    contact: {
      email: 'eric@gmail.com',
      phone: '+1 123 456 789',
    },
    score_title:'Amélioration de l\'accessibilité',
    score: 92,
    initial:'AE'
  },
  {
    theme: 'Mannat Themes',
    user: {
      name: 'Ravelojaona Julie',
      username: '@Julie',
      avatar: 'assets/images/users/avatar-2.jpg',
      flag: 'assets/images/flags/us_flag.jpg',
    },
    pre_project: 'Développeur',
    description:
      'angular,mongodb',
    contact: {
      email: 'julie@gmail.com',
      phone: '032 45 895 25',
    },
    score:88,
    score_title:'Planification des rendez-vous',
    initial:'RJ'
  },
  {
    theme: 'Mannat Themes',
    user: {
      name: 'Rasamoelina Patrick',
      username: '@Patrick',
      avatar: 'assets/images/users/avatar-3.jpg',
      flag: 'assets/images/flags/french_flag.jpg',
    },
    pre_project: 'Développeur',
    description:
      'angular,mongodb',
    contact: {
      email: 'patrick@gmail.com',
      phone: '033 14 014202',
    },
    score: 91,
    score_title:'Feedback et évaluation (MongoDB)',
    initial:'RP'
  },
  {
    theme: 'Mannat Themes',
    user: {
      name: 'Ratsimandresy Anna',
      username: '@Anna',
      avatar: 'assets/images/users/avatar-4.jpg',
      flag: 'assets/images/flags/germany_flag.jpg',
    },
    pre_project: 'Développeur',
    description:
      'angular,mongodb,postgresql,spring boot',
    contact: {
      email: 'anna@gmail.com',
      phone: '032 15 854 74',
    },
    score: 92,
    score_title:'Planification des rendez-vous',
    initial:'RA'
  }
]
