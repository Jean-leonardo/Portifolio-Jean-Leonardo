
const defaultConfig = {
    nome_completo: "Jean Leonardo",
    cargo_atual: "Assitente de logistica & Assitente de dados",
    bio_resumo: "Executivo sênior especializado em transformação digital e liderança tecnológica. Mais de uma década construindo arquiteturas escaláveis e liderando equipes de alta performance em organizações Fortune 500 e startups disruptivas.",
    tagline_profissional: "Assitente de logistica & Assitente de dados",
    email_contato: "jeanleonardo794@gmail.com",
    telefone_contato: "+55 19 99964-3389",
    linkedin_url: "https://www.linkedin.com/in/jean-leonardo/",
    github_url: "https://github.com/Jean-leonardo",
    website_url: "https://jeanleonardo.dev"
};



window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }, 1500);
});


const themeSwitcher = document.getElementById('themeSwitcher');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
let isDarkMode = true;

themeSwitcher.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        body.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.textContent = '☀️';
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});


document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();


    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');


    const config = window.elementSdk?.config || defaultConfig;
    const emailAddress = config.email_contato || defaultConfig.email_contato;
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`)}`;


    window.open(mailtoLink, '_blank');


    this.reset();


    const button = this.querySelector('.form-button');
    const originalText = button.textContent;
    button.textContent = 'Mensagem Enviada!';
    button.style.background = 'var(--accent-primary)';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 3000);
});


function updateContactInfo() {
    const config = window.elementSdk?.config || defaultConfig;


    const emailContact = document.getElementById('contactEmail');
    const emailAddress = document.getElementById('emailAddress');
    if (emailContact && emailAddress) {
        emailContact.href = `mailto:${config.email_contato || defaultConfig.email_contato}`;
        emailAddress.textContent = config.email_contato || defaultConfig.email_contato;
    }


    const phoneContact = document.getElementById('contactPhone');
    const phoneNumber = document.getElementById('phoneNumber');
    if (phoneContact && phoneNumber) {
        const phone = config.telefone_contato || defaultConfig.telefone_contato;
        phoneContact.href = `tel:${phone.replace(/\D/g, '')}`;
        phoneNumber.textContent = phone;
    }


    const linkedinContact = document.getElementById('contactLinkedIn');
    const linkedinProfile = document.getElementById('linkedinProfile');
    if (linkedinContact && linkedinProfile) {
        const linkedinUrl = config.linkedin_url || defaultConfig.linkedin_url;
        linkedinContact.href = linkedinUrl;
        linkedinProfile.textContent = linkedinUrl.replace('https://', '');
    }


    const githubContact = document.getElementById('contactGitHub');
    const githubProfile = document.getElementById('githubProfile');
    if (githubContact && githubProfile) {
        const githubUrl = config.github_url || defaultConfig.github_url;
        githubContact.href = githubUrl;
        githubProfile.textContent = githubUrl.replace('https://', '');
    }


    const websiteContact = document.getElementById('contactWebsite');
    const websiteUrl = document.getElementById('websiteUrl');
    if (websiteContact && websiteUrl) {
        const website = config.website_url || defaultConfig.website_url;
        websiteContact.href = website;
        websiteUrl.textContent = website.replace('https://', '');
    }
}


async function onConfigChange(config) {
    // Update hero section
    const heroName = document.getElementById('heroName');
    if (heroName) {
        heroName.textContent = config.nome_completo || defaultConfig.nome_completo;
    }

    const heroTagline = document.getElementById('heroTagline');
    if (heroTagline) {
        heroTagline.textContent = config.tagline_profissional || defaultConfig.tagline_profissional;
    }

    const heroDescription = document.getElementById('heroDescription');
    if (heroDescription) {
        heroDescription.textContent = config.bio_resumo || defaultConfig.bio_resumo;
    }


    const logoText = document.getElementById('logoText');
    if (logoText) {
        logoText.textContent = config.nome_completo || defaultConfig.nome_completo;
    }


    updateContactInfo();
}

function mapToCapabilities(config) {
    return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["nome_completo", config.nome_completo || defaultConfig.nome_completo],
        ["cargo_atual", config.cargo_atual || defaultConfig.cargo_atual],
        ["bio_resumo", config.bio_resumo || defaultConfig.bio_resumo],
        ["tagline_profissional", config.tagline_profissional || defaultConfig.tagline_profissional],
        ["email_contato", config.email_contato || defaultConfig.email_contato],
        ["telefone_contato", config.telefone_contato || defaultConfig.telefone_contato],
        ["linkedin_url", config.linkedin_url || defaultConfig.linkedin_url],
        ["github_url", config.github_url || defaultConfig.github_url],
        ["website_url", config.website_url || defaultConfig.website_url]
    ]);
}


if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}


updateContactInfo();


let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});


document.querySelectorAll('.metric-card, .skill-category, .certificate-card, .timeline-content').forEach(card => {
    card.addEventListener('mouseenter', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translateY(-8px) rotateX(${y * 0.05}deg) rotateY(${x * 0.05}deg)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});


document.querySelectorAll('.cta-button, .theme-switcher, .form-button').forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});


(function () {
    function c() {
        var b = a.contentDocument || a.contentWindow.document;
        if (b) {
            var d = b.createElement('script');
            d.innerHTML = "window.__CF$cv$params={r:'99e8026352446c1e',t:'MTc2MzEzOTA0Mi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
            b.getElementsByTagName('head')[0].appendChild(d);
        }
    }
    if (document.body) {
        var a = document.createElement('iframe');
        a.height = 1;
        a.width = 1;
        a.style.position = 'absolute';
        a.style.top = 0;
        a.style.left = 0;
        a.style.border = 'none';
        a.style.visibility = 'hidden';
        document.body.appendChild(a);
        if ('loading' !== document.readyState) c();
        else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c);
        else {
            var e = document.onreadystatechange || function () { };
            document.onreadystatechange = function (b) {
                e(b);
                'loading' !== document.readyState && (document.onreadystatechange = e, c());
            };
        }
    }
})();