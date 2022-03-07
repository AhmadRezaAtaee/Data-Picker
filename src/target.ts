import { URL } from 'url'

export class Target extends URL {
	constructor(url: string) {
		super(url)
	}
	public document: string
	setDoc(document: string) {
		this.document = document
	}
}