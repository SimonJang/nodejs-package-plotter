import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import pRetry from 'p-retry';

const failer = async () => {throw Error('Failing')}

const convertToMS = (seconds: number, nanoseconds: number) => (seconds * 1e3) + (nanoseconds / 1e6);

const fileName = path.join(__dirname, 'retry-timers.csv');

(async () => {
    const defaultRetryOptions = {
        factor: 2,
        maxTimeout: 2000,
        minTimeout: 500,
        randomize: true,
        retries: 5
    }

    const iterations = Array.from(Array(1000).keys());

    const timersMap = new Map<number, number>()

    await Promise.all(
        iterations.map(async (item) => {
            const startTime = process.hrtime()

            try {
                await pRetry(failer, defaultRetryOptions as any)
            } catch {
                const [seconds, nanoseconds] = process.hrtime(startTime);

                timersMap.set(item, convertToMS(seconds, nanoseconds));
            }
        })
    );

    const data = Array.from(timersMap.entries()).map(([counter, time]) => `${counter};${time}`).join('\n')

    try {
        fs.unlinkSync(fileName)
    } catch {}

    fs.writeFileSync(fileName, data);
})();
