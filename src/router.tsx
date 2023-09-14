import { Outlet, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const Layout = await import('./layouts')
      return { Component: Layout.default }
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const Home = await import('./pages/Home')
          return { Component: Home.default }
        },
      },
      {
        path: ':slug',
        lazy: async () => {
          const ArticleDetails = await import('./pages/ArticleDetails')
          return { Component: ArticleDetails.default }
        },
      },
      {
        path: ':userId',
        lazy: async () => {
          const UserDetails = await import('./pages/UserDetails')
          return { Component: UserDetails.default }
        },
      },
      {
        path: 'me',
        element: <Outlet />,
        children: [
          {
            index: true,
            lazy: async () => {
              const UserDetails = await import('./pages/UserDetails')
              return { Component: UserDetails.default }
            },
          },
          {
            path: 'favorites',
            lazy: async () => {
              const UserFavorites = await import('./pages/UserFavorites')
              return { Component: UserFavorites.default }
            },
          },
          {
            path: 'settings',
            lazy: async () => {
              const UserSetting = await import('./pages/UserSettings')
              return { Component: UserSetting.default }
            },
          },
          {
            path: '*',
            lazy: async () => {
              const NotFound = await import('./pages/NotFound')
              return { Component: NotFound.default }
            },
          },
        ],
      },
      {
        path: '*',
        lazy: async () => {
          const NotFound = await import('./pages/NotFound')
          return { Component: NotFound.default }
        },
      },
    ],
  },

  {
    path: '/login',
    lazy: async () => {
      const Login = await import('./pages/Login')
      return { Component: Login.default }
    },
  },
  {
    path: '/register',
    lazy: async () => {
      const Register = await import('./pages/Register')
      return { Component: Register.default }
    },
  },
  {
    path: '/new',
    lazy: async () => {
      const FormArticle = await import('./pages/FormArticle')
      return { Component: FormArticle.default }
    },
  },
  {
    path: '/:slug/edit',
    lazy: async () => {
      const FormArticle = await import('./pages/FormArticle')
      return { Component: FormArticle.default }
    },
  },
  {
    path: '*',
    lazy: async () => {
      const NotFound = await import('./pages/NotFound')
      return { Component: NotFound.default }
    },
  },
])

export default router
