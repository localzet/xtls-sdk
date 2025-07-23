/* eslint-disable no-console */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as tar from 'tar';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const VERSION = '25.3.6';
const TEMP_DIR = path.join(__dirname, 'temp-xray-core');
const TARGET_URL = `https://github.com/XTLS/Xray-core/archive/refs/tags/v${VERSION}.tar.gz`;
const PROTO_DIR = path.join(__dirname, '../src/xray-protos');

const execAsync = promisify(exec);

async function downloadTarGz(url: string, dest: string) {
    console.log(`📥 Загрузка Xray Core v${VERSION}...`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Ошибка загрузки: ${response.statusText}`);

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`✅ Архив сохранён в ${dest}`);
}

async function extractProtoFiles(tarPath: string) {
    console.log('📦 Распаковка архива...');
    await tar.x({
        file: tarPath,
        cwd: TEMP_DIR,
        strip: 1,
    });
    console.log('✅ Архив распакован');
}

function findProtoFiles(dir: string): string[] {
    console.log('🔍 Поиск .proto файлов...');
    const files: string[] = [];

    function walk(currentDir: string) {
        fs.readdirSync(currentDir).forEach((file) => {
            const filePath = path.join(currentDir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                walk(filePath);
            } else if (path.extname(file) === '.proto') {
                files.push(filePath);
            }
        });
    }

    walk(dir);
    console.log(`✅ Найдено ${files.length} .proto файлов`);
    return files;
}

async function generateTsFromProto(protoFile: string): Promise<void> {
    try {
        const command = [
            'protoc',
            '--plugin=./node_modules/.bin/protoc-gen-ts_proto',
            `--ts_proto_out=${PROTO_DIR}`,
            '--ts_proto_opt=outputServices=generic-definitions,useExactTypes=false',
            '--ts_proto_opt=outputServices=nice-grpc',
            '--ts_proto_opt=outputTypeRegistry=true',
            '--ts_proto_opt=outputEncodeMethods=true',
            '--ts_proto_opt=outputJsonMethods=true',
            '--ts_proto_opt=lowerCaseServiceMethods=true',
            `--proto_path=${path.dirname(protoFile)}`,
            protoFile,
        ].join(' ');

        const protoFileName = path.basename(protoFile);
        console.log(`🧱 Генерация TypeScript для: ${protoFileName}`);

        const { stderr } = await execAsync(command);

        if (stderr) {
            console.warn(`⚠️ Предупреждение при генерации ${protoFileName}:`, stderr);
        }
    } catch (error) {
        const protoFileName = path.basename(protoFile);
        console.error(`❌ Ошибка при генерации ${protoFileName}:`, error);
    }
}

async function main() {
    try {
        // Создание временных директорий
        if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);
        if (!fs.existsSync(PROTO_DIR)) fs.mkdirSync(PROTO_DIR, { recursive: true });

        const tarPath = path.join(TEMP_DIR, `xray-core-${VERSION}.tar.gz`);

        // Шаг 1: Скачивание
        await downloadTarGz(TARGET_URL, tarPath);

        // Шаг 2: Распаковка
        await extractProtoFiles(tarPath);

        // Шаг 3: Поиск .proto файлов
        const protoFiles = findProtoFiles(TEMP_DIR);

        // Шаг 4: Генерация TS
        for (const protoFile of protoFiles) {
            await generateTsFromProto(protoFile);
        }

        console.log('🎉 Генерация завершена успешно!');
    } catch (error) {
        console.error('💥 Критическая ошибка:', error);
    } finally {
        // Удаление временной папки
        fs.rmSync(TEMP_DIR, { recursive: true, force: true });
        console.log('🗑️ Временные файлы удалены');
    }
}

main();
