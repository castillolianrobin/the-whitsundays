

/** */
jQuery(()=>{
  console.log('JQUERY LOADED');
  console.log('0.0.1');
  
  
  
  /** ___SECTIONS___ */

  
  const SECTION_ID = [ '#banner', '#about', '#solutions', '#slideshow' ]; 
  const SECTION_EL = SECTION_ID.map((id)=>{
    const el =  $(id);
    return el.length ? el : null; 
  });

  /**
   * Retrieve the neccesary header item related to the section
   *  
   * @param {string} sectionId - ID of the section
   */
  function getSectionHeaderItem(sectionId) {
    return $(`.header__main a[href="#${sectionId}"]`);
  }

  /**
   * Retrieve the neccesary side nav item related to the section
   *  
   * @param {string} sectionId - ID of the  section
   */
  function getSectionSidenavItem(sectionId) {
    return $(`.sidenav__main a[href="#${sectionId}"]`);
  }
  
  /**
   * Check if element is visible inside viewport screen
   * 
   * @param {any} el 
   * @returns {boolean}
   */
  function isInViewport(el) {
    const elementTop = $(el).offset().top;
    const elementBottom = elementTop + $(el).outerHeight();

    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  }

  /**
   * Change the states of section navigation items
   * 
   * @param {string} sectionId - Section ID in relation to the navigations  
   * @param {boolean} isActive - Navigation new state
   */
  function setActiveNavs(sectionId, isActive = true) {
    if (isActive) {
      getSectionHeaderItem(sectionId)?.addClass('active')
      getSectionSidenavItem(sectionId)?.addClass('active')
    } else {
      getSectionHeaderItem(sectionId)?.removeClass('active')
      getSectionSidenavItem(sectionId)?.removeClass('active')
    }
  }

  /** Main on scroll handler */
  $(document).scroll(function () {
    let activeNavFound = false;
    
    for (const el of SECTION_EL) {
      const EL_ID = $(el)?.attr('id')
      if (el && isInViewport(el) && !activeNavFound) {
        setActiveNavs(EL_ID, true);
        activeNavFound = true;
      }  else {
        setActiveNavs(EL_ID, false);
      }
    }
  });


  
  
  /** ___VIDEO PLAYER___ */

  
  // trigger
  const V_TRIGGER_SELECTOR = '.banner__video-trigger';
  const V_TRIGGER_EL = $('.banner__video-trigger');
  // player
  const V_PLAYER_ID = '.banner__video-container>iframe';
  const V_PLAYER_EL = $(V_PLAYER_ID)[0];
  // state
  var isPlaying = false;

  /**
   * Set the video trigger state to playing
   * 
   * @param {boolean} playing - Flag whether the video is playing or paused 
   */
  function setVPlayerTriggerActive(playing = true) {
    if (playing) {
      V_TRIGGER_EL.addClass('playing');
    } else {
      V_TRIGGER_EL.removeClass('playing');
    }
  }

  /**
   * Trigger the video player state
   * 
   * @param {boolean} play - Flag whether to play/pause
   */
  function playVideo(play = true) {
    var data = { method: play ? "play" : "pause" };
    V_PLAYER_EL
      .contentWindow
      .postMessage(JSON.stringify(data), "*");
    isPlaying = play;
    setVPlayerTriggerActive(play);
  }

  /** trigger on Click handlers */
  $(V_TRIGGER_SELECTOR).on('click', ()=>playVideo(!isPlaying));




  /** __TABS___ */
  const tabs = $('.tab [data-content]');
  
  function openTab(tabEl) {
    const contentName = $(tabEl)?.data('content');
    tabs.each(function (el) {
      const tab = $(this);
      const _contentName = tab?.data('content');
      const content = $(`.tab-content [data-content="${_contentName}"]`) 
      if (_contentName === contentName) {
        tab.addClass('active');
        content.addClass('active');
      } else {
        tab.removeClass('active');
        content.removeClass('active');
      }
    });  
  }

  /** Tab on Click handlers */
  tabs.on('click', function() { openTab(this) });


});