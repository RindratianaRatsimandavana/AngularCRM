import { Route } from '@angular/router'
import { ProfileComponent } from './profile/profile.component'
import { NotificationsComponent } from './notifications/notifications.component'
import { TimelineComponent } from './timeline/timeline.component'
import { TreeviewComponent } from './treeview/treeview.component'
import { StarterComponent } from './starter/starter.component'
import { PricingComponent } from './pricing/pricing.component'
import { BlogsComponent } from './blogs/blogs.component'
import { FaqComponent } from './faq/faq.component'
import { GalleryComponent } from './gallery/gallery.component'
import { CreateProjectComponent } from './create-project/create-project.component'
import { TypeProjectComponent } from './type-project/type-project.component'
import { ProjectListComponent } from '@/app/CRMComponent/project-list/project-list.component'
import { ProjectDetailComponent } from '@/app/CRMComponent/project-detail/project-detail.component'
import { KanbanBoardComponent } from '@/app/CRMComponent/kanban-board/kanban-board.component'
import { DocumentListComponent } from '@/app/CRMComponent/document-list/document-list.component'
import { TestComponent } from '@/app/CRMComponent/test/test.component'
import { DocumentDetailComponent } from '@/app/CRMComponent/document-detail/document-detail.component'
import { ProjectClListComponent } from '@/app/CRMComponent/project-cl-list/project-cl-list.component'
import { DocumentClListComponent } from '@/app/CRMComponent/document-cl-list/document-cl-list.component'
import { DocumentClDetailComponent } from '@/app/CRMComponent/document-cl-detail/document-cl-detail.component'
import { ProjectClDetailComponent } from '@/app/CRMComponent/project-cl-detail/project-cl-detail.component'

export const PAGES_ROUTES: Route[] = [
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'Profile' },
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    data: { title: 'Notifications' },
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    data: { title: 'Timeline' },
  },
  {
    path: 'treeview',
    component: TreeviewComponent,
    data: { title: 'TreeView' },
  },
  {
    path: 'starter',
    component: StarterComponent,
    data: { title: 'Starter' },
  },
  {
    path: 'pricing',
    component: PricingComponent,
    data: { title: 'Pricing' },
  },
  {
    path: 'blogs',
    component: BlogsComponent,
    data: { title: 'Blogs' },
  },
  {
    path: 'faqs',
    component: FaqComponent,
    data: { title: 'FAQ' },
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: { title: 'Gallery' },
  },
  {
    path: 'createProject',
    component: CreateProjectComponent,
    data: { title: 'Nouveau projet' },
  },
  {
    path: 'typeProject',
    component: TypeProjectComponent,
    data: { title: 'Type de projet' },
  },
  {
    path: 'projectList',
    component: ProjectListComponent,
    data: { title: 'Vos projets' },
  },
  {
    path: 'projectDetail/:id/:permission',
    component: ProjectDetailComponent,
    data: { title: 'Vos projets' },
  },
  {
    path: 'kanban/:id/:permission',
    component: KanbanBoardComponent,
    data: { title: 'Kanban' },
  },
  {
    path: 'documentList',
    component: DocumentListComponent,
    data: { title: 'Vos documents' },
  },
  {
    path: 'documentDetail/:id',
    component: DocumentDetailComponent,
    data: { title: 'Vos projets' },
  },
  {
    path: 'test',
    component: TestComponent,
    data: { title: 'Vos tests' },
  },
  {
    path: 'projectClList',
    component: ProjectClListComponent,
    data: { title: 'Type de projet' },
  },
  {
    path: 'documentClList',
    component: DocumentClListComponent,
    data: { title: 'Vos documents' },
  },
  {
    path: 'documentClDetail/:id',
    component: DocumentClDetailComponent,
    data: { title: 'Vos projets' },
  },
  {
    path: 'projectClDetail/:id/',
    component: ProjectClDetailComponent,
    data: { title: 'Vos projets' },
  }

]
