import { connect } from 'react-redux'
import ProjectsZomeApi from '../../../../../api/projectsApi'
import { getAppWs } from '../../../../../hcWebsockets'
import {
  startTitleEdit,
  endTitleEdit,
  startDescriptionEdit,
  endDescriptionEdit,
} from '../../../../../redux/ephemeral/outcome-editing/actions'
import { deleteOutcomeMember } from '../../../../../redux/persistent/projects/outcome-members/actions'
import { updateOutcome } from '../../../../../redux/persistent/projects/outcomes/actions'
import { RootState } from '../../../../../redux/reducer'
import { AssigneeWithHeaderHash, Outcome } from '../../../../../types'
import { HeaderHashB64 } from '../../../../../types/shared'
import { cellIdFromString } from '../../../../../utils'
import EvDetails, {
  EvDetailsConnectorDispatchProps,
  EvDetailsConnectorStateProps,
  EvDetailsOwnProps,
} from './EvDetails.component'

function mapStateToProps(
  state: RootState,
  ownProps: EvDetailsOwnProps
): EvDetailsConnectorStateProps {
  const { projectId } = ownProps
  const outcomeHeaderHash = state.ui.expandedView.outcomeHeaderHash
  const outcomeMembers = state.projects.outcomeMembers[projectId] || {}

  // assignees
  let assignees: AssigneeWithHeaderHash[] = []
  if (outcomeHeaderHash) {
    assignees = Object.keys(outcomeMembers)
      .map((headerHash) => outcomeMembers[headerHash])
      .filter(
        (outcomeMember) => outcomeMember.outcomeHeaderHash === outcomeHeaderHash
      )
      .map((outcomeMember) => {
        const assignee = {
          profile: state.agents[outcomeMember.memberAgentPubKey],
          outcomeMemberHeaderHash: outcomeMember.headerHash,
        }
        return assignee
      })
  }

  // TODO: fix this fn
  // it shouldn't use `delete`
  // editingPeers
  function filterAndAddAgentInfo(agentInfo) {
    delete agentInfo.projectId
    delete agentInfo.outcomeExpandedView
    agentInfo.profileInfo = state.agents[agentInfo.agentPubKey]
    return agentInfo
  }
  const editingPeers = Object.values(state.ui.realtimeInfo)
    .filter((agentInfo) => agentInfo.outcomeBeingEdited)
    .filter(
      (agentInfo) =>
        agentInfo.outcomeBeingEdited.outcomeHeaderHash === outcomeHeaderHash
    )
    .map((agentInfo) => filterAndAddAgentInfo(agentInfo))
  // this should only ever by a maximum of two peers (one editing title, one editing description)

  return {
    outcomeHeaderHash,
    activeAgentPubKey: state.agentAddress,
    profiles: state.agents,
    editingPeers,
    assignees,
  }
}

function mapDispatchToProps(
  dispatch,
  ownProps: EvDetailsOwnProps
): EvDetailsConnectorDispatchProps {
  const { projectId: cellIdString } = ownProps
  const cellId = cellIdFromString(cellIdString)
  return {
    updateOutcome: async (outcome: Outcome, headerHash: HeaderHashB64) => {
      const appWebsocket = await getAppWs()
      const projectsZomeApi = new ProjectsZomeApi(appWebsocket)
      const updatedOutcome = await projectsZomeApi.outcome.update(cellId, {
        headerHash,
        entry: outcome,
      })
      return dispatch(updateOutcome(cellIdString, updatedOutcome))
    },
    deleteOutcomeMember: async (headerHash: HeaderHashB64) => {
      const appWebsocket = await getAppWs()
      const projectsZomeApi = new ProjectsZomeApi(appWebsocket)
      await projectsZomeApi.outcomeMember.delete(cellId, headerHash)
      return dispatch(deleteOutcomeMember(cellIdString, headerHash))
    },
    startTitleEdit: (outcomeHeaderHash: HeaderHashB64) => {
      return dispatch(startTitleEdit(outcomeHeaderHash))
    },
    endTitleEdit: (outcomeHeaderHash: HeaderHashB64) => {
      return dispatch(endTitleEdit(outcomeHeaderHash))
    },
    startDescriptionEdit: (outcomeHeaderHash: HeaderHashB64) => {
      return dispatch(startDescriptionEdit(outcomeHeaderHash))
    },
    endDescriptionEdit: (outcomeHeaderHash: HeaderHashB64) => {
      return dispatch(endDescriptionEdit(outcomeHeaderHash))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EvDetails)
