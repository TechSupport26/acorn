import _ from 'lodash'
import { coordsPageToCanvas } from '../drawing/coordinateSystems'
import { checkForOutcomeAtCoordinatesInBox } from '../drawing/eventDetection'
import {
  selectConnection,
  selectOutcome,
  unselectOutcome,
  unselectAll,
} from '../redux/ephemeral/selection/actions'
import {
  hoverOutcome,
  unhoverOutcome,
  hoverConnection,
  unhoverConnection,
} from '../redux/ephemeral/hover/actions'
import {
  setShiftKeyDown,
  unsetShiftKeyDown,
} from '../redux/ephemeral/keyboard/actions'
import {
  setMousedown,
  unsetMousedown,
  setLiveCoordinate,
  setCoordinate,
  unsetCoordinate,
  unsetOutcomes,
  setOutcomes,
  setContextMenu,
  unsetContextMenu,
  setClosestOutcome,
} from '../redux/ephemeral/mouse/actions'
import {
  openOutcomeForm,
  closeOutcomeForm,
} from '../redux/ephemeral/outcome-form/actions'
import { deleteOutcomeFully } from '../redux/persistent/projects/outcomes/actions'
import { setScreenDimensions } from '../redux/ephemeral/screensize/actions'
import {
  changeTranslate,
  changeScale,
  animatePanAndZoom,
} from '../redux/ephemeral/viewport/actions'
import {
  closeExpandedView,
  openExpandedView,
} from '../redux/ephemeral/expanded-view/actions'
import {
  COORDINATES,
  MOUSE,
  TRACKPAD,
} from '../redux/ephemeral/local-preferences/reducer'
import { setOutcomeClone } from '../redux/ephemeral/outcome-clone/actions'
import cloneOutcomes from './cloneOutcomes'
import {
  resetOutcomeConnector,
  setOutcomeConnectorTo,
} from '../redux/ephemeral/outcome-connector/actions'
import ProjectsZomeApi from '../api/projectsApi'
import { getAppWs } from '../hcWebsockets'
import { cellIdFromString } from '../utils'
import { triggerUpdateLayout } from '../redux/ephemeral/layout/actions'
import {
  deleteConnection,
} from '../redux/persistent/projects/connections/actions'
import { ActionHashB64, Option } from '../types/shared'
import { ComputedOutcome, LinkedOutcomeDetails } from '../types'
import { RootState } from '../redux/reducer'
import {
  findChildrenActionHashes,
  findParentsActionHashes,
  findSiblingActionHash,
  RightOrLeft,
} from '../tree-logic'
import { OUTCOME_VERTICAL_HOVER_ALLOWANCE } from '../drawing/dimensions'
import checkForOutcomeOrConnection, {
  OutcomeConnectionOrBoth,
} from './checkForOutcomeOrConnection'
import closestOutcomeToPageCoord from './closestOutcome'
import {
  setNavModalOpenChildren,
  setNavModalOpenParents,
} from '../redux/ephemeral/navigation-modal/actions'
import {
  alterSiblingOrder,
} from '../connections'
import handleOutcomeConnectorMouseUp from '../redux/ephemeral/outcome-connector/handler'

// The "modifier" key is different on Mac and non-Mac
// Pattern borrowed from TinyKeys library.
// --
// https://github.com/jamiebuilds/tinykeys/blob/e0d23b4f248af59ffbbe52411505c3d681c73045/src/tinykeys.ts#L50-L54
var macOsPattern = /Mac|macOS|iPod|iPhone|iPad/
let platform =
  // @ts-ignore
  navigator?.userAgentData?.platform || navigator?.platform || 'unknown'
const isMacish = macOsPattern.test(platform)
const operatingSystemModifier = isMacish ? 'metaKey' : 'ctrlKey'

function handleMouseUpForOutcomeForm({
  state,
  event,
  store,
  maybeLinkedOutcome,
  existingParentConnectionAddress,
}: {
  state: RootState
  event: MouseEvent
  store: any // redux store, for the sake of dispatch
  maybeLinkedOutcome: Option<LinkedOutcomeDetails>
  existingParentConnectionAddress?: ActionHashB64
}) {
  const calcedPoint = coordsPageToCanvas(
    {
      x: event.clientX,
      y: event.clientY,
    },
    state.ui.viewport.translate,
    state.ui.viewport.scale
  )
  store.dispatch(
    openOutcomeForm({
      topConnectionYPosition: calcedPoint.y,
      leftConnectionXPosition: calcedPoint.x,
      editAddress: null,
      maybeLinkedOutcome,
      existingParentConnectionAddress
    })
  )
}

function leftMostOutcome(
  outcomeActionHashes: ActionHashB64[],
  state: RootState
): ActionHashB64 {
  return _.minBy(outcomeActionHashes, (actionHash) => {
    return state.ui.layout.coordinates[actionHash].x
  })
}

// outcomes is ComputedOutcomes in an object, keyed by their actionHash
export default function setupEventListeners(
  store: any,
  canvas: HTMLCanvasElement,
  outcomes: { [actionHash: ActionHashB64]: ComputedOutcome }
) {
  function windowResize() {
    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1
    // Get the size of the canvas in CSS pixels.
    const rect = canvas.getBoundingClientRect()
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    store.dispatch(setScreenDimensions(rect.width * dpr, rect.height * dpr))
  }

  function canPerformKeyboardAction(state: RootState): boolean {
    return (
      state.ui.selection.selectedOutcomes.length === 1 &&
      !state.ui.outcomeForm.isOpen &&
      !state.ui.expandedView.isOpen &&
      !state.ui.navigationModal.open
    )
  }

  function getKeyboardNavigationPreference(state: RootState): string {
    return state.ui.localPreferences.keyboardNavigation
  }

  function panAndZoom(actionHash: string) {
    store.dispatch(animatePanAndZoom(actionHash, false))
  }

  async function bodyKeydown(event: KeyboardEvent) {
    const appWebsocket = await getAppWs()
    const projectsZomeApi = new ProjectsZomeApi(appWebsocket)
    let state: RootState = store.getState()
    const {
      ui: { activeProject },
    } = state
    const cellId = cellIdFromString(activeProject)
    // there are event.code and event.key ...
    // event.key is keyboard layout independent, so works for Dvorak users
    switch (event.key) {
      case 'Enter':
        if (canPerformKeyboardAction(state)) {
          event.stopPropagation()
          store.dispatch(
            openExpandedView(state.ui.selection.selectedOutcomes[0])
          )
        }

        break

      // Used for navigating to a child
      case 'ArrowDown':
        if (canPerformKeyboardAction(state)) {
          const selectedOutcome = state.ui.selection.selectedOutcomes[0]

          const childrenActionHashes = findChildrenActionHashes(
            selectedOutcome,
            state
          )
          if (childrenActionHashes.length) {
            event.stopPropagation()
            const keyboardNavPreference = getKeyboardNavigationPreference(state)
            if (childrenActionHashes.length === 1) {
              panAndZoom(childrenActionHashes[0])
            } else if (keyboardNavPreference === COORDINATES) {
              // navigate to the left-most child
              const leftMostChild = leftMostOutcome(childrenActionHashes, state)
              panAndZoom(leftMostChild)
            } else {
              store.dispatch(setNavModalOpenChildren(childrenActionHashes))
            }
          }
        }
        break

      // Used for navigating to a parent
      case 'ArrowUp':
        if (canPerformKeyboardAction(state)) {
          const selectedOutcome = state.ui.selection.selectedOutcomes[0]
          const parentsActionHashes = findParentsActionHashes(
            selectedOutcome,
            state
          )
          if (parentsActionHashes.length) {
            event.stopPropagation()
            const keyboardNavPreference = getKeyboardNavigationPreference(state)
            if (parentsActionHashes.length === 1) {
              panAndZoom(parentsActionHashes[0])
            } else if (keyboardNavPreference === COORDINATES) {
              // navigate to the left most parent
              const leftMostParent = leftMostOutcome(parentsActionHashes, state)
              panAndZoom(leftMostParent)
            } else {
              store.dispatch(setNavModalOpenParents(parentsActionHashes))
            }
          }
        }

        break

      // Used for navigating to the left sibling
      case 'ArrowLeft':
        if (canPerformKeyboardAction(state)) {
          const selectedOutcome = state.ui.selection.selectedOutcomes[0]
          const targetActionHash = findSiblingActionHash(
            selectedOutcome,
            state,
            RightOrLeft.Left
          )
          if (event.shiftKey && targetActionHash) {
            // only do this if selected outcome has a left sibling
            // move the selected outcome to the left side of the left sibling
            // (swap positions with the left sibling)
            alterSiblingOrder(
              store,
              state,
              selectedOutcome,
              targetActionHash,
              RightOrLeft.Left
            )
          } else if (targetActionHash) {
            // select and pan and zoom to
            // the parent
            store.dispatch(animatePanAndZoom(targetActionHash, false))
          }
        }
        break

      // Used for navigating to the right sibling
      case 'ArrowRight':
        if (canPerformKeyboardAction(state)) {
          const selectedOutcome = state.ui.selection.selectedOutcomes[0]
          const targetActionHash = findSiblingActionHash(
            selectedOutcome,
            state,
            RightOrLeft.Right
          )
          if (event.shiftKey && targetActionHash) {
            // only do this if selected outcome has a right sibling
            // move the selected outcome to the right side of the right sibling
            // (swap positions with the right sibling)
            alterSiblingOrder(
              store,
              state,
              selectedOutcome,
              targetActionHash,
              RightOrLeft.Right
            )
          } else if (targetActionHash) {
            // select and pan and zoom to
            // the parent
            store.dispatch(animatePanAndZoom(targetActionHash, false))
          }
        }
        break

      // Used in multi selecting Outcomes
      case 'Shift':
        store.dispatch(setShiftKeyDown())
        break
      case 'Escape':
        // Only unselect all Outcomes if the expanded view
        // is not open
        if (!state.ui.expandedView.isOpen && !state.ui.navigationModal.open) {
          store.dispatch(unselectAll())
        }
        store.dispatch(closeOutcomeForm())
        store.dispatch(resetOutcomeConnector())
        break
      case 'Backspace':
        let selection = state.ui.selection
        // only dispatch if something's selected and the OutcomeForm and ExpandedView are
        // not open
        if (
          selection.selectedConnections.length > 0 &&
          !state.ui.outcomeForm.isOpen &&
          !state.ui.expandedView.isOpen
        ) {
          // if on firefox, and matched this case
          // prevent the browser from navigating back to the last page
          event.preventDefault()
          for await (const connection of selection.selectedConnections) {
            await projectsZomeApi.connection.delete(cellId, connection)
            store.dispatch(deleteConnection(activeProject, connection))
            // this action will trigger a recalc
            // and layout animation update, which is natural in this context.
            // we have to trigger it manually because there is a scenario where
            // deleteConnection should NOT trigger a layout recalc
            store.dispatch(triggerUpdateLayout())
          }
        } else if (
          selection.selectedOutcomes.length > 0 &&
          !state.ui.outcomeForm.isOpen &&
          !state.ui.expandedView.isOpen
        ) {
          // if on firefox, and matched this case
          // prevent the browser from navigating back to the last page
          event.preventDefault()
          for await (const outcome of selection.selectedOutcomes) {
            const fullyDeletedOutcome = await projectsZomeApi.outcome.deleteOutcomeFully(
              cellId,
              outcome
            )
            store.dispatch(
              deleteOutcomeFully(activeProject, fullyDeletedOutcome)
            )
          }
        }
        break
      case 'c':
        if (
          event[operatingSystemModifier] &&
          state.ui.selection.selectedOutcomes.length &&
          !state.ui.outcomeForm.isOpen &&
          !state.ui.expandedView.isOpen
        ) {
          store.dispatch(setOutcomeClone(state.ui.selection.selectedOutcomes))
        }
        break
      case 'v':
        if (
          event[operatingSystemModifier] &&
          state.ui.outcomeClone.outcomes.length &&
          !state.ui.outcomeForm.isOpen &&
          !state.ui.expandedView.isOpen
        ) {
          cloneOutcomes(store)
        }
        break
      default:
        // console.log(event)
        break
    }
    // console.log(event)
  }

  function bodyKeyup(event) {
    // there are event.code and event.key ...
    // event.key is keyboard layout independent, so works for Dvorak users
    switch (event.key) {
      case 'Shift':
        store.dispatch(unsetShiftKeyDown())
        break
      default:
        // console.log(event)
        break
    }
  }

  // this method is being called super frequently, and is not performance optimized
  // and seems to be dragging down the performance as a bottleneck.
  function canvasMousemove(event: MouseEvent) {
    const state: RootState = store.getState()
    const {
      ui: {
        viewport: { translate, scale },
        mouse: {
          coordinate: { x: initialSelectX, y: initialSelectY },
        },
        layout: {
          coordinates: outcomesCoordinates,
          dimensions: outcomesDimensions,
        },
      },
    } = state

    const convertedCurrentMouse = coordsPageToCanvas(
      {
        x: event.clientX,
        y: event.clientY,
      },
      translate,
      scale
    )
    store.dispatch(setLiveCoordinate(convertedCurrentMouse))

    const closestOutcome = closestOutcomeToPageCoord(
      convertedCurrentMouse,
      outcomesCoordinates
    )
    // store the closest outcome, if there is one
    store.dispatch(setClosestOutcome(closestOutcome))

    // this only is true if the CANVAS was clicked
    // meaning it is not true if e.g. an OutcomeConnector html element
    // was clicked
    if (state.ui.mouse.mousedown) {
      if (event.shiftKey) {
        const outcomeActionHashesToSelect = checkForOutcomeAtCoordinatesInBox(
          outcomesCoordinates,
          outcomesDimensions,
          outcomes,
          convertedCurrentMouse,
          { x: initialSelectX, y: initialSelectY }
        )
        store.dispatch(setOutcomes(outcomeActionHashesToSelect))
      } else {
        store.dispatch(changeTranslate(event.movementX, event.movementY))
      }
      return
    }

    // for hover, we use OUTCOME_VERTICAL_HOVER_ALLOWANCE
    // to make it so that the OutcomeConnector can display
    // without glitchiness
    const checks = checkForOutcomeOrConnection(
      OutcomeConnectionOrBoth.Both,
      state,
      event.clientX,
      event.clientY,
      outcomes,
      OUTCOME_VERTICAL_HOVER_ALLOWANCE
    )
    if (
      checks.connectionActionHash &&
      state.ui.hover.hoveredConnection !== checks.connectionActionHash
    ) {
      store.dispatch(hoverConnection(checks.connectionActionHash))
    } else if (
      !checks.connectionActionHash &&
      state.ui.hover.hoveredConnection
    ) {
      store.dispatch(unhoverConnection())
    }

    if (
      checks.outcomeActionHash &&
      state.ui.hover.hoveredOutcome !== checks.outcomeActionHash
    ) {
      store.dispatch(hoverOutcome(checks.outcomeActionHash))
      // hook up if the connection connector to a new Outcome
      // if we are using the connection connector
      // and IMPORTANTLY if Outcome is in the list of `validToAddresses`
      if (
        state.ui.outcomeConnector.maybeLinkedOutcome &&
        state.ui.outcomeConnector.validToAddresses.includes(
          checks.outcomeActionHash
        )
      ) {
        store.dispatch(setOutcomeConnectorTo(checks.outcomeActionHash))
      }
    } else if (!checks.outcomeActionHash && state.ui.hover.hoveredOutcome) {
      store.dispatch(unhoverOutcome())
      store.dispatch(setOutcomeConnectorTo(null))
    }
  }

  function canvasWheel(event: WheelEvent) {
    const state = store.getState()
    const {
      ui: {
        localPreferences: { navigation },
      },
    } = state
    if (!state.ui.outcomeForm.isOpen) {
      store.dispatch(unhoverOutcome())
      store.dispatch(unsetContextMenu())
      // from https://medium.com/@auchenberg/detecting-multi-touch-trackpad-gestures-in-javascript-a2505babb10e
      // and https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate
      if (navigation === MOUSE || (navigation === TRACKPAD && event.ctrlKey)) {
        // Normalize wheel to +1 or -1.
        const wheel = event.deltaY < 0 ? 1 : -1
        const zoomIntensity = 0.07 // 0.05
        // Compute zoom factor.
        const zoom = Math.exp(wheel * zoomIntensity)
        const pageCoord = { x: event.clientX, y: event.clientY }
        const instant = true
        store.dispatch(changeScale(zoom, pageCoord, instant))
      } else {
        // invert the pattern so that it uses new mac style
        // of panning
        store.dispatch(changeTranslate(-1 * event.deltaX, -1 * event.deltaY))
      }
    }
    event.preventDefault()
  }

  function canvasClick(event: MouseEvent) {
    const state: RootState = store.getState()
    // outcomesAddresses are Outcomes to be selected
    const {
      ui: {
        mouse: { outcomesAddresses },
      },
    } = state

    if (outcomesAddresses) {
      // finishing a drag box selection action
      outcomesAddresses.forEach((value) => store.dispatch(selectOutcome(value)))
    } else {
      // check for Outcome or Connection at clicked location
      // select it if so
      const checks = checkForOutcomeOrConnection(
        OutcomeConnectionOrBoth.Both,
        state,
        event.clientX,
        event.clientY,
        outcomes
      )
      if (checks.connectionActionHash) {
        store.dispatch(unselectAll())
        store.dispatch(selectConnection(checks.connectionActionHash))
      } else if (checks.outcomeActionHash) {
        // if the shift key is being use, do an 'additive' select
        // where you add the Outcome to the list of selected
        if (!event.shiftKey) {
          store.dispatch(unselectAll())
        }
        // if using shift, and Outcome is already selected, unselect it
        if (
          event.shiftKey &&
          state.ui.selection.selectedOutcomes.indexOf(
            checks.outcomeActionHash
          ) > -1
        ) {
          store.dispatch(unselectOutcome(checks.outcomeActionHash))
        } else {
          store.dispatch(selectOutcome(checks.outcomeActionHash))
        }
      } else {
        // If nothing was selected, that means empty
        // spaces was clicked: deselect everything
        store.dispatch(unselectAll())
      }
    }

    // clear box selection vars
    store.dispatch(unsetCoordinate())
    store.dispatch(unsetOutcomes())
    store.dispatch(unsetContextMenu())
  }

  function canvasMousedown(event: MouseEvent) {
    const state: RootState = store.getState()
    const {
      ui: {
        viewport: { translate, scale },
      },
    } = state
    // don't set mouseDown if it's a right click
    const RIGHT_CLICK_BUTTON = 2
    if (event.button !== RIGHT_CLICK_BUTTON) {
      store.dispatch(setMousedown())
      store.dispatch(unsetContextMenu())
      const convertedCurrentMouse = coordsPageToCanvas(
        {
          x: event.clientX,
          y: event.clientY,
        },
        translate,
        scale
      )
      store.dispatch(setCoordinate(convertedCurrentMouse))
    }
  }

  function canvasMouseup(event: MouseEvent) {
    const state: RootState = store.getState()
    const {
      maybeLinkedOutcome,
      toAddress,
      existingParentConnectionAddress,
    } = state.ui.outcomeConnector
    const { activeProject } = state.ui

    // if we are using the Connection Connector
    if (maybeLinkedOutcome) {
      // covers the case where we are hovered over an Outcome
      // and thus making a connection to an existing Outcome
      // AS WELL AS the case where we are not
      // (to reset the connection connector)
      handleOutcomeConnectorMouseUp(
        maybeLinkedOutcome,
        toAddress,
        existingParentConnectionAddress,
        activeProject,
        store.dispatch
      )
      // covers the case where we are not hovered over an Outcome
      // and thus making a new Outcome and connection/Connection
      if (!toAddress) {
        // here we transfer the `maybeLinkedOutcome` from the Outcome Connector
        // state over to the Outcome Form state
        handleMouseUpForOutcomeForm({
          state,
          event,
          store,
          maybeLinkedOutcome,
          existingParentConnectionAddress,
        })
      }
    }

    // update the mouse aware state
    store.dispatch(unsetMousedown())
  }

  // DOUBLE CLICK
  function canvasDoubleclick(event: MouseEvent) {
    const state: RootState = store.getState()
    const {
      ui: {
        viewport: { translate, scale },
      },
    } = state
    const checks = checkForOutcomeOrConnection(
      OutcomeConnectionOrBoth.Outcome,
      state,
      event.clientX,
      event.clientY,
      outcomes
    )
    if (checks.outcomeActionHash) {
      store.dispatch(openExpandedView(checks.outcomeActionHash))
    } else {
      const canvasPoint = coordsPageToCanvas(
        {
          x: event.clientX,
          y: event.clientY,
        },
        translate,
        scale
      )
      store.dispatch(openOutcomeForm({
        leftConnectionXPosition: canvasPoint.x,
        topConnectionYPosition: canvasPoint.y,
        editAddress: null,
        maybeLinkedOutcome: null,
        existingParentConnectionAddress: null,
      }))
    }
  }

  function canvasContextMenu(event: MouseEvent) {
    event.preventDefault()
    const state: RootState = store.getState()
    const checks = checkForOutcomeOrConnection(
      OutcomeConnectionOrBoth.Outcome,
      state,
      event.clientX,
      event.clientY,
      outcomes
    )
    // at this time, we are only displaying the ContextMenu if you
    // right-clicked ON an Outcome
    if (checks.outcomeActionHash) {
      store.dispatch(
        setContextMenu(checks.outcomeActionHash, {
          x: event.clientX,
          y: event.clientY,
        })
      )
    }
  }

  window.addEventListener('resize', windowResize)
  document.body.addEventListener('keydown', bodyKeydown)
  document.body.addEventListener('keyup', bodyKeyup)
  canvas.addEventListener('mousemove', canvasMousemove)
  canvas.addEventListener('wheel', canvasWheel)
  canvas.addEventListener('mousedown', canvasMousedown)
  canvas.addEventListener('mouseup', canvasMouseup)
  canvas.addEventListener('dblclick', canvasDoubleclick)
  // This listener is bound to the canvas only so clicks on other parts of
  // the UI like the OutcomeForm won't trigger it.
  canvas.addEventListener('click', canvasClick)
  canvas.addEventListener('contextmenu', canvasContextMenu)

  return function cleanup() {
    window.removeEventListener('resize', windowResize)
    document.body.removeEventListener('keydown', bodyKeydown)
    document.body.removeEventListener('keyup', bodyKeyup)
    canvas.removeEventListener('mousemove', canvasMousemove)
    canvas.removeEventListener('wheel', canvasWheel)
    canvas.removeEventListener('mousedown', canvasMousedown)
    canvas.removeEventListener('mouseup', canvasMouseup)
    canvas.removeEventListener('dblclick', canvasDoubleclick)
    // This listener is bound to the canvas only so clicks on other parts of
    // the UI like the OutcomeForm won't trigger it.
    canvas.removeEventListener('click', canvasClick)
    canvas.removeEventListener('contextmenu', canvasContextMenu)
  }
}
