import React, { useEffect } from 'react'
import styled from 'styled-components'
import Button from 'core/components/Button'
import { Link } from 'react-router-dom'

import WindowContent from 'core/components/WindowContent'
import WindowTitle from 'core/components/WindowTitle'
import { useMediator } from 'core/mediator'
import { readSettings } from 'api/settings'
import { version } from '../../package.json'
import { ReactComponent as ArrowBackIcon } from 'icons/arrow-back.svg'

const minMinutes = 1
const maxMinutes = 24 * 60

const Input = styled.input.attrs({
  type: 'number',
  min: minMinutes,
  max: maxMinutes,
  required: true,
})`
  font-size: 1em;
  color: var(--white);
  background: transparent;
  padding: 3px 12px;
  border: 1px solid var(--dark-grey);
  border-radius: 8px;
  width: 40px;
  outline: none;
  text-align: center;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    border-color: var(--dark-green);
  }

  &:invalid {
    border-color: var(--red);
  }
`

const Label = styled.label`
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 5px;
`

const Fields = styled.div`
  align-self: flex-start;
  display: flex;
  flex-flow: column;
  gap: 10px;
  margin-bottom: 30px;
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const SaveButton = styled(Button)`
  &:not(:disabled) {
    background: var(--green);
    border-color: var(--green);
  }
`

const GoBackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
`

export default function Settings () {
  const { onSaveSettings } = useMediator()
  const [focusInput, setFocusInput] = React.useState('')
  const [breakInput, setBreakInput] = React.useState('')

  // Read current settings and set initial inputs
  useEffect(() => {
    const settings = readSettings()
    const focusTimeInMinutes = String(
      settings['focus-time-duration-in-seconds'] / 60
    )
    const breakTimeInMinutes = String(
      settings['break-time-duration-in-seconds'] / 60
    )

    setFocusInput(focusTimeInMinutes)
    setBreakInput(breakTimeInMinutes)
  }, [])

  function handleSaveClick () {
    const focusTimeInSeconds = Number(focusInput) * 60
    const breakTimeInSeconds = Number(breakInput) * 60

    onSaveSettings({
      'focus-time-duration-in-seconds': focusTimeInSeconds,
      'break-time-duration-in-seconds': breakTimeInSeconds,
    })
  }

  // Disable save button when either input is empty
  const isSaveButtonDisabled = !focusInput || !breakInput

  return (
    <>
      <WindowTitle>
        Pomoguru <img src='icon-red-small.png' alt='Pomoguru icon' />
        {version}
      </WindowTitle>
      <WindowContent>
        <Fields>
          <Label>
            <span>Focus time</span>
            <Input
              value={focusInput}
              onChange={(e) => setFocusInput(e.target.value)}
            />
            <span>minutes</span>
          </Label>
          <Label>
            <span>Break time</span>
            <Input
              value={breakInput}
              onChange={(e) => setBreakInput(e.target.value)}
            />
            <span>minutes</span>
          </Label>
        </Fields>

        <Buttons>
          <GoBackLink to='/'>
            <ArrowBackIcon width={16} height={16} />
            <span>Go back</span>
          </GoBackLink>
          <SaveButton disabled={isSaveButtonDisabled} onClick={handleSaveClick}>
            Save
          </SaveButton>
        </Buttons>
      </WindowContent>
    </>
  )
}
