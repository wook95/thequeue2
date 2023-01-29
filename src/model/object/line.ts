import { generateUUID } from 'cdk/functions/uuid';
import { QueueDocumentRect } from 'model/document';
import { WithEffects } from 'model/effect';
import {
  WithFade,
  WithFill,
  WithRect,
  WithRotation,
  WithStroke,
  WithText,
} from 'model/property';

export interface QueueLine
  extends WithEffects,
    WithRect,
    WithFade,
    WithFill,
    WithRotation,
    WithStroke,
    WithText {
  type: 'line';
  uuid: string;
}

export const createDefaultLine = (
  documentRect: QueueDocumentRect,
  queueIndex: number
): QueueLine => {
  const width = 300;
  const height = 300;
  return {
    type: 'line',
    uuid: generateUUID(),
    rect: {
      x: documentRect.width / 2 - width / 2,
      y: documentRect.height / 2 - height / 2,
      width: width,
      height: height,
    },
    stroke: {
      width: 1,
      color: '#000000',
      dasharray: 'solid',
    },
    fill: {
      color: '#ffffff',
      opacity: 1,
    },
    rotate: {
      position: 'forward',
      degree: 0,
    },
    fade: {
      opacity: 1,
    },
    text: {
      text: '',
      fontSize: 24,
      fontColor: '#000000',
      fontFamily: 'Arial',
      horizontalAlign: 'center',
      verticalAlign: 'middle',
    },
    effects: [
      {
        type: 'create',
        timing: 'linear',
        duration: 0,
        index: queueIndex,
      },
    ],
  };
};
