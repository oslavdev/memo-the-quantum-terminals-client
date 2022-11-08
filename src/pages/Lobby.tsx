import * as React from 'react'
import * as ReactRouter from 'react-router-dom'

import { ME_QUERY, meQuery } from '@/app/graphql/user'
import { pathMemo, pathRegister } from '@/app/config/paths'

import { Box } from '@/components/UI/box'
import { Button } from '@/components/UI/buttons/primary'
import LayoutMenu from '@/components/layouts/layout-menu'
import Loading from '@/components/UI/loading'
import { Paragraph } from '@/components/UI/text'
import { useCustomQuery } from '@/components/useCustomQuery'

export default function Lobby() {
  
  const navigate = ReactRouter.useNavigate()
  const { loading } = useCustomQuery(ME_QUERY, meQuery)

  const mockedGame = JSON.parse(localStorage.getItem('game'))

  function handleLogout(){
    alert("Logout")
  }

  if (loading || !mockedGame) {
    return (
      <LayoutMenu logo={false}>
        <Box position="absolute" top="50%" center>
          <Loading />
        </Box>
      </LayoutMenu>
    )
  }

  return (
    <LayoutMenu logo>
      {mockedGame && (
        <Box w="290px" center position="absolute" bottom="9%">
          <Paragraph center fade size="1.4rem">
            [Attention] You are playing as anonimous user. If you want to save
            you progress and participate in leaderboards please register.
          </Paragraph>
        </Box>
      )}
      <Box disp="flex" fd="column">
        <Box mb={20}>
          {/* <Button
            text="Register"
            onClick={() => history.push(pathLobby())}
            inactive={mockedGame[0].level === 0}
          /> */}
        </Box>
        <Box mb={20}>
          <Button
            text="Memo"
            onClick={() => navigate(pathMemo())}
          />
        </Box>
        <Box mb={20}>
          <Button
            text="Champions"
            onClick={() => navigate(pathRegister())}
          />
        </Box>
        <Box>
          <Button text="Logout" onClick={handleLogout} />
        </Box>
      </Box>
    </LayoutMenu>
  )
}
