import {exec} from "@actions/exec";

export async function createTar(filePath: string): Promise<{exitCode: number}> {
    const exitCode = await exec(`tar -czf ${filePath}.tar.gz`, [], {silent: true});
    return {exitCode};
}
