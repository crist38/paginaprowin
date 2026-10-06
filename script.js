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
      worksFilters = document.querySelectorAll('.works__filter'),
      worksMore = document.getElementById('works-more'),
      WORKS_STEP = 12

let worksFilter = 'all',
    worksLimit = WORKS_STEP,
    worksVisible = []

const renderWorks = () =>{
    const filtered = OBRAS.filter(o => worksFilter === 'all' || o.cat === worksFilter)
    worksVisible = filtered.slice(0, worksLimit)

    worksContainer.innerHTML = worksVisible.map((o, i) => `
        <div class="works__card" data-index="${i}">
            <img src="./obras/thumbs/${o.img}" alt="${o.title} - ${o.subtitle}" class="works__img" loading="lazy">
            <div class="works__data">
                <h3 class="works__title">${o.title}</h3>
                <span class="works__subtitle">${o.subtitle}</span>
            </div>
        </div>`).join('')

    worksMore.style.display = filtered.length > worksLimit ? '' : 'none'
}

if(worksContainer){
    worksFilters.forEach(b => b.addEventListener('click', () =>{
        worksFilters.forEach(f => f.classList.remove('active-filter'))
        b.classList.add('active-filter')
        worksFilter = b.dataset.filter
        worksLimit = WORKS_STEP
        renderWorks()
    }))

    worksMore.addEventListener('click', () =>{
        worksLimit += WORKS_STEP
        renderWorks()
    })

    renderWorks()
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
