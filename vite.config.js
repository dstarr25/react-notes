import eslint from 'vite-plugin-eslint';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';

/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        eslint(),
        vitePluginFaviconsInject('https://i.pinimg.com/originals/35/c3/07/35c3079d92b89685cab7bae795e7f895.jpg'),
    ],
    css: {
        postcss: {
            plugins: [
                autoprefixer(),
            ],
        },
    },
});
