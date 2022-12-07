import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import {getOptions} from "./utils/options";
import {exists} from "@actions/io/lib/io-util";

async function run(): Promise<void> {
    try{
        const { cachePath, options, targetDir } = await getOptions();
        const isExistCache = await exists(cachePath);
        core.info('Cache path: ' + cachePath);
        core.info('Exist cache: ' + isExistCache);
        if(isExistCache){
            await tc.extractTar(cachePath, './');
            core.info(`Restored from cache: ${options.path}`);
            core.setOutput("cache-hit", "true");
        } else {
            core.info(`Cache not found for input keys: ${options.key}`);
            core.setOutput("cache-hit", "false");
        }
    }catch ({message}) {
        core.setFailed(message as string);
    }
}

void run();