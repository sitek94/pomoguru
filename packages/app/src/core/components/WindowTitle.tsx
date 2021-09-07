import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ReactComponent as CloseIcon } from 'icons/close.svg'
import { ReactComponent as SettingsIcon } from 'icons/settings.svg'

const { remote } = window.require('electron')

const Title = styled.div`
  color: var(--text-color);
  padding-bottom: 20px;
  border-bottom: 1px solid var(--title-border-color);
  display: flex;
  justify-content: space-between;
`

const CloseLink = styled.a`
  cursor: pointer;
`

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    fill: var(--text-color);
  }
`

function onCloseClick () {
  remote.getCurrentWindow().hide()
}

export default function WindowTitle({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Title>
      <div>{children}</div>
      <Links>
        <Link to='/settings'>
          <SettingsIcon aria-label='Settings icon' />
        </Link>
        <CloseLink onClick={onCloseClick}>
          <CloseIcon aria-label='Close icon' />
        </CloseLink>
      </Links>
    </Title>
  )
}
