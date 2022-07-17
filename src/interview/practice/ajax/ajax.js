/**
 * 实现request请求
 * @param {*} config
 */
function request(config = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        function cancel() {
            xhr.abort();
        }
        config?.cancelToken?.(cancel);
        xhr.open(config.method, config.url);
        xhr.onreadystatechange = function (res) {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status <= 300) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject(xhr.status);
                }
            }
        };
        xhr.send(config.params);
    });
}
