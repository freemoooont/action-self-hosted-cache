import {getOptions} from "./utils/options";
import {mkdirP, mv, rmRF} from '@actions/io'
import {exists} from "@actions/io/lib/io-util";
import * as core from "@actions/core";
import {createTar} from "./utils/tar";
import {lsofCheck} from "./utils/lsof";

async function post(): Promise<void> {
    try {
        const { fileName, cacheDir, targetDir, options, cachePath } = await getOptions();
        if (options.update){
            const isExistCacheDir = await exists(cacheDir)
            if (!isExistCacheDir) {
                await mkdirP(cacheDir)
            }
            process.chdir(targetDir)
            const {exitCode} = await createTar(fileName)
            if(exitCode === 0){
                core.info('Tar created')
                lsofCheck(cachePath)
                await rmRF(cachePath);
                await mv(`${fileName}.tar.gz`, cacheDir, {force: true});
            }
        } else {
            core.info('Cache should not be updated')
        }
    } catch (error: unknown) {
        core.setFailed(error as string)
    }
}

void post()