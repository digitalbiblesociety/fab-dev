<script>
import { goto } from "$app/navigation"
import { base } from "$app/paths"
import { page } from "$app/stores"
import { locale } from "$lib/i18n"
import { onDestroy, onMount } from "svelte"

let lastLocale = $locale

function localizedPath(path, lastLocale, newLocale) {
	return (
		(base ? "/" + base : "") +
		"/" +
		newLocale +
		path.substring(lastLocale.length + 1)
	)
}

let unsubscribe = () => {}
// Run inside onMount to be only run client-side
onMount(() => {
	unsubscribe = locale.subscribe((newLocale) => {
		const UnlocalizedEndPoints = new Set(["sitemap.xml", "robots.txt"]);

		console.log(UnlocalizedEndPoints.has($page.url.pathname))

		if(!UnlocalizedEndPoints.has($page.url.pathname)) {
			goto(localizedPath($page.url.pathname, lastLocale, newLocale), {
				replaceState: true,
			})
		}

		lastLocale = newLocale
	})
})

onDestroy(unsubscribe)
</script>

<slot />
