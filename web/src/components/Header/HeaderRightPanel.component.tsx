import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Status, StatusCssColorClass } from './Status'
import Icon from '../Icon/Icon'
import Avatar from '../Avatar/Avatar'
import useOnClickOutside from 'use-onclickoutside'
import { CSSTransition } from 'react-transition-group'
import { ProjectMapViewOnly } from '../ViewFilters/ViewFilters'
import Typography from '../Typography/Typography'

function AvatarMenuItem({
  title,
  onClick,
  className,
}: {
  title: string
  onClick: () => void
  className?: string
}) {
  return (
    <button className={className} onClick={onClick}>
      <p>{title}</p>
    </button>
  )
}

function StatusMenuItem({ color, title, onClick }) {
  return (
    <button onClick={onClick}>
      {/* @ts-ignore */}
      <div className={`status-circle ${color}`} />
      <p>{title}</p>
    </button>
  )
}

function SearchResultItem({
  text,
  name,
  onExpandClick,
  panAndZoom,
  outcomeHeaderHash,
}) {
  return (
    <div className="search-result-item-wrapper">
      <div className="search-result-item-text-icon">
        {/* @ts-ignore */}
        <Icon name={name} size="small" className="light-grey not-hoverable" />
        <div className="search-result-item-text" title={text}>
          {text}
        </div>
      </div>
      <div className="search-result-item-buttons">
        <div onClick={() => panAndZoom(outcomeHeaderHash)}>
          {/* @ts-ignore */}
          <Icon name="enter.svg" size="small" className="light-grey" />
        </div>
        <div onClick={() => onExpandClick(outcomeHeaderHash)}>
          {/* @ts-ignore */}
          <Icon name="expand.svg" size="small" className="light-grey" />
        </div>
      </div>
    </div>
  )
}

function SearchResultsFilter({ name, filterActive, setFilter }) {
  return (
    <div
      className={`search-results-filter-wrapper ${name} ${
        filterActive ? 'filter-is-applied' : ''
      } `}
      onClick={() => setFilter(!filterActive)}
    >
      {name}
    </div>
  )
}

export default function HeaderRightPanel({
  whoami,
  onClickEditProfile,
  onClickPreferences,
  saveStatus,
  status,
  outcomeList,
  commentList,
  openExpandedView,
  animatePanAndZoom,
  projectId,
}) {
  const ref = useRef()
  useOnClickOutside(ref, () => {
    setIsAvatarMenuOpen(false)
    setIsStatusOpen(false)
  })
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false)
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [filterText, setFilterText] = useState('')
  const [isTextFilter, setIsTextFilter] = useState(false)
  const [isDescriptionFilter, setIsDescriptionFilter] = useState(false)
  const [isCommentFilter, setIsCommentFilter] = useState(false)
  const location = useLocation()
  // hover states
  const [isAvatarHover, setIsAvatarHover] = useState(false)
  // hover handlers
  const onHoverAvatarEnter = () => {
    setIsAvatarHover(true)
  }
  const onHoverAvatarLeave = () => {
    setIsAvatarHover(false)
  }

  // reset the search when the project
  // changes, including navigating away
  // to the dashboard
  useEffect(() => {
    setIsTextFilter(false)
    setIsDescriptionFilter(false)
    setIsCommentFilter(false)
    setIsSearchOpen(false)
    setFilterText('')
  }, [projectId])

  const noFilters = isTextFilter || isDescriptionFilter || isCommentFilter

  return (
    <>
      <ProjectMapViewOnly>
        <div
          className={`search-button-wrapper ${
            isSearchOpen ? 'search-is-open' : ''
          } 
        ${filterText !== '' ? 'results-dropdown-is-open' : ''}`}
        >
          <div className="search-icon-input">
            <div className="search-open-icon">
              {/* @ts-ignore */}
              <Icon
                name="search.svg"
                size="small"
                className="grey"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen)
                  setFilterText('')
                }}
              />
            </div>
            <div>
              <CSSTransition
                in={isSearchOpen}
                timeout={100}
                unmountOnExit
                classNames="search-input-wrapper"
              >
                <input
                  type="text"
                  onChange={(e) => setFilterText(e.target.value.toLowerCase())}
                  value={filterText}
                  placeholder="Search for an Outcome, comment, and more"
                  autoFocus
                />
              </CSSTransition>
            </div>
            {filterText !== '' && (
              <>
                {/* @ts-ignore */}
                <Icon
                  name="x.svg"
                  size="small"
                  className="light-grey"
                  onClick={() => {
                    setFilterText('')
                  }}
                />
              </>
            )}
          </div>
          {filterText !== '' && (
            <div className="search-results-dropdown">
              <div className="search-results-filters">
                <SearchResultsFilter
                  name="Titles"
                  filterActive={isTextFilter}
                  setFilter={setIsTextFilter}
                />
                <SearchResultsFilter
                  name="Descriptions"
                  filterActive={isDescriptionFilter}
                  setFilter={setIsDescriptionFilter}
                />
                <SearchResultsFilter
                  name="Comments"
                  filterActive={isCommentFilter}
                  setFilter={setIsCommentFilter}
                />
              </div>
              <div className="search-results-list">
                {(!noFilters || isTextFilter) &&
                  outcomeList
                    .filter((outcome) =>
                      outcome.content.toLowerCase().includes(filterText)
                    )
                    .map((outcome) => (
                      <SearchResultItem
                        text={outcome.content}
                        name="title.svg"
                        onExpandClick={openExpandedView}
                        panAndZoom={animatePanAndZoom}
                        outcomeHeaderHash={outcome.headerHash}
                      />
                    ))}
                {(!noFilters || isDescriptionFilter) &&
                  outcomeList
                    .filter((outcome) =>
                      outcome.description.toLowerCase().includes(filterText)
                    )
                    .map((outcome) => (
                      <SearchResultItem
                        text={outcome.description}
                        name="text-align-left.svg"
                        onExpandClick={openExpandedView}
                        panAndZoom={animatePanAndZoom}
                        outcomeHeaderHash={outcome.headerHash}
                      />
                    ))}
                {(!noFilters || isCommentFilter) &&
                  commentList
                    .filter((comment) =>
                      comment.content.toLowerCase().includes(filterText)
                    )
                    .map((comment) => (
                      <SearchResultItem
                        text={comment.content}
                        name="comment.svg"
                        onExpandClick={openExpandedView}
                        panAndZoom={animatePanAndZoom}
                        outcomeHeaderHash={comment.outcomeHeaderHash}
                      />
                    ))}
              </div>
            </div>
          )}
        </div>
        {/* end search */}
      </ProjectMapViewOnly>

      <div className="header-right-panel">
        {/* Help button */}
        <a
          className="help-button-external"
          href="https://sprillow.gitbook.io/acorn-knowledge-base/"
          target="_blank"
        >
          <Typography style="h8">Help</Typography>
          {/* @ts-ignore */}
          <Icon
            name="external-link.svg"
            size="small"
            className="grey not-hoverable"
          />
        </a>

        <div
          className="avatar-and-status-wrapper"
          onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
        >
          <div
            className="avatar-container"
            onMouseEnter={onHoverAvatarEnter}
            onMouseLeave={onHoverAvatarLeave}
          >
            {/* @ts-ignore */}
            <Avatar
              firstName={whoami.entry.firstName}
              lastName={whoami.entry.lastName}
              avatarUrl={whoami.entry.avatarUrl}
              imported={whoami.entry.isImported}
              highlighted={isAvatarMenuOpen || isAvatarHover}
              clickable
              size="small-medium"
              withStatus
              withWhiteBorder
              selfAssignedStatus={status}
            />
          </div>
        </div>
        {/* Profile Menu */}
        {isAvatarMenuOpen && (
          <div className="profile-wrapper" ref={ref}>
            <AvatarMenuItem
              className={isStatusOpen ? 'active' : ''}
              title="Change Status"
              onClick={() => setIsStatusOpen(true)}
            />
            {isStatusOpen && (
              <div className="user-status-wrapper">
                {Object.keys(Status).map((key) => (
                  <StatusMenuItem
                    key={key}
                    color={StatusCssColorClass[key]}
                    title={key}
                    onClick={() => {
                      saveStatus(Status[key])
                      setIsAvatarMenuOpen(false)
                      setIsStatusOpen(false)
                    }}
                  />
                ))}
              </div>
            )}
            <AvatarMenuItem
              title="Profile Settings"
              onClick={() => {
                onClickEditProfile()
                setIsAvatarMenuOpen(false)
              }}
            />
            <AvatarMenuItem
              title="Preferences"
              onClick={() => {
                onClickPreferences()
                setIsAvatarMenuOpen(false)
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}
