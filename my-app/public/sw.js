var title = 'Simple Title';
var options = {
  body: 'Simple piece of body text.\nSecond line of body text :)'
};
// registration.showNotification(title, options);



  self.addEventListener('push', event => {
    const options = {
      body: 'PWA TEST~~~!', // 푸시 알림에 표시될 메시지
      icon: '/icons/apple-touch-icon-144x144.png', // 알림에 표시될 아이콘 이미지
    };
  
    event.waitUntil(
      self.registration.showNotification('PWA Test Notification', options)
    );
  });
  
