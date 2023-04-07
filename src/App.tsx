import { Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useRoutes } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import './App.css'
import { Menu, appRoutes, menuRoutes } from './Menu'
import Stack from './components/Stack'
import { LanguageSwitcher } from './components/language-switcher'
import { YxansKlaganLogo } from './logo'
import { ParchmentButton } from './components/ParchmentButton'

const App = () => {
  const routes = useRoutes(appRoutes)

  return (
    <div
      className={`App h-full min-h-screen w-screen max-w-full  bg-amber-50/25`}
    >
      <div className="flex flex-col lg:min-h-screen lg:flex-row">
        <AppMenu></AppMenu>
        <Suspense fallback={<div>Loading...</div>}>
          <main className="max-h-screen w-full overflow-auto p-8">
            {routes}
          </main>
        </Suspense>
      </div>
    </div>
  )
}

export default App

const AppMenu = () => {
  const { t } = useTranslation(['core'])
  const [isOpen, setIsOpen] = useState(false)
  const isLg = useMediaQuery('(min-width: 1024px)')

  const handleMenuClick = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col gap-4 bg-[#bb9883] py-4 lg:min-h-screen">
      <div className="flex justify-between gap-2 bg-[#bb9883] px-2">
        <Link to="/" className="block" onClick={() => !isLg && close()}>
          <YxansKlaganLogo />
        </Link>
        {!isLg ? (
          <ParchmentButton buttonType="ghost" small onClick={handleMenuClick}>
            {t('core:Menu')}
          </ParchmentButton>
        ) : null}
      </div>
      {isOpen || isLg ? (
        <div className="flex flex-col justify-between gap-4">
          <Stack.Vertical wrap={false} spacing="small">
            <Menu close={closeMenu} menuRoutes={menuRoutes} />
          </Stack.Vertical>

          <div className="flex flex-col gap-4 ">
            <LanguageSwitcher></LanguageSwitcher>

            <a
              className="mb-4 mt-auto text-center font-medium tracking-wide text-red-700 hover:underline"
              href="https://github.com/syradar/yxans-klagan/issues/new/choose"
            >
              {t('core:GiveFeedback')}
            </a>
          </div>
        </div>
      ) : null}
    </div>
  )
}
