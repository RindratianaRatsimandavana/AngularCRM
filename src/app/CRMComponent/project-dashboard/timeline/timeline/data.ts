import { currentYear } from '@/app/common/constants'

export type Activity = {
  icon: string
  title: string
  time: string
  description: string
  badges?: string[]
}

export type activity2Type = {
  date: string
  time: string
  description: string
}

export const activities: Activity[] = [
  {
    icon: 'las la-check-circle text-primary',
    title: 'Création de l’interface de connexion avec Angular : fini',
    time: '10 Min plus tôt',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.',
  },
  {
    icon: 'las la-user-clock text-danger',
    title: 'Design de la structure de l\'application côté frontend : en revue',
    time: '50 Min plus tôt',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.',
    badges: ['Design', 'HTML'],
  },
  {
    icon: 'las la-clipboard-check text-primary',
    title: 'Nouvelle tâche',
    time: '10 heures plus tôt',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.',
  },
  {
    icon: 'las la-comment-dots text-danger',
    title: 'Nouvelle commentaire',
    time: 'Hier',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.',
  }
]

export const activities2: activity2Type[] = [
  {
    date: 'Sep 18,' + currentYear,
    time: '05:01 PM',
    description:
      'Réunion avec le client pour présentation.',
  },
  {
    date: 'Août 10,' + currentYear,
    time: '11:19 AM',
    description:
      'Mettre deadline pour correction des bugs.',
  },
  {
    date: 'Août 10,' + currentYear,
    time: '11:19 AM',
    description:
      'Réunion interne.',
  },
  {
    date: 'Août 10,' + currentYear,
    time: '11:19 AM',
    description:
      'Démarrage du projet.',
  },
  {
    date: 'Juil 06,' + currentYear,
    time: '02:02 PM',
    description:
      'Validation cahier des charges.',
  },
]
