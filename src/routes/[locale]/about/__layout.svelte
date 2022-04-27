<script>
	import { page } from '$app/stores';
	import { t, locale } from "$lib/i18n"

	const pages = [
		{title: "About", url: 'about'},
		{title: "FAQ", url: 'about/faq'},
		{title: "Help", url: 'about/help'},
		{title: "Suggestions", url: 'about/suggestions'},
		{title: "Contact", url: 'about/contact'},
	]
</script>

<div class="grid grid-cols-4">
<nav class="space-y-1 pt-12 px-4 bg-gray-200 rounded-l-xl h-full" aria-label="Sidebar">
	{#each pages as about_page}
		<a 
			href={`/${$locale}/${about_page.url}`} 
			class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
			class:bg-gray-300={$page.url.pathname === `/${$locale}/${about_page.url}`}>
		  <span class="truncate"> {about_page.title} </span>
		</a>
	{/each}
  </nav>
<section class="prose mx-auto col-span-3">

	<slot />

</section>
</div>