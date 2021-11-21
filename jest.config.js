module.exports = {
	preset: "ts-jest",
	testEnvironment: "jest-environment-jsdom",
	testPathIgnorePatterns: ["/node_modules/", "./build/", "__utils__"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	moduleNameMapper: {
		"\\.(css|less)$": "identity-obj-proxy",
		"^src/(.*)$": "<rootDir>/src/$1",
		"\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/jest.image-mock.ts",
	},
};
