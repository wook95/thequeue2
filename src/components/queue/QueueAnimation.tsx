import { Animator } from 'cdk/animation/Animator';
import { QueueFade, QueueRect, QueueScale, QueueSquare } from 'model/object/rect';
import { createContext, FunctionComponent, ReactElement } from 'react';
import { getAnimatableFade, getCurrentFade, getFadeAnimation } from './animate/fade';
import { getAnimatableRect, getCurrentRect, getRectAnimation } from './animate/rect';
import { getAnimatableScale, getCurrentScale, getScaleAnimation } from './animate/scale';

export interface QueueAnimatableContextType {
  rect: QueueRect;
  fade: QueueFade;
  scale: QueueScale;
}

export const QueueAnimatableContext = createContext<QueueAnimatableContextType>({
  rect: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  fade: {
    opacity: 0,
  },
  scale: {
    scale: 1,
  },
});

export interface ObjectAnimatableProps {
  queueStart: number;
  queueIndex: number;
  queuePosition: 'forward' | 'backward' | 'pause';
  object: QueueSquare;
  children: React.ReactNode;
}

export const ObjectAnimator: FunctionComponent<ObjectAnimatableProps> = ({
  children,
  object,
  queueIndex,
  queuePosition,
  queueStart,
}) => {
  const currentFade = getCurrentFade(object, queueIndex);
  const animatableFade = queueStart > 0 ? getFadeAnimation(object, queueIndex, queuePosition) : undefined;
  const currentRect = getCurrentRect(object, queueIndex);
  const animatableRect = queueStart > 0 ? getRectAnimation(object, queueIndex, queuePosition) : undefined;
  const currentScale = getCurrentScale(object, queueIndex);
  const animatableScale = queueStart > 0 ? getScaleAnimation(object, queueIndex, queuePosition) : undefined;

  return (
    <Animator
      duration={animatableRect?.moveEffect.duration || 0}
      start={queueStart}
      timing={animatableRect?.moveEffect.timing}>
      {(rectProgress): ReactElement => {
        return (
          <Animator
            duration={animatableFade?.fadeEffect.duration || 0}
            start={queueStart}
            timing={animatableFade?.fadeEffect.timing}>
            {(fadeProgress): ReactElement => {
              return (
                <Animator
                  duration={animatableScale?.scaleEffect.duration || 0}
                  start={queueStart}
                  timing={animatableScale?.scaleEffect.timing}>
                  {(scaleProgress): ReactElement => {
                    return (
                      <QueueAnimatableContext.Provider value={{
                        rect: getAnimatableRect(rectProgress, currentRect, animatableRect?.fromRect),
                        fade: getAnimatableFade(fadeProgress, currentFade, animatableFade?.fromFade),
                        scale: getAnimatableScale(scaleProgress, currentScale, animatableScale?.fromScale),
                      }}>
                        {children}
                      </QueueAnimatableContext.Provider>
                    );
                  }}
                </Animator>
              );
            }}
          </Animator>
        );
      }}
    </Animator>
  );
};