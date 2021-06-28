install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
tests:
	npm test	
tests-coverage:	
	npm test -- --coverage --coverageProvider=v8
