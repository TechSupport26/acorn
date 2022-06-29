import React, { useState } from 'react'
import hashCodeId from '../../api/clientSideIdHash'
import { ComputedOutcome, ComputedScope, Tag } from '../../types'
import { HeaderHashB64, WithHeaderHash } from '../../types/shared'
import AvatarsList from '../AvatarsList/AvatarsList'
import ExpandChevron from '../ExpandChevron/ExpandChevron'
import Icon from '../Icon/Icon'
import ProgressIndicatorCalculated from '../ProgressIndicatorCalculated/ProgressIndicatorCalculated'
import TagsList from '../TagsList/TagsList'
import filterMatch, { OutcomeTableFilter } from './filterMatch'

import './OutcomeTableRow.scss'

export type OutcomeTableRowProps = {
  columnWidthPercentages: [string, string, string, string, string]
  projectTags: WithHeaderHash<Tag>[]
  outcome: ComputedOutcome
  filter: OutcomeTableFilter
  parentExpanded: boolean
  indentationLevel: number
  openExpandedView: (headerHash: HeaderHashB64) => void
  goToOutcome: (headerHash: HeaderHashB64) => void
}

const OutcomeTableRow: React.FC<OutcomeTableRowProps> = ({
  columnWidthPercentages,
  projectTags,
  outcome,
  filter,
  parentExpanded,
  indentationLevel,
  openExpandedView,
  goToOutcome,
}) => {
  //for now assume everything is expanded by default,
  // will need to look into how to expand collapse all in one action
  let [expanded, setExpanded] = useState(false)
  let match = filterMatch(outcome, filter)

  return (
    <>
      {parentExpanded && match && (
        <div className="outcome-table-row-wrapper">
          {/* ID number metadata */}
          <div
            className="outcome-table-row-metadata-wrapper id-number"
            style={{
              width: columnWidthPercentages[0],
              minWidth: columnWidthPercentages[0],
            }}
          >
            {hashCodeId(outcome.headerHash)}
          </div>

          {/* Outcome statement & progress indicator metadata */}
          <div
            className="outcome-table-row-metadata-wrapper outcome-statement-wrapper"
            style={{
              width: columnWidthPercentages[1],
              minWidth: columnWidthPercentages[1],
            }}
          >
            {/* TODO: make the spacing for nested children right */}
            {/* the width 2.375rem below should match the chevron width on the left */}
            <div style={{ marginLeft: `${indentationLevel * 2.25}rem` }} />
            {outcome.children.length > 0 && (
              /* expand chevron component */
              <>
                <ExpandChevron
                  expanded={expanded}
                  onClick={() => {
                    setExpanded(!expanded)
                  }}
                  size={'medium'}
                />
              </>
            )}

            {/* Progress Indicator */}
            {outcome.computedScope !== ComputedScope.Uncertain && (
              <ProgressIndicatorCalculated outcome={outcome} />
            )}

            {/* Uncertain Icon (or not) */}
            {outcome.computedScope === ComputedScope.Uncertain && (
              <div className="outcome-statement-icon">
                <Icon
                  name="uncertain.svg"
                  className="not-hoverable uncertain"
                />
              </div>
            )}
            {/* Leaf Icon (or not) */}
            {outcome.children.length === 0 &&
              outcome.computedScope === ComputedScope.Small && (
                <div className="outcome-statement-icon">
                  <Icon name="leaf.svg" className="not-hoverable" />
                </div>
              )}

            {/* Outcome statement text */}
            <div
              className="outcome-statement-text"
              onClick={() => openExpandedView(outcome.headerHash)}
              title={outcome.content}
            >
              {outcome.content}
            </div>
          </div>

          <div className="outcome-table-row-assignees-tags-time">
            {/* Assignees */}
            <div
              className="outcome-table-row-metadata-wrapper assignees"
              style={{
                width: columnWidthPercentages[2],
                minWidth: columnWidthPercentages[2],
              }}
            >
              <AvatarsList
                withStatus={false}
                size="small"
                profiles={outcome.members || []}
              />
            </div>

            {/* Tags */}
            <div
              className="outcome-table-row-metadata-wrapper tags"
              style={{
                width: columnWidthPercentages[3],
                minWidth: columnWidthPercentages[3],
              }}
            >
              <TagsList
                tags={projectTags}
                selectedTags={outcome.tags}
                showAddTagButton={false}
              />
            </div>

            {/* Time */}
            {/* TODO: update time display for different scopes */}
            {/* {outcome.timeFrame} */}
            {/* <div
              className="outcome-table-row-metadata-wrapper time"
              style={{
                width: columnWidthPercentages[4],
                minWidth: columnWidthPercentages[4],
              }}
            >
              March 12 - 24, 2022
            </div> */}
          </div>
          <div
            className="outcome-table-row-hover-button"
            onClick={() => goToOutcome(outcome.headerHash)}
          >
            <Icon name="map.svg" size="small" className="grey" />
          </div>
        </div>
      )}
      {outcome.children.length > 0 &&
        outcome.children.map((outcomeChild) => (
          <OutcomeTableRow
            key={outcomeChild.headerHash}
            columnWidthPercentages={columnWidthPercentages}
            projectTags={projectTags}
            outcome={outcomeChild}
            filter={filter}
            parentExpanded={expanded && parentExpanded}
            indentationLevel={indentationLevel + 1}
            openExpandedView={openExpandedView}
            goToOutcome={goToOutcome}
          />
        ))}
    </>
  )
}

export default OutcomeTableRow
