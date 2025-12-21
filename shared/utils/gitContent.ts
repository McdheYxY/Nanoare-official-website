import { Octokit } from "octokit";

interface config {
	client: Octokit;
	owner: string;
	name: string;
}
interface params {
	token: string;
	owner: string;
	name: string;
}
type FileTypes = Record<string,string>

export default {
	config: {
		client: null as any,
		owner: null as any,
		name: null as any,
	},
	fileTypes: { "image/gif": "gif", "image/png": "png" } as FileTypes,
	check(config: config) {
		if (!config.client || !config.owner || !config.name)
			throw new Error("在调用其他api前请执行正确的auth方法！");
		return config;
	},
	auth(params: params) {
		this.config.client = new Octokit({ auth: params.token });
		this.config.owner = params.owner;
		this.config.name = params.name;
	},
	async uploadImage(baseUrl:string,file: Blob) {
		const { client, owner, name } = this.check(this.config);
		const t = new Date();
		const time = `${t.getFullYear().toString().padStart(4, "0")}${(
			t.getMonth() + 1
		)
			.toString()
			.padStart(2, "0")}${t.getDate().toString().padStart(2, "0")}${t
			.getHours()
			.toString()
			.padStart(2, "0")}${t.getMinutes().toString().padStart(2, "0")}${t
			.getMilliseconds()
			.toString()
			.padStart(3, "0")}`;
		return new Promise((resolve, reject) => {
			if (!file) throw new Error("文件不能为空");
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					if (typeof reader.result === "string")
						resolve(reader.result.split(",")[1]);
				} else {
					reject("reader.result不能为null");
				}
			};
			reader.onerror = () => {
				reject("加载失败");
			};
			reader.readAsDataURL(file);
		})
			.then((base64: any) => {
				return client.request("PUT /repos/{owner}/{repo}/contents/{path}", {
					owner: owner,
					repo: name,
					path: `files/${time}.png`,
					message: "Upload by Arenot",
					content: base64,
					branch: "files",
					headers: {
						"X-GitHub-Api-Version": "2022-11-28",
					},
				});
			})
			.then((res) => {
				if (Object.prototype.hasOwnProperty.call(this.fileTypes, file.type)) {
					baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
					return `${baseUrl}/gh/mcdheyxy/Nanoare-official-website@files/files/${time}.${
						this.fileTypes[file.type]
					}`;
				}else{
                    throw new Error(`不存在该文件类型${file.type}`)
                }
			});
	},
};
