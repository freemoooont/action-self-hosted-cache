import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
async function run(): Promise<void> {
    try{
        const depPath = tc.find('dep', '0.0.1');
        await tc.extractTar(depPath, './');
    }catch ({message}) {
        core.setFailed(message as string);
    }
}

run();