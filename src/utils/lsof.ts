import {exec} from 'child_process'
import * as core from '@actions/core'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const attempts = 5;
export function lsofCheck(cacheTar: string, attempt = 0){
    exec(`lsof ${cacheTar}`, (res) => {
        // @ts-ignore
        if(res.code === 1){
            core.info('File nobody use');
        } else {
            if(attempt < attempts) {
                sleep(1000).then(() => {
                    lsofCheck(cacheTar, attempt + 1)
                })
            } else {
                throw TypeError('File is using, try again later');
            }
        }
    });
}