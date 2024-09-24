import { currentYear } from '@/app/common/constants'

type FolderType = {
  title: string
  image: string
  files: number
  storage: string
  progress: number
}

//url nampiako
type DocumentType = {
  file_name: string
  date: string
  size: string
  url: string
  type?: string
  avatars?: string[]
}

//const urlAssetsfile='D:/RINDRA/Fianarana/M2/Stage/Code/github/Front/AngularCRM/public/assets/docCrm/';
const urlAssetsfile='assets/docCrm/';
export const FolderList: FolderType[] = [
  {
    title: 'Google Drive',
    image: 'assets/images/logos/lang-logo/gdrive.png',
    files: 34,
    storage: '500',
    progress: 38,
  },
  {
    title: 'Dropbox',
    image: 'assets/images/logos/lang-logo/dropbox.png',
    files: 68,
    storage: '500',
    progress: 15,
  },
  {
    title: 'Onedrive',
    image: 'assets/images/logos/lang-logo/onedrive.png',
    files: 192,
    storage: '500',
    progress: 48,
  },
  {
    title: 'Server',
    image: 'assets/images/logos/lang-logo/server.png',
    files: 81,
    storage: '500',
    progress: 76,
  },
]

export const DocumentList: DocumentType[] = [
  {
    file_name: 'modele-DOCUMENT-SIMPLIFIE-ACCOMPAGNEMENT.pdf',
    date: '18 Jul ' + currentYear,
    size: '2.3 MB',
    avatars: [
      'assets/images/users/avatar-2.jpg',
      'assets/images/users/avatar-5.jpg',
      'assets/images/users/avatar-3.jpg',
    ],
    url:urlAssetsfile+'manuel_parajuriste.pdf',
    type:'pdf'
  },
  {
    file_name: 'Formulaire_demande.pdf',
    date: '08 Dec ' + currentYear,
    size: '3.7 MB',
    avatars: [
      'assets/images/users/avatar-3.jpg',
      'assets/images/users/avatar-10.jpg',
    ],
    url:urlAssetsfile+'Formulaire_demande.pdf'
  },
  {
    file_name: 'assistance-juridique.pdf',
    date: '30 Nov ' + currentYear,
    size: '1.5 MB',
    avatars: [
      'assets/images/users/avatar-7.jpg',
      'assets/images/users/avatar-2.jpg',
    ],
    url:urlAssetsfile+'assistance-juridique.pdf'
  },
  {
    file_name: 'contrat-convention.pdf',
    date: '09 Sep ' + currentYear,
    size: '3.2 MB',
    avatars: [],
    url:urlAssetsfile+'contrat-convention.pdf'
  },
  {
    file_name: 'Reperes_STMG_SIG_Fevrier2024.pdf',
    date: '14 Aug ' + currentYear,
    size: '12.7 MB',
    avatars: [
      'assets/images/users/avatar-2.jpg',
      'assets/images/users/avatar-3.jpg',
      'assets/images/users/avatar-8.jpg',
    ],
    url:urlAssetsfile+'Reperes_STMG_SIG_Fevrier2024.pdf'
  },
  {
    file_name: 'FORMULAIRE_DEMANDE_AJ_2022_CERFA_16146-03.pdf',
    date: '12 Aug ' + currentYear,
    size: '5.2 MB',
    avatars: [
      'assets/images/users/avatar-1.jpg',
      'assets/images/users/avatar-4.jpg',
      'assets/images/users/avatar-6.jpg',
    ],
    url:urlAssetsfile+'FORMULAIRE_DEMANDE_AJ_2022_CERFA_16146-03.pdf'
  },
]

export const ImageList: DocumentType[] = [
  {
    file_name: 'img52315.jpeg',
    date: '18 Jul ' + currentYear,
    size: '2.3 MB',
    avatars: [
      'assets/images/users/avatar-2.jpg',
      'assets/images/users/avatar-5.jpg',
      'assets/images/users/avatar-3.jpg',
    ],
    url:'D:/RINDRA/Fianarana/M2/Stage/Code/me/doc/docCRM/'
  },
  {
    file_name: 'img63695.jpeg',
    date: '08 Dec ' + currentYear,
    size: '3.7 MB',
    avatars: [
      'assets/images/users/avatar-3.jpg',
      'assets/images/users/avatar-10.jpg',
    ],
    url:'D:/RINDRA/Fianarana/M2/Stage/Code/me/doc/docCRM/'
  },
  {
    file_name: 'img00021.jpeg',
    date: '30 Nov ' + currentYear,
    size: '1.5 MB',
    avatars: [
      'assets/images/users/avatar-7.jpg',
      'assets/images/users/avatar-2.jpg',
    ],
    url:'D:/RINDRA/Fianarana/M2/Stage/Code/me/doc/docCRM/'
  },
  {
    file_name: 'img36251.jpeg',
    date: '09 Sep ' + currentYear,
    size: '3.2 MB',
    avatars: [],
    url:'D:/RINDRA/Fianarana/M2/Stage/Code/me/doc/docCRM/'
  },
  {
    file_name: 'img362511.jpeg',
    date: '14 Aug ' + currentYear,
    size: '12.7 MB',
    avatars: [
      'assets/images/users/avatar-2.jpg',
      'assets/images/users/avatar-3.jpg',
      'assets/images/users/avatar-8.jpg',
    ],
    url:'D:/RINDRA/Fianarana/M2/Stage/Code/me/doc/docCRM/'
  },
  {
    file_name: 'img963852.jpeg',
    date: '12 Aug ' + currentYear,
    size: '5.2 MB',
    avatars: [
      'assets/images/users/avatar-1.jpg',
      'assets/images/users/avatar-4.jpg',
      'assets/images/users/avatar-6.jpg',
    ],
    url:'D:/RINDRA/Fianarana/M2/Stage/Code/me/doc/docCRM/'
  },
]

export const AudioList: DocumentType[] = [
  {
    file_name: 'audio52315..',
    date: '18 Jul ' + currentYear,
    size: '2.3 MB',
    url:'D:/RINDRA/Fianarana/M2/Stage/Code/me/doc/docCRM/'
  },
  {
    file_name: 'audio63695..',
    date: '08 Dec ' + currentYear,
    size: '3.7 MB',
    url:'D:/RINDRA/Fianarana/M2/Stage/Code/me/doc/docCRM/'
  },
  {
    file_name: 'audio00021..',
    date: '30 Nov ' + currentYear,
    size: '1.5 MB',
    url:'D:/RINDRA/Fianarana/M2/Stage/Code/me/doc/docCRM/'
  },
  {
    file_name: 'audio36251..',
    date: '09 Sep ' + currentYear,
    size: '3.2 MB',
    url:'D:/RINDRA/Fianarana/M2/Stage/Code/me/doc/docCRM/'
  },
  {
    file_name: 'audio362511..',
    date: '14 Aug ' + currentYear,
    size: '12.7 MB',
    url:'D:/RINDRA/Fianarana/M2/Stage/Code/me/doc/docCRM/'
  },
  {
    file_name: 'audio963852..',
    date: '12 Aug ' + currentYear,
    size: '5.2 MB',
    url:'D:/RINDRA/Fianarana/M2/Stage/Code/me/doc/docCRM/'
  },
]
