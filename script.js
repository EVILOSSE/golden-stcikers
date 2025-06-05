// Get references to the headers and discord banner
const mainHeader = document.getElementById('main-header');
const stickyHeader = document.getElementById('sticky-header');
const discordBanner = document.getElementById('discord-banner');

// Function to update active link in navigation
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const mainNavLinks = mainHeader.querySelectorAll('nav ul li a');
    const stickyNavLinks = stickyHeader.querySelectorAll('nav ul li a');
    let currentActiveSection = '';

    // Determine which section is currently in view
    sections.forEach(section => {
        // Calculate offset for the active header (main or sticky)
        let headerOffset = 0;
        if (!mainHeader.classList.contains('hidden')) { // If main header is visible
            headerOffset = mainHeader.offsetHeight;
        } else if (!stickyHeader.classList.contains('hidden')) { // If sticky header is visible
            // Adjust for the sticky header's top offset (top-4 = 16px)
            headerOffset = stickyHeader.offsetHeight + 16;
        }
        const sectionTop = section.offsetTop - headerOffset - 50; // Adjust offset for header height
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentActiveSection = section.id;
        }
    });

    // Update active class on main header navigation links
    mainNavLinks.forEach(link => {
        link.classList.remove('active-link', 'border-white', 'text-white');
        link.classList.add('border-transparent', 'text-gray-400');
        // Check for full URL match for external pages (pricing, features, discord)
        if (link.getAttribute('href') === 'pricing.html' && window.location.pathname.includes('pricing.html')) {
            link.classList.add('active-link', 'border-white', 'text-white');
            link.classList.remove('border-transparent', 'text-gray-400');
        } else if (link.getAttribute('href') === 'features.html' && window.location.pathname.includes('features.html')) {
            link.classList.add('active-link', 'border-white', 'text-white');
            link.classList.remove('border-transparent', 'text-gray-400');
        } else if (link.getAttribute('href') === 'discord.html' && window.location.pathname.includes('discord.html')) {
            link.classList.add('active-link', 'border-white', 'text-white');
            link.classList.remove('border-transparent', 'text-gray-400');
        }
        // For internal anchor links on index.html
        else if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            if (link.getAttribute('href').substring(1) === currentActiveSection) {
                link.classList.add('active-link', 'border-white', 'text-white');
                link.classList.remove('border-transparent', 'text-gray-400');
            }
        }
    });

    // Update active class on sticky header navigation links
    stickyNavLinks.forEach(link => {
        link.classList.remove('active-link', 'border-black', 'text-black');
        link.classList.add('border-transparent', 'text-gray-800');
        // Check for full URL match for external pages (pricing, features, discord)
        if (link.getAttribute('href') === 'pricing.html' && window.location.pathname.includes('pricing.html')) {
            link.classList.add('active-link', 'border-black', 'text-black');
            link.classList.remove('border-transparent', 'text-gray-800');
        } else if (link.getAttribute('href') === 'features.html' && window.location.pathname.includes('features.html')) {
            link.classList.add('active-link', 'border-black', 'text-black');
            link.classList.remove('border-transparent', 'text-gray-800');
        } else if (link.getAttribute('href') === 'discord.html' && window.location.pathname.includes('discord.html')) {
            link.classList.add('active-link', 'border-black', 'text-black');
            link.classList.remove('border-transparent', 'text-gray-800');
        }
        // For internal anchor links on index.html
        else if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            if (link.getAttribute('href').substring(1) === currentActiveSection) {
                link.classList.add('active-link', 'border-black', 'text-black');
                link.classList.remove('border-transparent', 'text-gray-800');
            }
        }
    });
}


// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default if it's an internal anchor on the current page
        if (this.hostname === location.hostname && this.pathname === location.pathname) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                let headerOffset = 0;
                if (mainHeader && !mainHeader.classList.contains('hidden')) {
                    headerOffset = mainHeader.offsetHeight;
                } else if (stickyHeader && !stickyHeader.classList.contains('hidden')) {
                    headerOffset = stickyHeader.offsetHeight + 16;
                }
                const offsetTop = targetElement.offsetTop - headerOffset;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active link immediately on click for internal links
                updateActiveLink();
            }
        }
    });
});

// Sticky header logic (existing code)
let mainHeaderHeight = 0;
let discordBannerHeight = 0;

// Function to update header heights and banner height on resize
function updateLayoutHeights() {
    if (mainHeader) mainHeaderHeight = mainHeader.offsetHeight;
    // Check if discordBanner exists before accessing its offsetHeight
    if (discordBanner) discordBannerHeight = discordBanner.offsetHeight;
}

window.addEventListener('resize', updateLayoutHeights); // Update heights on window resize

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // The scroll threshold is the height of the main header + discord banner
    // Check if discordBanner exists before adding its height to the threshold
    const scrollThreshold = mainHeaderHeight + (discordBanner ? discordBannerHeight : 0);

    if (currentScrollY > scrollThreshold) {
        // User has scrolled past the initial content, show sticky header and hide main header
        if (mainHeader && (mainHeader.classList.contains('opacity-100') || !mainHeader.classList.contains('hidden'))) {
            mainHeader.classList.remove('opacity-100', 'translate-y-0');
            mainHeader.classList.add('opacity-0', '-translate-y-full');
            // Use a timeout to add 'hidden' after the transition completes
            setTimeout(() => { if (mainHeader) mainHeader.classList.add('hidden'); }, 300);
        }

        if (stickyHeader && (stickyHeader.classList.contains('hidden') || stickyHeader.classList.contains('opacity-0'))) {
            stickyHeader.classList.remove('hidden');
            // Small delay to ensure 'hidden' is removed before transition starts
            setTimeout(() => {
                if (stickyHeader) {
                    stickyHeader.classList.remove('opacity-0', '-translate-y-full');
                    stickyHeader.classList.add('opacity-100', 'translate-y-0');
                }
            }, 10);
        }
    } else {
        // User is at the top, show main header and hide sticky header
        if (stickyHeader && (stickyHeader.classList.contains('opacity-100') || !stickyHeader.classList.contains('hidden'))) {
            stickyHeader.classList.remove('opacity-100', 'translate-y-0');
            stickyHeader.classList.add('opacity-0', '-translate-y-full');
            // Use a timeout to add 'hidden' after the transition completes
            setTimeout(() => { if (stickyHeader) stickyHeader.classList.add('hidden'); }, 300);
        }

        if (mainHeader && (mainHeader.classList.contains('hidden') || mainHeader.classList.contains('opacity-0'))) {
            mainHeader.classList.remove('hidden');
            // Small delay to ensure 'hidden' is removed before transition starts
            setTimeout(() => {
                if (mainHeader) {
                    mainHeader.classList.remove('opacity-0', '-translate-y-full');
                    mainHeader.classList.add('opacity-100', 'translate-y-0');
                }
            }, 10);
        }
    }
    updateActiveLink(); // Always update active links for both headers
});


// GSAP ScrollTrigger Animations for Hero Section
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initial call to set active link and hide sticky header if not scrolled
    updateLayoutHeights(); // Get initial heights and set sticky header top
    updateActiveLink();
    if (stickyHeader) stickyHeader.classList.add('hidden', 'opacity-0', '-translate-y-full');
    if (mainHeader) {
        mainHeader.classList.remove('hidden', 'opacity-0', '-translate-y-full');
        mainHeader.classList.add('opacity-100', 'translate-y-0');
    }

    // GSAP animation for hero elements
    // Set initial state (hidden and slightly below)
    gsap.set(".hero-element", { y: 50, opacity: 0 });

    // Create a timeline for the animation
    gsap.timeline({
        scrollTrigger: {
            trigger: "#hero", // Trigger the animation when the hero section enters view
            start: "top 80%", // When the top of the trigger hits 80% from the top of the viewport
            toggleActions: "play none none none", // Play animation once
            // markers: true // For debugging - remove in final version
        }
    })
    .to(".hero-element", {
        y: 0, // Move to original Y position
        opacity: 1, // Fade in
        duration: 0.8, // Animation duration
        ease: "power2.out", // Easing function for smoother animation
        stagger: 0.2 // Delay between each element's animation
    });

    // GSAP ScrollTrigger Animation for RELEASING LATER THIS YEAR Section Image
    gsap.set("#releasing-image", {
        scale: 2.5, // Start much larger to give a "fuller" initial appearance within its column
        yPercent: 100, // Start fully below its natural position
        opacity: 0, // Start hidden
        transformOrigin: "center bottom" // Scale and move from the bottom center
    });

    gsap.to("#releasing-image", {
        scale: 1, // End at normal size
        yPercent: 0, // Move to its natural Y position
        opacity: 1, // Fade in
        duration: 1.5, // Longer duration for a more noticeable effect
        ease: "power2.out", // Smooth easing
        scrollTrigger: {
            trigger: "#releasing-soon",
            start: "top 80%", // Animation starts when the top of the section is 80% from viewport top
            end: "center center", // Animation ends when the center of the section hits the center of the viewport
            scrub: true, // Smoothly link animation directly to scroll position
            // markers: true // For debugging - remove in final version
        }
    });

    // GSAP ScrollTrigger Animation for CONTRIBUTE Section Image
    gsap.set("#contribute-image", {
        scale: 2.5, // Start much larger
        yPercent: 100, // Start fully below its natural position
        opacity: 0, // Start hidden
        transformOrigin: "center bottom" // Scale and move from the bottom center
    });

    gsap.to("#contribute-image", {
        scale: 1, // End at normal size
        yPercent: 0, // Move to its natural Y position
        opacity: 1, // Fade in
        duration: 1.5, // Longer duration for a more noticeable effect
        ease: "power2.out", // Smooth easing
        scrollTrigger: {
            trigger: "#contribute", // Trigger when this section comes into view
            start: "top 80%", // Animation starts when the top of the section is 80% from viewport top
            end: "center center", // Animation ends when the center of the section hits the center of the viewport
            scrub: true, // Smoothly link animation directly to scroll position
            // markers: true // For debugging - remove in final version
        }
    });

    // GSAP ScrollTrigger Animation for EXCLUSIVE FEATURES (Gallery Images) - Continuous Movement
    const galleryTrack = document.getElementById('gallery-track');
    if (galleryTrack) {
        // Duplicate the children to create a seamless loop
        const originalChildren = Array.from(galleryTrack.children);
        // Duplicate items twice to ensure smooth looping without jumps
        originalChildren.forEach(child => {
            galleryTrack.appendChild(child.cloneNode(true));
        });
        originalChildren.forEach(child => {
            galleryTrack.appendChild(child.cloneNode(true));
        });

        // Set initial position for seamless loop
        gsap.set(galleryTrack, { x: 0 });

        // Calculate the total width of one set of original items + gaps
        // This is needed to know how far to move before repeating
        let totalWidth = 0;
        if (originalChildren.length > 0) {
            // Calculate width of all original items including their margins/gaps
            const firstChild = originalChildren[0];
            const itemWidth = firstChild.offsetWidth + (parseInt(getComputedStyle(firstChild).marginLeft) || 0) + (parseInt(getComputedStyle(firstChild).marginRight) || 0);
            totalWidth = itemWidth * originalChildren.length;
        }

        // Loop the animation
        gsap.to(galleryTrack, {
            x: -totalWidth, // Move left by the total width of one set of original items
            ease: "none", // Linear movement for continuous feel
            duration: 20, // Adjust duration for desired speed
            repeat: -1, // Infinite loop
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // Ensures seamless looping
            }
        });
    }
});
