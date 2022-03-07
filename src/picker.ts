import axios, { AxiosResponse } from "axios";
import { HttpRequestConfigDefault, HttpRequestConfig, HttpResponse } from "./http";
import { Target } from "./target";

export class Picker<T> {

	private target: Target

	constructor(url: string)
	constructor(target: Target)
	constructor(urlOrTarget: string | Target) {
		if (typeof urlOrTarget === 'string') {
			this.target = new Target(urlOrTarget)
		}
		if (typeof urlOrTarget === 'object') {
			this.target = urlOrTarget
		}
	}

	response: HttpResponse
	private parsed: T
	public selected: any

	fetch(): Promise<this>;
	fetch(url: string, config?: Partial<Omit<HttpRequestConfig, 'url'>>): Promise<this>;
	fetch(config: Partial<HttpRequestConfig>): Promise<this>;
	async fetch(
		urlOrConfig?: string | Partial<HttpRequestConfig>, config?: Partial<HttpRequestConfig>
	) {

		const RequestConfig: Partial<HttpRequestConfig> =
			Object.assign(config || {}, HttpRequestConfigDefault)

		let result: AxiosResponse;

		switch (typeof urlOrConfig) {
			case 'string':
				result = await axios(urlOrConfig, RequestConfig)
				break;

			case 'object':
				RequestConfig.url = RequestConfig.url || this.target.href
				result = await axios(RequestConfig)
				break;

			default:
				result = await axios(this.target.href, RequestConfig)
				break;
		}

		this.target.setDoc(result.data)

		const { config: _, statusText, request, ...response } = result
		this.response = response

		return this
	}

	parse(parser: (doc: string) => T) {
		this.parsed = parser(this.target.document)
		return this
	}

	select(selector: (parsed: T) => any) {
		this.selected = selector(this.parsed)
		return this
	}

}