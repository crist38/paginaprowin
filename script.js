/* =============== SHOW MENU =============== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* =============== REMOVE MENU MOBILE =============== */
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* =============== CHANGE BACKGROUND HEADER =============== */
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* =============== SCROLL SECTIONS ACTIVE LINK =============== */
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(!sectionsClass) return

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/* =============== WORKS GALLERY =============== */
const worksContainer = document.getElementById('works-container'),
      worksCarousel = document.getElementById('works-carousel'),
      worksFilters = document.querySelectorAll('.works__filter'),
      worksPrev = document.getElementById('works-prev'),
      worksNext = document.getElementById('works-next'),
      worksBar = document.getElementById('works-bar'),
      worksCount = document.getElementById('works-count'),
      WORKS_AUTOPLAY_MS = 4000

let worksFilter = 'all',
    worksVisible = [],
    worksTimer = null

const renderWorks = () =>{
    worksVisible = OBRAS.filter(o => worksFilter === 'all' || o.cat === worksFilter)

    worksContainer.innerHTML = worksVisible.map((o, i) => `
        <div class="works__card" data-index="${i}">
            <img src="./obras/thumbs/${o.img}" alt="${o.title} - ${o.subtitle}" class="works__img" loading="lazy">
            <div class="works__data">
                <h3 class="works__title">${o.title}</h3>
                <span class="works__subtitle">${o.subtitle}</span>
            </div>
        </div>`).join('')

    worksContainer.scrollTo({ left: 0, behavior: 'instant' })
    updateWorksNav()
}

/* Ancho de un paso: una tarjeta más el espacio entre tarjetas */
const worksStep = () =>{
    const card = worksContainer.querySelector('.works__card')
    if(!card) return worksContainer.clientWidth
    return card.offsetWidth + parseFloat(getComputedStyle(worksContainer).columnGap || 0)
}

const updateWorksNav = () =>{
    const maxScroll = worksContainer.scrollWidth - worksContainer.clientWidth,
          pos = worksContainer.scrollLeft,
          total = worksVisible.length,
          perView = Math.max(1, Math.round(worksContainer.clientWidth / worksStep())),
          first = Math.min(total, Math.round(pos / worksStep()) + 1),
          last = Math.min(total, first + perView - 1)

    worksPrev.disabled = pos <= 2
    worksNext.disabled = pos >= maxScroll - 2
    worksBar.style.width = total ? `${(last / total) * 100}%` : '0'
    worksCount.textContent = total ? `${first === last ? first : `${first}–${last}`} de ${total}` : ''
}

const moveWorks = (dir) =>{
    worksContainer.scrollBy({ left: dir * worksStep(), behavior: 'smooth' })
}

/* Autoplay: avanza solo, vuelve al inicio al llegar al final y se pausa al interactuar */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const stopWorksAutoplay = () =>{
    clearInterval(worksTimer)
    worksTimer = null
}

const startWorksAutoplay = () =>{
    if(reduceMotion || worksTimer) return
    worksTimer = setInterval(() =>{
        const atEnd = worksContainer.scrollLeft >= worksContainer.scrollWidth - worksContainer.clientWidth - 2
        if(atEnd) worksContainer.scrollTo({ left: 0, behavior: 'smooth' })
        else moveWorks(1)
    }, WORKS_AUTOPLAY_MS)
}

if(worksContainer){
    worksFilters.forEach(b => b.addEventListener('click', () =>{
        worksFilters.forEach(f => f.classList.remove('active-filter'))
        b.classList.add('active-filter')
        worksFilter = b.dataset.filter
        stopWorksAutoplay()
        renderWorks()
        startWorksAutoplay()
    }))

    worksPrev.addEventListener('click', () => moveWorks(-1))
    worksNext.addEventListener('click', () => moveWorks(1))

    worksContainer.addEventListener('scroll', () => requestAnimationFrame(updateWorksNav), { passive: true })
    window.addEventListener('resize', updateWorksNav)

    worksContainer.addEventListener('keydown', (e) =>{
        if(e.key === 'ArrowLeft'){ e.preventDefault(); moveWorks(-1) }
        if(e.key === 'ArrowRight'){ e.preventDefault(); moveWorks(1) }
    })

    worksCarousel.addEventListener('mouseenter', stopWorksAutoplay)
    worksCarousel.addEventListener('mouseleave', startWorksAutoplay)
    worksCarousel.addEventListener('focusin', stopWorksAutoplay)
    worksCarousel.addEventListener('focusout', startWorksAutoplay)
    worksContainer.addEventListener('touchstart', stopWorksAutoplay, { passive: true })

    renderWorks()
    startWorksAutoplay()
}

/* =============== LIGHTBOX =============== */
const lightbox = document.getElementById('lightbox'),
      lightboxImg = document.getElementById('lightbox-img'),
      lightboxCaption = document.getElementById('lightbox-caption')

let lightboxIndex = 0

const showLightbox = (index) =>{
    lightboxIndex = (index + worksVisible.length) % worksVisible.length
    const o = worksVisible[lightboxIndex]
    lightboxImg.src = `./obras/${o.img}`
    lightboxImg.alt = `${o.title} - ${o.subtitle}`
    lightboxCaption.textContent = `${o.title} · ${o.subtitle}`
    lightbox.classList.add('show-lightbox')
    lightbox.setAttribute('aria-hidden', 'false')
    stopWorksAutoplay()
}

const hideLightbox = () =>{
    lightbox.classList.remove('show-lightbox')
    lightbox.setAttribute('aria-hidden', 'true')
}

if(lightbox && worksContainer){
    worksContainer.addEventListener('click', (e) =>{
        const card = e.target.closest('.works__card')
        if(card) showLightbox(Number(card.dataset.index))
    })

    document.getElementById('lightbox-close').addEventListener('click', hideLightbox)
    document.getElementById('lightbox-prev').addEventListener('click', () => showLightbox(lightboxIndex - 1))
    document.getElementById('lightbox-next').addEventListener('click', () => showLightbox(lightboxIndex + 1))

    /* Click outside the image closes */
    lightbox.addEventListener('click', (e) =>{
        if(e.target === lightbox) hideLightbox()
    })

    document.addEventListener('keydown', (e) =>{
        if(!lightbox.classList.contains('show-lightbox')) return
        if(e.key === 'Escape') hideLightbox()
        if(e.key === 'ArrowLeft') showLightbox(lightboxIndex - 1)
        if(e.key === 'ArrowRight') showLightbox(lightboxIndex + 1)
    })
}
