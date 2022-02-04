import React from 'react'
import * as ReactRouter from 'react-router-dom'

import LayoutMenu from '@/components/Layout/Layout_menu'
import { Box } from '@/UI/Boxes/Box'
import { Button } from '@/UI/Buttons/Primary'
import { pathRegister, pathMemo } from '@/app/config/paths'
import { meQuery, ME_QUERY } from '@/app/graphql/user'
import { useCustomQuery } from '@/app/hooks/graphql/query'
import Loading from '@/UI/Loading/Loading'
import { Paragraph } from '@/UI/Text/Text'
import { deleteAnonimUser } from '@/utils/offline_auth/anonimUser'

export default function Lobby() {
  
  const navigate = ReactRouter.useNavigate()
  const { loading } = useCustomQuery(ME_QUERY, meQuery)

  const mockedGame = JSON.parse(localStorage.getItem('game'))

  function handleLogout(){
    alert("You will be logged out")
    deleteAnonimUser()

    navigate('/')
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
