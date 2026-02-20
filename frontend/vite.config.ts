import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgr(), tsconfigPaths()],
	resolve: {
		preserveSymlinks: true,
	}, // Preserve symlink paths
	define: {
		"process.env": {},
	},
	build: {
		rollupOptions: {
			onwarn(warning, warn) {
				if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
					return;
				}
				warn(warning);
			},
		},
	},
	ssr: {
		noExternal: ["react-router-dom"],
	},

	optimizeDeps: {},
});
