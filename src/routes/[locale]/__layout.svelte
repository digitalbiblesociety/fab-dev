<script>
import { page } from "$app/stores"
import { locale } from "$lib/i18n"
import Footer from "../../components/Footer.svelte"
import Header from "../../components/Header.svelte"
import translations from "../../generated/translations"
import "../../style.css"

if (Object.prototype.hasOwnProperty.call(translations, $page.params?.locale)) {
	$locale = $page.params.locale
}
</script>

<svelte:head>
	<meta property="og:type" content="website" />
	<meta property="og:determiner" content="" />
	<meta property="og:site_name" content="Find a Bible" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:locale:alternate" content="zh_CN" />
</svelte:head>

<div class="min-h-screen bg-gray-100 pb-12 dark:bg-gray-900">
	<Header />

	<main class="-mt-32">
		<div class="mx-auto max-w-7xl bg-white dark:bg-gray-700 xl:rounded-2xl">
			<slot />
		</div>
	</main>
</div>

<Footer />
