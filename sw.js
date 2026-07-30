/**
 * BigData Note PWA Service Worker (v2.0)
 * 완벽한 오프라인 환경(노데이터/노와이파이) 지원 Caching Engine
 */

const CACHE_NAME = 'bigdata-master-v2';
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

// 3. 캐시 우선(Cache-First) 전략 (오프라인 지원 핵심)
self.addEventListener('fetch', (event) => {
  // HTTP/HTTPS 요청만 처리
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // 캐시된 자원이 있으면 즉시 반환 (속도 및 오프라인 보장)
        // 네트워크 연결 시 백그라운드 업데이트 추진
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => {/* 오프라인 시 네트워크 에러 무시 */});

        return cachedResponse;
      }

      // 캐시에 없으면 네트워크 요청 후 결과 캐싱
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // 오프라인이면서 캐시가 없는 경우 (index.html 폴백)
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
