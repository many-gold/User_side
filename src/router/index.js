import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import News from '@/components/News'
import Policies from '@/components/Policies'
import Procedures from '@/components/Procedures'
import Departments from '@/components/Departments'
import NBEDirectives from '@/components/NBEDirectives'
import SanctionList from '@/components/SanctionList'
import HumanResource from '@/components/HumanResource'
import Libraries from '@/components/Libraries'
import Organogram from '@/components/Organogram'
import SecurityContent from '@/components/SecurityContent'
import SecuritySection from '@/components/core/SecuritySection'
import PhotoGallery from '@/components/PhotoGallery'
import VideoGallery from '@/components/VideoGallery'
import DiscussionForm from '@/components/DiscussionForm'
import ImportantLinks from '@/components/ImportantLinks'
import InternalVacancy from '@/components/InternalVacancy.vue'
import PhoneDirectory from '@/components/PhoneDirctory.vue'
import DepartmentsPhone from '@/components/DepartmentsPhone.vue'
import Post from '@/components/Post.vue';
import PostDetails from '@/components/PostDetails.vue';


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/InformationPortal'
    },
    {
      path: '/InformationPortal',
      name: 'Home',
      component: Home
    },
    {
      path:'/InformationPortal/news/:id',
      name: 'News',
      component: News
    },
    {
      path:'/InformationPortal/policies/:id',
      name: 'Policies',
      component: Policies
    },
    {
      path:'/InformationPortal/procedures/:id',
      name: 'Procedures',
      component: Procedures
    },
    {
      path:'/InformationPortal/departments',
      name: 'Departments',
      component: Departments
    },
    {
      path:'/InformationPortal/nbeDirectives',
      name: 'NBEDirectives',
      component: NBEDirectives
    },
    {
      path:'/InformationPortal/sanctionList',
      name: 'SanctionList',
      component: SanctionList
    },
    {
      path:'/InformationPortal/humanResource',
      name: 'HumanResource',
      component: HumanResource
    },
    {
      path:'/InformationPortal/libraries',
      name: 'Libraries',
      component: Libraries
    },
    {
      path:'/InformationPortal/organogram',
      name: 'Organogram',
      component: Organogram
    },
    {
      path:'/InformationPortal/securityContent/:id',
      name: 'SecurityContent',
      component: SecurityContent
    },
    {
      path:'/InformationPortal/SecuritySection',
      name: 'SecuritySection',
      component: SecuritySection
    },
	{
      path:'/InformationPortal/PhotoGallery',
      name: 'PhotoGallery',
      component: PhotoGallery
    },
    {
      path:'/InformationPortal/VideoGallery',
      name: 'VideoGallery',
      component: VideoGallery
    },
    {
      path:'/InformationPortal/ImportantLinks',
      name: 'ImportantLinks',
      component: ImportantLinks
    },
  
    {
      path:'/InformationPortal/InternalVacancy',
      name: 'InternalVacancy',
      component: InternalVacancy
    },
    {
      path:'/InformationPortal/PhoneDirectory',
      name: 'PhoneDirectory',
      component: PhoneDirectory
    },
    {
      path:'/InformationPortal/DepartmentsPhone',
      name: 'DepartmentsPhone',
      component: DepartmentsPhone
    },
    { path: '/InformationPortal/Post', name: 'Post', component: Post },
    { 
      path: "/InformationPortal/post/:postId",
      name: "PostDetails",
      component: PostDetails,
      props: true
    }
  ]
})
