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
        path: ':userId',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <>@profile</>,
          },
          {
            path: 'about',
            element: <>about</>,
          },
          {
            path: 'followers',
            element: <>followers</>,
          },
          {
            path: 'following',
            element: <>following</>,
          },
          {
            path: '*',
            element: <>404</>,
          },
        ],
      },
      {
        path: 'me',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <>me</>,
          },
          {
            path: 'settings',
            element: <>settings</>,
          },
          {
            path: '*',
            element: <>404</>,
          },
        ],
      },
      {
        path: ':slug',
        element: <>article</>,
      },
      {
        path: 'tags/:tag',
        element: <>tag</>,
      },
      {
        path: '*',
        element: <>404</>,
      },
    ],
  },

  {
    path: '/login',
    element: <>login</>,
  },
  {
    path: '/register',
    element: <>register</>,
  },
  {
    path: '*',
    element: <>404</>,
  },
])

export default router
