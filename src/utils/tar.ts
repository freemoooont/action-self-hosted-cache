import {exec} from "@actions/exec";

export async function createTar(fileName: string): Promise<{exitCode: number}> {
    const exitCode = await exec(`tar -czf ${fileName}.tar.gz ${fileName}`, [], {silent: true});
    return {exitCode};
}
