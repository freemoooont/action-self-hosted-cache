import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
async function run(): Promise<void> {
    try{
        const depPath = tc.find('dep', '0.0.1');
        core.info(`depPath: ${depPath}`);
        if(depPath){
            await tc.extractTar(depPath, './');
        } else {
            await tc.extractTar('../../_tool/deps/0.0.1/node_modules.tar.gz', './');
        }
    }catch ({message}) {
        core.setFailed(message as string);
    }
}

run();