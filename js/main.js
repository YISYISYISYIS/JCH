document.addEventListener('DOMContentLoaded', (event) => {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    speed: 1000,
  });
});
//swiper-slider





document.querySelector('.mobile_button').addEventListener('click', function(e) {
  e.preventDefault();
  var menuButtonOpen = document.querySelector('.mobile_button_open');
  var menuButtonClose = document.querySelector('.mobile_button_close');

  // 현재 표시된 버튼을 확인
  var isOpenButtonVisible = window.getComputedStyle(menuButtonOpen).opacity > 0;

  if (isOpenButtonVisible) {
    menuButtonOpen.style.opacity = '0';
    menuButtonClose.style.opacity = '1';
  } else {
    menuButtonOpen.style.opacity = '1';
    menuButtonClose.style.opacity = '0';
  }
});
// mobile_button





document.addEventListener("DOMContentLoaded", function () {
  var mobileButton = document.querySelector(".mobile_button");
  var dimmed = createDimmedElement();
  var mobileNav = document.querySelector(".mobile_nav");
  var mobileSubmenus = document.querySelectorAll(".mobile_nav>ul>li>ul");

  mobileButton.addEventListener("click", function () {
    this.classList.toggle('flipped');
    toggleMobileNav();
  });

  dimmed.addEventListener("click", function () {
    hideMobileNav();
  });

  mobileSubmenus.forEach(function (submenu) {
    var parentItem = submenu.parentElement;

    parentItem.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();  // 메뉴클릭시 화면상단올라가는 기본동작 막아줌

      // 다른 서브메뉴 닫기
      closeOtherSubmenus(submenu);

      // 서브메뉴 토글
      toggleSubmenu(submenu);
    });
  });

  function toggleMobileNav() {
    if (mobileNav.classList.contains("on")) {
      hideMobileNav();
    } else {
      showMobileNav();
    }
  }

  function showMobileNav() {
    mobileNav.classList.add("on");
    dimmed.classList.add("active");
    mobileButton.classList.add("active");
  }

  function hideMobileNav() {
    mobileNav.classList.remove("on");
    dimmed.classList.remove("active");
    mobileButton.classList.remove("flipped");

    // 모바일 버튼의 오퍼시티를 조정하여 mobile_button_open 이미지가 보이도록 설정
    var menuButtonOpen = document.querySelector('.mobile_button_open');
    var menuButtonClose = document.querySelector('.mobile_button_close');
    menuButtonOpen.style.opacity = '1';
    menuButtonClose.style.opacity = '0';

    // 열려있는 서브메뉴 닫기
    mobileSubmenus.forEach(function (submenu) {
      hideSubmenu(submenu);
    });
  }
    // dimmed 클릭 이벤트 핸들러
    dimmed.addEventListener("click", function () {
    hideMobileNav();
    });

  function closeOtherSubmenus(currentSubmenu) {
    mobileSubmenus.forEach(function (submenu) {
      if (submenu !== currentSubmenu && submenu.classList.contains("show")) {
        hideSubmenu(submenu);
      }
    });
  }

  function toggleSubmenu(submenu) {
    if (submenu.classList.contains("show")) {
      hideSubmenu(submenu);
    } else {
      showSubmenu(submenu);
    }
  }

  function showSubmenu(submenu) {
    submenu.style.maxHeight = submenu.scrollHeight + "px";
    submenu.classList.add("show");
  }

  function hideSubmenu(submenu) {
    submenu.style.maxHeight = "0";
    submenu.classList.remove("show");
  }

  function createDimmedElement() {
    var dimmedElement = document.createElement("div");
    dimmedElement.classList.add("dimmed");
    document.body.appendChild(dimmedElement);
    return dimmedElement;
  }
  
  window.addEventListener('resize', function(){
    var width = window.innerWidth;
    if (width > 1200){ 
        hideMobileNav();
    }
  });
  // //mobile_nav
});





document.addEventListener("DOMContentLoaded", function () {
  var menuItems = document.querySelectorAll(".web_nav > ul > li");
  var submenus = document.querySelectorAll(".web_submenu"); // 모든 서브메뉴를 선택

  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("mouseover", function () {
      // 모든 서브메뉴에 대해 높이 설정
      submenus.forEach(function (submenu) {
        submenu.style.height = "325px";
      });
      document.querySelector(".header_inner").classList.add("on");
    });

    menuItem.addEventListener("mouseout", function () {
      // 모든 서브메뉴에 대해 높이를 0으로 설정하여 숨김
      submenus.forEach(function (submenu) {
        submenu.style.height = "0";
      });
      document.querySelector(".header_inner").classList.remove("on");
    });
  });
});

//web_nav





var topupButton = document.querySelector("#wrap .footer_inner .topup_btn");

  // 스크롤 이벤트에 따라 버튼을 숨기거나 보이기
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) { // 200은 스크롤 위치 조절 값.스크롤 위치에 따라 조절
      showTopupButton();
    } else {
      hideTopupButton();
    }
  });

  // topup_button이 클릭되었을 때
  topupButton.addEventListener("click", function () {
    scrollToTop();
  });

  function scrollToTop() {
    var scrollDuration = 400;
    var startTime = performance.now();
    var startY = window.scrollY;

    function scrollAnimation(currentTime) {
      var elapsedTime = currentTime - startTime;

      window.scrollTo(0, easeInOut(elapsedTime, startY, -startY, scrollDuration));

      if (elapsedTime < scrollDuration) {
        requestAnimationFrame(scrollAnimation);
      }
    }

    function easeInOut(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // 스크롤 애니메이션 후 버튼 보이기
    requestAnimationFrame(function () {
      showTopupButton();
    });

    requestAnimationFrame(scrollAnimation);
  }

  function hideTopupButton() {
    topupButton.style.opacity = "0"; 
    topupButton.style.pointerEvents = "none"; // 클릭 이벤트 비활성화
  }

  function showTopupButton() {
    topupButton.style.opacity = "1"; 
    topupButton.style.pointerEvents = "auto"; // 클릭 이벤트 활성화
  }
  // //topup_btn





// 트랜지션을 비활성화하는 함수
function disableTransitions() {
  const elements = document.querySelectorAll('.section3 *');
  elements.forEach(el => {
    el.style.transition = 'none';
  });

  // 1초 후 트랜지션을 다시 활성화하는 함수를 호출
  setTimeout(enableTransitions, 100);
}

// 트랜지션을 활성화하는 함수
function enableTransitions() {
  const elements = document.querySelectorAll('.section3 *');
  elements.forEach(el => {
    el.style.transition = '';
  });
}

// resize 이벤트 리스너
let resizeTimer;
window.addEventListener('resize', () => {
  // resize 이벤트가 발생할 때마다 트랜지션을 비활성화
  disableTransitions();

  // resize가 완료되고 나서 트랜지션을 다시 활성화하지 않도록 타이머를 초기화
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(enableTransitions, 100);
});