import { expect, test } from '@playwright/test';


test('index page has expected tagline', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h2')).toBe('Cataloging the World\'s Scriptures');
});

test('Ensure redirect to /en/ when locale is not specified', async ({ page }) => {
	await page.goto('/about/faq');
	expect(await page.textContent('h4')).toBe('What is Find-A-Bible?');
});