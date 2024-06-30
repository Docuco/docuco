import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        dir: 'src/test/backend/unit',
        exclude: ['node_modules/**', '.vscode', '.git', '.github'],
        coverage: {
            all: true,
            provider: 'istanbul',
            reporter: ['text', 'json', 'html', 'lcov'],
            reportsDirectory: './coverage/back/unit',
            include: ['src/app/_core/**'],
            exclude: [
                'src/app/_core/**/Infrastructure/**',
            ],
            clean: true,
            cleanOnRerun: true,
            thresholds: {
                perFile: true,
                statements: 90,
                branches: 90,
                functions: 90,
                lines: 90,
            }
        },
    },
});
