export const requireAll = (r: __WebpackModuleApi.RequireContext, callback: (key: string, module: any) => void) => {
	r.keys().forEach((key) => {
		const module = r(key);
		callback(key, module);
	});
};
