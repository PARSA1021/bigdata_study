/**
 * BigData Note PWA Service Worker (v3.0)
 * 완벽한 오프라인 환경(노데이터/노와이파이) 지원 Caching Engine
 */

const CACHE_NAME = 'knowway-bigdata-v7';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './data.json',
  './cbt_bank.json',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// 1. 서비스 워커 설치 및 프리캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching static assets');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. 구버전 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. 네트워크 우선(Network-First) 전략 (오프라인 지원 유지, 실시간 업데이트)
self.addEventListener('fetch', (event) => {
  // HTTP/HTTPS 요청만 처리
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // 네트워크 통신 성공 시 캐시를 최신 파일로 업데이트
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // 오프라인이거나 통신 실패 시 기존 캐시(Fallback) 반환
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // 저장된 캐시마저 없으면 기본 HTML 반환
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
