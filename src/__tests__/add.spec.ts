function add(x: number, y: number) {
	return x + y;
}

describe("add", () => {
	it("adds positive numbers", () => {
		expect(add(3, 4)).toEqual(7);
	});
});
