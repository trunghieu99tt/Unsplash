const timeout = (ms: number, promise: Promise<any>) => {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			reject(new Error("TIMEOUT"));
		}, ms);

		promise
			.then((value) => {
				clearTimeout(timer);
				resolve(value);
			})
			.catch((reason) => {
				clearTimeout(timer);
				reject(reason);
			});
	});
};

const checkImage = (url: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.send();
		request.onload = function () {
			const status = request.status;
			resolve(status === 200);
		};
	});
};

export { timeout, checkImage };
