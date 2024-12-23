/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    colors: {
      white: '#FFFFFF',
      main: '#FBBB1F',
      main2: '#FBBB1F',
      addAppBg: '#000000',
      bgHeader: '#FFFFFF',
      success: '#5F9D55',
      destructive: '#a11e1e',
      blue: '#35ADE1',
      black: '#000000',
      lightBlue: '#59B1E5',
      secondary: '#939393',
      grey: '#F5F5F5',
      lightGray: '#F3F4F8',
      yellow: '#FFD362',
      primary: '#262626',
      backdrop: 'rgba(0, 0, 0, 0.5)',
      none: 'rgba(0, 0, 0, 0.0)',
      none2: 'rgba(0, 0, 0, 0.0)',
      disabled: '#F2F2F2',
      tooltipBg: '#495A74',
      lightGrey2: '#D9D9D9',
      error: 'rgb(209,80,0)',
      lightGrey3: '#C0C0C0',
      cartBg: '#F3F4F8',
    },
    container: {
      screens: {
        '2xl': '1304px',
      },
    },
    extend: {
      transitionDuration: {
        2000: '2000ms',
      },
      backgroundImage: {
        zipBonusIcon: 'url("/icons/zip-bonus.svg")',
      },
      width: {
        logoHeader: '175px',
        logoHeaderFixed: '115px',
        logoSidebar: '115px',
        logoFooter: '279px',
        logoFooterMobile: '163px',
      },
      aspectRatio: {
        productCard: '1/1',
      },
      height: {
        logoHeader: '52px',
        logoHeaderFixed: '34px',
        logoSidebar: '34px',
        logoFooter: '82px',
        logoFooterMobile: '48px',
      },
      boxShadow: {
        cardLk: '0px 4px 20px 0px #0000001C',
        mobCardLk: '0 25px 22px -12px #0000001C',
        restShadow: '0px 4px 22px 0px #0000001C;',
        productCart: '0px 0px 17px 0px #1B3F761C;',
        mobProductCart: '0px 4px 15px 0px #0E0D4E0F;',
        storiesShadow: '0 0 20px 2px rgb(0 0 0/9%)',
        cardTop: '0px -4px 22px 0px #00000014',
        hoverStories: '0 0 14px 0.5px rgba(0,0,0,.12)',
        orderItemMin: '0px 4px 33px 0px rgba(0, 0, 0, 0.05)',
        modsShadow: '0px 3.25px 11px 3px rgba(8, 25, 67, 0.05)',
        headerMobShadow: '0px, 4px, 11px, 0px,  rgba(101, 76, 28, 0.06)',
        plateFixedBottomShadow: '0px, -40px, 40px, 0px,  #333',
        promoGiftShadow: '0px 0px 17px 0px rgba(27, 63, 118, 0.11)',
        qrShadow: '0px 4px 22px 0px #00000026',
        userButtonShadow: '2px 4px 15px 0px #08145614',
        sidebarCatalog: '0px 4px 22px -6px #06053226',
        categoriesHoverShadow: '0px 0px 15.85px 0px #1B3F761C',
        headerMobile: '0px 4px 11px 0px #654C1C0F',
        cartBlockShadow: '0px 3.25px 11px 3px #0819430D',
        sizeTabShadow: '0px 4px 11px 0px #0000001C',
      },
      dropShadow: {
        promoCardShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)',
      },
      animation: {
        shine: 'shine 8s ease-in-out infinite',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        shine: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        'caret-blink': {
          '0%,70%,100%': {
            opacity: '1',
          },
          '20%,50%': {
            opacity: '0',
          },
        },
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      backdropBlur: {
        55: '55px',
      },
      colors: {
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    function ({ addComponents }) {
      addComponents({
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '.25rem',
          height: '.25rem',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(156, 163, 175, 0.3)',
          borderRadius: '.25rem',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(156, 163, 175, 0.5)',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:active': {
          backgroundColor: 'rgba(156, 163, 175, 0.5)',
        },

        '.scrollbar-normal::-webkit-scrollbar': {
          width: '0.5rem',
          height: '0.5rem',
        },
        '.scrollbar-normal::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '.scrollbar-normal::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(156, 163, 175, 0.4)',
          borderRadius: '.25rem',
        },
        '.scrollbar-normal::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(156, 163, 175, 0.5)',
        },
        '.scrollbar-normal::-webkit-scrollbar-thumb:active': {
          backgroundColor: 'rgba(156, 163, 175, 0.5)',
        },

        '.scrollbar-none::-webkit-scrollbar': {
          width: '0rem',
          height: '0rem',
        },
        '.scrollbar-none::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '.scrollbar-none::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(156, 163, 175, 0.4)',
          borderRadius: '.25rem',
        },
        '.scrollbar-none::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(156, 163, 175, 0.5)',
        },
        '.scrollbar-none::-webkit-scrollbar-thumb:active': {
          backgroundColor: 'rgba(156, 163, 175, 0.5)',
        },
      });
    },
  ],
};
