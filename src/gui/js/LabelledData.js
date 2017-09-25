class LabelledData {
	constructor(objectList, labelFunction, dataFunction) {
		this.labels = [];
		this.data = [];
			
		objectList.forEach(obj => {
			this.labels.push(labelFunction(obj));
			this.data.push(dataFunction(obj));
		});
	}

	getLabels() {
		return this.labels;
	}

	getData() {
		return this.data;
	}
}