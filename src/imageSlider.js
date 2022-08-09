const ImageSlider = (containerHeight, containerWidth) => {
  let parent;
  const element = document.createElement('div');
  element.style.position = 'relative';
  element.style.display = 'grid';
  element.style.gridTemplateRows = '1fr 1fr';
  element.style.paddingTop = `${containerHeight / 2}px`;

  let buttonContainer;
  const navButtonBaseSize = 10;
  let sliderTimeInMilliseconds = 5000;
  let autoAdvanceInterval = null;

  const imagePaths = [];
  let currentImagePathIndex = 0;
  element.id = 'image-slider';

  const setUpAutomaticSlider = () => {
    if (autoAdvanceInterval) {
      clearInterval(autoAdvanceInterval);
    }
    autoAdvanceInterval = setInterval(autoAdvanceSlide, sliderTimeInMilliseconds);
  };

  const setSliderTimeInMilliseconds = (newSeconds) => {
    clearInterval(autoAdvanceInterval);
    sliderTimeInMilliseconds = newSeconds;
    autoAdvanceInterval = setInterval(autoAdvanceSlide, sliderTimeInMilliseconds);
  };

  const autoAdvanceSlide = () => {
    let newSlideIndex;
    if (currentImagePathIndex === imagePaths.length - 1) {
      newSlideIndex = 0;
    } else {
      newSlideIndex = currentImagePathIndex + 1;
    }
    moveToSlideIndexOf(newSlideIndex);
    changeActiveNavButton();
  };

  const renderButtonContainer = () => {
    buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'grid';
    buttonContainer.style.gridTemplateRows = '1fr 1fr';
    buttonContainer.style.alignItems = 'flex-end';
    buttonContainer.style.width = `${containerWidth}px`;
    buttonContainer.style.height = `${containerHeight}px`;
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.top = '0px';
    buttonContainer.style.left = '0px';

    element.appendChild(buttonContainer);
  };

  const createButton = (buttonDirection) => {
    const button = document.createElement('div');
    button.style.backgroundColor = 'lightgrey';
    button.style.borderRadius = '100px';
    button.style.width = '20px';
    button.style.textAlign = 'center';
    button.style.zIndex = '1';
    button.style.cursor = 'pointer';
    button.classList.add('direction-button');

    if (buttonDirection === 'left') {
      button.textContent = '<';
    } else if (buttonDirection === 'right') {
      button.textContent = '>';
    }
    return button;
  };

  const renderDirectionButtons = () => {
    const directionButtonContainer = document.createElement('div');
    directionButtonContainer.style.zIndex = 1;
    directionButtonContainer.style.display = 'flex';
    directionButtonContainer.style.gridTemplateRows = '1fr 1fr';
    directionButtonContainer.style.alignItems = 'center';
    directionButtonContainer.style.justifyContent = 'space-between';
    directionButtonContainer.style.width = containerWidth;

    buttonContainer.appendChild(directionButtonContainer);
    const leftButton = createButton('left');
    const rightButton = createButton('right');

    directionButtonContainer.appendChild(leftButton);
    directionButtonContainer.appendChild(rightButton);

    leftButton.addEventListener('mousedown', () => {
      moveLeft();
    });

    rightButton.addEventListener('mousedown', () => {
      moveRight();
    });
  };

  const setDirectionButtonStyles = (cssText) => {
    const buttons = document.querySelectorAll('.direction-button');
    buttons.forEach((button) => {
      button.style.cssText = cssText;
    });
  };

  const setParent = (parentQuerySelector) => {
    parent = document.querySelector(parentQuerySelector);
    parent.appendChild(element);
  };

  const renderNavButttons = () => {
    const navButtonContainer = document.createElement('div');
    navButtonContainer.style.height = '50px';
    navButtonContainer.style.bottom = '10px';
    navButtonContainer.style.right = `${containerWidth / 2}px`;
    navButtonContainer.style.display = 'flex';
    navButtonContainer.style.justifyContent = 'center';
    navButtonContainer.style.alignItems = 'center';
    navButtonContainer.style.zIndex = '1';
    navButtonContainer.style.gap = '10px';

    buttonContainer.appendChild(navButtonContainer);
    imagePaths.forEach((path, index) => {
      renderNavButton(navButtonContainer, index);
    });
  };

  const renderNavButton = (navContainer, index) => {
    const navButton = document.createElement('div');
    navButton.dataset.index = index;
    setNavButtonSize(navButton, currentImagePathIndex, index);
    navButton.style.backgroundColor = 'grey';
    navButton.style.borderRadius = '100px';
    navButton.classList.add('nav-button');
    navButton.style.transitionProperty = 'transform';
    navButton.style.transitionDuration = '1s';
    navButton.style.cursor = 'pointer';
    navContainer.appendChild(navButton);
    navButton.addEventListener('click', () => {
      moveToSlideIndexOf(index);
      changeActiveNavButton();
    });
  };

  const setNavButtonStyles = (cssText) => {
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach((button) => {
      button.style.cssText = cssText;
    });
  };

  const setNavButtonSize = (navButtonToResize, currentIndex, index) => {
    navButtonToResize.style.width = `${navButtonBaseSize}px`;
    navButtonToResize.style.height = `${navButtonBaseSize}px`;

    if (index === currentImagePathIndex) {
      navButtonToResize.style.transform = 'scale(1)';
    } else {
      navButtonToResize.style.transform = 'scale(0.5)';
    }
  };

  const changeActiveNavButton = () => {
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach((button, index) => {
      setNavButtonSize(button, currentImagePathIndex, index);
    });
  };

  const moveLeft = () => {
    if (currentImagePathIndex === 0) {
      moveToSlideIndexOf(imagePaths.length - 1);
    } else {
      moveSlideInDirection('left');
      currentImagePathIndex -= 1;
    }
    changeActiveNavButton();
  };

  const moveRight = () => {
    if (currentImagePathIndex === imagePaths.length - 1) {
      moveToSlideIndexOf(0);
    } else {
      moveSlideInDirection('right');
      currentImagePathIndex += 1;
    }
    changeActiveNavButton();
  };

  const moveSlideInDirection = (direction) => {
    const imageDivs = document.querySelectorAll('.slide');
    imageDivs.forEach((slide) => {
      const oldRightPosition = Number(slide.style.right.split('p')[0]);
      let newRightPosition;
      if (direction === 'right') {
        newRightPosition = `${oldRightPosition + containerWidth}px`;
      } else if (direction === 'left') {
        newRightPosition = `${oldRightPosition - containerWidth}px`;
      }
      slide.style.right = newRightPosition;
    });
  };

  const moveToSlideIndexOf = (slideIndexToMoveto) => {
    const imageDivs = document.querySelectorAll('.slide');
    const distance = slideIndexToMoveto - currentImagePathIndex;
    const pixelsToMove = distance * containerWidth;
    imageDivs.forEach((slide) => {
      const oldRightPosition = Number(slide.style.right.split('p')[0]);
      slide.style.right = `${(oldRightPosition + pixelsToMove)}px`;
    });
    currentImagePathIndex = slideIndexToMoveto;
  };

  const addImage = (imagePath) => {
    imagePaths.push(imagePath);
    render();
  };

  const renderSlides = () => {
    const imageContainer = document.createElement('div');
    imageContainer.id = 'image-container';
    imageContainer.style.height = `${containerHeight}px`;
    imageContainer.style.width = `${containerWidth}px`;
    imageContainer.style.overflow = 'auto';
    imageContainer.style.display = 'grid';
    imageContainer.style.position = 'absolute';

    imageContainer.style.gridTemplateColumns = `repeat(${imagePaths.length}, 1fr)`;
    imagePaths.forEach((path) => {
      const newSlide = document.createElement('div');
      newSlide.classList.add('slide');
      newSlide.style.position = 'relative';
      newSlide.style.backgroundImage = `url(${path})`;
      newSlide.style.height = `${containerHeight}px`;
      newSlide.style.width = `${containerWidth}px`;
      newSlide.style.backgroundPosition = 'center';
      newSlide.style.backgroundSize = 'cover';
      newSlide.style.right = '0px';
      newSlide.style.transitionProperty = 'right';
      newSlide.style.transitionDuration = '1s';
      imageContainer.appendChild(newSlide);
      element.appendChild(imageContainer);
    });
  };

  const render = () => {
    element.textContent = '';
    renderButtonContainer();
    renderDirectionButtons();
    renderNavButttons();
    renderSlides();
  };

  render();
  setUpAutomaticSlider();

  return {
    setParent,
    addImage,
    setDirectionButtonStyles,
    setNavButtonStyles,
    setSliderTimeInMilliseconds,
  };
};

export default ImageSlider;
