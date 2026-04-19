// @ts-check
//import { defineConfig } from 'astro/config';

//const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
//const isUserOrOrgPagesRepo = repository.endsWith('.github.io');
//const computedBase = isUserOrOrgPagesRepo || repository.length === 0 ? '/' : `/${repository}/`;

// https://astro.build/config
//export default defineConfig({
//	site: 'https://mslimmens.github.io',
//	base: computedBase
//});

import { defineConfig } from 'astro/config';

export default defineConfig({
    // 1. Cambia 'site' a tu nuevo dominio personalizado
    site: 'https://matiasslimmens.com.ar',
    
    // 2. Define el 'base' manualmente para que coincida con tu directorio
    base: '/sevozastro',
});
