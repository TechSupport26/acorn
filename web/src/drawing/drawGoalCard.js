import {
  avatarHeight,
  avatarWidth,
  avatarRadius,
  avatarSpace,
  goalWidth,
  cornerRadius,
  borderWidth,
  textBoxMarginLeft,
  textBoxMarginTop,
  fontSizeInt,
  fontSizeLargeInt,
  fontSizeExtraLargeInt,
  lineSpacing,
  letterSpacing,
  getGoalHeight,
  getLinesForParagraphs,
  firstZoomThreshold,
  secondZoomThreshold,
  lineSpacingExtraLarge,
  lineSpacingLarge,
} from './dimensions'

import {
  selectedColor,
  colors,
  pickColorForString,
  SELF_ASSIGNED_STATUS_COLORS,
} from '../styles'
import { getOrSetImageForUrl } from './imageCache'
import moment from 'moment'

import drawRoundCornerRectangle from './drawRoundCornerRectangle'

// render a goal card
export default function render({
  scale,
  goal,
  members,
  coordinates,
  isEditing,
  editText,
  isSelected,
  isHovered,
  ctx,
  isBeingEdited, // realtime info
  isBeingEditedBy,
  allMembersActiveOnGoal, // realtime info
  isTopPriorityGoal,
}) {
  let goalLeftX, goalTopY
  if (coordinates) {
    goalLeftX = coordinates.x
    goalTopY = coordinates.y
  } else {
    // do not render if we don't have coordinates
    // this can happen if we've just became aware of the goal
    // and the layout has not been re-calculated using layoutFormula
    return
  }

  // use the editText for measuring,
  // even though it's not getting drawn on the canvas
  const text = isEditing ? editText : goal.content

  const goalHeight = getGoalHeight(ctx, text, scale, isEditing)

  // set up border color
  let borderColor = colors[goal.status]

  let backgroundColor = '#FFFFFF'
  if (isHovered) {
    backgroundColor = '#f2f1ef'
  }
  // else if (isBeingEdited) {
  //   backgroundColor = '#EAEAEA'
  // }

  const halfBorder = borderWidth / 2 // for use with 'stroke' of the border
  const twiceBorder = borderWidth * 2

  const selectedOutlineMargin = 1
  const selectedOutlineWidth = '4'

  // display leaf icon for small goal
  // const leafHierarchyIcon = iconForHierarchy(goal.hierarchy)
  if (goal.hierarchy === 'Leaf') {
    const leafImg = getOrSetImageForUrl(
      `img/leaf_${goal.status.toLowerCase()}.svg`,
      30,
      30
    )
    // url, x coordinate, y coordinate, width, height
    if (leafImg) {
      ctx.drawImage(leafImg, goalLeftX - 24, goalTopY - 24, 30, 30)
    }
  }
  // card background
  drawRoundCornerRectangle({
    context: ctx,
    xPosition: goalLeftX + borderWidth,
    yPosition: goalTopY + borderWidth,
    width: goalWidth - twiceBorder,
    height: goalHeight - twiceBorder,
    radius: cornerRadius - 1,
    color: backgroundColor,
    stroke: false,
    strokeWidth: '0',
    boxShadow: true,
    topPriorityGoalGlow: isTopPriorityGoal ? borderColor : null,
  })
  // card border
  drawRoundCornerRectangle({
    context: ctx,
    xPosition: goalLeftX + halfBorder,
    yPosition: goalTopY + halfBorder,
    width: goalWidth - borderWidth,
    height: goalHeight - borderWidth,
    radius: cornerRadius,
    color: borderColor,
    stroke: true,
    strokeWidth: '4',
    boxShadow: false,
    topPriorityGoalGlow: false,
  })

  // selection outline (purple)
  if (isSelected) {
    let xStart =
      goalLeftX -
      selectedOutlineMargin +
      1 -
      halfBorder -
      Number(selectedOutlineWidth) / 2
    let yStart =
      goalTopY -
      selectedOutlineMargin +
      1 -
      halfBorder -
      Number(selectedOutlineWidth) / 2
    let w =
      goalWidth +
      2 * (selectedOutlineMargin - 1) +
      borderWidth +
      Number(selectedOutlineWidth)
    let h =
      goalHeight +
      2 * (selectedOutlineMargin - 1) +
      borderWidth +
      Number(selectedOutlineWidth)
    let cr = cornerRadius + selectedOutlineMargin * 2 + 2

    drawRoundCornerRectangle({
      context: ctx,
      xPosition: xStart,
      yPosition: yStart,
      width: w,
      height: h,
      radius: cr,
      color: selectedColor,
      stroke: true,
      strokeWidth: selectedOutlineWidth,
      boxShadow: false,
      topPriorityGoalGlow: false,
    })
  }
  /*
  TITLE
  */
  // render text, if not in edit mode
  // in which case the text is being rendered in the textarea
  // html element being overlaid on top of this Goal
  if (!isEditing) {
    const textBoxLeft = goalLeftX + textBoxMarginLeft
    const textBoxTop = goalTopY + textBoxMarginTop
    const lines = getLinesForParagraphs(ctx, text, scale)
    // for space reasons
    // we limit the number of visible lines of the Goal Title to 2 or 3,
    // and provide an ellipsis if there are more lines than that
    let lineLimit = 3
    // for extra large text, reduce to only two lines
    if (scale < secondZoomThreshold) {
      lineLimit = 2
    }
    let lineSpacingToUse = lineSpacing // the default
    let fontSizeToUse = fontSizeInt
    if (scale < secondZoomThreshold) {
      lineSpacingToUse = lineSpacingExtraLarge
      fontSizeToUse = fontSizeExtraLargeInt
    } else if (scale < firstZoomThreshold) {
      lineSpacingToUse = lineSpacingLarge
      fontSizeToUse = fontSizeLargeInt
    }
    let titleTextColor = '#4D4D4D'
    // if (isBeingEdited) {
    //   titleTextColor = '#888888'
    // }
    ctx.fillStyle = titleTextColor
    lines.slice(0, lineLimit).forEach((line, index) => {
      let linePosition = index * (fontSizeToUse + lineSpacingToUse)
      let lineText = line
      // if we're on the last line and there's more than the visible number of lines
      if (lines.length > lineLimit && index === lineLimit - 1) {
        // then replace the last characters with an ellipsis
        // to indicate that there's more that's hidden
        lineText = `${line.slice(0, line.length - 3)}...`
      }
      ctx.fillText(lineText, textBoxLeft, textBoxTop + linePosition)
    })
  }

  const goalMetaPadding = 12
  /*
  TIMEFRAME
  */
  if (goal.time_frame) {
    const calendarWidth = 12,
      calendarHeight = 14
    const img = getOrSetImageForUrl('', calendarWidth, calendarHeight)
    // wait for the image to load before
    // trying to draw
    if (!img) return
    // image will draw, so calculate where to put it
    // and the text
    const xImgDraw = goalLeftX + goalMetaPadding + 4
    const yImgDraw =
      goalTopY + goalHeight - calendarHeight - goalMetaPadding - 6
    const textBoxLeft = xImgDraw + textBoxMarginLeft - 12
    const textBoxTop = yImgDraw + textBoxMarginTop / 4 - 6
    let timeframeTextColor = '#898989'
    // if (isBeingEdited) {
    //   timeframeTextColor = '#888888'
    // }
    let text = goal.time_frame.from_date
      ? String(moment.unix(goal.time_frame.from_date).format('MMM D, YYYY - '))
      : ''
    text += goal.time_frame.to_date
      ? String(moment.unix(goal.time_frame.to_date).format('MMM D, YYYY'))
      : ''
    ctx.drawImage(img, xImgDraw, yImgDraw, calendarWidth, calendarHeight)
    ctx.save()
    ctx.fillStyle = timeframeTextColor
    ctx.font = '13px PlusJakartaSans-bold'
    ctx.fillText(text, textBoxLeft, textBoxTop)
    ctx.restore()
  }

  // TODO: made unread comment indicator dynamic
  /*
  UNREAD COMMENT INDICATOR
  */
  // if (scale > secondZoomThreshold) {
  //   ctx.beginPath()
  //   ctx.arc(goalLeftX + 4, goalTopY + goalHeight - 4, 4, 0, Math.PI * 2, true)
  //   ctx.fillStyle = 'transparent'
  //   ctx.fill()
  //   ctx.lineWidth = 8
  //   ctx.strokeStyle = '#5f65ff'
  //   ctx.stroke()
  // }
  // if (scale < secondZoomThreshold) {
  //   ctx.beginPath()
  //   ctx.arc(goalLeftX + 4, goalTopY + goalHeight - 4, 8, 0, Math.PI * 2, true)
  //   ctx.fillStyle = 'transparent'
  //   ctx.fill()
  //   ctx.lineWidth = 16
  //   ctx.strokeStyle = '#5f65ff'
  //   ctx.stroke()
  // } else if (scale < firstZoomThreshold) {
  //   ctx.beginPath()
  //   ctx.arc(goalLeftX + 4, goalTopY + goalHeight - 4, 6, 0, Math.PI * 2, true)
  //   ctx.fillStyle = 'transparent'
  //   ctx.fill()
  //   ctx.lineWidth = 12
  //   ctx.strokeStyle = '#5f65ff'
  //   ctx.stroke()
  // }

  drawMembersAvatars(
    members,
    ctx,
    goalLeftX,
    goalTopY,
    goalMetaPadding,
    goalHeight
  )

  /*
  BEING EDITED INDICATOR 
  */
  drawFocusedOnAvatars(
    allMembersActiveOnGoal,
    ctx,
    goalLeftX,
    goalTopY,
    goalMetaPadding
  )

  if (isBeingEdited) {
    // drawRoundCornerRectangle({
    //   context: ctx,
    //   width: 140,
    //   height: 25,
    //   color: '#717171',
    //   boxShadow: false,
    //   xPosition: goalLeftX + goalWidth / 2 - 70,
    //   yPosition: goalTopY + goalHeight - 12.5,
    //   radius: 6,
    // })
  }
  // if (isBeingEdited) {
  //   let isBeingEditedText = `Being edited by ${isBeingEditedBy}`
  //   ctx.fillStyle = '#fff'
  //   ctx.font = '14px PlusJakartaSans-bold'
  //   ctx.fillText(isBeingEditedText, goalLeftX + goalWidth / 2 - 60, goalTopY + goalHeight - 8)
  // }

  ctx.shadowColor = '#00000020'
  ctx.shadowBlur = 30
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
}

function drawFocusedOnAvatars(
  members,
  ctx,
  goalLeftX,
  goalTopY,
  goalMetaPadding
) {
  /*
  MEMBERS
  */
  // draw members avatars
  members.forEach((member, index) => {
    // defensive coding
    if (!member) return

    // adjust the x position according to the index of this member
    // since there can be many
    const xAvatarDraw = goalLeftX - goalMetaPadding - 4

    const yAvatarDraw =
      goalTopY +
      4 +
      (index + 1) * avatarHeight - // unit
      index * (avatarSpace + 6) // spacer

    // make the status circle (stroke) color dynamic
    const strokeColor = SELF_ASSIGNED_STATUS_COLORS[member.status]
    drawAvatar(member, ctx, xAvatarDraw, yAvatarDraw, strokeColor)
  })
}

function drawMembersAvatars(
  members,
  ctx,
  goalLeftX,
  goalTopY,
  goalMetaPadding,
  goalHeight
) {
  /*
    MEMBERS
    */
  // draw members avatars
  members.forEach((member, index) => {
    // defensive coding
    if (!member) return

    // adjust the x position according to the index of this member
    // since there can be many
    const xAvatarDraw =
      goalLeftX +
      goalWidth -
      goalMetaPadding -
      (index + 1) * avatarWidth -
      index * avatarSpace
    const yAvatarDraw = goalTopY + goalHeight - goalMetaPadding - avatarHeight

    drawAvatar(member, ctx, xAvatarDraw, yAvatarDraw)
  })
}

function drawAvatar(member, ctx, xAvatarDraw, yAvatarDraw, strokeColor) {
  if (!member.avatar_url) {
    /*
      Initials Avatar
    */

    const backgroundInitialsAvatar = pickColorForString(member.first_name)
    const initials = `${member.first_name[0].toUpperCase()}${member.last_name[0].toUpperCase()}`
    // the background for the initial avatar:
    ctx.save()
    ctx.fillStyle = backgroundInitialsAvatar
    ctx.beginPath()
    ctx.arc(
      xAvatarDraw + avatarWidth / 2, // x
      yAvatarDraw + avatarHeight / 2, // y
      avatarRadius, // radius
      0,
      Math.PI * 2,
      true
    )
    // to be consistent with Avatar component
    // if avatar belongs to an imported project and not connected an active memeber
    if (member.is_imported) {
      // set an opacity
      ctx.globalAlpha = 0.5
    }
    ctx.closePath()
    ctx.fill()
    ctx.restore()
    // the text for the initials avatar:
    ctx.save()
    // to be consistent with Avatar component
    // if avatar belongs to an imported project and not connected an active memeber
    if (member.is_imported) {
      // set an opacity
      ctx.globalAlpha = 0.5
    }
    ctx.fillStyle = '#FFF'
    ctx.font = '11px PlusJakartaSans-bold'
    ctx.fillText(initials, xAvatarDraw + 5, yAvatarDraw + 7)
    ctx.restore()
  } else {
    /*
      when there is a image avatar
    */
    const img = getOrSetImageForUrl(
      member.avatar_url,
      avatarWidth,
      avatarHeight
    )
    // assume that it will be drawn the next time 'render' is called
    // if it isn't already set
    if (!img) return

    // help from https://stackoverflow.com/questions/4276048/html5-canvas-fill-circle-with-image
    ctx.save()
    ctx.beginPath()
    ctx.arc(
      xAvatarDraw + avatarWidth / 2, // x
      yAvatarDraw + avatarHeight / 2, // y
      avatarRadius, // radius
      0,
      Math.PI * 2,
      true
    )
    ctx.closePath()
    ctx.clip()

    // url, x coordinate, y coordinate, width, height
    let imgHeightToDraw = avatarHeight,
      imgWidthToDraw = avatarWidth
    let imgXToDraw = xAvatarDraw,
      imgYToDraw = yAvatarDraw
    // make sure avatar image doesn't stretch on canvas
    // if image width is more that image height (landscape)
    if (img.width / img.height > 1) {
      imgHeightToDraw = avatarHeight
      imgWidthToDraw = (img.width / img.height) * avatarWidth
      // move to the left by the amount that would center the image
      imgXToDraw = xAvatarDraw - (imgWidthToDraw - avatarWidth) / 2
    }
    // if image height is more that image width (portrait)
    else if (img.width / img.height < 1) {
      imgWidthToDraw = avatarWidth
      imgHeightToDraw = (img.height / img.width) * avatarHeight
      // move upwards by the amount that would center the image
      imgYToDraw = yAvatarDraw - (imgHeightToDraw - avatarHeight) / 2
    }

    // to be consistent with Avatar component
    // if avatar belongs to an imported project and not connected an active memeber
    if (member.is_imported) {
      // set an opacity
      ctx.globalAlpha = 0.5
    }

    ctx.drawImage(img, imgXToDraw, imgYToDraw, imgWidthToDraw, imgHeightToDraw)

    ctx.beginPath()
    ctx.arc(xAvatarDraw, yAvatarDraw, avatarRadius, 0, Math.PI * 2, true)
    ctx.clip()
    ctx.closePath()
    ctx.restore()
  }

  // circle around the avatar image
  ctx.save()
  ctx.beginPath()
  ctx.arc(
    xAvatarDraw + avatarRadius,
    yAvatarDraw + avatarRadius,
    avatarRadius,
    0,
    Math.PI * 2,
    true
  )
  ctx.fillStyle = 'transparent'
  ctx.fill()
  ctx.lineWidth = 3
  ctx.strokeStyle = strokeColor ? strokeColor : '#fff'
  ctx.stroke()
  ctx.restore()
}
