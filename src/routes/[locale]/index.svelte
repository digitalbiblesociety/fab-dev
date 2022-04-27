<script>
import { browser } from "$app/env"
import Icon from "sverocons/Icon.svelte"
import QrCode from "qrcode-svg"
import WorldMap from "../../components/Map/WorldMap.svelte"

const qr_code = new QrCode({
	content: "https://find.bible/",
	color: "#000",
	bgColor: "#fff",
	eccLevel: "L",
	padding: 0,
	render: "svg",
	container: "svg-viewbox",
})

let flyerSection

// Write a function that prints a section of the screen
function printSection(section) {
	if (browser) {
		let print_window = window.open("")
		document.head.querySelectorAll("link, style").forEach((htmlElement) => {
			print_window.document.head.appendChild(htmlElement.cloneNode(true))
		})
		print_window.document.body.innerHTML = flyerSection.innerHTML
		print_window.print()
	}
}
</script>

<div
	class="xl:rounded-xl bg-gradient-to-r from-gray-600 to-black">
	<WorldMap />
</div>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="overflow-hidden bg-gray-50 py-16 lg:py-24">
	<div class="relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
		<div class="relative">
			<h2
				class="text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
				Cataloging the World's Scriptures
			</h2>
			<p class="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">
				Cataloging 4877 Bible Versions and 23909 Scripture Resources in 4598
				Languages representing 1022 Agencies.
			</p>
		</div>

		<div
			class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
			<div class="relative">
				<h3
					class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
					Spread Bibles world-wide
				</h3>
				<p class="mt-3 text-lg text-gray-500">
					Do you know someone who speaks another language and may be looking for
					a Bible?
				</p>

				<dl class="mt-10 space-y-10">
					<div class="relative">
						<dt>
							<div
								class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary-500 text-white">
								<Icon name="globe-alt" class="h-6 w-6" />
							</div>
							<!--<p class="ml-16 text-lg leading-6 font-medium text-gray-900">Competitive exchange rates</p>-->
						</dt>
						<dd class="mt-2 ml-16 text-base text-gray-500">
							Are you traveling abroad with plans to share Bibles and resources
							across regions?
						</dd>
					</div>

					<div class="relative">
						<dt>
							<div
								class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary-500 text-white">
								<Icon name="scale" class="h-6 w-6" />
							</div>
							<!--<p class="ml-16 text-lg leading-6 font-medium text-gray-900">No hidden fees</p>-->
						</dt>
						<dd class="mt-2 ml-16 text-base text-gray-500">
							Do you support missionaries who serve among multi-language people
							groups?
						</dd>
					</div>

					<div class="relative">
						<dt>
							<div
								class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary-500 text-white">
								<Icon name="lightning-bolt" class="h-6 w-6" />
							</div>
							<!--<p class="ml-16 text-lg leading-6 font-medium text-gray-900">Transfers are instant</p>-->
						</dt>
						<dd class="mt-2 ml-16 text-base text-gray-500">
							Are you seeking to share Bible related Audio or Video resources on
							your next outreach?
						</dd>
					</div>
				</dl>
			</div>

			<div class="relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
				<div class="mx-auto w-1/2 pt-8 print:w-64">{@html qr_code.svg()}</div>
				<div
					class="button mx-auto mt-8 w-1/2 cursor-pointer text-center"
					on:click="{printSection}">
					Print Some QR Codes to share
				</div>
				<h1 class="hidden">Find a Bible</h1>
				<div class="hidden print:block">
					<div
						class="relative overflow-hidden bg-gray-50"
						bind:this="{flyerSection}">
						<div class="relative pt-6 pb-16 sm:pb-24">
							<section class="grid grid-cols-2">
								{#each [1, 2, 3, 4] as section}
									<div class="border-2 border-dashed text-center">
										<div class="mx-auto w-1/2 pt-8 print:w-64">
											{@html qr_code.svg()}
										</div>
										<h1
											class="text-xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
											<div class="mt-2">Free ebooks, audiobooks, and films</div>
											<div class="text-primary-600">Available for download</div>
											<div class="mb-2">on find.bible</div>
										</h1>
										<p
											class="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
										</p>
									</div>
								{/each}
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>

		<p class="mt-12 ml-16 text-base text-gray-500">
			Find a Bible seeks to provide comprehensive data on existing Bible
			resources in the 6000+ language of the world. Would you help us ensure
			that Bible resources can be discovered, secured, and shared? If you know
			of Bible resources not found in this directory, let us know! Contact Us
			for more information!
		</p>
	</div>
</div>
