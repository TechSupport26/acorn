import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import './EntryPointPicker.scss'

import GuidebookNavLink from '../GuidebookNavLink/GuidebookNavLink'
import PickerTemplate from '../PickerTemplate/PickerTemplate'
import Icon from '../Icon/Icon'
import selectEntryPoints from '../../redux/persistent/projects/entry-points/select'
import { NavLink } from 'react-router-dom'
import { ENTRY_POINTS, GUIDE_IS_OPEN } from '../../searchParams'
import { animatePanAndZoom } from '../../redux/ephemeral/viewport/actions'

function EntryPointPickerItem({ entryPoint, isActive, activeEntryPoints, goToOutcome }) {
  const dotStyle = {
    backgroundColor: entryPoint.color,
  }
  const location = useLocation()

  const pathWithEntryPoint = `${location.pathname
    }?${ENTRY_POINTS}=${activeEntryPoints.concat([entryPoint.headerHash]).join(',')}`

  const pathWithoutEntryPoint = `${location.pathname
    }?${ENTRY_POINTS}=${activeEntryPoints
      .filter(headerHash => headerHash !== entryPoint.headerHash)
      .join(',')}`

  const onClickArrow = (event) => {
    // prevent the navigation (NavLink)
    // event that would be triggered
    event.preventDefault()
    goToOutcome(entryPoint.outcomeHeaderHash)
  }
  return (
    <li>
      <NavLink
        isActive={() => isActive}
        to={isActive ? pathWithoutEntryPoint : pathWithEntryPoint}
        className='entry-point-picker-item'>
        <div className='entry-point-picker-dot' style={dotStyle}></div>
        <div className='entry-point-picker-name'>{entryPoint.content}</div>
        <div onClick={onClickArrow}
          className='entry-point-picker-switch'>
          <Icon name='enter.svg' size='small' className='grey' />
        </div>
        <div className='entry-point-picker-radio'>
          <Icon
            name={isActive ? 'radio-button-checked.svg' : 'radio-button.svg'}
            size='small'
            className={isActive ? 'purple' : 'light-grey'}
          />
        </div>
      </NavLink>
    </li>
  )
}

export default function EntryPointPicker({ entryPoints, isOpen, onClose, activeEntryPoints, goToOutcome }) {
  const [filterText, setFilterText] = useState('')

  // filter people out if there's filter text defined, and don't bother case matching
  const filteredEntryPoints = entryPoints.filter(entryPoint => {
    return (
      !filterText ||
      entryPoint.content.toLowerCase().indexOf(filterText.toLowerCase()) > -1
    )
  })

  const goToOutcomeWrapped = (outcomeHeaderHash) => {
    onClose()
    goToOutcome(outcomeHeaderHash)
  }

  return (
    <CSSTransition
      in={isOpen}
      timeout={100}
      unmountOnExit
      classNames='entry-point-picker-wrapper'>
      <PickerTemplate
        className='entry-point-picker'
        heading='Entry Points'
        onClose={onClose}>
        {/* Entry Point Picker Search */}
        <div className='entry-point-picker-search'>
          <Icon
            name='search.svg'
            size='very-small'
            className='grey not-hoverable'
          />
          <input
            type='text'
            onChange={e => setFilterText(e.target.value)}
            value={filterText}
            placeholder='search entry points...'
            autoFocus
          />
          {filterText !== '' && (
            <button
              onClick={() => {
                setFilterText('')
              }}
              className='clear-button'>
              clear
            </button>
          )}
        </div>
        <div className='entry-point-picker-spacer' />
        <ul className='entry-point-picker-list'>
          {filteredEntryPoints.map(entryPoint => (
            <EntryPointPickerItem
              key={entryPoint.headerHash}
              entryPoint={entryPoint}
              isActive={activeEntryPoints.some(
                headerHash => headerHash === entryPoint.headerHash
              )}
              activeEntryPoints={activeEntryPoints}
              goToOutcome={goToOutcomeWrapped}
            />
          ))}
          {/* Entry Points Empty State */}
          {entryPoints.length === 0 && (
            <li className='entry-points-empty-state-content'>
              <img
                src='img/door-closed.svg'
                className='entry-points-empty-state-image'
              />
              <div className='entry-points-empty-state-image-circle'></div>
              <span>
                You currently have no entry points for this project.{' '}
                <GuidebookNavLink
                  guidebookId='creating_entry_points'
                  onClick={onClose}
                  className='entry-points-empty-state-content-link'>
                  Learn how to create one
                </GuidebookNavLink>
                .
              </span>
            </li>
          )}
        </ul>
        <img
          className='entry-point-picker-pointer'
          src='img/popup-curved-pointer-downside.svg'
        />
      </PickerTemplate>
    </CSSTransition>
  )
}