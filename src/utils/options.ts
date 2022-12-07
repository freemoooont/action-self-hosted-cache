import path from 'path'

import * as core from '@actions/core'
import {isDirectory} from '@actions/io/lib/io-util'

const { GITHUB_REPOSITORY, RUNNER_TOOL_CACHE } = process.env
const CWD = process.cwd()

type Options = {
    cacheDir: string
    cachePath: string
    options: {
        key: string
        path: string
        update: boolean
    }
    targetDir: string
    targetPath: string
    fileName: string
}

export const getOptions = async (): Promise<Options> => {
    if (!RUNNER_TOOL_CACHE) {
        throw new TypeError('Expected RUNNER_TOOL_CACHE environment variable to be defined.')
    }

    if (!GITHUB_REPOSITORY) {
        throw new TypeError('Expected GITHUB_REPOSITORY environment variable to be defined.')
    }

    const options = {
        key: core.getInput('key') || 'no-key',
        update: core.getInput('update') === 'true',
        path: core.getInput('path'),
    }

    if (!options.path) {
        throw new TypeError('path is required but was not provided.')
    }
    const targetPath = path.resolve(CWD, options.path)
    const fileName = options.path.split('/').pop();

    const cacheDir = path.join(RUNNER_TOOL_CACHE, GITHUB_REPOSITORY, options.key)
    const cachePath = path.join(cacheDir, `${fileName}.tar.gz`)


    const { dir: targetDir } = path.parse(targetPath)

    if(!fileName){
        throw new TypeError('path is required but was not provided.');
    }

    return {
        cacheDir,
        cachePath,
        options,
        targetDir,
        targetPath,
        fileName
    }
}