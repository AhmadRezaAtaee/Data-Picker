// PickData - Picker - PickedData - PickData
import { Target } from "./target";

export class Picker {

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

}