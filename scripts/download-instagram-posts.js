import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
📋 ИНСТРУКЦИЯ ПО ОБНОВЛЕНИЮ ТОКЕНОВ:

1. Откройте https://igram.world/ в браузере
2. Откройте DevTools (F12) → вкладка Network
3. Вставьте ссылку на Instagram пост
4. Нажмите "Download"
5. Найдите запрос к "api.igram.world/api/convert"
6. В Request Payload найдите значения:
   - ts: (число)
   - _ts: (число) 
   - _s: (строка)
7. Скопируйте эти значения в объект tokens для соответствующей ссылки
8. Запустите скрипт: node scripts/download-instagram-posts.js

⚠️ ВАЖНО: Каждая ссылка имеет свои токены! Токены привязаны к конкретной ссылке и имеют срок действия!
*/

// 🔑 СВЯЗКА ССЫЛКА → ТОКЕНЫ (ОБНОВЛЯЙТЕ ВРУЧНУЮ)
const instagramPosts = [
	{
		url: 'https://www.instagram.com/p/DKzuJcCIPcO/',
		ts: 1761137919403, // ← Обновите это значение
		_ts: 1759145523661, // ← Обновите это значение
		_s: '721a51db4fbefcf94e58d4fd3329346a2d9cf2ea7e874be5d8394a1ad4e94c6d', // ← Обновите это значение
	},
	{
		url: 'https://www.instagram.com/p/DKOnTmIICdb/?img_index=1',
		ts: 1761138362761,
		_ts: 1759145523661,
		_tsc: 0,
		_s: '28a83cedf29233c8c415148c87f288848c8bf713a1de99e42ce127898d53f1a5',
	},
	{
		url: 'https://www.instagram.com/p/DJ-31mqoN1q/?img_index=1',
		ts: 1761138440840,
		_ts: 1759145523661,
		_tsc: 0,
		_s: 'a8639319154e6795bf2f8c6b15959e246087177c52cf5618e2ae9c8cfd789169',
	},
	{
		url: 'https://www.instagram.com/p/DJ6iRKFIWu9/?img_index=1',
		ts: 1761138459887,
		_ts: 1759145523661,
		_tsc: 0,
		_s: '8f41b02329de2a84a8d0608287d144f461558183dd06e10addd7e5a20763ff38',
	},
	{
		url: 'https://www.instagram.com/p/DJzd8QIILN8/?img_index=1',
		ts: 1761138475648,
		_ts: 1759145523661,
		_tsc: 0,
		_s: '8337b1723932a0e90cbee8a54671716a40afa57c23430bb6c36d903630fc06f8',
	},
	{
		url: 'https://www.instagram.com/p/DJqoNSwoIQT/?img_index=1',
		ts: 1761138490370,
		_ts: 1759145523661,
		_tsc: 0,
		_s: '797a58417bb2f7669f61858e1756d4d4603499d202bb76cec3adae7b9f58de32',
	},
	{
		url: 'https://www.instagram.com/p/DJoiOlxogMe/?img_index=1',
		ts: 1761138510195,
		_ts: 1759145523661,
		_tsc: 0,
		_s: 'ce03aaada4b51ae301866308677512e36284025c5d4a2784a1026c593a63c133',
	},
	{
		url: 'https://www.instagram.com/p/DJgfipjoTXn/?img_index=1',
		ts: 1761138525953,
		_ts: 1759145523661,
		_tsc: 0,
		_s: '1bb65c33280336213f8f6dc0c55d149481b73ae86e1ee6c3b6e5b1e2ddd4f220',
	},
	{
		url: 'https://www.instagram.com/p/DJeTVlCor3E/?img_index=1',
		ts: 1761138540842,
		_ts: 1759145523661,
		_tsc: 0,
		_s: 'f464b738a8252da567308257d9796315f6b23b59af260446601988dcbb72eee3',
	},
	{
		url: 'https://www.instagram.com/p/DJbypw_oMK-/?img_index=1',
		ts: 1761138552955,
		_ts: 1759145523661,
		_tsc: 0,
		_s: 'b8600e9583439f038318d4c1924e9bd82670d14c705aaf8c5a88d6fdbed2c784',
	},
	{
		url: 'https://www.instagram.com/p/DJWuVKXoCin/?img_index=1',
		ts: 1761138568974,
		_ts: 1759145523661,
		_tsc: 0,
		_s: 'efecb9a51a100ea1c7a1868de83f47b78ae54239287769b417cdb7390ef719da',
	},
	{
		url: 'https://www.instagram.com/p/DJOb_4UoXHZ/?img_index=1',
		ts: 1761138593655,
		_ts: 1759145523661,
		_tsc: 0,
		_s: '9980c9223122f70775de5055d08af5d2925f113ceb040f86311bedfa41761ae4',
	},
	{
		url: 'https://www.instagram.com/p/DI9hkO_oaTI/?img_index=1',
		ts: 1761138617634,
		_ts: 1759145523661,
		_tsc: 0,
		_s: 'cfa3a2e38ae5dd0c0326bee244841e382a1d0df77cb16829924367d2e1238d8b',
	},
	{
		url: 'https://www.instagram.com/p/DI3kgnRIL6l/?img_index=1',
		ts: 1761138631345,
		_ts: 1759145523661,
		_tsc: 0,
		_s: '853823e73d83dd295825bde006bb31df026bc94e93fc888489c2bf1b08ed8a43',
	},
];

// Функция для скачивания файла
async function downloadFile(url, filepath) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}

	const buffer = await response.arrayBuffer();
	fs.writeFileSync(filepath, Buffer.from(buffer));
	console.log(`✓ Скачан файл: ${filepath}`);
}

// Функция для получения данных поста через API
async function fetchPostData(post) {
	// Извлекаем URL и токены из объекта поста
	const postUrl = post.url;
	const tokens = {
		ts: post.ts,
		_ts: post._ts,
		_tsc: post._tsc || 0,
		_s: post._s,
	};

	// Формируем строку body используя токены для конкретной ссылки
	const bodyString = `{"url":"${postUrl}","ts":${tokens.ts},"_ts":${tokens._ts},"_tsc":${tokens._tsc},"_s":"${tokens._s}"}`;

	console.log(`📡 Запрашиваем данные для: ${postUrl}`);
	console.log(
		`🔑 Используем токены: ts=${tokens.ts}, _ts=${tokens._ts}, _tsc=${
			tokens._tsc
		}, _s=${tokens._s.substring(0, 10)}...`
	);

	const response = await fetch('https://api.igram.world/api/convert', {
		headers: {
			accept: 'application/json, text/plain, */*',
			'accept-language':
				'ru,fr-CA;q=0.9,fr;q=0.8,uk;q=0.7,en-US;q=0.6,en;q=0.5',
			'cache-control': 'no-cache',
			'content-type': 'application/json',
			pragma: 'no-cache',
			priority: 'u=1, i',
			'sec-ch-ua':
				'"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"Windows"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-site',
			Referer: 'https://igram.world/',
		},
		body: bodyString,
		method: 'POST',
	});
	if (!response.ok) {
		if (response.status === 401) {
			console.log('\n❌ ОШИБКА АВТОРИЗАЦИИ!');
			console.log('🔑 Токены устарели. Обновите их для этой ссылки:');
			console.log(`   URL: ${postUrl}`);
			console.log(`   ts: ${tokens.ts}`);
			console.log(`   _ts: ${tokens._ts}`);
			console.log(`   _tsc: ${tokens._tsc}`);
			console.log(`   _s: ${tokens._s}`);
			throw new Error(
				'Токены авторизации устарели. Обновите их для этой ссылки.'
			);
		}
		throw new Error(`HTTP ${response.status}: ${response.statusText}`);
	}

	return await response.json();
}

// Основная функция
async function downloadInstagramPosts() {
	console.log('🚀 Начинаем скачивание Instagram постов...');

	for (let i = 0; i < instagramPosts.length; i++) {
		const post = instagramPosts[i];
		const postUrl = post.url;
		const projectNumber = i + 1;
		const projectFolder = `project-${projectNumber}`;
		const projectPath = path.join(
			__dirname,
			'..',
			'public',
			'images',
			'portfolio',
			projectFolder
		);

		console.log(
			`\n📁 Обрабатываем пост ${projectNumber}/${instagramPosts.length}: ${postUrl}`
		);

		try {
			// Создаем папку для проекта
			if (!fs.existsSync(projectPath)) {
				fs.mkdirSync(projectPath, { recursive: true });
				console.log(`✓ Создана папка: ${projectFolder}`);
			}

			// Получаем данные поста
			console.log('📡 Запрашиваем данные поста...');
			const postData = await fetchPostData(post);

			if (!postData || !Array.isArray(postData)) {
				console.log('❌ Неверный формат ответа API');
				continue;
			}

			// Скачиваем изображения
			console.log(`📸 Скачиваем ${postData.length} изображений...`);
			let imageIndex = 1;

			for (const item of postData) {
				if (item.thumb) {
					const imageUrl = item.thumb;
					const imagePath = path.join(projectPath, `${imageIndex}.jpg`);

					try {
						await downloadFile(imageUrl, imagePath);
						imageIndex++;
					} catch (error) {
						console.log(`❌ Ошибка скачивания изображения: ${error.message}`);
					}
				}
			}

			// Создаем info.txt с текстом из последнего объекта
			if (postData.length > 0) {
				const lastItem = postData[postData.length - 1];
				if (lastItem.meta && lastItem.meta.title) {
					const infoPath = path.join(projectPath, 'info.txt');
					fs.writeFileSync(infoPath, lastItem.meta.title, 'utf8');
					console.log(`✓ Создан файл info.txt`);
				}
			}

			console.log(`✅ Проект ${projectNumber} завершен`);

			// Небольшая пауза между запросами
			await new Promise(resolve => setTimeout(resolve, 1000));
		} catch (error) {
			console.log(
				`❌ Ошибка обработки поста ${projectNumber}: ${error.message}`
			);
		}
	}

	console.log('\n🎉 Скачивание завершено!');
}

// Запускаем скрипт
downloadInstagramPosts().catch(console.error);
