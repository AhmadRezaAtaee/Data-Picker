import { URL } from 'url'

export class Target extends URL {
	constructor(url: string) {
		super(url)
	}
	document
	setDoc(document: any) {
		this.document = document
	}
}