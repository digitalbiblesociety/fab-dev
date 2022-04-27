<script context="module">
	import FallbackFetch from "$lib/fallback-fetch.js";
	export async function load({ fetch }) {
		return FallbackFetch(fetch, 'fobai')
	}
</script>
<script>
import { t, locale } from "$lib/i18n"
import Banner from "$lib/Banner.svelte";

export let fobai

</script>
<Banner 
	background="https://images.bible.cloud/fab/banners/agencies-1.jpg"
	locale={$locale}
	tabs={[
		{title: $t("Organizations"), url: 'organizations'},
		{title: $t('fobai'), url: 'organizations/fobai'}
	]}
	translations={{
		title: "FOBAI",
		subtitle: $t('fobai'),
		breadcrumbs:[
			{title: $t("Organizations"), url: "/organizations"},
			{title: $t('fobai'), url: "#"}
		]}}
	 />

<div class="bg-white">
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
	  <p class="text-center text-base font-semibold uppercase text-gray-600 tracking-wider">{ $t('fobai') }</p>
	  <div class="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
		{#each fobai as organization}
		<a 
			href={'/' + $locale + '/organizations/' + organization.id} 
			class="col-span-1 py-8 px-8 bg-gray-50 hover:bg-gray-200 h-36 flex justify-center">
			{@html organization.logo}
		  </a>
		{/each}
	  </div>
	</div>
</div>