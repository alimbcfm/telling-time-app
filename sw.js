const CACHE_NAME = 'telling-time-ali-asiri-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './700.png',
  './1200.png',
  './300.png',
  './830.png',
  './1130.png',
  './545.png',
  './110.png',
  './920.png',
  './640.png',
  './700.mp3',
  './1200.mp3',
  './300.mp3',
  './830.mp3',
  './1130.mp3',
  './545.mp3',
  './110.mp3',
  './920.mp3',
  './640.mp3',
  './good.mp3',
  './alert.mp3',
  './goodjob.mp3',
  './clapping.mp3'
];

// تثبيت التطبيق وحفظ جميع الملفات في ذاكرة الجهاز
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// تفعيل النسخة الحديثة وحذف أي ملفات مؤقتة قديمة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// الاستجابة الفورية من ذاكرة الجهاز أولاً (لضمان السرعة والعمل بدون إنترنت)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});