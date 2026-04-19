// @ts-check
import { defineConfig } from 'astro/config';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserOrOrgPagesRepo = repository.endsWith('.github.io');
const computedBase = isUserOrOrgPagesRepo || repository.length === 0 ? '/' : `/${repository}/`;

// https://astro.build/config
export default defineConfig({
	site: 'https://mslimmens.github.io',
	base: computedBase
});
