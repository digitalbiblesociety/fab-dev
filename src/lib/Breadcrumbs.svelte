<script>
import { locale } from "$lib/i18n"
import Icon from "sverocons/Icon.svelte"

export let breadcrumbs
</script>

{#if breadcrumbs}

			<nav class="flex px-4 sm:px-6 pt-2" aria-label="Breadcrumb">
				<div class="flex sm:hidden">
					<a
						href="{breadcrumbs[breadcrumbs.length - 2].link}"
						class="group inline-flex space-x-3 text-sm">
						<Icon name="arrow" direction="w" />
						<span>{breadcrumbs[breadcrumbs.length - 2].title}</span>
					</a>
				</div>

				<div class="hidden sm:block">
					<ol class="flex space-x-4">
						<li>
							<div>
								<a href="/">
									<Icon name="home" type="solid" />
									<span class="sr-only">Home</span>
								</a>
							</div>
						</li>

						{#each breadcrumbs as breadcrumb, index}
							<li>
								<div class="flex">
									<svg
										class="h-5 w-5 flex-shrink-0"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
										aria-hidden="true">
										<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z">
										</path>
									</svg>

									{#if index + 1 == breadcrumbs.length}
										<span
											class="ml-4 text-sm">
											{breadcrumb.title}
										</span>
									{:else}
										<a
											href="{breadcrumb.url}"
											class="ml-4 text-sm cursor-pointer hover:text-gray-300">
											{breadcrumb.title}
										</a>
									{/if}
								</div>
							</li>
						{/each}
					</ol>
				</div>
			</nav>

{/if}
