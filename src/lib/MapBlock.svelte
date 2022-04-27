<script>
import { map } from "d3";

	export let base_path = "https://images.bible.cloud/maps/";
	export let maps

	function unslugify(slug) {
	  const result = slug.replace(/\-/g, " ");
	  return result.replace(/\w\S*/g, function (txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
	}
</script>

<ul class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:gap-x-8">
	{#each maps as map}
	<li class="relative">
		<a target="_blank" rel="noopener" href="{base_path}{(map.type) ? map.type + '/' : ''}{map.filename}.png">
		<div class="ring-2 ring-offset-2 ring-primary-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden" x-state:on="Current" x-state:off="Default" x-state-description="Current: &quot;ring-2 ring-offset-2 ring-primary-500&quot;, Default: &quot;focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-primary-500&quot;">
		  <img class="object-cover pointer-events-none" x-state:on="Current" x-state:off="Default" x-state-description="Current: &quot;&quot;, Default: &quot;group-hover:opacity-75&quot;" src="{base_path}{map.type}/{map.filename}-thumb.jpg">
		</div>
		<p class="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{unslugify(map.filename)}</p>
		<p class="block text-sm font-medium text-gray-500 pointer-events-none">{map.size ?? ''}</p>
		</a>
	  </li>
	{/each}
</ul>