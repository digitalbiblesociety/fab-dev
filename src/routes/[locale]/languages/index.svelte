<script context="module">
import FallbackFetch from "$lib/fallback-fetch.js"
export async function load({ fetch }) {
	return FallbackFetch(fetch, "languages")
}
</script>

<script>
import { t, locale } from "$lib/i18n"
import { LanguageList } from "svelte-bible-wiki"
export let languages
</script>

<LanguageList
	locale="{$locale}"
	languages="{languages}"
	translations="{{
		title: $t('Languages'),
		subtitle: '',
		breadcrumbs: [
			{
				title: $t('Reference'),
				url: '/languages',
			},
			{
				title: $t('Languages'),
				url: '/languages',
			},
		],
		thead: {
			language: $t('Language'),
			title: $t('Title'),
			country: $t('Country'),
			population: $t('Population'),
			date: $t('Date'),
			resources: $t('Resources'),
			bibles: $t('Bibles'),
			films: $t('Films'),
		},
		tabs: {
			languages: $t('Languages'),
			maps: $t('Maps'),
		},
		modal: `
			LANGUAGES PAGES			
			The world's languages can be displayed and sorted by country, population, ISO code, or the number of Bible resource links here.
			The languages are named and arranged by the ISO 639-3 code.
			Also provided from the <em>languages</em> page are some handy <em>language family maps</em> that may assist in doing some basic research.

			GETTING STARTED
			Scenario: My church is sending a missions group to Mexico and we would like to bring Bibles.
			From the top menu select <em>countries</em>. You will see that Mexico has about 129 million people who speak 300+ languages.
			Click the row in the table for <em>Mexico</em> and you will see those common languages inside the country of Mexico.
			Select Mexico Maps and Info. Use the provided maps to research which languages your group might encounter by geography.`,
	}}" />
