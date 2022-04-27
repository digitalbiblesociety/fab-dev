<script>
import Menu from "./Menu.svelte"
import { t, locale } from "$lib/i18n"
import Icon from "sverocons/Icon.svelte"

const toggleLanguage = (current_lang) => ($locale = current_lang.iso)
const translations = [
	{ iso: "en", t: $t("English") },
	{ iso: "zh", t: $t("Chinese") },
]
</script>

<Menu>
	<div slot="trigger">
		<button class="text-white hover:text-gray-300">
			<span class="sr-only">View notifications</span>
			<Icon name="translate" />
		</button>
	</div>
	<div
		slot="menu"
		class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg dark:bg-gray-800">
		{#each translations as translation}
			<div
				on:click="{() => toggleLanguage(translation)}"
				class="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200"
				role="menuitem"
				tabindex="-1">
				{translation.t}
			</div>
		{/each}
	</div>
</Menu>
