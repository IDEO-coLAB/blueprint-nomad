const generateTranslationAnimation = (x1, y1, x2, y2, time) => {
  const animationName = `kf-animation-${Math.round(Math.random() * 1e6)}`
  const animationDuration = `${time}s`
  const animationEasing = 'ease-in-out'

  const keyframeRule = `@keyframes ${animationName} {
    from {
      transform: translate(${x1}px, ${y1}px);
    }
    to {
      transform: translate(${x2}px, ${y2}px);
    }
  }`

  const keyframeStyle = {
    animation: animationName,
    animationDuration: animationDuration,
    animationEasing: animationEasing,
    animationIterationCount: 'infinite'
  }

  return { keyframeRule, keyframeStyle}
}

const generateBlinkAnimation = () => {
  const animationName = `kf-animation-blink-${Math.round(Math.random() * 1e6)}`
  const animationEasing = 'ease-in-out'

  const keyframeRule = `@keyframes ${animationName} {
    0% {
      opacity: 1
    }
    30% {
      opacity: 1
    }
    40% {
      opacity: .3
    }
    50% {
      opacity: 0
    }
    60% {
      opacity: .3
    }
    70% {
      opacity: 1
    }
    100% {
      opacity: 1
    }
  }`

  const keyframeStyle = {
    animation: `${animationName} 0.4s steps(10, start)`,
    animationEasing: animationEasing,
    animationIterationCount: 'infinite'
  }

  return { keyframeRule, keyframeStyle}
}

const insertAnimations = (keyframeRule) => {
  document.styleSheets[0].insertRule(keyframeRule, document.styleSheets[0].rules.length);
}

export { generateTranslationAnimation, generateBlinkAnimation, insertAnimations}