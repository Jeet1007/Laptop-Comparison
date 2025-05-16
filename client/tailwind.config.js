/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{jsx,js,ts,tsx}", // Include TypeScript files if any
    "./public/**/*.html", // Include HTML files in the public directory
  ],
  theme: {
  	extend: {
  		scrollbar: ['rounded', 'dark'],
  		colors: {
  			primary: '#f3c614',
  			secondary: '#353535',
  			danger: '#e3342f',
  			'custom-blue': '#8A8AFF'
  		},
  		fontFamily: {
  			body: ['Roboto']
  		},
  		screens: {
  			md: '900px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
      require("tailwindcss-animate")
],
}

