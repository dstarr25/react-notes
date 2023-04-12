import eslint from 'vite-plugin-eslint';

/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import ViteFaviconsPlugin from 'vite-plugin-favicon';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        eslint(),
        ViteFaviconsPlugin('src/img/mm25.jpg'),
    ],
    css: {
        postcss: {
            plugins: [
                autoprefixer(),
            ],
        },
    },
});
