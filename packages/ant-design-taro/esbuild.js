import { build } from 'esbuild'
import fs from 'fs'

import clean from 'esbuild-plugin-clean'
import dts from 'esbuild-plugin-d.ts'
import { Transform } from 'esbuild-plugin-transform'
import { lessLoader } from 'esbuild-plugin-less'

/**
 * Copy package.json to dist
 * @types {import('esbuild').Plugin}
 */
const copyFile = (file) => ({
  name: 'copy-file',
  setup(build) {
    build.onEnd(() => {
      const source = import.meta.dirname + '/' + file
      const destination = import.meta.dirname + '/dist/' + file.split('/').pop()
      fs.copyFileSync(source, destination)
      console.log(`${file} copied to dist`)
    })
  },
})

/**
 * Transform .less to .css
 * @types {import('esbuild').Plugin} */
const transLessExt = (options = {}) => ({
  name: 'trans-less-ext',
  setup(build) {
    const { filter = /\.ts[x]?$/, namespace = 'file' } = options

    const IMPORT_PATTERN = /(import|from) ("|')\..*\.less("|')/gm

    build.onLoad({ filter, namespace }, async (args) => {
      let contents = await fs.promises.readFile(args.path, 'utf8')

      const matches = Array.from(contents.matchAll(IMPORT_PATTERN))

      for (const match of matches) {
        const importStr = match[0]

        const transformed = importStr.replace('.less', '.css')

        contents = contents.replace(importStr, transformed)

        console.debug(`[transform-less-ext] ${importStr} -> ${transformed}`)
      }

      return {
        contents,
        loader: 'tsx',
      }
    })
  },
})

const startTime = Date.now()

try {
  await build({
    entryPoints: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.less'],
    format: 'esm',
    outdir: 'dist',
    tsconfig: 'tsconfig.json',
    bundle: false,
    plugins: [
      Transform({
        plugins: [
          clean(),
          copyFile('package.json'),
          copyFile('../../LICENSE.md'),
          copyFile('../../README.md'),
          dts(),
          lessLoader(),
          transLessExt(),
        ],
      }),
    ],
  })

  const endTime = Date.now()
  const buildTime = endTime - startTime
  console.log(`Build completed in ${buildTime} ms`)
} catch (error) {
  console.error('Build failed:', error)
  process.exit(1)
}
