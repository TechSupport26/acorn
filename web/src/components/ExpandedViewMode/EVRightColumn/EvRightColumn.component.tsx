import React from 'react'
import moment from 'moment'

import {
  AgentPubKeyB64,
  CellIdString,
  HeaderHashB64,
  WithHeaderHash,
} from '../../../types/shared'
import {
  ComputedOutcome,
  ComputedScope,
  ComputedSimpleAchievementStatus,
  EntryPoint,
  Outcome,
  ProjectMeta,
} from '../../../types'
import ButtonToggleSwitch from '../../ButtonToggleSwitch/ButtonToggleSwitch'
import Icon from '../../Icon/Icon'
import ButtonAction from '../../ButtonAction/ButtonAction'
import ButtonCheckbox from '../../ButtonCheckbox/ButtonCheckbox'
import SelectDropdown from '../../SelectDropdown/SelectDropdown'
import { pickColorForString } from '../../../styles'

import './EVRightColumn.scss'
import Typography from '../../Typography/Typography'
import ReadOnlyInfo from '../../ReadOnlyInfo/ReadOnlyInfo'

export type EvRightColumnOwnProps = {
  projectId: CellIdString
  onClose: () => void
  outcome: ComputedOutcome
}

export type EvRightColumnConnectorStateProps = {
  activeAgentPubKey: AgentPubKeyB64
  outcomeHeaderHash: HeaderHashB64
  isEntryPoint: boolean
  entryPointHeaderHash: HeaderHashB64
  projectMeta: WithHeaderHash<ProjectMeta>
}

export type EvRightColumnConnectorDispatchProps = {
  updateOutcome: (outcome: Outcome, headerHash: HeaderHashB64) => Promise<void>
  updateProjectMeta: (
    projectMeta: ProjectMeta,
    headerHash: HeaderHashB64
  ) => Promise<void>
  createEntryPoint: (entryPoint: EntryPoint) => Promise<void>
  deleteEntryPoint: (headerHash: HeaderHashB64) => Promise<void>
  onDeleteClick: (outcomeHeaderHash: HeaderHashB64) => Promise<void>
}

export type EvRightColumnProps = EvRightColumnOwnProps &
  EvRightColumnConnectorStateProps &
  EvRightColumnConnectorDispatchProps

// we can't pass a ComputedOutcome to the backend
// so we strip it back to just the holochain version of an Outcome
const cleanOutcome = (computedOutcome: ComputedOutcome): Outcome => {
  const {
    computedAchievementStatus,
    computedScope,
    headerHash,
    children,
    members,
    comments,
    votes,
    ...outcome
  } = computedOutcome
  return {
    ...outcome,
  }
}

const EVRightColumn: React.FC<EvRightColumnProps> = ({
  // ownProps
  onClose,
  outcome,
  // state props
  activeAgentPubKey,
  outcomeHeaderHash,
  entryPointHeaderHash,
  isEntryPoint,
  projectMeta,
  // dispatch props
  updateOutcome,
  updateProjectMeta,
  createEntryPoint,
  deleteEntryPoint,
  onDeleteClick,
}) => {
  const hasChildren = outcome ? outcome.children.length > 0 : false

  // Annotated Achievement Status
  let computedSimpleAchievedmentStatus = (outcome
    ? outcome.computedAchievementStatus
    : {
        // default while loading
        smallsTotal: 0,
        smallsAchieved: 0,
        uncertains: 0,
        simple: ComputedSimpleAchievementStatus.NotAchieved,
      }
  ).simple
  let reportedAchievementStatus: string
  switch (computedSimpleAchievedmentStatus) {
    case ComputedSimpleAchievementStatus.Achieved:
      reportedAchievementStatus = 'Achieved'
      break
    case ComputedSimpleAchievementStatus.NotAchieved:
      reportedAchievementStatus = 'Not Achieved'
      break
    case ComputedSimpleAchievementStatus.PartiallyAchieved:
      reportedAchievementStatus = 'Partially Achieved'
      break
  }
  const achievementStatusSelected =
    outcome && 'Small' in outcome.scope ? outcome.scope.Small : 'Achieved'
  const achievementStatusOptions = [
    // @ts-ignore
    {
      icon: <Icon name={'achieved.svg'} className="achieved not-hoverable" />,
      text: 'Achieved',
      id: 'Achieved',
    },
    {
      // @ts-ignore
      icon: <Icon name={'x.svg'} className="not-hoverable" />,
      text: 'Not Achieved',
      id: 'NotAchieved',
    },
  ]
  const onAchievementStatusSelect = (id: 'Achieved' | 'NotAchieved') => {
    return updateOutcome(
      {
        ...cleanOutcome(outcome),
        editorAgentPubKey: activeAgentPubKey,
        timestampUpdated: moment().unix(),
        scope: { Small: id },
      },
      outcomeHeaderHash
    )
  }

  // Annotated Scope (when Outcome has no children)
  const isSmall =
    !hasChildren &&
    (outcome ? outcome.computedScope === ComputedScope.Small : true)
  // true for Uncertain, false for Small
  const computedScopeBoolean = outcome
    ? outcome.computedScope === ComputedScope.Uncertain
    : false
  const onScopeSwitchState = async (state: boolean) => {
    return updateOutcome(
      {
        ...cleanOutcome(outcome),
        editorAgentPubKey: activeAgentPubKey,
        timestampUpdated: moment().unix(),
        scope: state ? { Uncertain: 0 } : { Small: 'NotAchieved' },
      },
      outcomeHeaderHash
    )
  }

  // TODO: in breakdown
  const isUncertain = outcome
    ? outcome.computedScope === ComputedScope.Uncertain
    : false
  // const setInBreakdown = (inBreakdown: boolean) => {
  //   updateOutcome(
  //     {
  //       ...outcome,
  //       editorAgentPubKey: activeAgentPubKey,
  //       timestampUpdated: moment().unix(),
  //       // scope, update inBreakdown
  //     },
  //     outcomeHeaderHash
  //   )
  // }

  // High Priority
  // see if the outcome of interest is listed in the set
  // of top priority outcomes for the project
  const topPriorityOutcomes = projectMeta ? projectMeta.topPriorityOutcomes : []
  const isHighPriority = !!topPriorityOutcomes.find(
    (headerHash) => headerHash === outcomeHeaderHash
  )
  const setIsHighPriority = async (state: boolean) => {
    // clone the object from state for
    // modifying it to send over the api
    const { headerHash, ...projectMetaDetails } = projectMeta
    const newProjectMeta = {
      ...projectMetaDetails,
    }
    if (state) {
      newProjectMeta.topPriorityOutcomes = newProjectMeta.topPriorityOutcomes.concat(
        [outcomeHeaderHash]
      )
    } else {
      newProjectMeta.topPriorityOutcomes = newProjectMeta.topPriorityOutcomes.filter(
        (headerHash) => headerHash !== outcomeHeaderHash
      )
    }
    await updateProjectMeta(newProjectMeta, headerHash)
  }

  // EntryPoint related
  const turnIntoEntryPoint = () => {
    createEntryPoint({
      color: pickColorForString(outcomeHeaderHash),
      creatorAgentPubKey: activeAgentPubKey,
      createdAt: Date.now(),
      outcomeHeaderHash: outcomeHeaderHash,
      isImported: false,
    })
  }
  const unmakeAsEntryPoint = () => {
    deleteEntryPoint(entryPointHeaderHash)
  }
  const entryPointClickAction = isEntryPoint
    ? unmakeAsEntryPoint
    : turnIntoEntryPoint

  // TODO: share action

  // Archive action
  const deleteAndClose = async () => {
    await onDeleteClick(outcomeHeaderHash)
    onClose()
  }

  const readOnlyInfos: { icon: React.ReactElement; text: string }[] = [
    // @ts-ignore
    {
      icon: <Icon name="x.svg" className="not-hoverable" />,
      text: reportedAchievementStatus,
    },
  ]
  if (isUncertain) {
    readOnlyInfos.push({
      // @ts-ignore
      icon: <Icon name="activity-history.svg" className="not-hoverable"/>,
      text: 'Uncertain Scope',
    })
  }
  return (
    <div className="expanded-view-right-column-wrapper">
      {/* If this Outcome has children, then we can only */}
      {/* read the computed achievement status and scope, */}
      {/* not annotate them */}
      {hasChildren && (
        <div className="ev-right-column-section">
          <Typography style="h7">
            <div className="ev-right-column-heading">This outcome is</div>
          </Typography>
          <ReadOnlyInfo infos={readOnlyInfos} />
        </div>
      )}
      {/* We can only annotate the achievementStatus and scope */}
      {/* if this Outcome has no children */}
      {!hasChildren && (
        <div className="ev-right-column-section">
          {/* We can only annotate Achievement Status if this Outcome is */}
          {/* annotated Small and has no children */}
          {isSmall && (
            <div className="ev-right-column-section">
              <Typography style="h7">
                <div className="ev-right-column-heading">
                  Achievement Status
                </div>
              </Typography>
              <SelectDropdown
                size="small"
                selectedOptionId={achievementStatusSelected}
                options={achievementStatusOptions}
                onSelect={onAchievementStatusSelect}
              />
            </div>
          )}

          <div className="ev-right-column-section">
            <Typography style="h7">
              {' '}
              <div className="ev-right-column-heading">Scope</div>
            </Typography>
            <ButtonToggleSwitch
              size="small"
              switchState={computedScopeBoolean}
              onSwitchState={onScopeSwitchState}
              state1={{
                // @ts-ignore
                icon: <Icon name="leaf.svg" className="not-hoverable"/>,
                text: 'Small',
              }}
              state2={{
                // @ts-ignore
                icon: <Icon name="uncertain.svg" className="uncertain not-hoverable"/>,
                text: 'Uncertain',
              }}
            />
          </div>
        </div>
      )}
      {/* Mark As Section */}

      <div className="ev-right-column-section">
        <Typography style="h7">
          <div className="ev-right-column-heading">Mark as</div>
        </Typography>
        {/* We can only mark an Uncertain scope Outcome */}
        {/* as being 'in breakdown' mode */}
        {isUncertain && (
          <ButtonCheckbox
            size="small"
            isChecked={false}
            onChange={() => {}}
            // @ts-ignore
            icon={<Icon name="x.svg" className="not-hoverable"/>}
            text="In Breakdown"
          />
        )}
        <ButtonCheckbox
          size="small"
          isChecked={isHighPriority}
          onChange={setIsHighPriority}
          // @ts-ignore
          icon={<Icon name="sort-asc.svg" className="not-hoverable"/>}
          text="High Priority"
        />
        <ButtonCheckbox
          size="small"
          isChecked={isEntryPoint}
          onChange={entryPointClickAction}
          // @ts-ignore
          icon={<Icon name="door-open.svg" className="not-hoverable"/>}
          text="Entry Point"
        />
      </div>
      {/* Actions section */}
      <div className="ev-right-column-section">
        <Typography style="h7">
          <div className="ev-right-column-heading">Actions</div>
        </Typography>
        <ButtonAction
          size="small"
          onClick={() => {}}
          // @ts-ignore
          icon={<Icon name="share.svg" className="not-hoverable" />}
          text="Share"
        />
        <ButtonAction
          size="small"
          onClick={deleteAndClose}
          // @ts-ignore
          icon={<Icon name="archive.svg" className="not-hoverable" />}
          text="Archive"
        />
      </div>
    </div>
  )
}

export default EVRightColumn
