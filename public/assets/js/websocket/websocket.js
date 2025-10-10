window.addEventListener('load', async function () {
    if (!("Notification" in window)) {
        console.warn("This browser does not support desktop notification");
        return;
    }

    let permission = Notification.permission;

    if (permission !== "granted") {
        permission = await Notification.requestPermission();
    }

    if (permission === "granted") {
        console.log("Notification permission granted, connecting...");
        connect();
    } else {
        console.warn("Notification permission denied");
    }
});

function connect() {
    // ✅ Firefox 兼容方式：手动创建 WebSocket
    const stompClient = new StompJs.Client({
        // 不直接使用 brokerURL，在 Firefox 下可能失效
        webSocketFactory: () => new WebSocket('wss://www.boyouquan.com/websocket'),
        reconnectDelay: 5000, // 自动重连
        debug: (str) => console.log(str)
    });

    stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/broadcasts', (message) => {
            try {
                const payload = JSON.parse(message.body);
                console.log("Received:", payload);
                notify(payload.message, payload.gotoUrl);
            } catch (err) {
                console.error("Invalid message body:", message.body);
            }
        });
    };

    stompClient.onWebSocketError = (error) => {
        console.error('WebSocket error:', error);
    };

    stompClient.onStompError = (frame) => {
        console.error('STOMP error: ' + frame.headers['message']);
        console.error('Details: ' + frame.body);
    };

    stompClient.activate();
}

function notify(message, gotoUrl) {
    const notify = new Notification("博友圈通知", {
        dir: 'auto',
        lang: 'zh-CN',
        icon: 'https://www.boyouquan.com/assets/images/sites/logo/logo-small.png',
        body: message
    });

    notify.onclick = function () {
        window.focus();
        if (gotoUrl) window.open(gotoUrl, '_blank');
        notify.close();
    };

    notify.onerror = function (e) {
        console.error("Notification error:", e);
    };

    notify.onshow = function () {
        setTimeout(() => notify.close(), 8000);
    };

    notify.onclose = function () {
        console.log("Notification closed");
    };
}
