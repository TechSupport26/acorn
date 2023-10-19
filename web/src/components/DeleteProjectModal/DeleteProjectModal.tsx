import React from 'react'

import './DeleteProjectModal.scss'

import Modal from '../Modal/Modal'
import {
  ProjectModalContent,
  ProjectModalContentSpacer,
  ProjectModalHeading,
} from '../ProjectModal/ProjectModal'
import Button from '../Button/Button'
import { CellIdString } from '../../types/shared'

export type DeleteProjectModalProps = {
  showModal: boolean
  projectAppId: string
  projectCellId: CellIdString
  projectName: string
  onClose: () => void
  uninstallProject: (appId: string, cellIdString: CellIdString) => Promise<void>
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  showModal,
  projectAppId,
  projectCellId,
  projectName,
  onClose,
  uninstallProject,
}) => {
  const uninstall = () => {
    uninstallProject(projectAppId, projectCellId)
    onClose()
  }

  return (
    <>
      <Modal active={showModal} onClose={onClose}>
        <ProjectModalHeading title="Delete project" />
        <ProjectModalContentSpacer>
          <ProjectModalContent>
            Are you sure you want to delete the project '{projectName}'? This
            action will delete all the project data and can’t be undone.
          </ProjectModalContent>
        </ProjectModalContentSpacer>
        <div className="modal-buttons-wrapper">
          <Button
            text={'Delete this project'}
            className="warning"
            onClick={uninstall}
          />
          <Button text={'Nevermind'} onClick={onClose} />
        </div>
      </Modal>
    </>
  )
}

export default DeleteProjectModal
