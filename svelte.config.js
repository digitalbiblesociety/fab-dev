import adapter from "@sveltejs/adapter-static"
import preprocess from "svelte-preprocess"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		// hydrate: false,
		// router: false,
		vite: {
			server: {
				strictPort: false,
			},
			ssr: {
				noExternal: [
					"svelte-stripe-js",
					"tweened-staggered.js",
					"WorldMap",
					"bibly",
				],
			},
		},
		adapter: adapter({
			// default options are shown
			precompress: true,
			pages: "build",
			assets: "build",
		}),
	},

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true,
		defaults: {
			style: "postcss",
		},
	}),
}

export default config
