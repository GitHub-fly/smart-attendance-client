import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/base/Login.vue'
import Index from '../views/base/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/base/Home.vue')
      },
      {
        path: '/new',
        name: 'New',
        component: () => import(/* webpackChunkName: "about" */ '../views/base/New.vue')
      },
      {
        path: '/my',
        name: 'My',
        component: () => import(/* webpackChunkName: "about" */ '../views/base/My.vue')
      }
    ]
  },
  {
    path: '/note',
    name: 'Note',
    component: () => import(/* webpackChunkName: "about" */ '../views/sicknote/Note.vue')
  },
  {
    path: '/attendance',
    name: 'Attendance',
    component: () => import(/* webpackChunkName: "about" */ '../views/attendance/Attendance.vue')
  },
  {
    path: '/attendanceStatus',
    name: 'AttendanceStatus',
    component: () => import(/* webpackChunkName: "about" */ '../views/attendance/AttendanceStatus.vue'),
    redirect: '/attendance/all',
    children: [
      {
        path: '/attendance/all',
        name: 'AllAttendance',
        component: () => import('../views/attendance/AllAttendance.vue')
      },
      {
        path: '/attendance/un',
        name: 'UnAttendance',
        component: () => import('../views/attendance/UnAttendanceInfo.vue')
      }
    ]
  },
  {
    path: '/studentInfo',
    name: 'StudentInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/attendance/StudentInfo.vue')
  },
  {
    path: '/teacherView',
    name: 'TeacherView',
    component: () => import(/* webpackChunkName: "about" */ '../views/attendance/TeacherView.vue')
  },
  {
    path: '/notepreview',
    name: 'NotePreview',
    component: () => import(/* webpackChunkName: "about" */ '../views/sicknote/NotePreview')
  },
  {
    path: '/noteall',
    name: 'NoteAll',
    component: () => import(/* webpackChunkName: "about" */ '../views/sicknote/NoteAll')
  },
  {
    path: '/teacheradmin',
    name: 'TeacherAdmin',
    component: () => import('../views/sicknote/TeacherAdmin')
  }
]

const router = new VueRouter({
  routes
})

export default router
