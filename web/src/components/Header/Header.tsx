import React, { useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import './Header.scss'
import { Status } from './Status'
import HeaderLeftPanel from './HeaderLeftPanel'
import HeaderRightPanel from './HeaderRightPanel.connector'
import HeaderMiddlePanel from './HeaderMiddlePanel'

function Header({
  whoami,
  openInviteMembersModal,
  setShowProjectSettingsOpen,
  setShowProfileEditForm,
  setShowPreferences,
  updateStatus,
  activeEntryPoints,
  project,
  projectId,
  goToOutcome,
  members,
  presentMembers,
}) {
  const [isExportOpen, setIsExportOpen] = useState(false)

  const [status, setStatus] = useState<Status>(
    whoami ? whoami.entry.status : Status.Online
  )

  // click handlers
  const ref = useRef()
  useOnClickOutside(ref, () => {
    setIsExportOpen(false)
  })
  const onClickExport = () => {
    setIsExportOpen(!isExportOpen)
  }
  const onClickEditProfile = () => {
    setIsExportOpen(false)
    setShowProfileEditForm(true)
  }

  const changeStatus = (status: Status) => {
    setStatus(status)
  }
  const saveStatus = (status: Status) => {
    // persist
    updateStatus(status)
    // change local to the component
    changeStatus(status)
  }
  const onClickPreferences = () => {
    setIsExportOpen(false)
    // call the prop function
    setShowPreferences(true)
  }

  const openInviteMembersModalForActive = () => {
    if (project) {
      openInviteMembersModal(project.passphrase)
    }
  }

  return (
    <div className="header-wrapper" ref={ref}>
      {/* <UpdateBar
        active={showUpdateBar}
        onClose={() => setShowUpdateBar(false)}
        setShowUpdatePromptModal={setShowUpdatePromptModal}
      /> */}
      <div className="header">
        <HeaderLeftPanel
          members={members}
          presentMembers={presentMembers}
          whoami={whoami}
          openInviteMembersModal={openInviteMembersModalForActive}
          setShowProjectSettingsOpen={setShowProjectSettingsOpen}
          projectName={project.name}
          isExportOpen={isExportOpen}
          onClickExport={onClickExport}
          activeEntryPoints={activeEntryPoints}
          goToOutcome={goToOutcome}
        />
        <HeaderMiddlePanel
          projectId={projectId}
          projectPriorityMode={project.priorityMode}
        />
        {whoami && (
          // add all these values as props
          <HeaderRightPanel
            {...{
              status,
              whoami,
              onClickEditProfile,
              onClickPreferences,
              saveStatus,
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Header
