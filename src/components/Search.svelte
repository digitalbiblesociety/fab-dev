<script>
	import { onMount } from "svelte"
	import { locale, t } from "$lib/i18n"
	import { shortcut } from "../routes/api/utils/helpers"
	import Icon from "sverocons/Icon.svelte"
	import Fuse from "fuse.js"
	import query from "query-store"
	
	let results = []
	let result_ordered = []
	let search_input
	let search_data = []
	let engine
	let search_response
	
	// Mount and Preload the site Index
	onMount(async () => {
		const response = await fetch(`/data/site_index.json`)
		search_response = await response.json()

		console.log(search_response)

		for (let [key, section] of Object.entries(search_response)) {
			for (let [i, item] of Object.entries(section)) {
  				item.type = key
				search_data.push(item)
			}
		}

		engine = new Fuse(search_data, {
			shouldSort: true,
			includeMatches: true,
			threshold: 0.3, // At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything.
			location: 0, // Determines approximately where in the text is the pattern expected to be found
			distance: 50, // Determines how close the match must be to the fuzzy location (specified by location). An exact letter match which is distance characters away from the fuzzy location would score as a complete mismatch. A distance of 0 requires the match be at the exact location specified. A distance of 1000 would require a perfect match to be within 800 characters of the location to be found using a threshold of 0.8
			maxPatternLength: 12,
			minMatchCharLength: 1,
			keys: ["tt", "tv", "id"],
		})
	})
	
	let instantSearch = function () {
		results = engine.search($query.search).slice(0, 100)
	
		results.forEach((resultItem) => {
			highlighter(resultItem)
		})

		console.log(results)
	
		result_ordered = results.reduce(function (r, a) {
			r[a.item.type] = r[a.item.type] || []
			r[a.item.type].push(a)
			return r
		}, Object.create(null))
	}
	
	let highlighter = function (resultItem) {
		resultItem.matches.forEach((matchItem) => {
			let text = resultItem.item[matchItem.key]
			let result = []
			let matches = [].concat(matchItem.indices)
			let pair = matches.shift()
	
			for (let i = 0; i < text.length; i++) {
				let char = text.charAt(i)
				if (pair && i == pair[0]) {
					result.push("<em class='text-primary-500 not-italic'>")
				}
				result.push(char)
				if (pair && i == pair[1]) {
					result.push("</em>")
					pair = matches.shift()
				}
			}
			resultItem.highlight = result.join("")
			resultItem.highlight_key = matchItem.key
	
			if (resultItem.children && resultItem.children.length > 0) {
				resultItem.children.forEach((child) => {
					highlighter(child)
				})
			}
		})
	}
	</script>
	{#if engine}
	<div>
		<label for="email" class="sr-only">Search</label>
		<div class="relative mt-1 rounded-md shadow-sm">
			<Icon name="search" type="solid" class="h-5 w-5 text-gray-400 pointer-events-none absolute inset-y-2 left-2" />
			<input
				type="search"
				placeholder={$t('Search')}
				bind:this={search_input}
				bind:value={$query.search}
				on:input={instantSearch}
				use:shortcut={{control: true, code: 'KeyG', callback: () => {search_input.focus()}}}
				autocomplete
				class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 text-gray-600 placeholder-gray-500 shadow-sm focus:border-gray-600 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-600 dark:bg-gray-300 sm:text-sm" />
	
			{#if $query.search == '' || $query.search == null}
				<div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
				  <kbd class="inline-flex items-center border border-gray-300 rounded px-2 text-sm font-sans font-medium text-gray-300">
					⌘G
				  </kbd>
				</div>
			{/if}
		</div>
	</div>
	{/if}
	
	{#if results.length}
		<div class="absolute top-20 bottom-0 right-0 left-0 z-50">

						<div class="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 bg-white shadow-xl rounded-xl">
							<nav class="px-4 py-8">
									<h3 class="text-sm font-medium uppercase tracking-wide text-gray-500">Languages</h3>
									{#if result_ordered["languages"]}
									<nav class="grid grid-cols-2 mt-6">
										{#each result_ordered["languages"].slice(0, 7) as result, i}
											
												<a
													href={`/${$locale}/languages/${result.item.id}`}
													class="flex items-center rounded-md p-3 text-base font-medium text-gray-900 transition duration-150 ease-in-out hover:bg-gray-50">
													<div class="text-xs text-gray-400 font-bold w-6 text-center">{result.item.id}</div>
													<div class="ml-4">
														<div>{@html result.highlight ?? result.item.tt}</div>
														<div class="text-sm text-gray-400">
															{result.item.tv ?? ""}
														</div>
													</div>
												</a>
											
										{/each}
									</nav>
									{:else}
									<div class="text-sm text-gray-400">
										No results
									</div>
									{/if}
									{#if result_ordered["countries"]}
									<hr />
										<nav class="mt-5 space-y-6">
											{#each result_ordered["countries"] as result, i}
												
													<a
														href={`/${$locale}/countries/${result.item.id}`}
														class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 transition duration-150 ease-in-out hover:bg-gray-50">
														
															<svg class="mr-4 inline-block h-5 w-5">
																<use href="/img/flags.svg#{result.item.id}" xlink:href="#{result.item.id}"></use>
															</svg>
															<div>{@html result.highlight ?? result.item.tt}</div>
															<div class="text-sm text-gray-400">
																{result.item.tv ?? ""}
															</div>
														
													</a>
												
											{/each}
										</nav>
									{/if}
							</nav>

							<div class="bg-gray-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12 rounded-r-xl">
								<div>
									{#if result_ordered["bibles"]}
									<h3 class="text-sm font-medium uppercase tracking-wide text-gray-500">Bibles</h3>
									<nav class="grid grid-cols-2 mt-6">
											{#each result_ordered["bibles"].slice(0, 10) as result, i}
													<a
														href={`/${$locale}/bibles/${result.item.id}`}
														class="m-2 p-2 hover:bg-gray-100 rounded-lg">
															<p
																class="truncate text-base font-medium text-gray-900">
																{@html result.highlight ?? result.item.tt}
															</p>
															<p class="mt-1 truncate text-sm text-gray-500">
																{result.item.tv ?? ''}
															</p>
													</a>
											{/each}
									</nav>
									{/if}
								</div>
								<div class="mt-6 text-sm font-medium">
									<a
										href={`/${$locale}/bibles/`}
										class="text-primary-600 transition duration-150 ease-in-out hover:text-primary-500">
										View all Bibles <span aria-hidden="true">&rarr;</span>
									</a>
								</div>
							</div>
						</div>

		</div>
	{/if}
	